# 🤖 Sanctuary AI Integration

This document describes the comprehensive AI integration features implemented for the Sanctuary Catholic spiritual wellness platform.

## ✨ Features Implemented

### 1. 🙏 AI-Powered Prayer Generation (`/api/ai/generate-prayer`)
- Generates personalized Catholic prayers based on user intentions
- Incorporates current liturgical season context
- Supports various prayer types (morning, evening, novena, intercession, etc.)
- Includes saint devotions and spiritual needs
- Maintains Catholic doctrine and traditional prayer structure

**Example Usage:**
```typescript
const response = await fetch('/api/ai/generate-prayer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    intention: "For healing of my family member",
    prayerType: "healing",
    spiritualNeeds: ["Healing", "Strength"],
    saintDevotion: "St. Raphael the Archangel",
    lifeCircumstance: "illness in family"
  })
});
```

### 2. 👩‍🏫 Enhanced Sister Grace Spiritual Guidance (`/api/ai/spiritual-guidance`)
- AI-enhanced Catholic spiritual director chatbot
- Provides responses grounded in Catholic teaching
- Offers saint recommendations based on user needs
- Includes scripture references for reflection
- Maintains conversation history and context
- Incorporates liturgical season awareness

**Features:**
- Warm, maternal guidance tone
- Catholic catechism-based responses
- Saint intercession suggestions
- Scripture verse recommendations
- Error handling with graceful fallbacks

### 3. 📅 Daily Spiritual Messages (`/api/ai/daily-message`)
- AI-generated daily inspirational messages from saints
- Incorporates current liturgical season
- Includes scripture references and reflection prompts
- Supports personalized messages based on user preferences
- Cached daily to reduce API costs

**Message Structure:**
- Inspirational message from saint
- Theme keyword
- Scripture reference
- Reflection prompt
- Liturgical season context

### 4. 🛡️ Security & Rate Limiting
- Comprehensive rate limiting system
- Content moderation for Catholic appropriateness
- User authentication required for AI features
- API key security best practices
- Row-level security on all AI tables

## 🏗️ Technical Architecture

### Components Created

1. **Enhanced SisterGraceChatbot.tsx**
   - AI-powered responses with fallback system
   - Saint and scripture recommendations display
   - Conversation history management
   - Error handling and loading states

2. **AIPrayerGenerator.tsx**
   - Interactive prayer generation form
   - Multiple prayer types and customization options
   - Save generated prayers to user collection
   - Liturgical season integration

3. **DailySpiritualMessage.tsx**
   - Daily message display with expand/collapse
   - Personalization options for authenticated users
   - Caching indicators
   - Responsive design

4. **AISaintRecommendations.tsx**
   - Contextual saint suggestions
   - Detailed saint information modals
   - Patronage and feast day information
   - Interactive selection system

### API Endpoints

```
/api/ai/generate-prayer    - POST: Generate personalized prayers
/api/ai/spiritual-guidance - POST: Enhanced Sister Grace responses  
/api/ai/daily-message      - GET/POST: Daily messages (cached/personalized)
```

### Database Schema

```sql
-- Core AI tables
ai_generated_prayers           - User prayer generation history
spiritual_guidance_conversations - Sister Grace chat history
daily_spiritual_messages      - Cached daily messages
user_daily_message_views      - User engagement tracking
user_personalized_messages    - Personalized message history
ai_rate_limits               - Rate limiting enforcement
user_ai_preferences          - User AI customization settings
```

### Rate Limiting

- **Prayer Generation**: 20 requests/hour per user
- **Spiritual Guidance**: 50 requests/hour per user  
- **Daily Messages**: 10 requests/day per user
- Automatic cleanup of old rate limit records
- Graceful degradation when limits exceeded

## 🔧 Setup Instructions

### 1. Database Setup
Execute the SQL from `ai_tables.sql` in your Supabase SQL editor to create all necessary tables with proper RLS policies.

### 2. Environment Variables
Add to your `.env.local`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Dependencies
The integration uses:
- `openai@5.1.1` - OpenAI API client
- Existing Supabase and Next.js infrastructure
- Tailwind CSS for styling

### 4. Testing
Run the health check:
```bash
node ai-health-check.js
```

## 🎯 Catholic Content Guidelines

### AI System Prompts
All AI responses follow strict Catholic guidelines:
- Grounded in Scripture and Catechism
- Reference Church fathers and saints
- Maintain orthodox Catholic teaching
- Emphasize mercy, love, and traditional values
- Avoid controversial theological debates

