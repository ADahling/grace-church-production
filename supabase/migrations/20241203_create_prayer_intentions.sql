-- Create prayer_intentions table
CREATE TABLE IF NOT EXISTS prayer_intentions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL DEFAULT 'spiritual_growth' CHECK (category IN ('healing', 'family', 'work', 'spiritual_growth', 'guidance', 'gratitude', 'other')),
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'answered', 'ongoing', 'closed')),
    is_private BOOLEAN NOT NULL DEFAULT true,
    saint_intercession TEXT,
    scripture_reference TEXT,
    tags TEXT[] DEFAULT '{}',
    prayer_count INTEGER NOT NULL DEFAULT 0,
    last_prayed_at TIMESTAMPTZ,
    answered_at TIMESTAMPTZ,
    answer_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_prayer_intentions_user_id ON prayer_intentions(user_id);
CREATE INDEX IF NOT EXISTS idx_prayer_intentions_status ON prayer_intentions(status);
CREATE INDEX IF NOT EXISTS idx_prayer_intentions_category ON prayer_intentions(category);
CREATE INDEX IF NOT EXISTS idx_prayer_intentions_created_at ON prayer_intentions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE prayer_intentions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own prayer intentions" ON prayer_intentions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own prayer intentions" ON prayer_intentions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prayer intentions" ON prayer_intentions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own prayer intentions" ON prayer_intentions
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_prayer_intentions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_prayer_intentions_updated_at
    BEFORE UPDATE ON prayer_intentions
    FOR EACH ROW
    EXECUTE FUNCTION update_prayer_intentions_updated_at();

-- Grant necessary permissions
GRANT ALL ON prayer_intentions TO authenticated;
GRANT ALL ON prayer_intentions TO service_role;

