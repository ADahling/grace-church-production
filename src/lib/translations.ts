export type Language = "en" | "es" | "fr" | "it" | "pt" | "la";

export interface Translation {
  // Navigation
  nav: {
    home: string;
    prayers: string;
    divineOffice: string;
    meditations: string;
    saints: string;
    confession: string;
    calendar: string;
    journal: string;
    community: string;
    about: string;
    faq: string;
    contact: string;
    hospice: string;
  };

  auth: {
    signIn: string;
    signOut: string;
    joinFree: string;
    welcomeBack: string;
    toggleMobileMenu: string;
    dashboard: string;
  };

  // Homepage
  home: {
    title: string;
    subtitle: string;
    description: string;
    comingSoon: string;
    comingSoonDescription: string;
    earlyAccessDescription: string;
    emailPlaceholder: string;
    notifyMe: string;
    nurtureSoul: string;
    letFaithFlourish: string;
    personalizedPrayers: string;
    personalizedPrayersDesc: string;
    sacredMeditations: string;
    sacredMeditationsDesc: string;
    globalCommunity: string;
    globalCommunityDesc: string;
    globalCatholics: string;
    prayingNow: string;
    countries: string;
    spiritualCare: string;
    beginJourney: string;
    joinDescription: string;
    startPraying: string;
    joinThousands: string;
    beginJourneyButton: string;
    learnStoryButton: string;
    saintsMessages: string;
    dailySpiritualWisdom: string;
    popularModernSaints: string;
    dailySpiritualMessages: string;
    // Features section
    spiritualJourneyBegins: string;
    guidedByEssie: string;
    prayerHub: string;
    prayerHubDesc: string;
    liturgyOfHours: string;
    liturgyOfHoursDesc: string;
    sacredMeditationsFeature: string;
    sacredMeditationsFeatureDesc: string;
    // Bible quote
    bibleQuote: string;
    bibleReference: string;
  };

  // Common elements
  common: {
    readMore: string;
    close: string;
    save: string;
    share: string;
    favorite: string;
    play: string;
    pause: string;
    prayer: string;
    meditation: string;
    blessing: string;
    loading: string;
    error: string;
    success: string;
    getStarted: string;
    learnMore: string;
    joinCommunity: string;
  };

  // Chatbot
  chatbot: {
    title: string;
    subtitle: string;
    placeholder: string;
    askQuestion: string;
    suggestions: string[];
    thinking: string;
    welcome: string;
    send: string;
    quickTopics: string;
    shareHeart: string;
    guidanceDescription: string;
    chatWith: string;
    typing: string;
    saintRecommendations: string;
    scriptureReflection: string;
  };

  confession: {
    title: string;
    subtitle: string;
    pageTitle: string;
    pageSubtitle: string;
    examinationProgress: string;
    complete: string;
    introduction: string;
    examination: string;
    prayers: string;
    preparation: string;
    welcomeTitle: string;
    welcomeText: string;
    essieGuidanceTitle: string;
    essieGuidanceText: string;
    whatYoullDo: string;
    timeNeeded: string;
    examineConscience: string;
    reflectRelationship: string;
    preparePrayers: string;
    receiveGuidance: string;
    examination10to15: string;
    prayerPrep5: string;
    spiritualReflection5to10: string;
    totalTime: string;
    beginExamination: string;
    categories: {
      loveOfGod: string;
      loveOfNeighbor: string;
      purityAndChastity: string;
      socialJustice: string;
    };
    commandments: {
      firstThree: string;
      fourthThroughTenth: string;
      sixthAndNinth: string;
      seventhAndTenth: string;
    };
    questions: {
      massAttendance: string;
      holyCommunion: string;
      godsName: string;
      catholicFaith: string;
      prayerLife: string;
      falseGods: string;
      honorParents: string;
      selfishFamily: string;
      hatred: string;
      gossip: string;
      honesty: string;
      envy: string;
      impurity: string;
      inappropriateMaterial: string;
      modesty: string;
    };
  };

  dashboard: {
    welcome: string;
    subtitle: string;
    featuredPrayers: string;
    recentActivity: string;
    quickActions: string;
    yourJourney: string;
    prayersThisWeek: string;
    spiritualLevel: string;
    daysActive: string;
    growing: string;
    loadingJourney: string;
    noPrayersYet: string;
    startPrayerJourney: string;
    browseAllPrayers: string;
    discoverSaints: string;
    spiritualJournal: string;
    liturgicalCalendar: string;
    prayNow: string;
    signOut: string;
    welcome2: string;
    minutes: string;
  };

  notFound: {
    pageNotFound: string;
    wanderMessage: string;
    psalm23: string;
    psalmReference: string;
    messageFromEssie: string;
    essieMessage: string;
    returnToGrace: string;
    findPeaceInPrayer: string;
    sacredContemplation: string;
    heavenlyIntercession: string;
    needSpiritualSupport: string;
    difficultTimeMessage: string;
    contactEssie: string;
    emergencyPrayers: string;
    returnToGraceButton: string;
    learnAboutMission: string;
    home: string;
    prayers: string;
    meditations: string;
    saints: string;
  };

  audioPlayer: {
    types: {
      prayer: string;
      meditation: string;
      blessing: string;
      scripture: string;
      chant: string;
      silence: string;
      audio: string;
    };
    aiGenerated: string;
    sacredSilence: string;
  };

  // Footer
  footer: {
    about: string;
    mission: string;
    contact: string;
    hospice: string;
    support: string;
    legal: string;
    privacy: string;
    terms: string;
    cookies: string;
    copyright: string;
    foundedWithLove: string;
    quickLinks: string;
    spiritualLife: string;
    availableLanguages: string;
    spiritualSupport: string;
    missionDescription: string;
    madeWithLove: string;
  };

  saints: {
    title: string;
    description: string;
    biography: string;
    availableLanguages: string;
    essiesReflection: string;
    prayerTo: string;
    addToMySaints: string;
    beginNovena: string;
    dailyMessages: string;
    messageFrom: string;
    scripture: string;
    todaysAction: string;
    learnAndPray: string;
    essiesSaintForToday: string;
    prayWithStTherese: string;
    moreFromEssie: string;
    patronOf: string;
    feastDay: string;
    amen: string;
  };

  prayers: {
    title: string;
    description: string;
    essiesGuidance: string;
    audioPrayerOptions: string;
    spokenPrayer: string;
    gregorianChant: string;
    silentReflection: string;
    saveToFavorites: string;
    beginPrayerSession: string;
    beginPrayer: string;
    essiesPrayerForToday: string;
    prayTheRosaryToday: string;
    moreFromEssie: string;
    guidanceText: string;
    rosaryRecommendation: string;
  };

  dailyMessage: {
    title: string;
    compactTitle: string;
    fromSaint: string;
    scriptureToday: string;
    reflection: string;
    personalizePrompt: string;
    getPersonalized: string;
    personalizedNote: string;
    showLess: string;
    readMore: string;
    tryAgain: string;
    cached: string;
    fresh: string;
    refreshTitle: string;
    loginPrompt: string;
    errorFetch: string;
    errorPersonalized: string;
  };
}

