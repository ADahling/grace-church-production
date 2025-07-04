// Enhanced Spiritual Context System for Sister Grace AI
// Provides deeper understanding of user's spiritual journey and needs

export interface SpiritualProfile {
  spiritualMaturity: 'beginner' | 'growing' | 'mature' | 'advanced';
  primaryStruggles: string[];
  favoriteDevotions: string[];
  preferredPrayerStyle: 'vocal' | 'meditative' | 'contemplative' | 'mixed';
  liturgicalAwareness: 'low' | 'moderate' | 'high';
  saintConnections: string[];
  spiritualGoals: string[];
  culturalBackground?: string;
  vocation: 'single' | 'married' | 'religious' | 'ordained' | 'widowed' | 'discerning';
}

export interface ConversationContext {
  emotionalTone: 'peaceful' | 'distressed' | 'questioning' | 'joyful' | 'struggling';
  urgencyLevel: 'low' | 'moderate' | 'high' | 'crisis';
  topicCategory: string;
  previousGuidanceThemes: string[];
  spiritualSeasonAlignment: boolean;
}

export class EnhancedSpiritualContextAnalyzer {
  
  static analyzeUserMessage(message: string): ConversationContext {
    const lowerMessage = message.toLowerCase();
    
    // Analyze emotional tone
    let emotionalTone: ConversationContext['emotionalTone'] = 'peaceful';
    if (this.containsDistressKeywords(lowerMessage)) {
      emotionalTone = 'distressed';
    } else if (this.containsQuestioningKeywords(lowerMessage)) {
      emotionalTone = 'questioning';
    } else if (this.containsJoyfulKeywords(lowerMessage)) {
      emotionalTone = 'joyful';
    } else if (this.containsStruggleKeywords(lowerMessage)) {
      emotionalTone = 'struggling';
    }

    // Analyze urgency level
    let urgencyLevel: ConversationContext['urgencyLevel'] = 'low';
    if (this.containsCrisisKeywords(lowerMessage)) {
      urgencyLevel = 'crisis';
    } else if (this.containsHighUrgencyKeywords(lowerMessage)) {
      urgencyLevel = 'high';
    } else if (this.containsModerateUrgencyKeywords(lowerMessage)) {
      urgencyLevel = 'moderate';
    }

    // Determine topic category
    const topicCategory = this.categorizeMessage(lowerMessage);

    return {
      emotionalTone,
      urgencyLevel,
      topicCategory,
      previousGuidanceThemes: [],
      spiritualSeasonAlignment: true
    };
  }

  static assessSpiritualMaturity(conversationHistory: any[], userProfile: any): SpiritualProfile['spiritualMaturity'] {
    // Analyze conversation patterns to assess spiritual maturity
    if (!conversationHistory.length) return 'beginner';
    
    const matureIndicators = [
      'contemplation', 'mystical', 'dark night', 'spiritual dryness',
      'discernment of spirits', 'detachment', 'union with God'
    ];
    
    const growingIndicators = [
      'prayer life', 'spiritual reading', 'examination of conscience',
      'virtue', 'sacraments', 'devotions'
    ];

    const conversationText = conversationHistory
      .map(conv => conv.user_message + ' ' + conv.sister_grace_response)
      .join(' ')
      .toLowerCase();

    const matureCount = matureIndicators.filter(indicator => 
      conversationText.includes(indicator)
    ).length;

    const growingCount = growingIndicators.filter(indicator => 
      conversationText.includes(indicator)
    ).length;

    if (matureCount >= 3) return 'advanced';
    if (matureCount >= 1 || growingCount >= 3) return 'mature';
    if (growingCount >= 1) return 'growing';
    return 'beginner';
  }

