
DROP POLICY IF EXISTS "Allow public read access to daily spiritual messages" ON public.daily_spiritual_messages;
DROP POLICY IF EXISTS "Allow authenticated users to insert daily messages" ON public.daily_spiritual_messages;

ALTER TABLE public.daily_spiritual_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to daily spiritual messages" 
ON public.daily_spiritual_messages 
FOR SELECT 
USING (true);

CREATE POLICY "Allow authenticated users to insert daily messages" 
ON public.daily_spiritual_messages 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'daily_spiritual_messages' 
  AND schemaname = 'public';

SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'daily_spiritual_messages' 
  AND schemaname = 'public';
