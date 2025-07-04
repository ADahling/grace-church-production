const CATHOLIC_SCRIPTURE_DATABASE: Record<string, string> = {
  "Genesis 1:1": "In the beginning, when God created the heavens and the earth",
  "Genesis 1:27":
    "God created mankind in his image; in the image of God he created them; male and female he created them.",
  "Genesis 3:15":
    "I will put enmity between you and the woman, and between your offspring and hers; They will strike at your head, while you strike at their heel.",
  "Genesis 9:13":
    "I set my bow in the clouds to serve as a sign of the covenant between me and the earth.",
  "Genesis 12:2":
    "I will make of you a great nation, and I will bless you; I will make your name great, so that you will be a blessing.",
  "Genesis 28:15":
    "Know that I am with you; I will protect you wherever you go, and bring you back to this land. I will never leave you until I have done what I promised you.",

  "Exodus 3:14":
    "God replied to Moses: I am who I am. Then he added: This is what you will tell the Israelites: I AM has sent me to you.",
  "Exodus 14:14": "The LORD will fight for you; you have only to keep still.",
  "Exodus 20:3": "You shall not have other gods beside me.",
  "Exodus 33:14":
    "The LORD answered: I myself will go with you, and I will give you rest.",

  "Deuteronomy 6:5":
    "Therefore, you shall love the LORD, your God, with all your heart, and with all your soul, and with all your strength.",
  "Deuteronomy 31:6":
    "Be brave and steadfast; have no fear or dread of them, for it is the LORD, your God, who marches with you; he will never fail you or forsake you.",

  "Joshua 1:9":
    "I command you: be firm and steadfast! Do not fear nor be dismayed, for the LORD, your God, is with you wherever you go.",
  "Joshua 24:15":
    "If it does not please you to serve the LORD, decide today whom you will serve, the gods your fathers served beyond the River or the gods of the Amorites in whose country you are dwelling. As for me and my household, we will serve the LORD.",

  "Psalm 1:1":
    "Blessed is the man who does not walk in the counsel of the wicked, nor stand in the way of sinners, nor sit in company with scoffers.",
  "Psalm 1:3":
    "He is like a tree planted near streams of water, that yields its fruit in season; Its leaves never wither; whatever he does prospers.",
  "Psalm 8:4":
    "What are humans that you are mindful of them, mere mortals that you care for them?",
  "Psalm 16:11":
    "You will show me the path to life, abounding joy in your presence, the delights at your right hand forever.",
  "Psalm 18:2":
    "The LORD is my rock, my fortress, my deliverer, my God, my rock of refuge, my shield, the horn of my salvation, my stronghold!",
  "Psalm 19:1":
    "The heavens declare the glory of God; the sky proclaims its builder's craft.",
  "Psalm 19:14":
    "Let the words of my mouth meet with your favor, keep the thoughts of my heart before you, LORD, my rock and my redeemer.",
  "Psalm 23:1": "The LORD is my shepherd; there is nothing I lack.",
  "Psalm 23:4":
    "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff comfort me.",
  "Psalm 25:4": "Make known to me your ways, LORD; teach me your paths.",
  "Psalm 27:1":
    "The LORD is my light and my salvation; whom do I fear? The LORD is my life's refuge; of whom am I afraid?",
  "Psalm 27:14":
    "Wait for the LORD, take courage; be stouthearted, wait for the LORD!",
  "Psalm 30:5":
    "At nightfall, weeping enters in, but with the dawn, rejoicing.",
  "Psalm 34:8":
    "Learn to savor how good the LORD is; blessed is the one who takes refuge in him.",
  "Psalm 34:18":
    "The LORD is close to the brokenhearted, saves those whose spirit is crushed.",
  "Psalm 37:4":
    "Find your delight in the LORD who will give you your heart's desire.",
  "Psalm 37:5": "Commit your way to the LORD; trust that God will act.",
  "Psalm 42:1":
    "As the deer longs for streams of water, so my soul longs for you, O God.",
  "Psalm 46:1":
    "God is our refuge and our strength, an ever-present help in distress.",
  "Psalm 46:10":
    "Be still and confess that I am God! I am exalted among the nations, exalted upon the earth.",
  "Psalm 51:10":
    "A clean heart create for me, God; renew in me a steadfast spirit.",
  "Psalm 51:12":
    "Restore my joy in your salvation; sustain in me a willing spirit.",
  "Psalm 62:1": "My soul rests in God alone, from whom comes my salvation.",
  "Psalm 63:1":
    "O God, you are my God—for you I long! For you my body yearns; for you my soul thirsts, Like a land parched, lifeless, and without water.",
  "Psalm 84:2":
    "My soul yearns and pines for the courts of the LORD. My heart and flesh cry out for the living God.",
  "Psalm 91:1":
    "You who dwell in the shelter of the Most High, who abide in the shade of the Almighty.",
  "Psalm 91:2":
    'Say to the LORD, "My refuge and fortress, my God in whom I trust."',
  "Psalm 91:11": "For God commands the angels to guard you in all your ways.",
  "Psalm 100:3":
    "Know that the LORD is God, our maker to whom we belong, whose people we are, God's well-tended flock.",
  "Psalm 103:8":
    "Merciful and gracious is the LORD, slow to anger, abounding in kindness.",
  "Psalm 103:12":
    "As far as the east is from the west, so far have our sins been removed from us.",
  "Psalm 118:24":
    "This is the day the LORD has made; let us rejoice in it and be glad.",
  "Psalm 119:105": "Your word is a lamp for my feet, a light for my path.",
  "Psalm 121:1-2":
    "I raise my eyes toward the mountains. From where will my help come? My help comes from the LORD, the maker of heaven and earth.",
  "Psalm 139:14":
    "I praise you, so wonderfully you made me; wonderful are your works! My very self you knew.",
  "Psalm 139:23-24":
    "Probe me, God, know my heart; try me, know my concerns. See if my way is crooked, then lead me in the ancient paths.",
  "Psalm 147:3": "He heals the brokenhearted and binds up their wounds.",
  "Psalm 150:6":
    "Let everything that has breath give praise to the LORD! Hallelujah!",

  "Proverbs 2:6":
    "For the LORD gives wisdom, from his mouth come knowledge and understanding.",
  "Proverbs 3:5-6":
    "Trust in the LORD with all your heart, on your own intelligence rely not; In all your ways be mindful of him, and he will make straight your paths.",
  "Proverbs 16:3":
    "Entrust your works to the LORD, and your plans will succeed.",
  "Proverbs 18:10":
    "The name of the LORD is a strong tower; the just man runs to it and is safe.",
  "Proverbs 31:25":
    "She is clothed with strength and dignity, and she laughs at the days to come.",

  "Isaiah 9:6":
    "For a child is born to us, a son is given us; upon his shoulder dominion rests. They name him Wonder-Counselor, God-Hero, Father-Forever, Prince of Peace.",
  "Isaiah 26:3":
    "A nation of firm purpose you keep in peace; in peace, for its trust in you.",
  "Isaiah 40:28":
    "Do you not know or have you not heard? The LORD is the eternal God, creator of the ends of the earth. He does not faint nor grow weary, and his knowledge is beyond scrutiny.",
  "Isaiah 40:31":
    "They that hope in the LORD will renew their strength, they will soar as with eagles' wings; They will run and not grow weary, walk and not grow faint.",
  "Isaiah 41:10":
    "Fear not, I am with you; be not dismayed, I am your God. I will strengthen you, and help you, and uphold you with my right hand of justice.",
  "Isaiah 43:1":
    "But now, thus says the LORD, who created you, O Jacob, and formed you, O Israel: Fear not, for I have redeemed you; I have called you by name: you are mine.",
  "Isaiah 43:2":
    "When you pass through the water, I will be with you; in the rivers you shall not drown. When you walk through fire, you shall not be burned; the flames shall not consume you.",
  "Isaiah 53:5":
    "But he was pierced for our offenses, crushed for our sins, Upon him was the chastisement that makes us whole, by his stripes we were healed.",
  "Isaiah 55:8":
    "For my thoughts are not your thoughts, nor are your ways my ways, says the LORD.",
  "Isaiah 55:11":
    "So shall my word be that goes forth from my mouth; It shall not return to me void, but shall do my will, achieving the end for which I sent it.",

  "Jeremiah 1:5":
    "Before I formed you in the womb I knew you, before you were born I dedicated you, a prophet to the nations I appointed you.",
  "Jeremiah 29:11":
    "For I know well the plans I have in mind for you, says the LORD, plans for your welfare, not for woe! plans to give you a future full of hope.",
  "Jeremiah 31:3":
    "The LORD appears to him from afar: With age-old love I have loved you; so I have kept my mercy toward you.",

  "Joel 2:12-13":
    "Yet even now, says the LORD, return to me with your whole heart, with fasting, and weeping, and mourning; Rend your hearts, not your garments, and return to the LORD, your God. For gracious and merciful is he, slow to anger, rich in kindness, and relenting in punishment.",

  "Matthew 5:3":
    "Blessed are the poor in spirit, for theirs is the kingdom of heaven.",
  "Matthew 5:4": "Blessed are they who mourn, for they will be comforted.",
  "Matthew 5:6":
    "Blessed are they who hunger and thirst for righteousness, for they will be satisfied.",
  "Matthew 5:8": "Blessed are the clean of heart, for they will see God.",
  "Matthew 5:9":
    "Blessed are the peacemakers, for they will be called children of God.",
  "Matthew 5:14":
    "You are the light of the world. A city set on a mountain cannot be hidden.",
  "Matthew 5:16":
    "Just so, your light must shine before others, that they may see your good deeds and glorify your heavenly Father.",
  "Matthew 6:9":
    "This is how you are to pray: Our Father in heaven, hallowed be your name.",
  "Matthew 6:11": "Give us today our daily bread.",
  "Matthew 6:26":
    "Look at the birds in the sky; they do not sow or reap, they gather nothing into barns, yet your heavenly Father feeds them. Are not you more important than they?",
  "Matthew 6:33":
    "But seek first the kingdom of God and his righteousness, and all these things will be given you besides.",
  "Matthew 7:7":
    "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.",
  "Matthew 11:28":
    "Come to me, all you who labor and are burdened, and I will give you rest.",
  "Matthew 11:29":
    "Take my yoke upon you and learn from me, for I am meek and humble of heart; and you will find rest for yourselves.",
  "Matthew 16:26":
    "What profit would there be for one to gain the whole world and forfeit his life? Or what can one give in exchange for his life?",
  "Matthew 18:3":
    "Amen, I say to you, unless you turn and become like children, you will not enter the kingdom of heaven.",
  "Matthew 22:37":
    'He said to him, "You shall love the Lord, your God, with all your heart, with all your soul, and with all your mind."',
  "Matthew 22:39":
    "The second is like it: You shall love your neighbor as yourself.",
  "Matthew 28:19":
    "Go, therefore, and make disciples of all nations, baptizing them in the name of the Father, and of the Son, and of the holy Spirit.",
  "Matthew 28:20":
    "And behold, I am with you always, until the end of the age.",

  "Mark 9:23":
    'Jesus said to him, "If you can! Everything is possible to one who has faith."',
  "Mark 10:27":
    'Jesus looked at them and said, "For human beings it is impossible, but not for God. All things are possible for God."',
  "Mark 16:15":
    'He said to them, "Go into the whole world and proclaim the gospel to every creature."',

  "Luke 1:28":
    'And coming to her, he said, "Hail, favored one! The Lord is with you."',
  "Luke 1:37": "For nothing will be impossible for God.",
  "Luke 1:45":
    "Blessed are you who believed that what was spoken to you by the Lord would be fulfilled.",
  "Luke 2:10-11":
    'The angel said to them, "Do not be afraid; for behold, I proclaim to you good news of great joy that will be for all the people. For today in the city of David a savior has been born for you who is Messiah and Lord."',
  "Luke 6:20":
    'And raising his eyes toward his disciples he said: "Blessed are you who are poor, for the kingdom of God is yours."',
  "Luke 6:31": "Do to others as you would have them do to you.",
  "Luke 12:7":
    "Even the hairs of your head have all been counted. Do not be afraid. You are worth more than many sparrows.",
  "Luke 12:32":
    "Do not be afraid any longer, little flock, for your Father is pleased to give you the kingdom.",

  "John 1:1":
    "In the beginning was the Word, and the Word was with God, and the Word was God.",
  "John 1:5":
    "The light shines in the darkness, and the darkness has not overcome it.",
  "John 1:14":
    "And the Word became flesh and made his dwelling among us, and we saw his glory, the glory as of the Father's only Son, full of grace and truth.",
  "John 3:16":
    "For God so loved the world that he gave his only Son, so that everyone who believes in him might not perish but might have eternal life.",
  "John 8:12":
    'Jesus spoke to them again, saying, "I am the light of the world. Whoever follows me will not walk in darkness, but will have the light of life."',
  "John 10:10":
    "I came so that they might have life and have it more abundantly.",
  "John 11:25":
    'Jesus told her, "I am the resurrection and the life; whoever believes in me, even if he dies, will live."',
  "John 14:1":
    "Do not let your hearts be troubled. You have faith in God; have faith also in me.",
  "John 14:2":
    "In my Father's house there are many dwelling places. If there were not, would I have told you that I am going to prepare a place for you?",
  "John 14:6":
    'Jesus said to him, "I am the way and the truth and the life. No one comes to the Father except through me."',
  "John 14:27":
    "Peace I leave with you; my peace I give to you. Not as the world gives do I give it to you. Do not let your hearts be troubled or afraid.",
  "John 15:5":
    "I am the vine, you are the branches. Whoever remains in me and I in him will bear much fruit, because without me you can do nothing.",
  "John 15:9": "As the Father loves me, so I also love you. Remain in my love.",
  "John 15:13":
    "No one has greater love than this, to lay down one's life for one's friends.",
  "John 16:33":
    "I have told you this so that you might have peace in me. In the world you will have trouble, but take courage, I have conquered the world.",

  "Acts 1:8":
    "But you will receive power when the holy Spirit comes upon you, and you will be my witnesses in Jerusalem, throughout Judea and Samaria, and to the ends of the earth.",
  "Acts 2:38":
    'Peter said to them, "Repent and be baptized, every one of you, in the name of Jesus Christ for the forgiveness of your sins; and you will receive the gift of the holy Spirit."',
  "Acts 4:12":
    "There is no salvation through anyone else, nor is there any other name under heaven given to the human race by which we are to be saved.",

  "Romans 1:16":
    "For I am not ashamed of the gospel. It is the power of God for the salvation of everyone who believes: for Jew first, and then Greek.",
  "Romans 3:23": "All have sinned and are deprived of the glory of God.",
  "Romans 5:8":
    "But God proves his love for us in that while we were still sinners Christ died for us.",
  "Romans 6:23":
    "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
  "Romans 8:1":
    "Hence, now there is no condemnation for those who are in Christ Jesus.",
  "Romans 8:28":
    "We know that all things work for good for those who love God, who are called according to his purpose.",
  "Romans 8:31":
    "What then shall we say to this? If God is for us, who can be against us?",
  "Romans 8:38-39":
    "For I am convinced that neither death, nor life, nor angels, nor principalities, nor present things, nor future things, nor powers, nor height, nor depth, nor any other creature will be able to separate us from the love of God in Christ Jesus our Lord.",
  "Romans 10:9":
    "For, if you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved.",
  "Romans 12:2":
    "Do not conform yourselves to this age but be transformed by the renewal of your mind, that you may discern what is the will of God, what is good and pleasing and perfect.",
  "Romans 15:13":
    "May the God of hope fill you with all joy and peace in believing, so that you may abound in hope by the power of the holy Spirit.",

  "1 Corinthians 10:13":
    "No trial has come to you but what is human. God is faithful and will not let you be tried beyond your strength; but with the trial he will also provide a way out, so that you may be able to bear it.",
  "1 Corinthians 13:4":
    "Love is patient, love is kind. It is not jealous, it is not pompous, it is not inflated.",
  "1 Corinthians 13:7":
    "It bears all things, believes all things, hopes all things, endures all things.",
  "1 Corinthians 13:13":
    "So faith, hope, love remain, these three; but the greatest of these is love.",
  "1 Corinthians 15:20":
    "But now Christ has been raised from the dead, the firstfruits of those who have fallen asleep.",
  "1 Corinthians 15:57":
    "But thanks be to God who gives us the victory through our Lord Jesus Christ.",

  "2 Corinthians 1:3-4":
    "Blessed be the God and Father of our Lord Jesus Christ, the Father of compassion and God of all encouragement, who encourages us in our every affliction, so that we may be able to encourage those who are in any affliction with the encouragement with which we ourselves are encouraged by God.",
  "2 Corinthians 4:16":
    "Therefore, we are not discouraged; rather, although our outer self is wasting away, our inner self is being renewed day by day.",
  "2 Corinthians 5:7": "For we walk by faith, not by sight.",
  "2 Corinthians 5:17":
    "So whoever is in Christ is a new creation: the old things have passed away; behold, new things have come.",
  "2 Corinthians 12:9":
    'But he said to me, "My grace is sufficient for you, for power is made perfect in weakness." I will rather boast most gladly of my weaknesses, in order that the power of Christ may dwell with me.',

  "Galatians 2:20":
    "Yet I live, no longer I, but Christ lives in me; insofar as I now live in the flesh, I live by faith in the Son of God who has loved me and given himself up for me.",
  "Galatians 5:22":
    "In contrast, the fruit of the Spirit is love, joy, peace, patience, kindness, generosity, faithfulness.",
  "Galatians 6:9":
    "Let us not grow tired of doing good, for in due time we shall reap our harvest, if we do not give up.",

  "Ephesians 2:8":
    "For by grace you have been saved through faith, and this is not from you; it is the gift of God.",
  "Ephesians 2:10":
    "For we are his handiwork, created in Christ Jesus for the good works that God has prepared in advance, that we should live in them.",
  "Ephesians 3:20":
    "Now to him who is able to accomplish far more than all we ask or imagine, by the power at work within us.",
  "Ephesians 4:32":
    "And be kind to one another, compassionate, forgiving one another as God has forgiven you in Christ.",
  "Ephesians 6:10":
    "Finally, draw your strength from the Lord and from his mighty power.",
  "Ephesians 6:11":
    "Put on the armor of God so that you may be able to stand firm against the tactics of the devil.",

  "Philippians 1:6":
    "I am confident of this, that the one who began a good work in you will continue to complete it until the day of Christ Jesus.",
  "Philippians 3:13-14":
    "Brothers, I for my part do not consider myself to have taken possession. Just one thing: forgetting what lies behind but straining forward to what lies ahead, I continue my pursuit toward the goal, the prize of God's upward calling, in Christ Jesus.",
  "Philippians 4:6-7":
    "Have no anxiety at all, but in everything, by prayer and petition, with thanksgiving, make your requests known to God. Then the peace of God that surpasses all understanding will guard your hearts and minds in Christ Jesus.",
  "Philippians 4:8":
    "Finally, brothers, whatever is true, whatever is honorable, whatever is just, whatever is pure, whatever is lovely, whatever is gracious, if there is any excellence and if there is anything worthy of praise, think about these things.",
  "Philippians 4:13":
    "I have the strength for everything through him who empowers me.",
  "Philippians 4:19":
    "My God will fully supply whatever you need, in accord with his glorious riches in Christ Jesus.",

  "Colossians 3:2": "Think of what is above, not of what is on earth.",
  "Colossians 3:23":
    "Whatever you do, do from the heart, as for the Lord and not for others.",

  "1 Thessalonians 5:16-18":
    "Rejoice always. Pray without ceasing. In all circumstances give thanks, for this is the will of God for you in Christ Jesus.",

  "2 Timothy 1:7":
    "For God did not give us a spirit of cowardice but rather of power and love and self-control.",
  "2 Timothy 3:16":
    "All scripture is inspired by God and is useful for teaching, for refutation, for correction, and for training in righteousness.",

  "Hebrews 4:16":
    "So let us confidently approach the throne of grace to receive mercy and to find grace for timely help.",
  "Hebrews 11:1":
    "Faith is the realization of what is hoped for and evidence of things not seen.",
  "Hebrews 12:1":
    "Therefore, since we are surrounded by so great a cloud of witnesses, let us rid ourselves of every burden and sin that clings to us and persevere in running the race that lies before us.",
  "Hebrews 13:5":
    'Let your life be free from love of money but be content with what you have, for he has said, "I will never forsake you or abandon you."',
  "Hebrews 13:8": "Jesus Christ is the same yesterday, today, and forever.",

  "James 1:2-3":
    "Consider it all joy, my brothers, when you encounter various trials, for you know that the testing of your faith produces perseverance.",
  "James 1:5":
    "But if any of you lacks wisdom, he should ask God who gives to all generously and ungrudgingly, and he will be given it.",
  "James 1:17":
    "All good giving and every perfect gift is from above, coming down from the Father of lights, with whom there is no alteration or shadow caused by change.",
  "James 4:8":
    "Draw near to God, and he will draw near to you. Cleanse your hands, you sinners, and purify your hearts, you of two minds.",

  "1 Peter 1:3":
    "Blessed be the God and Father of our Lord Jesus Christ, who in his great mercy gave us a new birth to a living hope through the resurrection of Jesus Christ from the dead.",
  "1 Peter 2:9":
    'But you are "a chosen race, a royal priesthood, a holy nation, a people of his own, so that you may announce the praises" of him who called you out of darkness into his wonderful light.',
  "1 Peter 5:7": "Cast all your worries upon him because he cares for you.",

  "1 John 1:9":
    "If we acknowledge our sins, he is faithful and just and will forgive our sins and cleanse us from every wrongdoing.",
  "1 John 3:1":
    "See what love the Father has bestowed on us that we may be called the children of God. Yet so we are. The reason the world does not know us is that it did not know him.",
  "1 John 4:7":
    "Beloved, let us love one another, because love is of God; everyone who loves is begotten by God and knows God.",
  "1 John 4:8": "Whoever is without love does not know God, for God is love.",
  "1 John 4:18":
    "There is no fear in love, but perfect love drives out fear because fear has to do with punishment, and so one who fears is not yet perfect in love.",
  "1 John 4:19": "We love because he first loved us.",
  "1 John 5:14":
    "And we have this confidence in him, that if we ask anything according to his will, he hears us.",

  "Revelation 3:20":
    "Behold, I stand at the door and knock. If anyone hears my voice and opens the door, then I will enter his house and dine with him, and he with me.",
  "Revelation 21:4":
    "He will wipe every tear from their eyes, and there shall be no more death or mourning, wailing or pain, for the old order has passed away.",
  "Revelation 22:13":
    "I am the Alpha and the Omega, the first and the last, the beginning and the end.",
};