### Content Moderation
Automatic filtering for:
- Anti-Catholic content
- Inappropriate theological advice
- Non-orthodox spiritual practices
- Harmful or dangerous guidance

### Liturgical Integration
- Automatic liturgical season detection
- Season-appropriate prayers and messages
- Saint feast day incorporation
- Calendar-aware spiritual content

## 📊 Monitoring & Analytics

### Usage Tracking
- Prayer generation frequency and types
- Spiritual guidance conversation patterns
- Daily message engagement rates
- User preference trends

### Quality Assurance
- AI response appropriateness monitoring
- User feedback collection
- Content quality assessment
- Theological accuracy verification

## 🚀 Dashboard Integration

The AI features are seamlessly integrated into the main dashboard:

1. **Daily Spiritual Message** - Top section with expandable content
2. **AI Prayer Generator** - Interactive prayer creation tool
3. **Enhanced Sister Grace** - Floating chatbot with AI responses
4. **Saint Recommendations** - Contextual suggestions throughout the app

## 💡 Usage Examples

### Generating a Prayer
```typescript
// User selects intention and preferences
const prayerRequest = {
  intention: "Guidance for my vocation",
  prayerType: "guidance", 
  spiritualNeeds: ["Discernment", "Peace"],
  saintDevotion: "St. Joseph"
};

// AI generates personalized Catholic prayer
const prayer = await generatePrayer(prayerRequest);
```

### Sister Grace Conversation
```typescript
// User asks spiritual question
const guidance = await getSpiritualGuidance({
  message: "I'm struggling with forgiveness",
  conversationHistory: previousMessages
});

// Receives Catholic-grounded response with:
// - Compassionate guidance
// - Saint recommendations (St. Maria Goretti)
// - Scripture references (Matthew 6:14-15)
// - Practical spiritual advice
```

### Daily Inspiration
```typescript
// Automated daily message generation
const dailyMessage = await getDailyMessage();

// Includes:
// - Saint-inspired message
// - Current liturgical season context
// - Scripture for reflection
// - Personal meditation prompt
```

## 🔮 Future Enhancements

### Planned Features
1. **Liturgical Calendar Integration** - Real feast days and seasons
2. **Advanced Saint Database** - Comprehensive saint information
3. **Scripture Study AI** - Verse-by-verse Catholic commentary
4. **Confession Preparation** - AI-guided examination of conscience
5. **Rosary Meditations** - AI-generated mystery reflections
6. **Spiritual Reading Plans** - Personalized Catholic literature suggestions

### Technical Improvements
1. **Voice Integration** - Audio prayer generation
2. **Image Generation** - Sacred art for prayers and meditations
3. **Multilingual Support** - AI responses in multiple languages
4. **Advanced Analytics** - Spiritual growth tracking
5. **Offline Mode** - Cached AI responses for offline use

## 🛠️ Customization

### Modifying AI Prompts
Edit `src/lib/openai.ts` to customize:
- Sister Grace's personality and responses
- Prayer generation templates
- Daily message themes
- Content moderation rules

### Adding New Prayer Types
Extend the `prayerTypes` array in `AIPrayerGenerator.tsx`:
```typescript
const prayerTypes = [
  { value: 'adoration', label: 'Eucharistic Adoration' },
  { value: 'rosary', label: 'Rosary Meditation' },
  // Add custom types here
];
```

### Saint Database Expansion
Enhance `AISaintRecommendations.tsx` with additional saints:
```typescript
const saintDatabase = [
  {
    name: 'St. Your Saint',
    feast: 'Date',
    patronage: ['Category'],
    description: 'Biography',
    relevance: 'Why recommend',
    prayer: 'Prayer to saint'
  }
];
```

## 📞 Support

For issues with AI integration:
1. Check OpenAI API key configuration
2. Verify database tables exist
3. Review rate limiting status
4. Check logs for content moderation issues
5. Test with ai-health-check.js

## 🕊️ Final Notes

This AI integration maintains the authentic Catholic spiritual experience while leveraging modern technology to enhance prayer life, spiritual guidance, and daily inspiration. All AI-generated content is designed to draw users closer to God through traditional Catholic spirituality and saint intercession.

**Peace be with you!** 🙏

---

*For technical support or theological questions about the AI responses, please consult with your local parish priest or spiritual director.*