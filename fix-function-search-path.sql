
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_journal_entry_stats()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.user_stats 
    SET journal_entries = journal_entries + 1,
        updated_at = NOW()
    WHERE user_id = NEW.user_id;
    
    INSERT INTO public.user_stats (user_id, journal_entries, created_at, updated_at)
    VALUES (NEW.user_id, 1, NOW(), NOW())
    ON CONFLICT (user_id) DO NOTHING;
    
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.user_stats 
    SET journal_entries = GREATEST(0, journal_entries - 1),
        updated_at = NOW()
    WHERE user_id = OLD.user_id;
    
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_meditation_play_count()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.meditations 
    SET play_count = play_count + 1,
        updated_at = NOW()
    WHERE id = NEW.meditation_id;
    
    RETURN NEW;
  END IF;
  
  RETURN NULL;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_group_member_count()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.prayer_groups 
    SET member_count = member_count + 1,
        updated_at = NOW()
    WHERE id = NEW.group_id;
    
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.prayer_groups 
    SET member_count = GREATEST(0, member_count - 1),
        updated_at = NOW()
    WHERE id = OLD.group_id;
    
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_post_comment_count()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_posts 
    SET comment_count = comment_count + 1,
        updated_at = NOW()
    WHERE id = NEW.post_id;
    
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_posts 
    SET comment_count = GREATEST(0, comment_count - 1),
        updated_at = NOW()
    WHERE id = OLD.post_id;
    
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_reaction_counts()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.reaction_type = 'like' THEN
      UPDATE public.community_posts 
      SET like_count = like_count + 1,
          updated_at = NOW()
      WHERE id = NEW.post_id;
    ELSIF NEW.reaction_type = 'pray' THEN
      UPDATE public.community_posts 
      SET pray_count = pray_count + 1,
          updated_at = NOW()
      WHERE id = NEW.post_id;
    END IF;
    
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.reaction_type = 'like' THEN
      UPDATE public.community_posts 
      SET like_count = GREATEST(0, like_count - 1),
          updated_at = NOW()
      WHERE id = OLD.post_id;
    ELSIF OLD.reaction_type = 'pray' THEN
      UPDATE public.community_posts 
      SET pray_count = GREATEST(0, pray_count - 1),
          updated_at = NOW()
      WHERE id = OLD.post_id;
    END IF;
    
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_prompt_usage_count()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.ai_prompts 
    SET usage_count = usage_count + 1,
        last_used = NOW(),
        updated_at = NOW()
    WHERE id = NEW.prompt_id;
    
    RETURN NEW;
  END IF;
  
  RETURN NULL;
END;
$$;

CREATE OR REPLACE FUNCTION public.test_database_connectivity()
RETURNS jsonb
LANGUAGE plpgsql
SET search_path = 'public'
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
  table_count integer;
  function_count integer;
BEGIN
  SELECT COUNT(*) INTO table_count
  FROM information_schema.tables 
  WHERE table_schema = 'public';
  
  SELECT COUNT(*) INTO function_count
  FROM information_schema.routines 
  WHERE routine_schema = 'public' AND routine_type = 'FUNCTION';
  
  result := jsonb_build_object(
    'status', 'success',
    'timestamp', NOW(),
    'database_info', jsonb_build_object(
      'table_count', table_count,
      'function_count', function_count,
      'connection_test', 'passed'
    )
  );
  
  RETURN result;
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'status', 'error',
      'timestamp', NOW(),
      'error_message', SQLERRM,
      'error_code', SQLSTATE
    );
END;
$$;


DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


SELECT 
  routine_name,
  routine_type,
  security_type,
  routine_definition
FROM information_schema.routines 
WHERE routine_schema = 'public' 
  AND routine_name IN (
    'handle_new_user',
    'update_updated_at_column',
    'update_journal_entry_stats',
    'update_meditation_play_count',
    'update_group_member_count',
    'update_post_comment_count',
    'update_reaction_counts',
    'update_prompt_usage_count',
    'test_database_connectivity'
  )
ORDER BY routine_name;
