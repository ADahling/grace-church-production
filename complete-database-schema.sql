
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  journal_entries INTEGER DEFAULT 0,
  prayers_generated INTEGER DEFAULT 0,
  meditations_completed INTEGER DEFAULT 0,
  community_posts INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.meditations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  audio_url TEXT,
  duration_minutes INTEGER,
  play_count INTEGER DEFAULT 0,
  category VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.prayer_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  member_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.community_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  comment_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  pray_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.post_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.post_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction_type VARCHAR(20) NOT NULL CHECK (reaction_type IN ('like', 'pray')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id, reaction_type)
);

CREATE TABLE IF NOT EXISTS public.ai_prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  prompt_text TEXT NOT NULL,
  category VARCHAR(50),
  usage_count INTEGER DEFAULT 0,
  last_used TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_generated_prayers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  intention TEXT NOT NULL,
  prayer_type VARCHAR(50) DEFAULT 'general',
  generated_prayer TEXT NOT NULL,
  spiritual_needs TEXT[] DEFAULT '{}',
  saint_devotion VARCHAR(100),
  life_circumstance TEXT,
  liturgical_season VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS spiritual_guidance_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_message TEXT NOT NULL,
  sister_grace_response TEXT NOT NULL,
  liturgical_season VARCHAR(50),
  saint_recommendations TEXT[] DEFAULT '{}',
  scripture_references TEXT[] DEFAULT '{}',
  conversation_context JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS daily_spiritual_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_date DATE NOT NULL UNIQUE,
  saint_name VARCHAR(100) NOT NULL,
  message_content TEXT NOT NULL,
  theme VARCHAR(100),
  liturgical_season VARCHAR(50),
  scripture_reference VARCHAR(100),
  reflection_prompt TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_daily_message_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  daily_message_id UUID NOT NULL REFERENCES daily_spiritual_messages(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, daily_message_id)
);

CREATE TABLE IF NOT EXISTS user_personalized_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message_content TEXT NOT NULL,
  saint_name VARCHAR(100),
  theme VARCHAR(100),
  liturgical_season VARCHAR(50),
  scripture_reference VARCHAR(100),
  reflection_prompt TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_rate_limits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint_type VARCHAR(50) NOT NULL, -- 'prayer_generation', 'spiritual_guidance', 'daily_message'
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, endpoint_type, window_start)
);

CREATE TABLE IF NOT EXISTS user_ai_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_saints TEXT[] DEFAULT '{}',
  spiritual_focus TEXT,
  prayer_style_preferences JSONB DEFAULT '{}',
  notification_preferences JSONB DEFAULT '{}',
  ai_interaction_history JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS api_usage_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint VARCHAR(100) NOT NULL, -- 'openai', 'elevenlabs', 'azure_speech', etc.
  request_type VARCHAR(50) NOT NULL, -- 'prayer_generation', 'tts', 'spiritual_guidance'
  tokens_used INTEGER DEFAULT 0,
  characters_processed INTEGER DEFAULT 0,
  cost_estimate DECIMAL(10,4) DEFAULT 0.0000,
  response_time_ms INTEGER DEFAULT 0,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  request_metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_api_costs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_cost DECIMAL(10,4) DEFAULT 0.0000,
  openai_cost DECIMAL(10,4) DEFAULT 0.0000,
  elevenlabs_cost DECIMAL(10,4) DEFAULT 0.0000,
  azure_speech_cost DECIMAL(10,4) DEFAULT 0.0000,
  request_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

CREATE TABLE IF NOT EXISTS performance_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name VARCHAR(100) NOT NULL,
  metric_value DECIMAL(10,4) NOT NULL,
  metric_type VARCHAR(50) NOT NULL, -- 'response_time', 'error_rate', 'cost_per_user'
  time_period VARCHAR(20) NOT NULL, -- 'hourly', 'daily', 'weekly'
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON public.user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_meditations_category ON public.meditations(category);
CREATE INDEX IF NOT EXISTS idx_prayer_groups_created_by ON public.prayer_groups(created_by);
CREATE INDEX IF NOT EXISTS idx_community_posts_user_id ON public.community_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_post_comments_post_id ON public.post_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_post_reactions_post_user ON public.post_reactions(post_id, user_id);
CREATE INDEX IF NOT EXISTS idx_ai_prompts_category ON public.ai_prompts(category);