const SPANISH_SCRIPTURE_DATABASE: Record<string, string> = {
  "Génesis 1:1": "En el principio creó Dios los cielos y la tierra.",
  "Génesis 1:27":
    "Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó.",
  "Génesis 28:15":
    "He aquí, yo estoy contigo, y te guardaré por dondequiera que fueres, y volveré a traerte a esta tierra; porque no te dejaré hasta que haya hecho lo que te he dicho.",

  "Éxodo 3:14":
    "Y respondió Dios a Moisés: YO SOY EL QUE SOY. Y dijo: Así dirás a los hijos de Israel: YO SOY me envió a vosotros.",
  "Éxodo 14:14": "Jehová peleará por vosotros, y vosotros estaréis tranquilos.",

  "Deuteronomio 6:5":
    "Y amarás a Jehová tu Dios de todo tu corazón, y de toda tu alma, y con todas tus fuerzas.",
  "Deuteronomio 31:6":
    "Esforzaos y cobrad ánimo; no temáis, ni tengáis miedo de ellos, porque Jehová tu Dios es el que va contigo; no te dejará, ni te desamparará.",

  "Josué 1:9":
    "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.",
  "Josué 24:15":
    "Y si mal os parece servir a Jehová, escogeos hoy a quién sirváis; si a los dioses a quienes sirvieron vuestros padres, cuando estuvieron al otro lado del río, o a los dioses de los amorreos en cuya tierra habitáis; pero yo y mi casa serviremos a Jehová.",

  "Salmos 1:1":
    "Bienaventurado el varón que no anduvo en consejo de malos, ni estuvo en camino de pecadores, ni en silla de escarnecedores se ha sentado.",
  "Salmos 8:4":
    "¿Qué es el hombre, para que tengas de él memoria, y el hijo del hombre, para que lo visites?",
  "Salmos 16:11":
    "Me mostrarás la senda de la vida; en tu presencia hay plenitud de gozo; delicias a tu diestra para siempre.",
  "Salmos 19:1":
    "Los cielos cuentan la gloria de Dios, y el firmamento anuncia la obra de sus manos.",
  "Salmos 23:1": "Jehová es mi pastor; nada me faltará.",
  "Salmos 23:4":
    "Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo; tu vara y tu cayado me infundirán aliento.",
  "Salmos 27:1":
    "Jehová es mi luz y mi salvación; ¿de quién temeré? Jehová es la fortaleza de mi vida; ¿de quién he de atemorizarme?",
  "Salmos 34:8":
    "Gustad, y ved que es bueno Jehová; dichoso el hombre que confía en él.",
  "Salmos 34:18":
    "Cercano está Jehová a los quebrantados de corazón; y salva a los contritos de espíritu.",
  "Salmos 37:4":
    "Deléitate asimismo en Jehová, y él te concederá las peticiones de tu corazón.",
  "Salmos 46:1":
    "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.",
  "Salmos 46:10":
    "Estad quietos, y conoced que yo soy Dios; seré exaltado entre las naciones; enaltecido seré en la tierra.",
  "Salmos 51:10":
    "Crea en mí, oh Dios, un corazón limpio, y renueva un espíritu recto dentro de mí.",
  "Salmos 91:1":
    "El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.",
  "Salmos 91:2":
    "Diré yo a Jehová: Esperanza mía, y castillo mío; mi Dios, en quien confiaré.",
  "Salmos 103:8":
    "Misericordioso y clemente es Jehová; lento para la ira, y grande en misericordia.",
  "Salmos 118:24":
    "Este es el día que hizo Jehová; nos gozaremos y alegraremos en él.",
  "Salmos 119:105": "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.",
  "Salmos 121:1-2":
    "Alzaré mis ojos a los montes; ¿de dónde vendrá mi socorro? Mi socorro viene de Jehová, que hizo los cielos y la tierra.",
  "Salmos 139:14":
    "Te alabaré; porque formidables, maravillosas son tus obras; estoy maravillado, y mi alma lo conoce muy bien.",
  "Salmos 147:3": "El sana a los quebrantados de corazón, y venda sus heridas.",

  "Proverbios 2:6":
    "Porque Jehová da la sabiduría, y de su boca viene el conocimiento y la inteligencia.",
  "Proverbios 3:5-6":
    "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.",
  "Proverbios 16:3":
    "Encomienda a Jehová tus obras, y tus pensamientos serán afirmados.",

  "Isaías 9:6":
    "Porque un niño nos es nacido, hijo nos es dado, y el principado sobre su hombro; y se llamará su nombre Admirable, Consejero, Dios Fuerte, Padre Eterno, Príncipe de Paz.",
  "Isaías 26:3":
    "Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera; porque en ti ha confiado.",
  "Isaías 40:31":
    "Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.",
  "Isaías 41:10":
    "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.",
  "Isaías 43:1":
    "Ahora, así dice Jehová, Creador tuyo, oh Jacob, y Formador tuyo, oh Israel: No temas, porque yo te redimí; te puse nombre, mío eres tú.",
  "Isaías 53:5":
    "Mas él herido fue por nuestras rebeliones, molido por nuestros pecados; el castigo de nuestra paz fue sobre él, y por su llaga fuimos nosotros curados.",
  "Isaías 55:8":
    "Porque mis pensamientos no son vuestros pensamientos, ni vuestros caminos mis caminos, dijo Jehová.",

  "Jeremías 1:5":
    "Antes que te formase en el vientre te conocí, y antes que nacieses te santifiqué, te di por profeta a las naciones.",
  "Jeremías 29:11":
    "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.",
  "Jeremías 31:3":
    "Jehová se manifestó a mí hace ya mucho tiempo, diciendo: Con amor eterno te he amado; por tanto, te prolongué mi misericordia.",

  "Joel 2:12-13":
    "Por eso pues, ahora, dice Jehová, convertíos a mí con todo vuestro corazón, con ayuno y lloro y lamento. Rasgad vuestro corazón, y no vuestros vestidos, y convertíos a Jehová vuestro Dios; porque misericordioso es y clemente, tardo para la ira y grande en misericordia, y que se duele del castigo.",

  "Mateo 5:3":
    "Bienaventurados los pobres en espíritu, porque de ellos es el reino de los cielos.",
  "Mateo 5:4":
    "Bienaventurados los que lloran, porque ellos recibirán consolación.",
  "Mateo 5:8":
    "Bienaventurados los de limpio corazón, porque ellos verán a Dios.",
  "Mateo 5:9":
    "Bienaventurados los pacificadores, porque ellos serán llamados hijos de Dios.",
  "Mateo 5:14":
    "Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder.",
  "Mateo 6:9":
    "Vosotros, pues, oraréis así: Padre nuestro que estás en los cielos, santificado sea tu nombre.",
  "Mateo 6:11": "El pan nuestro de cada día, dánoslo hoy.",
  "Mateo 6:26":
    "Mirad las aves del cielo, que no siembran, ni siegan, ni recogen en graneros; y vuestro Padre celestial las alimenta. ¿No valéis vosotros mucho más que ellas?",
  "Mateo 6:33":
    "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.",
  "Mateo 7:7":
    "Pedid, y se os dará; buscad, y hallaréis; llamad, y se os abrirá.",
  "Mateo 11:28":
    "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.",
  "Mateo 11:29":
    "Llevad mi yugo sobre vosotros, y aprended de mí, que soy manso y humilde de corazón; y hallaréis descanso para vuestras almas.",
  "Mateo 22:37":
    "Jesús le dijo: Amarás al Señor tu Dios con todo tu corazón, y con toda tu alma, y con toda tu mente.",
  "Mateo 22:39":
    "Y el segundo es semejante: Amarás a tu prójimo como a ti mismo.",
  "Mateo 28:19":
    "Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo.",
  "Mateo 28:20":
    "Enseñándoles que guarden todas las cosas que os he mandado; y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo. Amén.",

  "Marcos 9:23":
    "Jesús le dijo: Si puedes creer, al que cree todo le es posible.",
  "Marcos 10:27":
    "Entonces Jesús, mirándolos, dijo: Para los hombres es imposible, mas para Dios, no; porque todas las cosas son posibles para Dios.",
  "Marcos 16:15":
    "Y les dijo: Id por todo el mundo y predicad el evangelio a toda criatura.",

  "Lucas 1:28":
    "Y entrando el ángel en donde ella estaba, dijo: ¡Salve, muy favorecida! El Señor es contigo; bendita tú entre las mujeres.",
  "Lucas 1:37": "Porque nada hay imposible para Dios.",
  "Lucas 1:45":
    "Y bienaventurada la que creyó, porque se cumplirá lo que le fue dicho de parte del Señor.",
  "Lucas 2:10-11":
    "Pero el ángel les dijo: No temáis; porque he aquí os doy nuevas de gran gozo, que será para todo el pueblo: que os ha nacido hoy, en la ciudad de David, un Salvador, que es CRISTO el Señor.",
  "Lucas 6:31":
    "Y como queréis que hagan los hombres con vosotros, así también haced vosotros con ellos.",
  "Lucas 12:7":
    "Pues aun los cabellos de vuestra cabeza están todos contados. No temáis, pues; más valéis vosotros que muchos pajarillos.",

  "Juan 1:1":
    "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.",
  "Juan 1:5":
    "La luz en las tinieblas resplandece, y las tinieblas no prevalecieron contra ella.",
  "Juan 1:14":
    "Y aquel Verbo fue hecho carne, y habitó entre nosotros (y vimos su gloria, gloria como del unigénito del Padre), lleno de gracia y de verdad.",
  "Juan 3:16":
    "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
  "Juan 8:12":
    "Otra vez Jesús les habló, diciendo: Yo soy la luz del mundo; el que me sigue, no andará en tinieblas, sino que tendrá la luz de la vida.",
  "Juan 10:10":
    "El ladrón no viene sino para hurtar y matar y destruir; yo he venido para que tengan vida, y para que la tengan en abundancia.",
  "Juan 11:25":
    "Le dijo Jesús: Yo soy la resurrección y la vida; el que cree en mí, aunque esté muerto, vivirá.",
  "Juan 14:1":
    "No se turbe vuestro corazón; creéis en Dios, creed también en mí.",
  "Juan 14:6":
    "Jesús le dijo: Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.",
  "Juan 14:27":
    "La paz os dejo, mi paz os doy; yo no os la doy como la da el mundo. No se turbe vuestro corazón, ni tenga miedo.",
  "Juan 15:5":
    "Yo soy la vid, vosotros los pámpanos; el que permanece en mí, y yo en él, éste lleva mucho fruto; porque separados de mí nada podéis hacer.",
  "Juan 15:13":
    "Nadie tiene mayor amor que este, que uno ponga su vida por sus amigos.",
  "Juan 16:33":
    "Estas cosas os he hablado para que en mí tengáis paz. En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo.",

  "Hechos 1:8":
    "Pero recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra.",
  "Hechos 2:38":
    "Pedro les dijo: Arrepentíos, y bautícese cada uno de vosotros en el nombre de Jesucristo para perdón de los pecados; y recibiréis el don del Espíritu Santo.",

  "Romanos 1:16":
    "Porque no me avergüenzo del evangelio, porque es poder de Dios para salvación a todo aquel que cree; al judío primeramente, y también al griego.",
  "Romanos 3:23":
    "Por cuanto todos pecaron, y están destituidos de la gloria de Dios.",
  "Romanos 5:8":
    "Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros.",
  "Romanos 6:23":
    "Porque la paga del pecado es muerte, mas la dádiva de Dios es vida eterna en Cristo Jesús Señor nuestro.",
  "Romanos 8:1":
    "Ahora, pues, ninguna condenación hay para los que están en Cristo Jesús, los que no andan conforme a la carne, sino conforme al Espíritu.",
  "Romanos 8:28":
    "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.",
  "Romanos 8:31":
    "¿Qué, pues, diremos a esto? Si Dios es por nosotros, ¿quién contra nosotros?",
  "Romanos 8:38-39":
    "Por lo cual estoy seguro de que ni la muerte, ni la vida, ni ángeles, ni principados, ni potestades, ni lo presente, ni lo por venir, ni lo alto, ni lo profundo, ni ninguna otra cosa creada nos podrá separar del amor de Dios, que es en Cristo Jesús Señor nuestro.",
  "Romanos 10:9":
    "Que si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo.",
  "Romanos 15:13":
    "Y el Dios de esperanza os llene de todo gozo y paz en el creer, para que abundéis en esperanza por el poder del Espíritu Santo.",

  "1 Corintios 10:13":
    "No os ha sobrevenido ninguna tentación que no sea humana; pero fiel es Dios, que no os dejará ser tentados más de lo que podéis resistir, sino que dará también juntamente con la tentación la salida, para que podáis soportar.",
  "1 Corintios 13:4":
    "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece.",
  "1 Corintios 13:13":
    "Y ahora permanecen la fe, la esperanza y el amor, estos tres; pero el mayor de ellos es el amor.",
  "1 Corintios 15:57":
    "Mas gracias sean dadas a Dios, que nos da la victoria por medio de nuestro Señor Jesucristo.",

  "2 Corintios 1:3-4":
    "Bendito sea el Dios y Padre de nuestro Señor Jesucristo, Padre de misericordias y Dios de toda consolación, el cual nos consuela en todas nuestras tribulaciones, para que podamos también nosotros consolar a los que están en cualquier tribulación, por medio de la consolación con que nosotros somos consolados por Dios.",
  "2 Corintios 5:7": "(Porque por fe andamos, no por vista.)",
  "2 Corintios 5:17":
    "De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas.",
  "2 Corintios 12:9":
    "Y me ha dicho: Bástate mi gracia; porque mi poder se perfecciona en la debilidad. Por tanto, de buena gana me gloriaré más bien en mis debilidades, para que repose sobre mí el poder de Cristo.",

  "Gálatas 2:20":
    "Con Cristo estoy juntamente crucificado, y ya no vivo yo, mas vive Cristo en mí; y lo que ahora vivo en la carne, lo vivo en la fe del Hijo de Dios, el cual me amó y se entregó a sí mismo por mí.",
  "Gálatas 5:22":
    "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe.",

  "Efesios 2:8":
    "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios.",
  "Efesios 3:20":
    "Y a Aquel que es poderoso para hacer todas las cosas mucho más abundantemente de lo que pedimos o entendemos, según el poder que actúa en nosotros.",
  "Efesios 6:10":
    "Por lo demás, hermanos míos, fortaleceos en el Señor, y en el poder de su fuerza.",

  "Filipenses 1:6":
    "Estando persuadido de esto, que el que comenzó en vosotros la buena obra, la perfeccionará hasta el día de Jesucristo.",
  "Filipenses 4:6-7":
    "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias. Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.",
  "Filipenses 4:8":
    "Por lo demás, hermanos, todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro, todo lo amable, todo lo que es de buen nombre; si hay virtud alguna, si algo digno de alabanza, en esto pensad.",
  "Filipenses 4:13": "Todo lo puedo en Cristo que me fortalece.",
  "Filipenses 4:19":
    "Mi Dios, pues, suplirá todo lo que os falta conforme a sus riquezas en gloria en Cristo Jesús.",

  "Hebreos 4:16":
    "Acerquémonos, pues, confiadamente al trono de la gracia, para alcanzar misericordia y hallar gracia para el oportuno socorro.",
  "Hebreos 11:1":
    "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.",
  "Hebreos 13:5":
    "Sean vuestras costumbres sin avaricia, contentos con lo que tenéis ahora; porque él dijo: No te desampararé, ni te dejaré.",
  "Hebreos 13:8": "Jesucristo es el mismo ayer, y hoy, y por los siglos.",

  "Santiago 1:5":
    "Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche, y le será dada.",
  "Santiago 1:17":
    "Toda buena dádiva y todo don perfecto desciende de lo alto, del Padre de las luces, en el cual no hay mudanza, ni sombra de variación.",
  "Santiago 4:8":
    "Acercaos a Dios, y él se acercará a vosotros. Pecadores, limpiad las manos; y vosotros los de doble ánimo, purificad vuestros corazones.",

  "1 Pedro 1:3":
    "Bendito el Dios y Padre de nuestro Señor Jesucristo, que según su grande misericordia nos hizo renacer para una esperanza viva, por la resurrección de Jesucristo de los muertos.",
  "1 Pedro 5:7":
    "Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.",

  "1 Juan 1:9":
    "Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad.",
  "1 Juan 3:1":
    "Mirad cuál amor nos ha dado el Padre, para que seamos llamados hijos de Dios; por esto el mundo no nos conoce, porque no le conoció a él.",
  "1 Juan 4:7":
    "Amados, amémonos unos a otros; porque el amor es de Dios. Todo aquel que ama, es nacido de Dios, y conoce a Dios.",
  "1 Juan 4:8": "El que no ama, no ha conocido a Dios; porque Dios es amor.",
  "1 Juan 4:18":
    "En el amor no hay temor, sino que el perfecto amor echa fuera el temor; porque el temor lleva en sí castigo. De donde el que teme, no ha sido perfeccionado en el amor.",
  "1 Juan 4:19": "Nosotros le amamos a él, porque él nos amó primero.",

  "Apocalipsis 3:20":
    "He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él, y cenaré con él, y él conmigo.",
  "Apocalipsis 21:4":
    "Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor; porque las primeras cosas pasaron.",
  "Apocalipsis 22:13":
    "Yo soy el Alfa y la Omega, el principio y el fin, el primero y el último.",
};