  static generatePersonalizedGuidance(
    userMessage: string,
    spiritualProfile: Partial<SpiritualProfile>,
    context: ConversationContext,
    liturgicalSeason: string
  ): string {
    let guidance = '';

    // Adjust response based on spiritual maturity
    switch (spiritualProfile.spiritualMaturity) {
      case 'beginner':
        guidance += 'As you begin this beautiful journey of faith, ';
        break;
      case 'growing':
        guidance += 'I can see your heart is growing in love for our Lord, ';
        break;
      case 'mature':
        guidance += 'Your deepening relationship with Christ is evident, ';
        break;
      case 'advanced':
        guidance += 'In your advanced spiritual journey, ';
        break;
    }

    // Adjust for emotional tone
    switch (context.emotionalTone) {
      case 'distressed':
        guidance += 'I sense the weight you\'re carrying. Let us turn to the Heart of Jesus for comfort. ';
        break;
      case 'questioning':
        guidance += 'Your questions show a seeking heart, which God treasures. ';
        break;
      case 'joyful':
        guidance += 'What a blessing to share in your joy! ';
        break;
      case 'struggling':
        guidance += 'In your struggle, remember that even the saints faced difficulties. ';
        break;
    }

    // Add urgency-appropriate response
    if (context.urgencyLevel === 'crisis') {
      guidance += 'This is a moment that calls for immediate prayer and possibly professional support. ';
    }

    return guidance;
  }

  private static containsDistressKeywords(message: string): boolean {
    const keywords = [
      'anxious', 'worried', 'scared', 'afraid', 'panic', 'overwhelmed',
      'depressed', 'sad', 'hopeless', 'desperate', 'crying', 'tears'
    ];
    return keywords.some(keyword => message.includes(keyword));
  }

  private static containsQuestioningKeywords(message: string): boolean {
    const keywords = [
      'why', 'how', 'what', 'when', 'where', 'doubt', 'question',
      'understand', 'confused', 'unclear', 'wondering'
    ];
    return keywords.some(keyword => message.includes(keyword));
  }

  private static containsJoyfulKeywords(message: string): boolean {
    const keywords = [
      'happy', 'joyful', 'blessed', 'grateful', 'thankful', 'celebration',
      'wonderful', 'amazing', 'miracle', 'grace'
    ];
    return keywords.some(keyword => message.includes(keyword));
  }

  private static containsStruggleKeywords(message: string): boolean {
    const keywords = [
      'struggle', 'difficult', 'hard', 'challenging', 'temptation',
      'sin', 'weakness', 'failing', 'falling'
    ];
    return keywords.some(keyword => message.includes(keyword));
  }

  private static containsCrisisKeywords(message: string): boolean {
    const keywords = [
      'suicide', 'kill myself', 'end it all', 'can\'t go on',
      'emergency', 'crisis', 'urgent', 'help me'
    ];
    return keywords.some(keyword => message.includes(keyword));
  }

  private static containsHighUrgencyKeywords(message: string): boolean {
    const keywords = [
      'urgent', 'emergency', 'immediate', 'right now', 'asap',
      'desperate', 'critical', 'serious'
    ];
    return keywords.some(keyword => message.includes(keyword));
  }

  private static containsModerateUrgencyKeywords(message: string): boolean {
    const keywords = [
      'soon', 'quickly', 'important', 'need help', 'struggling',
      'difficult time', 'going through'
    ];
    return keywords.some(keyword => message.includes(keyword));
  }

  private static categorizeMessage(message: string): string {
    const categories = {
      'Prayer & Spirituality': ['prayer', 'spiritual', 'contemplation', 'meditation', 'devotion'],
      'Faith & Doubt': ['faith', 'doubt', 'belief', 'question', 'why god'],
      'Relationships': ['marriage', 'family', 'children', 'spouse', 'relationship'],
      'Work & Career': ['work', 'job', 'career', 'employment', 'business'],
      'Health & Healing': ['sick', 'illness', 'healing', 'health', 'disease'],
      'Grief & Loss': ['death', 'died', 'grief', 'loss', 'funeral'],
      'Mental Health': ['anxiety', 'depression', 'stress', 'mental health'],
      'Moral & Ethical': ['sin', 'temptation', 'conscience', 'right', 'wrong'],
      'Vocation & Purpose': ['vocation', 'calling', 'purpose', 'discernment'],
      'Sacraments': ['mass', 'communion', 'confession', 'baptism', 'marriage']
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        return category;
      }
    }

    return 'General Spiritual Guidance';
  }
}

