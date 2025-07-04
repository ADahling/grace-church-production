-- AI Generated Prayers Table
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

-- Spiritual Guidance Conversations Table
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

-- Daily Spiritual Messages Table
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

-- User Daily Message Views Table
CREATE TABLE IF NOT EXISTS user_daily_message_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  daily_message_id UUID NOT NULL REFERENCES daily_spiritual_messages(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, daily_message_id)
);

-- User Personalized Messages Table
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

-- AI Rate Limiting Table
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

-- User AI Preferences Table
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

-- Indexes for performance
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

-- Row Level Security (RLS) Policies
ALTER TABLE ai_generated_prayers ENABLE ROW LEVEL SECURITY;
ALTER TABLE spiritual_guidance_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_daily_message_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_personalized_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_ai_preferences ENABLE ROW LEVEL SECURITY;

-- Policies for ai_generated_prayers
CREATE POLICY "Users can view their own prayers" ON ai_generated_prayers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own prayers" ON ai_generated_prayers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for spiritual_guidance_conversations
CREATE POLICY "Users can view their own conversations" ON spiritual_guidance_conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversations" ON spiritual_guidance_conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for daily_spiritual_messages (public read)
ALTER TABLE daily_spiritual_messages DISABLE ROW LEVEL SECURITY;

-- Policies for user_daily_message_views
CREATE POLICY "Users can view their own message views" ON user_daily_message_views
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own message views" ON user_daily_message_views
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for user_personalized_messages
CREATE POLICY "Users can view their own personalized messages" ON user_personalized_messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own personalized messages" ON user_personalized_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for ai_rate_limits
CREATE POLICY "Users can view their own rate limits" ON ai_rate_limits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own rate limits" ON ai_rate_limits
  FOR ALL USING (auth.uid() = user_id);

-- Policies for user_ai_preferences
CREATE POLICY "Users can manage their own AI preferences" ON user_ai_preferences
  FOR ALL USING (auth.uid() = user_id);

-- Functions for cleanup and maintenance
CREATE OR REPLACE FUNCTION cleanup_old_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM ai_rate_limits 
  WHERE window_start < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_ai_prayers_updated_at 
  BEFORE UPDATE ON ai_generated_prayers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_rate_limits_updated_at 
  BEFORE UPDATE ON ai_rate_limits 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_preferences_updated_at 
  BEFORE UPDATE ON user_ai_preferences 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();