CREATE INDEX IF NOT EXISTS idx_ai_prayers_user_id ON ai_generated_prayers(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_prayers_created_at ON ai_generated_prayers(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_prayers_liturgical_season ON ai_generated_prayers(liturgical_season);

CREATE INDEX IF NOT EXISTS idx_spiritual_conversations_user_id ON spiritual_guidance_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_spiritual_conversations_created_at ON spiritual_guidance_conversations(created_at);

CREATE INDEX IF NOT EXISTS idx_daily_messages_date ON daily_spiritual_messages(message_date);
CREATE INDEX IF NOT EXISTS idx_daily_messages_saint ON daily_spiritual_messages(saint_name);

CREATE INDEX IF NOT EXISTS idx_daily_views_user_id ON user_daily_message_views(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_views_viewed_at ON user_daily_message_views(viewed_at);

CREATE INDEX IF NOT EXISTS idx_personalized_messages_user_id ON user_personalized_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_personalized_messages_created_at ON user_personalized_messages(created_at);

CREATE INDEX IF NOT EXISTS idx_rate_limits_user_endpoint ON ai_rate_limits(user_id, endpoint_type);
CREATE INDEX IF NOT EXISTS idx_rate_limits_window ON ai_rate_limits(window_start);

CREATE INDEX IF NOT EXISTS idx_api_usage_user_id ON api_usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_endpoint ON api_usage_logs(endpoint);
CREATE INDEX IF NOT EXISTS idx_api_usage_created_at ON api_usage_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_api_usage_cost ON api_usage_logs(cost_estimate);

CREATE INDEX IF NOT EXISTS idx_user_costs_user_date ON user_api_costs(user_id, date);
CREATE INDEX IF NOT EXISTS idx_user_costs_date ON user_api_costs(date);
CREATE INDEX IF NOT EXISTS idx_user_costs_total ON user_api_costs(total_cost);

CREATE INDEX IF NOT EXISTS idx_performance_metrics_name ON performance_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_recorded_at ON performance_metrics(recorded_at);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meditations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_prompts ENABLE ROW LEVEL SECURITY;

ALTER TABLE ai_generated_prayers ENABLE ROW LEVEL SECURITY;
ALTER TABLE spiritual_guidance_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_daily_message_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_personalized_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_ai_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_api_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can view own stats" ON public.user_stats
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Meditations are publicly readable" ON public.meditations
  FOR SELECT USING (true);

CREATE POLICY "Users can view prayer groups" ON public.prayer_groups
  FOR SELECT USING (true);

CREATE POLICY "Users can create prayer groups" ON public.prayer_groups
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view community posts" ON public.community_posts
  FOR SELECT USING (true);

CREATE POLICY "Users can create own posts" ON public.community_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view comments" ON public.post_comments
  FOR SELECT USING (true);

CREATE POLICY "Users can create comments" ON public.post_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view reactions" ON public.post_reactions
  FOR SELECT USING (true);

CREATE POLICY "Users can manage own reactions" ON public.post_reactions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "AI prompts are publicly readable" ON public.ai_prompts
  FOR SELECT USING (true);

CREATE POLICY "Users can view their own prayers" ON ai_generated_prayers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own prayers" ON ai_generated_prayers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own conversations" ON spiritual_guidance_conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversations" ON spiritual_guidance_conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE daily_spiritual_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to daily spiritual messages" 
ON daily_spiritual_messages 
FOR SELECT 
USING (true);

CREATE POLICY "Allow authenticated users to insert daily messages" 
ON daily_spiritual_messages 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Users can view their own message views" ON user_daily_message_views
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own message views" ON user_daily_message_views
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own personalized messages" ON user_personalized_messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own personalized messages" ON user_personalized_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own rate limits" ON ai_rate_limits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own rate limits" ON ai_rate_limits
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own AI preferences" ON user_ai_preferences
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own API usage" ON api_usage_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert API usage logs" ON api_usage_logs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own API costs" ON user_api_costs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage API costs" ON user_api_costs
  FOR ALL WITH CHECK (true);

CREATE POLICY "Admin can view performance metrics" ON performance_metrics
  FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

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

CREATE OR REPLACE FUNCTION cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  DELETE FROM ai_rate_limits 
  WHERE window_start < NOW() - INTERVAL '24 hours';
END;
$$;

CREATE OR REPLACE FUNCTION update_user_daily_cost(
  p_user_id UUID,
  p_endpoint VARCHAR(100),
  p_cost DECIMAL(10,4)
)
RETURNS void
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO user_api_costs (user_id, date, total_cost, openai_cost, elevenlabs_cost, azure_speech_cost, request_count)
  VALUES (
    p_user_id, 
    CURRENT_DATE, 
    p_cost,
    CASE WHEN p_endpoint = 'openai' THEN p_cost ELSE 0 END,
    CASE WHEN p_endpoint = 'elevenlabs' THEN p_cost ELSE 0 END,
    CASE WHEN p_endpoint = 'azure_speech' THEN p_cost ELSE 0 END,
    1
  )
  ON CONFLICT (user_id, date) 
  DO UPDATE SET
    total_cost = user_api_costs.total_cost + p_cost,
    openai_cost = user_api_costs.openai_cost + CASE WHEN p_endpoint = 'openai' THEN p_cost ELSE 0 END,
    elevenlabs_cost = user_api_costs.elevenlabs_cost + CASE WHEN p_endpoint = 'elevenlabs' THEN p_cost ELSE 0 END,
    azure_speech_cost = user_api_costs.azure_speech_cost + CASE WHEN p_endpoint = 'azure_speech' THEN p_cost ELSE 0 END,
    request_count = user_api_costs.request_count + 1,
    updated_at = NOW();
END;
$$;

CREATE OR REPLACE FUNCTION get_user_cost_summary(p_user_id UUID, p_days INTEGER DEFAULT 30)
RETURNS TABLE (
  total_cost DECIMAL(10,4),
  avg_daily_cost DECIMAL(10,4),
  request_count BIGINT,
  cost_breakdown JSONB
)
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    SUM(uc.total_cost) as total_cost,
    AVG(uc.total_cost) as avg_daily_cost,
    SUM(uc.request_count) as request_count,
    jsonb_build_object(
      'openai', SUM(uc.openai_cost),
      'elevenlabs', SUM(uc.elevenlabs_cost),
      'azure_speech', SUM(uc.azure_speech_cost)
    ) as cost_breakdown
  FROM user_api_costs uc
  WHERE uc.user_id = p_user_id 
    AND uc.date >= CURRENT_DATE - INTERVAL '1 day' * p_days;
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

DROP TRIGGER IF EXISTS update_user_stats_updated_at ON public.user_stats;
CREATE TRIGGER update_user_stats_updated_at
  BEFORE UPDATE ON public.user_stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_meditations_updated_at ON public.meditations;
CREATE TRIGGER update_meditations_updated_at
  BEFORE UPDATE ON public.meditations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_prayer_groups_updated_at ON public.prayer_groups;
CREATE TRIGGER update_prayer_groups_updated_at
  BEFORE UPDATE ON public.prayer_groups
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_community_posts_updated_at ON public.community_posts;
CREATE TRIGGER update_community_posts_updated_at
  BEFORE UPDATE ON public.community_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_ai_prayers_updated_at ON ai_generated_prayers;
CREATE TRIGGER update_ai_prayers_updated_at 
  BEFORE UPDATE ON ai_generated_prayers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_ai_rate_limits_updated_at ON ai_rate_limits;
CREATE TRIGGER update_ai_rate_limits_updated_at 
  BEFORE UPDATE ON ai_rate_limits 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_ai_preferences_updated_at ON user_ai_preferences;
CREATE TRIGGER update_ai_preferences_updated_at 
  BEFORE UPDATE ON user_ai_preferences 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_costs_updated_at ON user_api_costs;
CREATE TRIGGER update_user_costs_updated_at 
  BEFORE UPDATE ON user_api_costs 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

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
    'test_database_connectivity',
    'cleanup_old_rate_limits',
    'update_user_daily_cost',
    'get_user_cost_summary'
  )
ORDER BY routine_name;