export class LiturgicalSeasonGuidance {
  static getSeasonalWisdom(season: string, userContext: ConversationContext): string {
    const seasonalGuidance = {
      'Advent': {
        theme: 'Preparation and Hope',
        wisdom: 'This season of waiting teaches us patience and trust in God\'s timing.',
        practices: ['Advent wreath prayers', 'Jesse Tree devotion', 'Almsgiving'],
        scripture: 'Isaiah 40:31 - "They that hope in the Lord will renew their strength"'
      },
      'Christmas': {
        theme: 'Joy and Incarnation',
        wisdom: 'God became man to show us the depth of His love.',
        practices: ['Nativity meditation', 'Christmas novenas', 'Acts of charity'],
        scripture: 'John 1:14 - "The Word became flesh and dwelt among us"'
      },
      'Lent': {
        theme: 'Penance and Conversion',
        wisdom: 'This is a time for spiritual spring cleaning and drawing closer to Christ.',
        practices: ['Fasting', 'Almsgiving', 'Prayer', 'Stations of the Cross'],
        scripture: 'Joel 2:12 - "Return to me with all your heart"'
      },
      'Easter': {
        theme: 'Resurrection and New Life',
        wisdom: 'Christ\'s victory over death gives us hope in all our struggles.',
        practices: ['Regina Caeli', 'Divine Mercy devotion', 'Joyful mysteries'],
        scripture: '1 Corinthians 15:20 - "Christ has been raised from the dead"'
      },
      'Ordinary Time': {
        theme: 'Growth in Holiness',
        wisdom: 'In the ordinary moments, we find extraordinary grace.',
        practices: ['Daily Mass', 'Lectio Divina', 'Works of mercy'],
        scripture: 'Matthew 11:28 - "Come to me, all you who are weary"'
      }
    };

    const guidance = seasonalGuidance[season as keyof typeof seasonalGuidance];
    if (!guidance) return '';

    return `During this ${season} season of ${guidance.theme}, ${guidance.wisdom} Consider embracing ${guidance.practices.join(', ')} as spiritual practices. Remember: ${guidance.scripture}`;
  }

  static getSaintForSeason(season: string, userNeed: string): string {
    const seasonalSaints = {
      'Advent': ['St. John the Baptist', 'Our Lady of Guadalupe', 'St. Nicholas'],
      'Christmas': ['St. Stephen', 'Holy Innocents', 'St. John the Evangelist'],
      'Lent': ['St. Joseph', 'St. Patrick', 'St. Katharine Drexel'],
      'Easter': ['St. Mark', 'St. Catherine of Siena', 'St. Joseph the Worker'],
      'Ordinary Time': ['St. Anthony of Padua', 'St. Francis of Assisi', 'St. Thérèse of Lisieux']
    };

    const saints = seasonalSaints[season as keyof typeof seasonalSaints] || [];
    return saints.length > 0 ? saints[Math.floor(Math.random() * saints.length)] : 'St. Thérèse of Lisieux';
  }
}

export class CatholicTeachingReference {
  static getCatechismReference(topic: string): string {
    const references = {
      'prayer': 'CCC 2558-2865: Prayer is the raising of one\'s mind and heart to God',
      'faith': 'CCC 150-184: Faith is man\'s response to God who reveals himself',
      'hope': 'CCC 1817-1821: Hope is the theological virtue by which we desire heaven',
      'love': 'CCC 1822-1829: Charity is the theological virtue by which we love God',
      'marriage': 'CCC 1601-1666: Marriage is a covenant between a man and woman',
      'family': 'CCC 2201-2233: The family is the original cell of social life',
      'work': 'CCC 2426-2436: Work is a duty and a right for every person',
      'suffering': 'CCC 1500-1532: Christ\'s compassion toward the sick',
      'death': 'CCC 1681-1690: The Christian meaning of death',
      'sin': 'CCC 1846-1876: Sin is an offense against reason, truth, and right conscience'
    };

    for (const [key, reference] of Object.entries(references)) {
      if (topic.toLowerCase().includes(key)) {
        return reference;
      }
    }

    return '';
  }

  static getEncyclicalWisdom(topic: string): string {
    const encyclicals = {
      'social justice': 'Rerum Novarum: The Church\'s concern for workers and social justice',
      'environment': 'Laudato Si\': Care for our common home and environmental stewardship',
      'family': 'Amoris Laetitia: The joy of love in family life',
      'mercy': 'Dives in Misericordia: God\'s mercy and compassion',
      'faith': 'Lumen Fidei: The light of faith in the modern world',
      'hope': 'Spe Salvi: Christian hope in a troubled world',
      'love': 'Deus Caritas Est: God is love and the foundation of Christian life'
    };

    for (const [key, wisdom] of Object.entries(encyclicals)) {
      if (topic.toLowerCase().includes(key)) {
        return wisdom;
      }
    }

    return '';
  }
}

