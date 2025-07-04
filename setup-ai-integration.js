#!/usr/bin/env node

/**
 * Sanctuary AI Integration Setup Script
 * 
 * This script sets up the AI integration features for the Sanctuary platform:
 * 1. Creates necessary database tables
 * 2. Sets up environment variables template
 * 3. Provides setup instructions
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Sanctuary AI Integration...\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Please run this script from the sanctuary-platform root directory');
  process.exit(1);
}

// Read the AI tables SQL
const sqlFilePath = path.join(__dirname, 'ai_tables.sql');
if (!fs.existsSync(sqlFilePath)) {
  console.error('❌ ai_tables.sql file not found. Please ensure all files are present.');
  process.exit(1);
}

const aiTablesSql = fs.readFileSync(sqlFilePath, 'utf8');

console.log('📋 Setup Instructions for Sanctuary AI Integration\n');

console.log('1. 🗄️  DATABASE SETUP');
console.log('   Execute the following SQL in your Supabase SQL editor:');
console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(aiTablesSql);
console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('2. 🔐 ENVIRONMENT VARIABLES');
console.log('   Add the following to your .env.local file:');
console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('   OPENAI_API_KEY=your_openai_api_key_here');
console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('3. 🤖 OPENAI API KEY');
console.log('   • Visit https://platform.openai.com/api-keys');
console.log('   • Create a new API key');
console.log('   • Add it to your .env.local file');
console.log('   • Ensure you have credits available in your OpenAI account\n');

console.log('4. 🧪 TESTING THE INTEGRATION');
console.log('   • Start your development server: bun run dev');
console.log('   • Navigate to /dashboard');
console.log('   • Test the AI Prayer Generator');
console.log('   • Try the enhanced Sister Grace chatbot');
console.log('   • Check the Daily Spiritual Message\n');

console.log('5. 🛡️  SECURITY CONSIDERATIONS');
console.log('   • Never commit your OpenAI API key to version control');
console.log('   • Monitor your OpenAI usage and costs');
console.log('   • Rate limiting is implemented to prevent abuse');
console.log('   • Content moderation is in place for Catholic appropriateness\n');

console.log('6. 📊 MONITORING & MAINTENANCE');
console.log('   • Check the ai_rate_limits table for usage patterns');
console.log('   • Monitor the ai_generated_prayers table for content quality');
console.log('   • Review spiritual_guidance_conversations for user satisfaction');
console.log('   • Daily messages are cached to reduce API costs\n');

console.log('✨ AI FEATURES INCLUDED:');
console.log('   🙏 AI-Powered Prayer Generation');
console.log('   👩‍🏫 Enhanced Sister Grace Spiritual Guidance');
console.log('   📅 Daily Saint-Inspired Messages');
console.log('   📖 Scripture-Based Spiritual Content');
console.log('   🔄 Rate Limiting & Content Moderation');
console.log('   💾 User Prayer History & Personalization\n');

console.log('🎯 NEXT STEPS:');
console.log('   1. Execute the SQL in your Supabase dashboard');
console.log('   2. Add your OpenAI API key to .env.local');
console.log('   3. Restart your development server');
console.log('   4. Test the AI features in the dashboard');
console.log('   5. Customize the Catholic prompts as needed\n');

console.log('📚 CATHOLIC CONTENT GUIDELINES:');
console.log('   • All AI responses are grounded in Catholic teaching');
console.log('   • Catechism of the Catholic Church is referenced');
console.log('   • Saint recommendations are contextually appropriate');
console.log('   • Liturgical seasons are incorporated automatically');
console.log('   • Content moderation prevents inappropriate responses\n');

console.log('🚀 Your Catholic spiritual wellness platform now has AI superpowers!');
console.log('   Peace be with you! 🕊️\n');

// Create a simple health check file
const healthCheckContent = `// AI Integration Health Check
// Run this script to verify AI features are working

import { createClient } from '@supabase/supabase-js';

async function healthCheck() {
  console.log('🔍 AI Integration Health Check\\n');
  
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
`;

fs.writeFileSync('ai-health-check.js', healthCheckContent);
console.log('📝 Created ai-health-check.js for testing your setup');

console.log('\n🎉 Setup complete! Follow the instructions above to activate AI features.');