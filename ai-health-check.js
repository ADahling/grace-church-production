// AI Integration Health Check
// Run this script to verify AI features are working

import { createClient } from '@supabase/supabase-js';

async function healthCheck() {
  console.log('🔍 AI Integration Health Check\n');
  
  // Check environment variables
  if (!process.env.OPENAI_API_KEY) {
    console.log('❌ OPENAI_API_KEY not found in environment');
    return;
  }
  
  if (process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    console.log('❌ Please set a real OpenAI API key');
    return;
  }
  
  console.log('✅ OpenAI API key is configured');
  
  // Check database tables
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    const { data, error } = await supabase
      .from('daily_spiritual_messages')
      .select('id')
      .limit(1);
    
    if (error) {
      console.log('❌ Database tables not found. Please run the SQL migration.');
      return;
    }
    
    console.log('✅ Database tables are configured');
    console.log('🎉 AI Integration is ready!');
    
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
  }
}

if (typeof window === 'undefined') {
  healthCheck();
}