export const translations: Record<Language, Translation> = {
  en: {
    nav: {
      home: "Home",
      prayers: "Prayers",
      divineOffice: "Divine Office",
      meditations: "Meditations",
      saints: "Saints",
      confession: "Confession",
      calendar: "Calendar",
      journal: "Journal",
      community: "Community",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
      hospice: "Hospice Care",
    },
    auth: {
      signIn: "Sign in",
      signOut: "Sign out",
      joinFree: "Join Free",
      welcomeBack: "Welcome back",
      toggleMobileMenu: "Toggle mobile menu",
      dashboard: "Dashboard",
    },
    home: {
      title: "Grace",
      subtitle: "AI-Powered Catholic Spiritual Wellness",
      description:
        "Discover deeper faith through personalized prayers, sacred meditations, and spiritual guidance rooted in Catholic tradition. Join thousands of Catholics worldwide in growing closer to God.",
      comingSoon: "Coming Soon",
      comingSoonDescription:
        "We're creating something beautiful for your spiritual journey.",
      earlyAccessDescription:
        "Be among the first to experience Grace when we launch.",
      emailPlaceholder: "Enter your email for early access",
      notifyMe: "Notify Me",
      nurtureSoul: "Nurture Your Soul",
      letFaithFlourish: "Let Your Faith Flourish",
      personalizedPrayers: "Personalized Prayers",
      personalizedPrayersDesc:
        "AI-crafted prayers tailored to your spiritual needs and Catholic devotions",
      sacredMeditations: "Sacred Meditations",
      sacredMeditationsDesc:
        "Contemplative practices inspired by Catholic mystics and saints",
      globalCommunity: "Global Community",
      globalCommunityDesc:
        "Connect with Catholics worldwide for prayer, support, and spiritual growth",
      globalCatholics: "Global Catholics",
      prayingNow: "Praying Now",
      countries: "Countries",
      spiritualCare: "Spiritual Care",
      beginJourney: "Begin Your Sacred Journey",
      joinDescription:
        "Join thousands of Catholics worldwide in deepening their faith through personalized spiritual guidance",
      startPraying: "Start Praying 🙏",
      joinThousands:
        "Join thousands of Catholics worldwide in a digital grace where faith meets technology and tradition guides transformation",
      beginJourneyButton: "Begin Your Journey 🌟",
      learnStoryButton: "Learn Our Story 📖",
      saintsMessages: "Saints & Messages",
      dailySpiritualWisdom:
        "Daily spiritual wisdom from Catholic saints with multilingual support and Essie's personal reflections",
      popularModernSaints: "Popular & Modern Saints",
      dailySpiritualMessages: "Daily Spiritual Messages",
      // Features section
      spiritualJourneyBegins: "Your Spiritual Journey Begins",
      guidedByEssie: "Guided by Essie's wisdom and Catholic tradition, discover the tools to deepen your faith",
      prayerHub: "Prayer Hub",
      prayerHubDesc: "Traditional Catholic prayers, complete Rosary with all mysteries, and Divine Mercy devotions guided by Essie",
      liturgyOfHours: "Liturgy of the Hours",
      liturgyOfHoursDesc: "Complete Divine Office with live community prayer counter and authentic Catholic liturgical traditions",
      sacredMeditationsFeature: "Sacred Meditations",
      sacredMeditationsFeatureDesc: "Catholic contemplative practices including Lectio Divina, Eucharistic Adoration, and Ignatian spirituality",
      // Bible quote
      bibleQuote: "Behold, I stand at the door and knock. If anyone hears My voice, and opens the door, I will come unto him and dine with him and he with Me.",
      bibleReference: "Revelation 3:20",
    },
    common: {
      readMore: "Read More",
      close: "Close",
      save: "Save",
      share: "Share",
      favorite: "Favorite",
      play: "Play",
      pause: "Pause",
      prayer: "Prayer",
      meditation: "Meditation",
      blessing: "Blessing",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      getStarted: "Get Started",
      learnMore: "Learn More",
      joinCommunity: "Join Community",
    },
    chatbot: {
      title: "Sister Grace",
      subtitle: "Your AI Spiritual Companion",
      placeholder: "Ask me about prayers, scripture, or spiritual guidance...",
      askQuestion: "Ask Question",
      suggestions: [
        "How can I deepen my prayer life?",
        "What saint can help with anxiety?",
        "Teach me about Lectio Divina",
        "I need prayers for healing",
        "How do I find peace in suffering?",
      ],
      thinking: "Sister Grace is reflecting...",
      welcome:
        "Peace be with you! I'm Sister Grace, your AI spiritual companion. How can I help you grow closer to God today?",
      send: "Send",
      quickTopics: "Quick topics to explore:",
      shareHeart: "Share what's on your heart...",
      guidanceDescription:
        "Sister Grace provides spiritual guidance rooted in Catholic tradition",
      chatWith: "Chat with Sister Grace",
      typing: "Sister Grace is typing...",
      saintRecommendations: "Saint Recommendations:",
      scriptureReflection: "Scripture for Reflection:",
    },
    confession: {
      title: "Examination of Conscience",
      subtitle: "Prepare your heart for the Sacrament of Reconciliation",
      pageTitle: "Confession Preparation",
      pageSubtitle:
        "Prepare your heart for the Sacrament of Reconciliation with guided examination of conscience and Catholic prayers",
      examinationProgress: "Examination Progress",
      complete: "Complete",
      introduction: "Introduction",
      examination: "Examination",
      prayers: "Prayers",
      preparation: "Preparation",
      welcomeTitle: "Welcome to Confession Preparation",
      welcomeText:
        "The Sacrament of Reconciliation is one of the most beautiful gifts God has given us through His Church. It's an opportunity to experience God's infinite mercy and return to a state of grace.",
      essieGuidanceTitle: "✝️ Essie's Spiritual Guidance",
      essieGuidanceText:
        "Approach the confessional not with fear, but with the joy of a child running to their loving Father. God's mercy is greater than any sin, and His love never fails. Let this preparation open your heart to receive the abundant grace awaiting you.",
      whatYoullDo: "📚 What You'll Do",
      timeNeeded: "⏰ Time Needed",
      examineConscience: "• Examine your conscience",
      reflectRelationship: "• Reflect on your relationship with God",
      preparePrayers: "• Prepare prayers for confession",
      receiveGuidance: "• Receive guidance for your spiritual journey",
      examination10to15: "• Examination: 10-15 minutes",
      prayerPrep5: "• Prayer preparation: 5 minutes",
      spiritualReflection5to10: "• Spiritual reflection: 5-10 minutes",
      totalTime: "• Total: About 20-30 minutes",
      beginExamination: "Begin Examination of Conscience 🙏",
      categories: {
        loveOfGod: "Love of God",
        loveOfNeighbor: "Love of Neighbor",
        purityAndChastity: "Purity and Chastity",
        socialJustice: "Social Justice",
      },
      commandments: {
        firstThree: "First Three Commandments",
        fourthThroughTenth: "Fourth through Tenth Commandments",
        sixthAndNinth: "Sixth and Ninth Commandments",
        seventhAndTenth: "Seventh and Tenth Commandments",
      },
      questions: {
        massAttendance:
          "Have I attended Mass on Sundays and Holy Days of Obligation?",
        holyCommunion:
          "Have I received Holy Communion in a state of mortal sin?",
        godsName: "Have I used God's name in vain or sworn falsely?",
        catholicFaith:
          "Have I practiced my Catholic faith openly and without shame?",
        prayerLife:
          "Have I prayed regularly and made time for God in my daily life?",
        falseGods:
          "Have I put other things before God (money, power, pleasure)?",
        honorParents: "Have I honored my parents and those in authority?",
        selfishFamily: "Have I been selfish or unkind to my family members?",
        hatred: "Have I harbored hatred, anger, or resentment toward others?",
        gossip: "Have I gossiped, lied, or damaged someone's reputation?",
        honesty: "Have I been honest in my work and business dealings?",
        envy: "Have I been envious or jealous of others' possessions or success?",
        impurity: "Have I committed sins of impurity alone or with another?",
        inappropriateMaterial:
          "Have I viewed inappropriate material or entertainment?",
        modesty:
          "Have I dressed modestly and treated my body as a temple of the Holy Spirit?",
      },
    },
    dashboard: {
      welcome: "Peace be with you",
      subtitle:
        "Continue your spiritual journey with prayer, reflection, and community.",
      featuredPrayers: "Featured Prayers",
      recentActivity: "Recent Prayer Activity",
      quickActions: "Quick Actions",
      yourJourney: "Your Journey",
      prayersThisWeek: "Prayers this week:",
      spiritualLevel: "Spiritual level:",
      daysActive: "Days active:",
      growing: "Growing",
      loadingJourney: "Loading your spiritual journey...",
      noPrayersYet: "No prayers recorded yet",
      startPrayerJourney: "Start your prayer journey above!",
      browseAllPrayers: "→ Browse All Prayers",
      discoverSaints: "→ Discover Saints",
      spiritualJournal: "→ Spiritual Journal",
      liturgicalCalendar: "→ Liturgical Calendar",
      prayNow: "Pray Now",
      signOut: "Sign Out",
      welcome2: "Welcome",
      minutes: "minutes",
    },
    notFound: {
      pageNotFound: "Page Not Found",
      wanderMessage:
        "Sometimes we wander off the path, but God always guides us back home.",
      psalm23:
        "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul.",
      psalmReference: "— Psalm 23:1-3",
      messageFromEssie: "A Message from Essie",
      essieMessage:
        "Dear soul, every detour in life can lead us closer to God if we let it. This moment of being 'lost' online reminds us that our true destination is always the Sacred Heart of Jesus. Let me help guide you back to where you need to be in Grace.",
      returnToGrace: "Return to grace",
      findPeaceInPrayer: "Find peace in prayer",
      sacredContemplation: "Sacred contemplation",
      heavenlyIntercession: "Heavenly intercession",
      needSpiritualSupport: "Need Immediate Spiritual Support?",
      difficultTimeMessage:
        "If you're going through a difficult time and need prayer or spiritual guidance right away:",
      contactEssie: "Contact Essie",
      emergencyPrayers: "Emergency Prayers",
      returnToGraceButton: "Return to Grace",
      learnAboutMission: "Learn About Our Mission",
      home: "Home",
      prayers: "Prayers",
      meditations: "Meditations",
      saints: "Saints",
    },
    audioPlayer: {
      types: {
        prayer: "Prayer",
        meditation: "Meditation",
        blessing: "Blessing",
        scripture: "Scripture",
        chant: "Gregorian Chant",
        silence: "Silent Reflection",
        audio: "Audio",
      },
      aiGenerated: "AI-Generated Audio Available",
      sacredSilence: "Sacred Silence",
    },
    footer: {
      about: "About",
      mission: "Mission",
      contact: "Contact",
      hospice: "Hospice Care",
      support: "Support",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookies: "Cookie Policy",
      copyright: "© 2025 Grace. All rights reserved.",
      foundedWithLove: "Founded with ❤️ by Essie",
      quickLinks: "Quick Links",
      spiritualLife: "Spiritual Life",
      availableLanguages: "Available in 6 languages 🌍",
      spiritualSupport: "24/7 Spiritual Support ⛪",
      missionDescription:
        "Deepening Catholic faith through AI-powered spiritual guidance",
      madeWithLove: "Made with prayer & love",
    },
    saints: {
      title: "Saints & Spiritual Messages",
      description:
        "Discover the wisdom of the saints through Essie's guidance, receiving daily spiritual messages and devotions in multiple languages.",
      biography: "Biography",
      availableLanguages: "Available Languages",
      essiesReflection: "Essie's Reflection",
      prayerTo: "Prayer to",
      addToMySaints: "Add to My Saints",
      beginNovena: "Begin Novena",
      dailyMessages: "Daily Messages from the Saints",
      messageFrom: "Message from",
      scripture: "Scripture:",
      todaysAction: "Today's Action:",
      learnAndPray: "Learn & Pray",
      essiesSaintForToday: "Essie's Saint for Today",
      prayWithStTherese: "Pray with St. Thérèse",
      moreFromEssie: "More from Essie",
      patronOf: "Patron of",
      feastDay: "Feast Day:",
      amen: "Amen.",
    },
    prayers: {
      title: "Prayer Hub",
      description:
        "Traditional Catholic prayers lovingly guided by Essie to deepen your relationship with God.",
      essiesGuidance: "Essie's Guidance",
      audioPrayerOptions: "🎵 Audio Prayer Options",
      spokenPrayer: "Spoken Prayer",
      gregorianChant: "Gregorian Chant",
      silentReflection: "Silent Reflection",
      saveToFavorites: "Save to Favorites",
      beginPrayerSession: "Begin Prayer Session",
      beginPrayer: "Begin Prayer",
      essiesPrayerForToday: "Essie's Prayer for Today",
      prayTheRosaryToday: "Pray the Rosary Today",
      moreFromEssie: "More from Essie",
      guidanceText:
        "Take a moment to center yourself before God. Breathe deeply and open your heart to receive His grace through this sacred prayer. Let the words flow from your soul, not just your lips.",
      rosaryRecommendation:
        "Today, I encourage you to spend extra time with the Rosary. Our Lady is always ready to intercede for us and guide us closer to her Son. Let the repetitive prayers quiet your mind and open your heart to God's peace.",
    },
    dailyMessage: {
      title: "Daily Inspiration",
      compactTitle: "Today's Inspiration",
      fromSaint: "From",
      scriptureToday: "Scripture for Today:",
      reflection: "Reflection:",
      personalizePrompt: "Want a message tailored to your spiritual journey?",
      getPersonalized: "Get Personalized Message",
      personalizedNote:
        "✨ This message was personalized for your spiritual journey",
      showLess: "Show Less",
      readMore: "Read More",
      tryAgain: "Try again",
      cached: "Cached",
      fresh: "Fresh",
      refreshTitle: "Refresh message",
      loginPrompt: "Please log in to get personalized messages",
      errorFetch: "Failed to fetch daily message",
      errorPersonalized: "Failed to generate personalized message",
    },
  },

  es: {
    nav: {
      home: "Inicio",
      prayers: "Oraciones",
      divineOffice: "Oficio Divino",
      meditations: "Meditaciones",
      saints: "Santos",
      confession: "Confesión",
      calendar: "Calendario",
      journal: "Diario",
      community: "Comunidad",
      about: "Acerca de",
      faq: "Preguntas",
      contact: "Contacto",
      hospice: "Cuidados Paliativos",
    },
    auth: {
      signIn: "Iniciar sesión",
      signOut: "Cerrar sesión",
      joinFree: "Únete Gratis",
      welcomeBack: "Bienvenido de nuevo",
      toggleMobileMenu: "Alternar menú móvil",
      dashboard: "Panel de control",
    },
    home: {
      title: "Gracia",
      subtitle: "Bienestar Espiritual Católico con IA",
      description:
        "Descubre una fe más profunda a través de oraciones personalizadas, meditaciones sagradas y orientación espiritual arraigada en la tradición católica. Únete a miles de católicos en todo el mundo para acercarte más a Dios.",
      comingSoon: "Próximamente",
      comingSoonDescription:
        "Estamos creando algo hermoso para tu camino espiritual.",
      earlyAccessDescription:
        "Sé de los primeros en experimentar Gracia cuando lancemos.",
      emailPlaceholder: "Ingresa tu email para acceso temprano",
      notifyMe: "Notificarme",
      nurtureSoul: "Nutre Tu Alma",
      letFaithFlourish: "Deja Que Tu Fe Florezca",
      personalizedPrayers: "Oraciones Personalizadas",
      personalizedPrayersDesc:
        "Oraciones creadas por IA adaptadas a tus necesidades espirituales y devociones católicas",
      sacredMeditations: "Meditaciones Sagradas",
      sacredMeditationsDesc:
        "Prácticas contemplativas inspiradas en místicos y santos católicos",
      globalCommunity: "Comunidad Global",
      globalCommunityDesc:
        "Conéctate con católicos de todo el mundo para oración, apoyo y crecimiento espiritual",
      globalCatholics: "Católicos Globales",
      prayingNow: "Orando Ahora",
      countries: "Países",
      spiritualCare: "Cuidado Espiritual",
      beginJourney: "Comienza Tu Camino Sagrado",
      joinDescription:
        "Únete a miles de católicos en todo el mundo para profundizar su fe a través de orientación espiritual personalizada",
      startPraying: "Comenzar a Orar 🙏",
      joinThousands:
        "Únete a miles de católicos en todo el mundo en un santuario digital donde la fe se encuentra con la tecnología y la tradición guía la transformación",
      beginJourneyButton: "Comienza Tu Camino 🌟",
      learnStoryButton: "Conoce Nuestra Historia 📖",
      saintsMessages: "Santos y Mensajes",
      dailySpiritualWisdom:
        "Sabiduría espiritual diaria de santos católicos con soporte multilingüe y reflexiones personales de Essie",
      popularModernSaints: "Santos Populares y Modernos",
      dailySpiritualMessages: "Mensajes Espirituales Diarios",
      // Features section
      spiritualJourneyBegins: "Tu Viaje Espiritual Comienza",
      guidedByEssie: "Guiado por la sabiduría de Essie y la tradición católica, descubre las herramientas para profundizar tu fe",
      prayerHub: "Centro de Oración",
      prayerHubDesc: "Oraciones católicas tradicionales, Rosario completo con todos los misterios, y devociones de la Divina Misericordia guiadas por Essie",
      liturgyOfHours: "Liturgia de las Horas",
      liturgyOfHoursDesc: "Oficio Divino completo con contador de oración comunitaria en vivo y tradiciones litúrgicas católicas auténticas",
      sacredMeditationsFeature: "Meditaciones Sagradas",
      sacredMeditationsFeatureDesc: "Prácticas contemplativas católicas incluyendo Lectio Divina, Adoración Eucarística, y espiritualidad ignaciana",
      // Bible quote
      bibleQuote: "He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él, y cenaré con él, y él conmigo.",
      bibleReference: "Apocalipsis 3:20",
    },
    common: {
      readMore: "Leer Más",
      close: "Cerrar",
      save: "Guardar",
      share: "Compartir",
      favorite: "Favorito",
      play: "Reproducir",
      pause: "Pausar",
      prayer: "Oración",
      meditation: "Meditación",
      blessing: "Bendición",
      loading: "Cargando...",
      error: "Error",
      success: "Éxito",
      getStarted: "Comenzar",
      learnMore: "Aprender Más",
      joinCommunity: "Unirse a la Comunidad",
    },
    chatbot: {
      title: "Hermana Gracia",
      subtitle: "Tu Compañera Espiritual con IA",
      placeholder:
        "Pregúntame sobre oraciones, escrituras o guía espiritual...",
      askQuestion: "Hacer Pregunta",
      suggestions: [
        "¿Cómo puedo profundizar mi vida de oración?",
        "¿Qué santo puede ayudar con la ansiedad?",
        "Enséñame sobre la Lectio Divina",
        "Necesito oraciones para sanación",
        "¿Cómo encuentro paz en el sufrimiento?",
      ],
      thinking: "Hermana Gracia está reflexionando...",
      welcome:
        "¡La paz sea contigo! Soy Hermana Gracia, tu compañera espiritual con IA. ¿Cómo puedo ayudarte a acercarte más a Dios hoy?",
      send: "Enviar",
      quickTopics: "Temas rápidos para explorar:",
      shareHeart: "Comparte lo que está en tu corazón...",
      guidanceDescription:
        "Hermana Gracia proporciona guía espiritual enraizada en la tradición católica",
      chatWith: "Chatear con Hermana Gracia",
      typing: "Hermana Gracia está escribiendo...",
      saintRecommendations: "Recomendaciones de Santos:",
      scriptureReflection: "Escritura para Reflexión:",
    },
    confession: {
      title: "Examen de Conciencia",
      subtitle: "Prepara tu corazón para el Sacramento de la Reconciliación",
      pageTitle: "Preparación para la Confesión",
      pageSubtitle:
        "Prepara tu corazón para el Sacramento de la Reconciliación con examen de conciencia guiado y oraciones católicas",
      examinationProgress: "Progreso del Examen",
      complete: "Completo",
      introduction: "Introducción",
      examination: "Examen",
      prayers: "Oraciones",
      preparation: "Preparación",
      welcomeTitle: "Bienvenido a la Preparación para la Confesión",
      welcomeText:
        "El Sacramento de la Reconciliación es uno de los regalos más hermosos que Dios nos ha dado a través de Su Iglesia. Es una oportunidad para experimentar la misericordia infinita de Dios y volver a un estado de gracia.",
      essieGuidanceTitle: "✝️ Guía Espiritual de Essie",
      essieGuidanceText:
        "Acércate al confesionario no con miedo, sino con la alegría de un niño corriendo hacia su Padre amoroso. La misericordia de Dios es mayor que cualquier pecado, y Su amor nunca falla. Deja que esta preparación abra tu corazón para recibir la gracia abundante que te espera.",
      whatYoullDo: "📚 Lo que Harás",
      timeNeeded: "⏰ Tiempo Necesario",
      examineConscience: "• Examinar tu conciencia",
      reflectRelationship: "• Reflexionar sobre tu relación con Dios",
      preparePrayers: "• Preparar oraciones para la confesión",
      receiveGuidance: "• Recibir guía para tu camino espiritual",
      examination10to15: "• Examen: 10-15 minutos",
      prayerPrep5: "• Preparación de oración: 5 minutos",
      spiritualReflection5to10: "• Reflexión espiritual: 5-10 minutos",
      totalTime: "• Total: Aproximadamente 20-30 minutos",
      beginExamination: "Comenzar Examen de Conciencia 🙏",
      categories: {
        loveOfGod: "Amor a Dios",
        loveOfNeighbor: "Amor al Prójimo",
        purityAndChastity: "Pureza y Castidad",
        socialJustice: "Justicia Social",
      },
      commandments: {
        firstThree: "Primeros Tres Mandamientos",
        fourthThroughTenth: "Cuarto al Décimo Mandamiento",
        sixthAndNinth: "Sexto y Noveno Mandamiento",
        seventhAndTenth: "Séptimo y Décimo Mandamiento",
      },
      questions: {
        massAttendance: "¿He asistido a Misa los domingos y días de precepto?",
        holyCommunion:
          "¿He recibido la Sagrada Comunión en estado de pecado mortal?",
        godsName: "¿He usado el nombre de Dios en vano o jurado en falso?",
        catholicFaith:
          "¿He practicado mi fe católica abiertamente y sin vergüenza?",
        prayerLife:
          "¿He orado regularmente y dedicado tiempo a Dios en mi vida diaria?",
        falseGods:
          "¿He puesto otras cosas antes que Dios (dinero, poder, placer)?",
        honorParents: "¿He honrado a mis padres y a quienes tienen autoridad?",
        selfishFamily:
          "¿He sido egoísta o cruel con los miembros de mi familia?",
        hatred: "¿He albergado odio, ira o resentimiento hacia otros?",
        gossip: "¿He chismeado, mentido o dañado la reputación de alguien?",
        honesty: "¿He sido honesto en mi trabajo y negocios?",
        envy: "¿He sido envidioso o celoso de las posesiones o éxito de otros?",
        impurity: "¿He cometido pecados de impureza solo o con otro?",
        inappropriateMaterial:
          "¿He visto material o entretenimiento inapropiado?",
        modesty:
          "¿Me he vestido modestamente y tratado mi cuerpo como templo del Espíritu Santo?",
      },
    },
    dashboard: {
      welcome: "La paz sea contigo",
      subtitle:
        "Continúa tu camino espiritual con oración, reflexión y comunidad.",
      featuredPrayers: "Oraciones Destacadas",
      recentActivity: "Actividad de Oración Reciente",
      quickActions: "Acciones Rápidas",
      yourJourney: "Tu Camino",
      prayersThisWeek: "Oraciones esta semana:",
      spiritualLevel: "Nivel espiritual:",
      daysActive: "Días activo:",
      growing: "Creciendo",
      loadingJourney: "Cargando tu camino espiritual...",
      noPrayersYet: "Aún no se han registrado oraciones",
      startPrayerJourney: "¡Comienza tu camino de oración arriba!",
      browseAllPrayers: "→ Explorar Todas las Oraciones",
      discoverSaints: "→ Descubrir Santos",
      spiritualJournal: "→ Diario Espiritual",
      liturgicalCalendar: "→ Calendario Litúrgico",
      prayNow: "Orar Ahora",
      signOut: "Cerrar Sesión",
      welcome2: "Bienvenido",
      minutes: "minutos",
    },
    notFound: {
      pageNotFound: "Página No Encontrada",
      wanderMessage:
        "A veces nos desviamos del camino, pero Dios siempre nos guía de vuelta a casa.",
      psalm23:
        "El Señor es mi pastor; nada me falta. En verdes praderas me hace recostar. Me conduce hacia fuentes tranquilas. Restaura mi alma.",
      psalmReference: "— Salmo 23:1-3",
      messageFromEssie: "Un Mensaje de Essie",
      essieMessage:
        "Querida alma, cada desvío en la vida puede acercarnos más a Dios si lo permitimos. Este momento de estar 'perdido' en línea nos recuerda que nuestro verdadero destino es siempre el Sagrado Corazón de Jesús. Permíteme ayudarte a guiarte de vuelta a donde necesitas estar en Gracia.",
      returnToGrace: "Regresar a la gracia",
      findPeaceInPrayer: "Encontrar paz en la oración",
      sacredContemplation: "Contemplación sagrada",
      heavenlyIntercession: "Intercesión celestial",
      needSpiritualSupport: "¿Necesitas Apoyo Espiritual Inmediato?",
      difficultTimeMessage:
        "Si estás pasando por un momento difícil y necesitas oración o guía espiritual de inmediato:",
      contactEssie: "Contactar a Essie",
      emergencyPrayers: "Oraciones de Emergencia",
      returnToGraceButton: "Regresar a la Gracia",
      learnAboutMission: "Conocer Nuestra Misión",
      home: "Inicio",
      prayers: "Oraciones",
      meditations: "Meditaciones",
      saints: "Santos",
    },
    audioPlayer: {
      types: {
        prayer: "Oración",
        meditation: "Meditación",
        blessing: "Bendición",
        scripture: "Escritura",
        chant: "Canto Gregoriano",
        silence: "Reflexión Silenciosa",
        audio: "Audio",
      },
      aiGenerated: "Audio Generado por IA Disponible",
      sacredSilence: "Silencio Sagrado",
    },
    footer: {
      about: "Acerca de",
      mission: "Misión",
      contact: "Contacto",
      hospice: "Cuidados Paliativos",
      support: "Soporte",
      legal: "Legal",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      cookies: "Política de Cookies",
      copyright: "© 2025 Gracia. Todos los derechos reservados.",
      foundedWithLove: "Fundado con ❤️ por Essie",
      quickLinks: "Enlaces Rápidos",
      spiritualLife: "Vida Espiritual",
      availableLanguages: "Disponible en 6 idiomas 🌍",
      spiritualSupport: "Soporte Espiritual 24/7 ⛪",
      missionDescription:
        "Profundizando la fe católica a través de orientación espiritual impulsada por IA",
      madeWithLove: "Hecho con oración y amor",
    },
    dailyMessage: {
      title: "Inspiración Diaria",
      compactTitle: "Inspiración de Hoy",
      fromSaint: "De",
      scriptureToday: "Escritura para Hoy:",
      reflection: "Reflexión:",
      personalizePrompt: "¿Quieres un mensaje adaptado a tu camino espiritual?",
      getPersonalized: "Obtener Mensaje Personalizado",
      personalizedNote:
        "✨ Este mensaje fue personalizado para tu camino espiritual",
      showLess: "Mostrar Menos",
      readMore: "Leer Más",
      tryAgain: "Intentar de nuevo",
      cached: "En caché",
      fresh: "Fresco",
      refreshTitle: "Actualizar mensaje",
      loginPrompt:
        "Por favor inicia sesión para obtener mensajes personalizados",
      errorFetch: "Error al cargar el mensaje diario",
      errorPersonalized: "Error al generar mensaje personalizado",
    },
    saints: {
      title: "Santos y Mensajes Espirituales",
      description:
        "Descubre la sabiduría de los santos a través de la guía de Essie, recibiendo mensajes espirituales diarios y devociones en múltiples idiomas.",
      biography: "Biografía",
      availableLanguages: "Disponible en múltiples idiomas",
      essiesReflection: "Reflexión de Essie",
      prayerTo: "Oración a",
      addToMySaints: "Agregar a Mis Santos",
      beginNovena: "Comenzar Novena",
      dailyMessages: "Mensajes Diarios",
      messageFrom: "Mensaje de",
      scripture: "Escritura",
      todaysAction: "Acción de Hoy",
      learnAndPray: "Aprender y Orar",
      essiesSaintForToday: "Santo de Essie para Hoy",
      prayWithStTherese: "Orar con Santa Teresa",
      moreFromEssie: "Más de Essie",
      patronOf: "Patrón de",
      feastDay: "Día de la Fiesta",
      amen: "Amén",
    },
    prayers: {
      title: "Centro de Oración",
      description:
        "Oraciones católicas tradicionales guiadas amorosamente por Essie para profundizar tu relación con Dios.",
      essiesGuidance: "Guía de Essie",
      audioPrayerOptions: "Opciones de Oración en Audio",
      spokenPrayer: "Oración Hablada",
      gregorianChant: "Canto Gregoriano",
      silentReflection: "Reflexión Silenciosa",
      saveToFavorites: "Guardar en Favoritos",
      beginPrayerSession: "Comenzar Sesión de Oración",
      beginPrayer: "Comenzar Oración",
      essiesPrayerForToday: "Oración de Essie para Hoy",
      prayTheRosaryToday: "Rezar el Rosario Hoy",
      moreFromEssie: "Más de Essie",
      guidanceText: "Texto de Guía",
      rosaryRecommendation: "Recomendación del Rosario",
    },
  },

  fr: {
    nav: {
      home: "Accueil",
      prayers: "Prières",
      divineOffice: "Office Divin",
      meditations: "Méditations",
      saints: "Saints",
      confession: "Confession",
      calendar: "Calendrier",
      journal: "Journal",
      community: "Communauté",
      about: "À Propos",
      faq: "FAQ",
      contact: "Contact",
      hospice: "Soins Palliatifs",
    },
    auth: {
      signIn: "Se connecter",
      signOut: "Se déconnecter",
      joinFree: "Rejoindre Gratuitement",
      welcomeBack: "Bon retour",
      toggleMobileMenu: "Basculer le menu mobile",
      dashboard: "Tableau de bord",
    },
    home: {
      title: "Sanctuaire",
      subtitle: "Bien-être Spirituel Catholique avec IA",
      description:
        "Découvrez une foi plus profonde grâce à des prières personnalisées, des méditations sacrées et une guidance spirituelle enracinée dans la tradition catholique. Rejoignez des milliers de catholiques du monde entier pour vous rapprocher de Dieu.",
      comingSoon: "Bientôt Disponible",
      comingSoonDescription:
        "Nous créons quelque chose de beau pour votre voyage spirituel.",
      earlyAccessDescription:
        "Soyez parmi les premiers à expérimenter Sanctuaire lors de notre lancement.",
      emailPlaceholder: "Entrez votre email pour un accès anticipé",
      notifyMe: "Me Notifier",
      nurtureSoul: "Nourrissez Votre Âme",
      letFaithFlourish: "Laissez Votre Foi Fleurir",
      personalizedPrayers: "Prières Personnalisées",
      personalizedPrayersDesc:
        "Prières créées par IA adaptées à vos besoins spirituels et dévotions catholiques",
      sacredMeditations: "Méditations Sacrées",
      sacredMeditationsDesc:
        "Pratiques contemplatives inspirées des mystiques et saints catholiques",
      globalCommunity: "Communauté Mondiale",
      globalCommunityDesc:
        "Connectez-vous avec des catholiques du monde entier pour la prière, le soutien et la croissance spirituelle",
      globalCatholics: "Catholiques Mondiaux",
      prayingNow: "En Prière Maintenant",
      countries: "Pays",
      spiritualCare: "Soins Spirituels",
      beginJourney: "Commencez Votre Voyage Sacré",
      joinDescription:
        "Rejoignez des milliers de catholiques du monde entier pour approfondir leur foi grâce à une orientation spirituelle personnalisée",
      startPraying: "Commencer à Prier 🙏",
      joinThousands:
        "Rejoignez des milliers de catholiques du monde entier dans un sanctuaire numérique où la foi rencontre la technologie et la tradition guide la transformation",
      beginJourneyButton: "Commencez Votre Voyage 🌟",
      learnStoryButton: "Découvrez Notre Histoire 📖",
      saintsMessages: "Saints et Messages",
      dailySpiritualWisdom:
        "Sagesse spirituelle quotidienne des saints catholiques avec support multilingue et réflexions personnelles d'Essie",
      popularModernSaints: "Saints Populaires et Modernes",
      dailySpiritualMessages: "Messages Spirituels Quotidiens",
      // Features section
      spiritualJourneyBegins: "Votre Voyage Spirituel Commence",
      guidedByEssie: "Guidé par la sagesse d'Essie et la tradition catholique, découvrez les outils pour approfondir votre foi",
      prayerHub: "Centre de Prière",
      prayerHubDesc: "Prières catholiques traditionnelles, Rosaire complet avec tous les mystères, et dévotions de la Divine Miséricorde guidées par Essie",
      liturgyOfHours: "Liturgie des Heures",
      liturgyOfHoursDesc: "Office Divin complet avec compteur de prière communautaire en direct et traditions liturgiques catholiques authentiques",
      sacredMeditationsFeature: "Méditations Sacrées",
      sacredMeditationsFeatureDesc: "Pratiques contemplatives catholiques incluant Lectio Divina, Adoration Eucharistique, et spiritualité ignatienne",
      // Bible quote
      bibleQuote: "Voici, je me tiens à la porte, et je frappe. Si quelqu'un entend ma voix et ouvre la porte, j'entrerai chez lui, je souperai avec lui, et lui avec moi.",
      bibleReference: "Apocalypse 3:20",
    },
    common: {
      readMore: "Lire Plus",
      close: "Fermer",
      save: "Enregistrer",
      share: "Partager",
      favorite: "Favori",
      play: "Jouer",
      pause: "Pause",
      prayer: "Prière",
      meditation: "Méditation",
      blessing: "Bénédiction",
      loading: "Chargement...",
      error: "Erreur",
      success: "Succès",
      getStarted: "Commencer",
      learnMore: "En Savoir Plus",
      joinCommunity: "Rejoindre la Communauté",
    },
    chatbot: {
      title: "Sœur Grâce",
      subtitle: "Votre Compagnon Spirituel IA",
      placeholder:
        "Demandez-moi des prières, des écritures ou des conseils spirituels...",
      askQuestion: "Poser une Question",
      suggestions: [
        "Comment puis-je approfondir ma vie de prière?",
        "Quel saint peut aider avec l'anxiété?",
        "Enseignez-moi la Lectio Divina",
        "J'ai besoin de prières pour la guérison",
        "Comment trouver la paix dans la souffrance?",
      ],
      thinking: "Sœur Grâce réfléchit...",
      welcome:
        "Que la paix soit avec vous! Je suis Sœur Grâce, votre compagnon spirituel IA. Comment puis-je vous aider à vous rapprocher de Dieu aujourd'hui?",
      send: "Envoyer",
      quickTopics: "Sujets rapides à explorer:",
      shareHeart: "Partagez ce qui vous tient à cœur...",
      guidanceDescription:
        "Sœur Grâce fournit des conseils spirituels enracinés dans la tradition catholique",
      chatWith: "Discuter avec Sœur Grâce",
      typing: "Sœur Grâce tape...",
      saintRecommendations: "Recommandations de Saints:",
      scriptureReflection: "Écriture pour Réflexion:",
    },
    confession: {
      title: "Examen de Conscience",
      subtitle: "Préparez votre cœur pour le Sacrement de Réconciliation",
      pageTitle: "Préparation à la Confession",
      pageSubtitle:
        "Préparez votre cœur pour le Sacrement de Réconciliation avec un examen de conscience guidé et des prières catholiques",
      examinationProgress: "Progrès de l'Examen",
      complete: "Terminé",
      introduction: "Introduction",
      examination: "Examen",
      prayers: "Prières",
      preparation: "Préparation",
      welcomeTitle: "Bienvenue à la Préparation à la Confession",
      welcomeText:
        "Le Sacrement de Réconciliation est l'un des plus beaux cadeaux que Dieu nous a donnés par Son Église. C'est une opportunité de faire l'expérience de la miséricorde infinie de Dieu et de revenir à un état de grâce.",
      essieGuidanceTitle: "✝️ Guidance Spirituelle d'Essie",
      essieGuidanceText:
        "Approchez-vous du confessionnal non pas avec peur, mais avec la joie d'un enfant courant vers son Père aimant. La miséricorde de Dieu est plus grande que tout péché, et Son amour ne faillit jamais. Laissez cette préparation ouvrir votre cœur pour recevoir la grâce abondante qui vous attend.",
      whatYoullDo: "📚 Ce que Vous Ferez",
      timeNeeded: "⏰ Temps Nécessaire",
      examineConscience: "• Examiner votre conscience",
      reflectRelationship: "• Réfléchir sur votre relation avec Dieu",
      preparePrayers: "• Préparer des prières pour la confession",
      receiveGuidance: "• Recevoir des conseils pour votre chemin spirituel",
      examination10to15: "• Examen: 10-15 minutes",
      prayerPrep5: "• Préparation de prière: 5 minutes",
      spiritualReflection5to10: "• Réflexion spirituelle: 5-10 minutes",
      totalTime: "• Total: Environ 20-30 minutes",
      beginExamination: "Commencer l'Examen de Conscience 🙏",
      categories: {
        loveOfGod: "Amour de Dieu",
        loveOfNeighbor: "Amour du Prochain",
        purityAndChastity: "Pureté et Chasteté",
        socialJustice: "Justice Sociale",
      },
      commandments: {
        firstThree: "Trois Premiers Commandements",
        fourthThroughTenth: "Quatrième au Dixième Commandement",
        sixthAndNinth: "Sixième et Neuvième Commandement",
        seventhAndTenth: "Septième et Dixième Commandement",
      },
      questions: {
        massAttendance:
          "Ai-je assisté à la Messe les dimanches et jours de précepte?",
        holyCommunion:
          "Ai-je reçu la Sainte Communion en état de péché mortel?",
        godsName: "Ai-je utilisé le nom de Dieu en vain ou juré faussement?",
        catholicFaith:
          "Ai-je pratiqué ma foi catholique ouvertement et sans honte?",
        prayerLife:
          "Ai-je prié régulièrement et consacré du temps à Dieu dans ma vie quotidienne?",
        falseGods:
          "Ai-je mis d'autres choses avant Dieu (argent, pouvoir, plaisir)?",
        honorParents: "Ai-je honoré mes parents et ceux qui ont autorité?",
        selfishFamily:
          "Ai-je été égoïste ou méchant envers les membres de ma famille?",
        hatred:
          "Ai-je nourri de la haine, de la colère ou du ressentiment envers les autres?",
        gossip:
          "Ai-je fait des commérages, menti ou endommagé la réputation de quelqu'un?",
        honesty: "Ai-je été honnête dans mon travail et mes affaires?",
        envy: "Ai-je été envieux ou jaloux des possessions ou du succès des autres?",
        impurity: "Ai-je commis des péchés d'impureté seul ou avec un autre?",
        inappropriateMaterial:
          "Ai-je regardé du matériel ou du divertissement inapproprié?",
        modesty:
          "Me suis-je habillé modestement et ai-je traité mon corps comme un temple du Saint-Esprit?",
      },
    },
    dashboard: {
      welcome: "Que la paix soit avec vous",
      subtitle:
        "Continuez votre voyage spirituel avec la prière, la réflexion et la communauté.",
      featuredPrayers: "Prières en Vedette",
      recentActivity: "Activité de Prière Récente",
      quickActions: "Actions Rapides",
      yourJourney: "Votre Voyage",
      prayersThisWeek: "Prières cette semaine:",
      spiritualLevel: "Niveau spirituel:",
      daysActive: "Jours actifs:",
      growing: "En croissance",
      loadingJourney: "Chargement de votre voyage spirituel...",
      noPrayersYet: "Aucune prière enregistrée encore",
      startPrayerJourney: "Commencez votre voyage de prière ci-dessus!",
      browseAllPrayers: "→ Parcourir Toutes les Prières",
      discoverSaints: "→ Découvrir les Saints",
      spiritualJournal: "→ Journal Spirituel",
      liturgicalCalendar: "→ Calendrier Liturgique",
      prayNow: "Prier Maintenant",
      signOut: "Se Déconnecter",
      welcome2: "Bienvenue",
      minutes: "minutes",
    },
    notFound: {
      pageNotFound: "Page Non Trouvée",
      wanderMessage:
        "Parfois nous nous égarons du chemin, mais Dieu nous guide toujours vers la maison.",
      psalm23:
        "Le Seigneur est mon berger; je ne manque de rien. Il me fait reposer dans de verts pâturages. Il me mène près des eaux paisibles. Il restaure mon âme.",
      psalmReference: "— Psaume 23:1-3",
      messageFromEssie: "Un Message d'Essie",
      essieMessage:
        "Chère âme, chaque détour dans la vie peut nous rapprocher de Dieu si nous le permettons. Ce moment d'être 'perdu' en ligne nous rappelle que notre vraie destination est toujours le Sacré-Cœur de Jésus. Laissez-moi vous aider à vous guider vers où vous devez être dans la Grâce.",
      returnToGrace: "Retourner à la grâce",
      findPeaceInPrayer: "Trouver la paix dans la prière",
      sacredContemplation: "Contemplation sacrée",
      heavenlyIntercession: "Intercession céleste",
      needSpiritualSupport: "Besoin de Soutien Spirituel Immédiat?",
      difficultTimeMessage:
        "Si vous traversez une période difficile et avez besoin de prière ou de guidance spirituelle immédiatement:",
      contactEssie: "Contacter Essie",
      emergencyPrayers: "Prières d'Urgence",
      returnToGraceButton: "Retourner à la Grâce",
      learnAboutMission: "Apprendre Notre Mission",
      home: "Accueil",
      prayers: "Prières",
      meditations: "Méditations",
      saints: "Saints",
    },
    audioPlayer: {
      types: {
        prayer: "Prière",
        meditation: "Méditation",
        blessing: "Bénédiction",
        scripture: "Écriture",
        chant: "Chant Grégorien",
        silence: "Réflexion Silencieuse",
        audio: "Audio",
      },
      aiGenerated: "Audio Généré par IA Disponible",
      sacredSilence: "Silence Sacré",
    },
    footer: {
      about: "À Propos",
      mission: "Mission",
      contact: "Contact",
      hospice: "Soins Palliatifs",
      support: "Support",
      legal: "Légal",
      privacy: "Politique de Confidentialité",
      terms: "Conditions de Service",
      cookies: "Politique des Cookies",
      copyright: "© 2025 Grâce. Tous droits réservés.",
      foundedWithLove: "Fondé avec ❤️ par Essie",
      quickLinks: "Liens Rapides",
      spiritualLife: "Vie Spirituelle",
      availableLanguages: "Disponible en 6 langues 🌍",
      spiritualSupport: "Support Spirituel 24/7 ⛪",
      missionDescription:
        "Approfondir la foi catholique grâce à la guidance spirituelle alimentée par l'IA",
      madeWithLove: "Fait avec prière et amour",
    },
    dailyMessage: {
      title: "Inspiration Quotidienne",
      compactTitle: "Inspiration d'Aujourd'hui",
      fromSaint: "De",
      scriptureToday: "Écriture pour Aujourd'hui:",
      reflection: "Réflexion:",
      personalizePrompt:
        "Voulez-vous un message adapté à votre parcours spirituel?",
      getPersonalized: "Obtenir un Message Personnalisé",
      personalizedNote:
        "✨ Ce message a été personnalisé pour votre parcours spirituel",
      showLess: "Afficher Moins",
      readMore: "Lire Plus",
      tryAgain: "Réessayer",
      cached: "En cache",
      fresh: "Frais",
      refreshTitle: "Actualiser le message",
      loginPrompt:
        "Veuillez vous connecter pour obtenir des messages personnalisés",
      errorFetch: "Échec du chargement du message quotidien",
      errorPersonalized: "Échec de la génération du message personnalisé",
    },
    saints: {
      title: "Saints et Messages Spirituels",
      description:
        "Découvrez la sagesse des saints grâce aux conseils d'Essie, recevant des messages spirituels quotidiens et des dévotions en plusieurs langues.",
      biography: "Biographie",
      availableLanguages: "Disponible en plusieurs langues",
      essiesReflection: "Réflexion d'Essie",
      prayerTo: "Prière à",
      addToMySaints: "Ajouter à Mes Saints",
      beginNovena: "Commencer la Neuvaine",
      dailyMessages: "Messages Quotidiens",
      messageFrom: "Message de",
      scripture: "Écriture",
      todaysAction: "Action d'Aujourd'hui",
      learnAndPray: "Apprendre et Prier",
      essiesSaintForToday: "Saint d'Essie pour Aujourd'hui",
      prayWithStTherese: "Prier avec Sainte Thérèse",
      moreFromEssie: "Plus d'Essie",
      patronOf: "Patron de",
      feastDay: "Jour de Fête",
      amen: "Amen",
    },
    prayers: {
      title: "Centre de Prière",
      description:
        "Prières catholiques traditionnelles guidées avec amour par Essie pour approfondir votre relation avec Dieu.",
      essiesGuidance: "Conseils d'Essie",
      audioPrayerOptions: "Options de Prière Audio",
      spokenPrayer: "Prière Parlée",
      gregorianChant: "Chant Grégorien",
      silentReflection: "Réflexion Silencieuse",
      saveToFavorites: "Enregistrer dans les Favoris",
      beginPrayerSession: "Commencer la Session de Prière",
      beginPrayer: "Commencer la Prière",
      essiesPrayerForToday: "Prière d'Essie pour Aujourd'hui",
      prayTheRosaryToday: "Prier le Rosaire Aujourd'hui",
      moreFromEssie: "Plus d'Essie",
      guidanceText: "Texte de Guidance",
      rosaryRecommendation: "Recommandation du Rosaire",
    },
  },

  it: {
    nav: {
      home: "Home",
      prayers: "Preghiere",
      divineOffice: "Ufficio Divino",
      meditations: "Meditazioni",
      saints: "Santi",
      confession: "Confessione",
      calendar: "Calendario",
      journal: "Diario",
      community: "Comunità",
      about: "Chi Siamo",
      faq: "FAQ",
      contact: "Contatto",
      hospice: "Cure Palliative",
    },
    auth: {
      signIn: "Accedi",
      signOut: "Esci",
      joinFree: "Unisciti Gratis",
      welcomeBack: "Bentornato",
      toggleMobileMenu: "Attiva/disattiva menu mobile",
      dashboard: "Dashboard",
    },
    home: {
      title: "Gracia",
      subtitle: "Benessere Spirituale Cattolico con IA",
      description:
        "Scopri una fede più profonda attraverso preghiere personalizzate, meditazioni sacre e guida spirituale radicata nella tradizione cattolica. Unisciti a migliaia di cattolici in tutto il mondo per avvicinarti di più a Dio.",
      comingSoon: "Prossimamente",
      comingSoonDescription:
        "Stiamo creando qualcosa di bello per il tuo viaggio spirituale.",
      earlyAccessDescription:
        "Sii tra i primi a sperimentare Santuario quando lanceremo.",
      emailPlaceholder: "Inserisci la tua email per accesso anticipato",
      notifyMe: "Notificami",
      nurtureSoul: "Nutri La Tua Anima",
      letFaithFlourish: "Lascia Che La Tua Fede Fiorisca",
      personalizedPrayers: "Preghiere Personalizzate",
      personalizedPrayersDesc:
        "Preghiere create dall'IA adattate alle tue esigenze spirituali e devozioni cattoliche",
      sacredMeditations: "Meditazioni Sacre",
      sacredMeditationsDesc:
        "Pratiche contemplative ispirate da mistici e santi cattolici",
      globalCommunity: "Comunità Globale",
      globalCommunityDesc:
        "Connettiti con cattolici di tutto il mondo per preghiera, supporto e crescita spirituale",
      globalCatholics: "Cattolici Globali",
      prayingNow: "Pregando Ora",
      countries: "Paesi",
      spiritualCare: "Cura Spirituale",
      beginJourney: "Inizia Il Tuo Viaggio Sacro",
      joinDescription:
        "Unisciti a migliaia di cattolici in tutto il mondo per approfondire la loro fede attraverso una guida spirituale personalizzata",
      startPraying: "Inizia a Pregare 🙏",
      joinThousands:
        "Unisciti a migliaia di cattolici in tutto il mondo in un santuario digitale dove la fede incontra la tecnologia e la tradizione guida la trasformazione",
      beginJourneyButton: "Inizia il Tuo Viaggio 🌟",
      learnStoryButton: "Scopri la Nostra Storia 📖",
      saintsMessages: "Santi e Messaggi",
      dailySpiritualWisdom:
        "Saggezza spirituale quotidiana dai santi cattolici con supporto multilingue e riflessioni personali di Essie",
      popularModernSaints: "Santi Popolari e Moderni",
      dailySpiritualMessages: "Messaggi Spirituali Quotidiani",
      // Features section
      spiritualJourneyBegins: "Il Tuo Viaggio Spirituale Inizia",
      guidedByEssie: "Guidato dalla saggezza di Essie e dalla tradizione cattolica, scopri gli strumenti per approfondire la tua fede",
      prayerHub: "Centro di Preghiera",
      prayerHubDesc: "Preghiere cattoliche tradizionali, Rosario completo con tutti i misteri, e devozioni della Divina Misericordia guidate da Essie",
      liturgyOfHours: "Liturgia delle Ore",
      liturgyOfHoursDesc: "Ufficio Divino completo con contatore di preghiera comunitaria dal vivo e tradizioni liturgiche cattoliche autentiche",
      sacredMeditationsFeature: "Meditazioni Sacre",
      sacredMeditationsFeatureDesc: "Pratiche contemplative cattoliche inclusa Lectio Divina, Adorazione Eucaristica, e spiritualità ignaziana",
      // Bible quote
      bibleQuote: "Ecco, io sto alla porta e busso. Se qualcuno sente la mia voce e apre la porta, io entrerò da lui, cenerò con lui ed egli con me.",
      bibleReference: "Apocalisse 3:20",
    },
    common: {
      readMore: "Leggi Di Più",
      close: "Chiudi",
      save: "Salva",
      share: "Condividi",
      favorite: "Preferito",
      play: "Riproduci",
      pause: "Pausa",
      prayer: "Preghiera",
      meditation: "Meditazione",
      blessing: "Benedizione",
      loading: "Caricamento...",
      error: "Errore",
      success: "Successo",
      getStarted: "Inizia",
      learnMore: "Scopri Di Più",
      joinCommunity: "Unisciti alla Comunità",
    },
    chatbot: {
      title: "Suor Grazia",
      subtitle: "Il Tuo Compagno Spirituale IA",
      placeholder: "Chiedimi di preghiere, scritture o guida spirituale...",
      askQuestion: "Fai una Domanda",
      suggestions: [
        "Come posso approfondire la mia vita di preghiera?",
        "Quale santo può aiutare con l'ansia?",
        "Insegnami la Lectio Divina",
        "Ho bisogno di preghiere per la guarigione",
        "Come trovo pace nella sofferenza?",
      ],
      thinking: "Suor Grazia sta riflettendo...",
      welcome:
        "La pace sia con te! Sono Suor Grazia, il tuo compagno spirituale IA. Come posso aiutarti ad avvicinarti di più a Dio oggi?",
      send: "Invia",
      quickTopics: "Argomenti rapidi da esplorare:",
      shareHeart: "Condividi quello che hai nel cuore...",
      guidanceDescription:
        "Suor Grazia fornisce guida spirituale radicata nella tradizione cattolica",
      chatWith: "Chatta con Suor Grazia",
      typing: "Suor Grazia sta scrivendo...",
      saintRecommendations: "Raccomandazioni di Santi:",
      scriptureReflection: "Scrittura per Riflessione:",
    },
    confession: {
      title: "Esame di Coscienza",
      subtitle: "Prepara il tuo cuore per il Sacramento della Riconciliazione",
      pageTitle: "Preparazione alla Confessione",
      pageSubtitle:
        "Prepara il tuo cuore per il Sacramento della Riconciliazione con esame di coscienza guidato e preghiere cattoliche",
      examinationProgress: "Progresso dell'Esame",
      complete: "Completo",
      introduction: "Introduzione",
      examination: "Esame",
      prayers: "Preghiere",
      preparation: "Preparazione",
      welcomeTitle: "Benvenuto alla Preparazione alla Confessione",
      welcomeText:
        "Il Sacramento della Riconciliazione è uno dei doni più belli che Dio ci ha dato attraverso la Sua Chiesa. È un'opportunità per sperimentare l'infinita misericordia di Dio e tornare a uno stato di grazia.",
      essieGuidanceTitle: "✝️ Guida Spirituale di Essie",
      essieGuidanceText:
        "Avvicinati al confessionale non con paura, ma con la gioia di un bambino che corre verso il suo Padre amorevole. La misericordia di Dio è più grande di qualsiasi peccato, e il Suo amore non viene mai meno. Lascia che questa preparazione apra il tuo cuore per ricevere la grazia abbondante che ti aspetta.",
      whatYoullDo: "📚 Cosa Farai",
      timeNeeded: "⏰ Tempo Necessario",
      examineConscience: "• Esaminare la tua coscienza",
      reflectRelationship: "• Riflettere sulla tua relazione con Dio",
      preparePrayers: "• Preparare preghiere per la confessione",
      receiveGuidance: "• Ricevere guida per il tuo cammino spirituale",
      examination10to15: "• Esame: 10-15 minuti",
      prayerPrep5: "• Preparazione preghiera: 5 minuti",
      spiritualReflection5to10: "• Riflessione spirituale: 5-10 minuti",
      totalTime: "• Totale: Circa 20-30 minuti",
      beginExamination: "Inizia Esame di Coscienza 🙏",
      categories: {
        loveOfGod: "Amore di Dio",
        loveOfNeighbor: "Amore del Prossimo",
        purityAndChastity: "Purezza e Castità",
        socialJustice: "Giustizia Sociale",
      },
      commandments: {
        firstThree: "Primi Tre Comandamenti",
        fourthThroughTenth: "Dal Quarto al Decimo Comandamento",
        sixthAndNinth: "Sesto e Nono Comandamento",
        seventhAndTenth: "Settimo e Decimo Comandamento",
      },
      questions: {
        massAttendance:
          "Ho partecipato alla Messa la domenica e nei giorni di precetto?",
        holyCommunion:
          "Ho ricevuto la Santa Comunione in stato di peccato mortale?",
        godsName: "Ho usato il nome di Dio invano o giurato falsamente?",
        catholicFaith:
          "Ho praticato la mia fede cattolica apertamente e senza vergogna?",
        prayerLife:
          "Ho pregato regolarmente e dedicato tempo a Dio nella mia vita quotidiana?",
        falseGods:
          "Ho messo altre cose prima di Dio (denaro, potere, piacere)?",
        honorParents: "Ho onorato i miei genitori e coloro che hanno autorità?",
        selfishFamily:
          "Sono stato egoista o scortese con i membri della mia famiglia?",
        hatred: "Ho nutrito odio, rabbia o risentimento verso gli altri?",
        gossip:
          "Ho fatto pettegolezzi, mentito o danneggiato la reputazione di qualcuno?",
        honesty: "Sono stato onesto nel mio lavoro e negli affari?",
        envy: "Sono stato invidioso o geloso dei beni o del successo degli altri?",
        impurity: "Ho commesso peccati di impurità da solo o con altri?",
        inappropriateMaterial:
          "Ho guardato materiale o intrattenimento inappropriato?",
        modesty:
          "Mi sono vestito modestamente e ho trattato il mio corpo come tempio dello Spirito Santo?",
      },
    },
    dashboard: {
      welcome: "La pace sia con te",
      subtitle:
        "Continua il tuo viaggio spirituale con preghiera, riflessione e comunità.",
      featuredPrayers: "Preghiere in Evidenza",
      recentActivity: "Attività di Preghiera Recente",
      quickActions: "Azioni Rapide",
      yourJourney: "Il Tuo Viaggio",
      prayersThisWeek: "Preghiere questa settimana:",
      spiritualLevel: "Livello spirituale:",
      daysActive: "Giorni attivi:",
      growing: "In crescita",
      loadingJourney: "Caricamento del tuo viaggio spirituale...",
      noPrayersYet: "Nessuna preghiera registrata ancora",
      startPrayerJourney: "Inizia il tuo viaggio di preghiera sopra!",
      browseAllPrayers: "→ Sfoglia Tutte le Preghiere",
      discoverSaints: "→ Scopri i Santi",
      spiritualJournal: "→ Diario Spirituale",
      liturgicalCalendar: "→ Calendario Liturgico",
      prayNow: "Prega Ora",
      signOut: "Disconnetti",
      welcome2: "Benvenuto",
      minutes: "minuti",
    },
    notFound: {
      pageNotFound: "Pagina Non Trovata",
      wanderMessage:
        "A volte ci allontaniamo dal sentiero, ma Dio ci guida sempre verso casa.",
      psalm23:
        "Il Signore è il mio pastore; non manco di nulla. Mi fa riposare in pascoli verdi. Mi conduce presso acque tranquille. Ristora la mia anima.",
      psalmReference: "— Salmo 23:1-3",
      messageFromEssie: "Un Messaggio da Essie",
      essieMessage:
        "Cara anima, ogni deviazione nella vita può avvicinarci di più a Dio se lo permettiamo. Questo momento di essere 'persi' online ci ricorda che la nostra vera destinazione è sempre il Sacro Cuore di Gesù. Lascia che ti aiuti a guidarti dove devi essere nella Grazia.",
      returnToGrace: "Ritorna alla grazia",
      findPeaceInPrayer: "Trova pace nella preghiera",
      sacredContemplation: "Contemplazione sacra",
      heavenlyIntercession: "Intercessione celeste",
      needSpiritualSupport: "Hai Bisogno di Supporto Spirituale Immediato?",
      difficultTimeMessage:
        "Se stai attraversando un momento difficile e hai bisogno di preghiera o guida spirituale immediatamente:",
      contactEssie: "Contatta Essie",
      emergencyPrayers: "Preghiere di Emergenza",
      returnToGraceButton: "Ritorna alla Grazia",
      learnAboutMission: "Scopri la Nostra Missione",
      home: "Casa",
      prayers: "Preghiere",
      meditations: "Meditazioni",
      saints: "Santi",
    },
    audioPlayer: {
      types: {
        prayer: "Preghiera",
        meditation: "Meditazione",
        blessing: "Benedizione",
        scripture: "Scrittura",
        chant: "Canto Gregoriano",
        silence: "Riflessione Silenziosa",
        audio: "Audio",
      },
      aiGenerated: "Audio Generato da IA Disponibile",
      sacredSilence: "Silenzio Sacro",
    },
    footer: {
      about: "Chi Siamo",
      mission: "Missione",
      contact: "Contatto",
      hospice: "Cure Palliative",
      support: "Supporto",
      legal: "Legale",
      privacy: "Politica sulla Privacy",
      terms: "Termini di Servizio",
      cookies: "Politica sui Cookie",
      copyright: "© 2025 Grazia. Tutti i diritti riservati.",
      foundedWithLove: "Fondato con ❤️ da Essie",
      quickLinks: "Collegamenti Rapidi",
      spiritualLife: "Vita Spirituale",
      availableLanguages: "Disponibile in 6 lingue 🌍",
      spiritualSupport: "Supporto Spirituale 24/7 ⛪",
      missionDescription:
        "Approfondire la fede cattolica attraverso la guida spirituale alimentata dall'IA",
      madeWithLove: "Fatto con preghiera e amore",
    },
    dailyMessage: {
      title: "Ispirazione Quotidiana",
      compactTitle: "Ispirazione di Oggi",
      fromSaint: "Da",
      scriptureToday: "Scrittura per Oggi:",
      reflection: "Riflessione:",
      personalizePrompt:
        "Vuoi un messaggio adattato al tuo percorso spirituale?",
      getPersonalized: "Ottieni Messaggio Personalizzato",
      personalizedNote:
        "✨ Questo messaggio è stato personalizzato per il tuo percorso spirituale",
      showLess: "Mostra Meno",
      readMore: "Leggi di Più",
      tryAgain: "Riprova",
      cached: "In cache",
      fresh: "Fresco",
      refreshTitle: "Aggiorna messaggio",
      loginPrompt: "Effettua l'accesso per ottenere messaggi personalizzati",
      errorFetch: "Impossibile caricare il messaggio quotidiano",
      errorPersonalized: "Impossibile generare messaggio personalizzato",
    },
    saints: {
      title: "Santi e Messaggi Spirituali",
      description:
        "Scopri la saggezza dei santi attraverso la guida di Essie, ricevendo messaggi spirituali quotidiani e devozioni in più lingue.",
      biography: "Biografia",
      availableLanguages: "Disponibile in più lingue",
      essiesReflection: "Riflessione di Essie",
      prayerTo: "Preghiera a",
      addToMySaints: "Aggiungi ai Miei Santi",
      beginNovena: "Inizia Novena",
      dailyMessages: "Messaggi Quotidiani",
      messageFrom: "Messaggio da",
      scripture: "Scrittura",
      todaysAction: "Azione di Oggi",
      learnAndPray: "Impara e Prega",
      essiesSaintForToday: "Santo di Essie per Oggi",
      prayWithStTherese: "Prega con Santa Teresa",
      moreFromEssie: "Altro da Essie",
      patronOf: "Patrono di",
      feastDay: "Giorno della Festa",
      amen: "Amen",
    },
    prayers: {
      title: "Centro di Preghiera",
      description:
        "Preghiere cattoliche tradizionali guidate amorevolmente da Essie per approfondire il tuo rapporto con Dio.",
      essiesGuidance: "Guida di Essie",
      audioPrayerOptions: "Opzioni di Preghiera Audio",
      spokenPrayer: "Preghiera Parlata",
      gregorianChant: "Canto Gregoriano",
      silentReflection: "Riflessione Silenziosa",
      saveToFavorites: "Salva nei Preferiti",
      beginPrayerSession: "Inizia Sessione di Preghiera",
      beginPrayer: "Inizia Preghiera",
      essiesPrayerForToday: "Preghiera di Essie per Oggi",
      prayTheRosaryToday: "Prega il Rosario Oggi",
      moreFromEssie: "Altro da Essie",
      guidanceText: "Testo di Guida",
      rosaryRecommendation: "Raccomandazione del Rosario",
    },
  },

  pt: {
    nav: {
      home: "Início",
      prayers: "Orações",
      divineOffice: "Ofício Divino",
      meditations: "Meditações",
      saints: "Santos",
      confession: "Confissão",
      calendar: "Calendário",
      journal: "Diário",
      community: "Comunidade",
      about: "Sobre",
      faq: "FAQ",
      contact: "Contato",
      hospice: "Cuidados Paliativos",
    },
    auth: {
      signIn: "Entrar",
      signOut: "Sair",
      joinFree: "Junte-se Grátis",
      welcomeBack: "Bem-vindo de volta",
      toggleMobileMenu: "Alternar menu móvel",
      dashboard: "Painel",
    },
    home: {
      title: "Santuário",
      subtitle: "Bem-estar Espiritual Católico com IA",
      description:
        "Descubra uma fé mais profunda através de orações personalizadas, meditações sagradas e orientação espiritual enraizada na tradição católica. Junte-se a milhares de católicos ao redor do mundo para se aproximar mais de Deus.",
      comingSoon: "Em Breve",
      comingSoonDescription:
        "Estamos criando algo lindo para sua jornada espiritual.",
      earlyAccessDescription:
        "Seja um dos primeiros a experimentar o Santuário quando lançarmos.",
      emailPlaceholder: "Digite seu email para acesso antecipado",
      notifyMe: "Me Notifique",
      nurtureSoul: "Nutra Sua Alma",
      letFaithFlourish: "Deixe Sua Fé Florescer",
      personalizedPrayers: "Orações Personalizadas",
      personalizedPrayersDesc:
        "Orações criadas por IA adaptadas às suas necessidades espirituais e devoções católicas",
      sacredMeditations: "Meditações Sagradas",
      sacredMeditationsDesc:
        "Práticas contemplativas inspiradas em místicos e santos católicos",
      globalCommunity: "Comunidade Global",
      globalCommunityDesc:
        "Conecte-se com católicos do mundo todo para oração, apoio e crescimento espiritual",
      globalCatholics: "Católicos Globais",
      prayingNow: "Orando Agora",
      countries: "Países",
      spiritualCare: "Cuidado Espiritual",
      beginJourney: "Comece Sua Jornada Sagrada",
      joinDescription:
        "Junte-se a milhares de católicos ao redor do mundo para aprofundar sua fé através de orientação espiritual personalizada",
      startPraying: "Começar a Orar 🙏",
      joinThousands:
        "Junte-se a milhares de católicos em todo o mundo em um santuário digital onde a fé encontra a tecnologia e a tradição guia a transformação",
      beginJourneyButton: "Comece Sua Jornada 🌟",
      learnStoryButton: "Conheça Nossa História 📖",
      saintsMessages: "Santos e Mensagens",
      dailySpiritualWisdom:
        "Sabedoria espiritual diária dos santos católicos com suporte multilíngue e reflexões pessoais de Essie",
      popularModernSaints: "Santos Populares e Modernos",
      dailySpiritualMessages: "Mensagens Espirituais Diárias",
      // Features section
      spiritualJourneyBegins: "Sua Jornada Espiritual Começa",
      guidedByEssie: "Guiado pela sabedoria de Essie e tradição católica, descubra as ferramentas para aprofundar sua fé",
      prayerHub: "Centro de Oração",
      prayerHubDesc: "Orações católicas tradicionais, Rosário completo com todos os mistérios, e devoções da Divina Misericórdia guiadas por Essie",
      liturgyOfHours: "Liturgia das Horas",
      liturgyOfHoursDesc: "Ofício Divino completo com contador de oração comunitária ao vivo e tradições litúrgicas católicas autênticas",
      sacredMeditationsFeature: "Meditações Sagradas",
      sacredMeditationsFeatureDesc: "Práticas contemplativas católicas incluindo Lectio Divina, Adoração Eucarística, e espiritualidade inaciana",
      // Bible quote
      bibleQuote: "Eis que estou à porta, e bato; se alguém ouvir a minha voz, e abrir a porta, entrarei em sua casa, e com ele cearei, e ele comigo.",
      bibleReference: "Apocalipse 3:20",
    },
    common: {
      readMore: "Ler Mais",
      close: "Fechar",
      save: "Salvar",
      share: "Compartilhar",
      favorite: "Favorito",
      play: "Reproduzir",
      pause: "Pausar",
      prayer: "Oração",
      meditation: "Meditação",
      blessing: "Bênção",
      loading: "Carregando...",
      error: "Erro",
      success: "Sucesso",
      getStarted: "Começar",
      learnMore: "Saiba Mais",
      joinCommunity: "Juntar-se à Comunidade",
    },
    chatbot: {
      title: "Irmã Graça",
      subtitle: "Sua Companheira Espiritual IA",
      placeholder:
        "Pergunte-me sobre orações, escrituras ou orientação espiritual...",
      askQuestion: "Fazer Pergunta",
      suggestions: [
        "Como posso aprofundar minha vida de oração?",
        "Que santo pode ajudar com ansiedade?",
        "Me ensine sobre Lectio Divina",
        "Preciso de orações para cura",
        "Como encontro paz no sofrimento?",
      ],
      thinking: "Irmã Graça está refletindo...",
      welcome:
        "A paz esteja com você! Sou Irmã Graça, sua companheira espiritual IA. Como posso ajudá-lo a se aproximar mais de Deus hoje?",
      send: "Enviar",
      quickTopics: "Tópicos rápidos para explorar:",
      shareHeart: "Compartilhe o que está em seu coração...",
      guidanceDescription:
        "Irmã Graça fornece orientação espiritual enraizada na tradição católica",
      chatWith: "Conversar com Irmã Graça",
      typing: "Irmã Graça está digitando...",
      saintRecommendations: "Recomendações de Santos:",
      scriptureReflection: "Escritura para Reflexão:",
    },
    confession: {
      title: "Exame de Consciência",
      subtitle: "Prepare seu coração para o Sacramento da Reconciliação",
      pageTitle: "Preparação para a Confissão",
      pageSubtitle:
        "Prepare seu coração para o Sacramento da Reconciliação com exame de consciência guiado e orações católicas",
      examinationProgress: "Progresso do Exame",
      complete: "Completo",
      introduction: "Introdução",
      examination: "Exame",
      prayers: "Orações",
      preparation: "Preparação",
      welcomeTitle: "Bem-vindo à Preparação para a Confissão",
      welcomeText:
        "O Sacramento da Reconciliação é um dos mais belos presentes que Deus nos deu através de Sua Igreja. É uma oportunidade de experimentar a infinita misericórdia de Deus e retornar a um estado de graça.",
      essieGuidanceTitle: "✝️ Orientação Espiritual de Essie",
      essieGuidanceText:
        "Aproxime-se do confessionário não com medo, mas com a alegria de uma criança correndo para seu Pai amoroso. A misericórdia de Deus é maior que qualquer pecado, e Seu amor nunca falha. Deixe que esta preparação abra seu coração para receber a graça abundante que o espera.",
      whatYoullDo: "📚 O que Você Fará",
      timeNeeded: "⏰ Tempo Necessário",
      examineConscience: "• Examinar sua consciência",
      reflectRelationship: "• Refletir sobre seu relacionamento com Deus",
      preparePrayers: "• Preparar orações para a confissão",
      receiveGuidance: "• Receber orientação para sua jornada espiritual",
      examination10to15: "• Exame: 10-15 minutos",
      prayerPrep5: "• Preparação de oração: 5 minutos",
      spiritualReflection5to10: "• Reflexão espiritual: 5-10 minutos",
      totalTime: "• Total: Aproximadamente 20-30 minutos",
      beginExamination: "Começar Exame de Consciência 🙏",
      categories: {
        loveOfGod: "Amor a Deus",
        loveOfNeighbor: "Amor ao Próximo",
        purityAndChastity: "Pureza e Castidade",
        socialJustice: "Justiça Social",
      },
      commandments: {
        firstThree: "Três Primeiros Mandamentos",
        fourthThroughTenth: "Quarto ao Décimo Mandamento",
        sixthAndNinth: "Sexto e Nono Mandamento",
        seventhAndTenth: "Sétimo e Décimo Mandamento",
      },
      questions: {
        massAttendance:
          "Participei da Missa aos domingos e dias santos de preceito?",
        holyCommunion: "Recebi a Sagrada Comunhão em estado de pecado mortal?",
        godsName: "Usei o nome de Deus em vão ou jurei falsamente?",
        catholicFaith:
          "Pratiquei minha fé católica abertamente e sem vergonha?",
        prayerLife:
          "Orei regularmente e dediquei tempo a Deus em minha vida diária?",
        falseGods:
          "Coloquei outras coisas antes de Deus (dinheiro, poder, prazer)?",
        honorParents: "Honrei meus pais e aqueles em autoridade?",
        selfishFamily: "Fui egoísta ou cruel com os membros da minha família?",
        hatred: "Nutri ódio, raiva ou ressentimento em relação aos outros?",
        gossip: "Fofoquei, menti ou prejudiquei a reputação de alguém?",
        honesty: "Fui honesto em meu trabalho e negócios?",
        envy: "Fui invejoso ou ciumento das posses ou sucesso dos outros?",
        impurity: "Cometi pecados de impureza sozinho ou com outro?",
        inappropriateMaterial: "Assisti material ou entretenimento inadequado?",
        modesty:
          "Me vesti modestamente e tratei meu corpo como templo do Espírito Santo?",
      },
    },
    dashboard: {
      welcome: "A paz esteja com você",
      subtitle:
        "Continue sua jornada espiritual com oração, reflexão e comunidade.",
      featuredPrayers: "Orações em Destaque",
      recentActivity: "Atividade de Oração Recente",
      quickActions: "Ações Rápidas",
      yourJourney: "Sua Jornada",
      prayersThisWeek: "Orações esta semana:",
      spiritualLevel: "Nível espiritual:",
      daysActive: "Dias ativo:",
      growing: "Crescendo",
      loadingJourney: "Carregando sua jornada espiritual...",
      noPrayersYet: "Nenhuma oração registrada ainda",
      startPrayerJourney: "Comece sua jornada de oração acima!",
      browseAllPrayers: "→ Navegar Todas as Orações",
      discoverSaints: "→ Descobrir Santos",
      spiritualJournal: "→ Diário Espiritual",
      liturgicalCalendar: "→ Calendário Litúrgico",
      prayNow: "Orar Agora",
      signOut: "Sair",
      welcome2: "Bem-vindo",
      minutes: "minutos",
    },
    notFound: {
      pageNotFound: "Página Não Encontrada",
      wanderMessage:
        "Às vezes nos desviamos do caminho, mas Deus sempre nos guia de volta para casa.",
      psalm23:
        "O Senhor é meu pastor; nada me falta. Ele me faz repousar em pastagens verdejantes. Ele me conduz junto às águas tranquilas. Ele restaura minha alma.",
      psalmReference: "— Salmo 23:1-3",
      messageFromEssie: "Uma Mensagem de Essie",
      essieMessage:
        "Querida alma, cada desvio na vida pode nos aproximar mais de Deus se permitirmos. Este momento de estar 'perdido' online nos lembra que nosso verdadeiro destino é sempre o Sagrado Coração de Jesus. Deixe-me ajudá-lo a se orientar para onde você precisa estar na Graça.",
      returnToGrace: "Retornar à graça",
      findPeaceInPrayer: "Encontrar paz na oração",
      sacredContemplation: "Contemplação sagrada",
      heavenlyIntercession: "Intercessão celestial",
      needSpiritualSupport: "Precisa de Apoio Espiritual Imediato?",
      difficultTimeMessage:
        "Se você está passando por um momento difícil e precisa de oração ou orientação espiritual imediatamente:",
      contactEssie: "Contatar Essie",
      emergencyPrayers: "Orações de Emergência",
      returnToGraceButton: "Retornar à Graça",
      learnAboutMission: "Conhecer Nossa Missão",
      home: "Início",
      prayers: "Orações",
      meditations: "Meditações",
      saints: "Santos",
    },
    audioPlayer: {
      types: {
        prayer: "Oração",
        meditation: "Meditação",
        blessing: "Bênção",
        scripture: "Escritura",
        chant: "Canto Gregoriano",
        silence: "Reflexão Silenciosa",
        audio: "Áudio",
      },
      aiGenerated: "Áudio Gerado por IA Disponível",
      sacredSilence: "Silêncio Sagrado",
    },
    footer: {
      about: "Sobre",
      mission: "Missão",
      contact: "Contato",
      hospice: "Cuidados Paliativos",
      support: "Suporte",
      legal: "Legal",
      privacy: "Política de Privacidade",
      terms: "Termos de Serviço",
      cookies: "Política de Cookies",
      copyright: "© 2025 Graça. Todos os direitos reservados.",
      foundedWithLove: "Fundado com ❤️ por Essie",
      quickLinks: "Links Rápidos",
      spiritualLife: "Vida Espiritual",
      availableLanguages: "Disponível em 6 idiomas 🌍",
      spiritualSupport: "Suporte Espiritual 24/7 ⛪",
      missionDescription:
        "Aprofundando a fé católica através de orientação espiritual alimentada por IA",
      madeWithLove: "Feito com oração e amor",
    },
    dailyMessage: {
      title: "Inspiração Diária",
      compactTitle: "Inspiração de Hoje",
      fromSaint: "De",
      scriptureToday: "Escritura para Hoje:",
      reflection: "Reflexão:",
      personalizePrompt: "Quer uma mensagem adaptada à sua jornada espiritual?",
      getPersonalized: "Obter Mensagem Personalizada",
      personalizedNote:
        "✨ Esta mensagem foi personalizada para sua jornada espiritual",
      showLess: "Mostrar Menos",
      readMore: "Ler Mais",
      tryAgain: "Tentar novamente",
      cached: "Em cache",
      fresh: "Fresco",
      refreshTitle: "Atualizar mensagem",
      loginPrompt: "Por favor, faça login para obter mensagens personalizadas",
      errorFetch: "Falha ao carregar mensagem diária",
      errorPersonalized: "Falha ao gerar mensagem personalizada",
    },
    saints: {
      title: "Santos e Mensagens Espirituais",
      description:
        "Descubra a sabedoria dos santos através da orientação de Essie, recebendo mensagens espirituais diárias e devoções em múltiplas línguas.",
      biography: "Biografia",
      availableLanguages: "Disponível em múltiplas línguas",
      essiesReflection: "Reflexão de Essie",
      prayerTo: "Oração para",
      addToMySaints: "Adicionar aos Meus Santos",
      beginNovena: "Começar Novena",
      dailyMessages: "Mensagens Diárias",
      messageFrom: "Mensagem de",
      scripture: "Escritura",
      todaysAction: "Ação de Hoje",
      learnAndPray: "Aprender e Orar",
      essiesSaintForToday: "Santo de Essie para Hoje",
      prayWithStTherese: "Orar com Santa Teresa",
      moreFromEssie: "Mais de Essie",
      patronOf: "Patrono de",
      feastDay: "Dia da Festa",
      amen: "Amém",
    },
    prayers: {
      title: "Centro de Oração",
      description:
        "Orações católicas tradicionais guiadas amorosamente por Essie para aprofundar seu relacionamento com Deus.",
      essiesGuidance: "Orientação de Essie",
      audioPrayerOptions: "Opções de Oração em Áudio",
      spokenPrayer: "Oração Falada",
      gregorianChant: "Canto Gregoriano",
      silentReflection: "Reflexão Silenciosa",
      saveToFavorites: "Salvar nos Favoritos",
      beginPrayerSession: "Começar Sessão de Oração",
      beginPrayer: "Começar Oração",
      essiesPrayerForToday: "Oração de Essie para Hoje",
      prayTheRosaryToday: "Rezar o Rosário Hoje",
      moreFromEssie: "Mais de Essie",
      guidanceText: "Texto de Orientação",
      rosaryRecommendation: "Recomendação do Rosário",
    },
  },

  la: {
    nav: {
      home: "Domus",
      prayers: "Orationes",
      divineOffice: "Officium Divinum",
      meditations: "Meditationes",
      saints: "Sancti",
      confession: "Confessio",
      calendar: "Calendarium",
      journal: "Diarium",
      community: "Communitas",
      about: "De Nobis",
      faq: "Quaestiones",
      contact: "Contactus",
      hospice: "Cura Morientium",
    },
    auth: {
      signIn: "Ingredi",
      signOut: "Exire",
      joinFree: "Gratis Iunge",
      welcomeBack: "Salve Rediens",
      toggleMobileMenu: "Menu Mobile Commutare",
      dashboard: "Tabula Administrationis",
    },
    home: {
      title: "Sanctuarium",
      subtitle: "Salus Spiritualis Catholica cum IA",
      description:
        "Invenite fidem profundiorem per orationes personales, meditationes sacras et directionem spiritualem in traditione catholica radicatam. Iungite vos millibus catholicorum per mundum ut Deo propius accedatis.",
      comingSoon: "Mox Venturum",
      comingSoonDescription:
        "Aliquid pulchrum pro itinere vestro spirituali creamus.",
      earlyAccessDescription:
        "Inter primos este qui Sanctuarium experiemini cum emittamus.",
      emailPlaceholder: "Inscribe epistulam electronicam pro accessu praecoci",
      notifyMe: "Me Certiorem Fac",
      nurtureSoul: "Anim Tuam Nuttire",
      letFaithFlourish: "Fidem Tuam Florere Sine",
      personalizedPrayers: "Orationes Personales",
      personalizedPrayersDesc:
        "Orationes ab IA creatae ad necessitates spirituales et devotiones catholicas adaptate",
      sacredMeditations: "Meditationes Sacrae",
      sacredMeditationsDesc:
        "Exercitia contemplativa a mysticis et sanctis catholicis inspirata",
      globalCommunity: "Communitas Universalis",
      globalCommunityDesc:
        "Cum catholicis per orbem terrarum pro oratione, auxilio et incremento spirituali conectite",
      globalCatholics: "Catholici Universales",
      prayingNow: "Nunc Orantes",
      countries: "Nationes",
      spiritualCare: "Cura Spiritualis",
      beginJourney: "Iter Sacrum Incipe",
      joinDescription:
        "Iungite vos millibus catholicorum per orbem terrarum ad fidem suam profundandam per directionem spiritualem personalem",
      startPraying: "Orare Incipe 🙏",
      joinThousands:
        "Iunge te millibus Catholicorum per orbem terrarum in sanctuario digitali ubi fides technologiam convenit et traditio transformationem ducit",
      beginJourneyButton: "Iter Tuum Incipe 🌟",
      learnStoryButton: "Historiam Nostram Disce 📖",
      saintsMessages: "Sancti et Nuntii",
      dailySpiritualWisdom:
        "Sapientia spiritualis quotidiana a sanctis Catholicis cum auxilio multilingui et meditationibus personalibus Essie",
      popularModernSaints: "Sancti Populares et Moderni",
      dailySpiritualMessages: "Nuntii Spirituales Quotidiani",
      // Features section
      spiritualJourneyBegins: "Iter Spirituale Tuum Incipit",
      guidedByEssie: "Sapientia Essie et traditione Catholica ductus, instrumenta ad fidem tuam profundandam invenie",
      prayerHub: "Centrum Orationis",
      prayerHubDesc: "Orationes Catholicae traditionales, Rosarium completum cum omnibus mysteriis, et devotiones Divinae Misericordiae ab Essie ductae",
      liturgyOfHours: "Liturgia Horarum",
      liturgyOfHoursDesc: "Officium Divinum completum cum numeratore orationis communitatis vivae et traditionibus liturgicis Catholicis authenticis",
      sacredMeditationsFeature: "Meditationes Sacrae",
      sacredMeditationsFeatureDesc: "Exercitia contemplativa Catholica inclusa Lectio Divina, Adoratio Eucharistica, et spiritualitas Ignatiana",
      // Bible quote
      bibleQuote: "Ecce sto ad ostium et pulso: si quis audierit vocem meam et aperuerit ianuam, intrabo ad illum et cenabo cum illo, et ipse mecum.",
      bibleReference: "Apocalypsis 3:20",
    },
    common: {
      readMore: "Plura Lege",
      close: "Claude",
      save: "Serva",
      share: "Communi",
      favorite: "Dilectum",
      play: "Lude",
      pause: "Pausa",
      prayer: "Oratio",
      meditation: "Meditatio",
      blessing: "Benedictio",
      loading: "Onerans...",
      error: "Error",
      success: "Successus",
      getStarted: "Incipe",
      learnMore: "Plura Disce",
      joinCommunity: "Communitati Adhere",
    },
    chatbot: {
      title: "Soror Gratia",
      subtitle: "Comes Spiritualis IA Tua",
      placeholder:
        "Roga me de orationibus, scripturis vel directione spirituali...",
      askQuestion: "Quaere",
      suggestions: [
        "Quomodo vitam orationis meae profundare possum?",
        "Quis sanctus cum anxietate adiuvare potest?",
        "Lectionem Divinam me doce",
        "Orationibus pro sanitate opus habeo",
        "Quomodo pacem in dolore invenio?",
      ],
      thinking: "Soror Gratia cogitat...",
      welcome:
        "Pax vobiscum! Soror Gratia sum, comes spiritualis IA vestra. Quomodo vos adiuvare possum ut Deo hodie propius accedatis?",
      send: "Mitte",
      quickTopics: "Argumenta celeriter exploranda:",
      shareHeart: "Communica quid in corde tuo est...",
      guidanceDescription:
        "Soror Gratia directionem spiritualem in traditione catholica radicatam praebet",
      chatWith: "Cum Sorore Gratia colloquere",
      typing: "Soror Gratia scribit...",
      saintRecommendations: "Commendationes Sanctorum:",
      scriptureReflection: "Scriptura ad Meditationem:",
    },
    confession: {
      title: "Examen Conscientiae",
      subtitle: "Praepara cor tuum ad Sacramentum Reconciliationis",
      pageTitle: "Praeparatio ad Confessionem",
      pageSubtitle:
        "Praepara cor tuum ad Sacramentum Reconciliationis cum examine conscientiae ducto et orationibus catholicis",
      examinationProgress: "Progressus Examinis",
      complete: "Completum",
      introduction: "Introductio",
      examination: "Examen",
      prayers: "Orationes",
      preparation: "Praeparatio",
      welcomeTitle: "Salve ad Praeparationem Confessionis",
      welcomeText:
        "Sacramentum Reconciliationis est unum ex pulcherrimis donis quae Deus nobis dedit per Ecclesiam Suam. Est opportunitas experiendi infinitam misericordiam Dei et redeundi ad statum gratiae.",
      essieGuidanceTitle: "✝️ Ducatus Spiritualis Essie",
      essieGuidanceText:
        "Accede ad confessionale non cum timore, sed cum gaudio pueri currentis ad Patrem amantem. Misericordia Dei maior est quam omne peccatum, et amor Eius numquam deficit. Sine hanc praeparationem aperire cor tuum ad recipiendam gratiam abundantem quae te expectat.",
      whatYoullDo: "📚 Quid Facies",
      timeNeeded: "⏰ Tempus Necessarium",
      examineConscience: "• Examinare conscientiam tuam",
      reflectRelationship: "• Reflectere de relatione tua cum Deo",
      preparePrayers: "• Praeparare orationes pro confessione",
      receiveGuidance: "• Accipere ducatum pro itinere spirituali tuo",
      examination10to15: "• Examen: 10-15 minuta",
      prayerPrep5: "• Praeparatio orationis: 5 minuta",
      spiritualReflection5to10: "• Reflexio spiritualis: 5-10 minuta",
      totalTime: "• Totum: Circiter 20-30 minuta",
      beginExamination: "Incipe Examen Conscientiae 🙏",
      categories: {
        loveOfGod: "Amor Dei",
        loveOfNeighbor: "Amor Proximi",
        purityAndChastity: "Puritas et Castitas",
        socialJustice: "Iustitia Socialis",
      },
      commandments: {
        firstThree: "Prima Tria Praecepta",
        fourthThroughTenth: "Quartum ad Decimum Praeceptum",
        sixthAndNinth: "Sextum et Nonum Praeceptum",
        seventhAndTenth: "Septimum et Decimum Praeceptum",
      },
      questions: {
        massAttendance:
          "Interfuine Missae diebus dominicis et festis de praecepto?",
        holyCommunion: "Accepi Sanctam Communionem in statu peccati mortalis?",
        godsName: "Usus sum nomine Dei in vanum aut iuravi false?",
        catholicFaith: "Exercui fidem catholicam aperte et sine pudore?",
        prayerLife: "Oravi regulariter et tempus Deo dedi in vita quotidiana?",
        falseGods: "Posui alia ante Deum (pecuniam, potentiam, voluptatem)?",
        honorParents: "Honoravi parentes meos et eos qui auctoritatem habent?",
        selfishFamily: "Fui egoista aut crudelis erga familiae meae membra?",
        hatred: "Fovi odium, iram aut rancorem erga alios?",
        gossip: "Susurravi, mentitus sum aut laesi famam alicuius?",
        honesty: "Fui honestus in labore et negotiis meis?",
        envy: "Fui invidus aut zelotypus bonorum aut successus aliorum?",
        impurity: "Commisi peccata impuritatis solus aut cum alio?",
        inappropriateMaterial:
          "Vidi materiam aut oblectamentum inappropriatum?",
        modesty:
          "Vestivi me modeste et tractavi corpus meum ut templum Spiritus Sancti?",
      },
    },
    dashboard: {
      welcome: "Pax tecum",
      subtitle:
        "Continua iter spirituale tuum cum oratione, meditatione et communitate.",
      featuredPrayers: "Orationes Praecipuae",
      recentActivity: "Recens Activitas Orationis",
      quickActions: "Actiones Celeres",
      yourJourney: "Iter Tuum",
      prayersThisWeek: "Orationes hac hebdomada:",
      spiritualLevel: "Gradus spiritualis:",
      daysActive: "Dies activi:",
      growing: "Crescens",
      loadingJourney: "Onerando iter spirituale tuum...",
      noPrayersYet: "Nullae orationes adhuc registratae",
      startPrayerJourney: "Incipe iter orationis supra!",
      browseAllPrayers: "→ Percurre Omnes Orationes",
      discoverSaints: "→ Inveni Sanctos",
      spiritualJournal: "→ Diarium Spirituale",
      liturgicalCalendar: "→ Calendarium Liturgicum",
      prayNow: "Ora Nunc",
      signOut: "Exire",
      welcome2: "Salve",
      minutes: "minuta",
    },
    notFound: {
      pageNotFound: "Pagina Non Inventa",
      wanderMessage:
        "Interdum aberramus a via, sed Deus semper nos domum ducit.",
      psalm23:
        "Dominus pascit me; nihil mihi deerit. In pascuis viridibus me collocat. Ad aquas quietas me deducit. Animam meam reficit.",
      psalmReference: "— Psalmus 23:1-3",
      messageFromEssie: "Nuntius ab Essie",
      essieMessage:
        "Cara anima, omnis deviatio in vita nos propius ad Deum ducere potest si permittimus. Hic momentum 'perditi' online nos admonet quod vera destinatio nostra semper est Sacrum Cor Iesu. Sine me te adiuvare ut te ducam ubi esse debes in Gratia.",
      returnToGrace: "Redire ad gratiam",
      findPeaceInPrayer: "Invenire pacem in oratione",
      sacredContemplation: "Contemplatio sacra",
      heavenlyIntercession: "Intercessio caelestis",
      needSpiritualSupport: "Egesne Auxilio Spirituali Immediato?",
      difficultTimeMessage:
        "Si tempus difficile transis et oratione aut ductu spirituali statim eges:",
      contactEssie: "Contacta Essie",
      emergencyPrayers: "Orationes Urgentes",
      returnToGraceButton: "Redire ad Gratiam",
      learnAboutMission: "Disce de Missione Nostra",
      home: "Domus",
      prayers: "Orationes",
      meditations: "Meditationes",
      saints: "Sancti",
    },
    audioPlayer: {
      types: {
        prayer: "Oratio",
        meditation: "Meditatio",
        blessing: "Benedictio",
        scripture: "Scriptura",
        chant: "Cantus Gregorianus",
        silence: "Reflexio Silentiosa",
        audio: "Audio",
      },
      aiGenerated: "Audio ab IA Generatum Disponibile",
      sacredSilence: "Silentium Sacrum",
    },
    footer: {
      about: "De Nobis",
      mission: "Missio",
      contact: "Contactus",
      hospice: "Cura Morientium",
      support: "Auxilium",
      legal: "Legalia",
      privacy: "De Secreto",
      terms: "Conditiones",
      cookies: "De Crustullis",
      copyright: "© MMXXV Gratia. Omnia iura reservata.",
      foundedWithLove: "Cum ❤️ ab Essie conditum",
      quickLinks: "Nexus Rapidi",
      spiritualLife: "Vita Spiritualis",
      availableLanguages: "Disponibile in 6 linguis 🌍",
      spiritualSupport: "Auxilium Spirituale 24/7 ⛪",
      missionDescription:
        "Fides catholica profundanda per directionem spiritualem ab IA motam",
      madeWithLove: "Factum cum oratione et amore",
    },
    dailyMessage: {
      title: "Inspiratio Quotidiana",
      compactTitle: "Inspiratio Hodierna",
      fromSaint: "A",
      scriptureToday: "Scriptura pro Hodie:",
      reflection: "Meditatio:",
      personalizePrompt: "Vis nuntium ad iter spirituale tuum accommodatum?",
      getPersonalized: "Nuntium Personalem Obtinere",
      personalizedNote:
        "✨ Hic nuntius pro itinere spirituali tuo personalis factus est",
      showLess: "Minus Ostendere",
      readMore: "Plus Legere",
      tryAgain: "Iterum tentare",
      cached: "In memoria",
      fresh: "Recens",
      refreshTitle: "Nuntium renovare",
      loginPrompt: "Quaeso accede ad nuntios personales obtinendos",
      errorFetch: "Nuntius quotidianus onerari non potuit",
      errorPersonalized: "Nuntius personalis generari non potuit",
    },
    saints: {
      title: "Sancti et Nuntii Spirituales",
      description:
        "Sapientiam sanctorum per directionem Essiae invenite, nuntios spirituales quotidianos et devotiones in linguis pluribus accipientes.",
      biography: "Vita",
      availableLanguages: "Disponibile in linguis pluribus",
      essiesReflection: "Meditatio Essiae",
      prayerTo: "Oratio ad",
      addToMySaints: "Ad Meos Sanctos Addere",
      beginNovena: "Novenas Incipere",
      dailyMessages: "Nuntii Quotidiani",
      messageFrom: "Nuntius a",
      scripture: "Scriptura",
      todaysAction: "Actio Hodierna",
      learnAndPray: "Discere et Orare",
      essiesSaintForToday: "Sanctus Essiae pro Hodie",
      prayWithStTherese: "Orare cum Sancta Theresia",
      moreFromEssie: "Plus ab Essia",
      patronOf: "Patronus",
      feastDay: "Dies Festi",
      amen: "Amen",
    },
    prayers: {
      title: "Centrum Orationis",
      description:
        "Orationes catholicae traditionales amore ab Essia ductae ad relationem tuam cum Deo profundandam.",
      essiesGuidance: "Directio Essiae",
      audioPrayerOptions: "Optiones Orationis Audio",
      spokenPrayer: "Oratio Locuta",
      gregorianChant: "Cantus Gregorianus",
      silentReflection: "Meditatio Silens",
      saveToFavorites: "In Favoritis Servare",
      beginPrayerSession: "Sessionem Orationis Incipere",
      beginPrayer: "Orationem Incipere",
      essiesPrayerForToday: "Oratio Essiae pro Hodie",
      prayTheRosaryToday: "Rosarium Hodie Orare",
      moreFromEssie: "Plus ab Essia",
      guidanceText: "Textus Directionis",
      rosaryRecommendation: "Commendatio Rosarii",
    },
  },
};