export async function getScriptureReferencesForTheme(
  theme: string,
  liturgicalSeason: string,
  language = "en",
): Promise<Array<{ reference: string; text: string }>> {
  const scriptureReferences: string[] = [];
  const database =
    language === "es"
      ? SPANISH_SCRIPTURE_DATABASE
      : CATHOLIC_SCRIPTURE_DATABASE;

  const themeKeywords = theme.toLowerCase();

  if (
    themeKeywords.includes("peace") ||
    themeKeywords.includes("calm") ||
    themeKeywords.includes("tranquil") ||
    themeKeywords.includes("paz") ||
    themeKeywords.includes("calma")
  ) {
    scriptureReferences.push(
      language === "es" ? "Juan 14:27" : "John 14:27",
      language === "es" ? "Filipenses 4:6-7" : "Philippians 4:6-7",
      language === "es" ? "Salmos 46:10" : "Psalm 46:10",
      language === "es" ? "Isaías 26:3" : "Isaiah 26:3",
      language === "es" ? "Salmos 46:1" : "Psalm 46:1",
    );
  }
  if (
    themeKeywords.includes("strength") ||
    themeKeywords.includes("courage") ||
    themeKeywords.includes("power") ||
    themeKeywords.includes("fuerza") ||
    themeKeywords.includes("valor") ||
    themeKeywords.includes("fortaleza")
  ) {
    scriptureReferences.push(
      language === "es" ? "Filipenses 4:13" : "Philippians 4:13",
      language === "es" ? "Josué 1:9" : "Joshua 1:9",
      language === "es" ? "Isaías 40:31" : "Isaiah 40:31",
      "Ephesians 6:10",
      language === "es" ? "Salmos 91:1" : "Psalm 91:1",
      language === "es" ? "Salmos 27:1" : "Psalm 27:1",
    );
  }
  if (
    themeKeywords.includes("forgiveness") ||
    themeKeywords.includes("sin") ||
    themeKeywords.includes("guilt") ||
    themeKeywords.includes("mercy") ||
    themeKeywords.includes("perdón") ||
    themeKeywords.includes("pecado") ||
    themeKeywords.includes("misericordia")
  ) {
    scriptureReferences.push(
      language === "es" ? "1 Juan 1:9" : "1 John 1:9",
      language === "es" ? "Salmos 51:10" : "Psalm 51:10",
      language === "es" ? "Joel 2:12-13" : "Joel 2:12-13",
      language === "es" ? "Salmos 103:8" : "Psalm 103:8",
      language === "es" ? "Salmos 103:12" : "Psalm 103:12",
    );
  }
  if (
    themeKeywords.includes("love") ||
    themeKeywords.includes("compassion") ||
    themeKeywords.includes("charity") ||
    themeKeywords.includes("amor") ||
    themeKeywords.includes("compasión") ||
    themeKeywords.includes("caridad")
  ) {
    scriptureReferences.push(
      language === "es" ? "1 Juan 4:19" : "1 John 4:19",
      language === "es" ? "Juan 3:16" : "John 3:16",
      "Romans 8:38-39",
      "1 Corinthians 13:4",
      "1 Corinthians 13:13",
      "John 15:13",
      language === "es" ? "1 Juan 4:8" : "1 John 4:8",
    );
  }
  if (
    themeKeywords.includes("fear") ||
    themeKeywords.includes("afraid") ||
    themeKeywords.includes("anxiety") ||
    themeKeywords.includes("miedo") ||
    themeKeywords.includes("temor") ||
    themeKeywords.includes("ansiedad")
  ) {
    scriptureReferences.push(
      language === "es" ? "Isaías 41:10" : "Isaiah 41:10",
      language === "es" ? "1 Juan 4:18" : "1 John 4:18",
      language === "es" ? "Mateo 6:26" : "Matthew 6:26",
      language === "es" ? "Salmos 27:1" : "Psalm 27:1",
      language === "es" ? "Isaías 43:1" : "Isaiah 43:1",
    );
  }
  if (
    themeKeywords.includes("hope") ||
    themeKeywords.includes("trust") ||
    themeKeywords.includes("faith") ||
    themeKeywords.includes("esperanza") ||
    themeKeywords.includes("confianza") ||
    themeKeywords.includes("fe")
  ) {
    scriptureReferences.push(
      "Romans 15:13",
      language === "es" ? "Proverbios 3:5-6" : "Proverbs 3:5-6",
      language === "es" ? "Jeremías 29:11" : "Jeremiah 29:11",
      language === "es" ? "Salmos 121:1-2" : "Psalm 121:1-2",
      language === "es" ? "Hebreos 11:1" : "Hebrews 11:1",
    );
  }
  if (
    themeKeywords.includes("wisdom") ||
    themeKeywords.includes("guidance") ||
    themeKeywords.includes("discernment") ||
    themeKeywords.includes("sabiduría") ||
    themeKeywords.includes("guía") ||
    themeKeywords.includes("discernimiento")
  ) {
    scriptureReferences.push(
      language === "es" ? "Santiago 1:5" : "James 1:5",
      language === "es" ? "Proverbios 2:6" : "Proverbs 2:6",
      language === "es" ? "Salmos 119:105" : "Psalm 119:105",
      language === "es" ? "Proverbios 16:3" : "Proverbs 16:3",
    );
  }
  if (
    themeKeywords.includes("healing") ||
    themeKeywords.includes("comfort") ||
    themeKeywords.includes("suffering") ||
    themeKeywords.includes("sanación") ||
    themeKeywords.includes("consuelo") ||
    themeKeywords.includes("sufrimiento")
  ) {
    scriptureReferences.push(
      language === "es" ? "Salmos 147:3" : "Psalm 147:3",
      language === "es" ? "2 Corintios 1:3-4" : "2 Corinthians 1:3-4",
      language === "es" ? "Mateo 5:4" : "Matthew 5:4",
      language === "es" ? "Salmos 34:18" : "Psalm 34:18",
      language === "es" ? "Isaías 53:5" : "Isaiah 53:5",
    );
  }
  if (
    themeKeywords.includes("rest") ||
    themeKeywords.includes("burden") ||
    themeKeywords.includes("weary") ||
    themeKeywords.includes("descanso") ||
    themeKeywords.includes("carga") ||
    themeKeywords.includes("cansancio")
  ) {
    scriptureReferences.push(
      language === "es" ? "Mateo 11:28" : "Matthew 11:28",
      language === "es" ? "Salmos 23:1" : "Psalm 23:1",
      language === "es" ? "Mateo 11:29" : "Matthew 11:29",
      language === "es" ? "Salmos 62:1" : "Psalm 62:1",
    );
  }
  if (
    themeKeywords.includes("purpose") ||
    themeKeywords.includes("calling") ||
    themeKeywords.includes("plan") ||
    themeKeywords.includes("propósito") ||
    themeKeywords.includes("llamado") ||
    themeKeywords.includes("plan")
  ) {
    scriptureReferences.push(
      "Romans 8:28",
      language === "es" ? "Jeremías 29:11" : "Jeremiah 29:11",
      language === "es" ? "Salmos 139:14" : "Psalm 139:14",
      "Ephesians 2:10",
      language === "es" ? "Jeremías 1:5" : "Jeremiah 1:5",
    );
  }
  if (
    themeKeywords.includes("gratitude") ||
    themeKeywords.includes("thanksgiving") ||
    themeKeywords.includes("praise") ||
    themeKeywords.includes("gratitud") ||
    themeKeywords.includes("alabanza")
  ) {
    scriptureReferences.push(
      language === "es" ? "Salmos 118:24" : "Psalm 118:24",
      "1 Thessalonians 5:16-18",
      language === "es" ? "Salmos 100:3" : "Psalm 100:3",
      language === "es" ? "Santiago 1:17" : "James 1:17",
    );
  }

  if (liturgicalSeason === "Advent") {
    scriptureReferences.push(
      language === "es" ? "Isaías 9:6" : "Isaiah 9:6",
      language === "es" ? "Isaías 40:31" : "Isaiah 40:31",
      language === "es" ? "Lucas 1:28" : "Luke 1:28",
      language === "es" ? "Lucas 1:37" : "Luke 1:37",
    );
  } else if (liturgicalSeason === "Christmas") {
    scriptureReferences.push(
      language === "es" ? "Lucas 2:10-11" : "Luke 2:10-11",
      language === "es" ? "Juan 1:1" : "John 1:1",
      language === "es" ? "Juan 3:16" : "John 3:16",
      language === "es" ? "Isaías 9:6" : "Isaiah 9:6",
      language === "es" ? "Juan 1:14" : "John 1:14",
    );
  } else if (liturgicalSeason === "Lent") {
    scriptureReferences.push(
      language === "es" ? "Joel 2:12-13" : "Joel 2:12-13",
      language === "es" ? "Salmos 51:10" : "Psalm 51:10",
      language === "es" ? "Salmos 51:12" : "Psalm 51:12",
      language === "es" ? "2 Corintios 5:17" : "2 Corinthians 5:17",
    );
  } else if (liturgicalSeason === "Easter") {
    scriptureReferences.push(
      "1 Corinthians 15:20",
      "Romans 8:38-39",
      language === "es" ? "Juan 11:25" : "John 11:25",
      language === "es" ? "1 Corintios 15:57" : "1 Corinthians 15:57",
      language === "es" ? "1 Pedro 1:3" : "1 Peter 1:3",
    );
  }

  if (scriptureReferences.length === 0) {
    scriptureReferences.push(
      language === "es" ? "Filipenses 4:13" : "Philippians 4:13",
      language === "es" ? "Juan 14:27" : "John 14:27",
      "Romans 15:13",
      language === "es" ? "Salmos 23:1" : "Psalm 23:1",
      language === "es" ? "Juan 3:16" : "John 3:16",
    );
  }

  const results: Array<{ reference: string; text: string }> = [];
  const uniqueReferences = [...new Set(scriptureReferences)].slice(0, 3);

  for (const ref of uniqueReferences) {
    const text = database[ref] || "";
    results.push({ reference: ref, text });
  }

  return results;
}
