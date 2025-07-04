"use client";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

import { Header } from "../../components/Header";
import { SisterGraceButton } from "../../components/SisterGraceChatbot";
import { useTranslation } from "../../context/LanguageContext";
import SpiritualArtwork from "../../components/SpiritualArtwork";

import { useState } from "react";

const saintCategories = [
  {
    title: "Popular Saints",
    description: "Beloved saints for daily intercession and guidance",
    saints: [
      {
        name: "St. Thérèse of Lisieux",
        title: "The Little Flower",
        feastDay: "October 1",
        patronOf: "Missions, France, Florists",
        biography:
          "Known for her 'Little Way' of spiritual childhood, St. Thérèse taught that sanctity is achievable through small acts of love and surrender to God.",
        prayer:
          "O Saint Thérèse of the Child Jesus, you said that you would spend your heaven doing good upon earth. Grant that I may love our Lord Jesus as you loved Him, and may serve Him with that childlike confidence which was the secret of your sanctity.",
        essieMessage:
          "Thérèse shows us that holiness isn't about grand gestures, but about loving God in the small moments of daily life. Her Little Way teaches us to approach our heavenly Father with the trust of a child.",
        image: "🌹",
        languages: ["English", "French", "Spanish", "Portuguese"],
      },
      {
        name: "St. Joseph",
        title: "Foster Father of Jesus",
        feastDay: "March 19",
        patronOf: "Workers, Fathers, Universal Church",
        biography:
          "The silent saint who protected the Holy Family, St. Joseph is a model of faithful obedience and trust in God's plan.",
        prayer:
          "O St. Joseph, foster father of Jesus and spouse of the Virgin Mary, pray for us and our families. Help us to trust in God's providence as you did, and guide us in our daily work and responsibilities.",
        essieMessage:
          "Joseph teaches us the power of quiet faithfulness. Even when we don't understand God's plan, we can trust and obey like this holy carpenter who said yes to the impossible.",
        image: "🔨",
        languages: ["English", "Spanish", "Italian", "Portuguese", "Latin"],
      },
      {
        name: "St. Teresa of Avila",
        title: "Mystic and Doctor of the Church",
        feastDay: "October 15",
        patronOf: "Spain, Religious, Contemplatives",
        biography:
          "A great mystic and reformer, St. Teresa taught about the interior castle of the soul and the stages of mystical prayer.",
        prayer:
          "O glorious St. Teresa, seraph of divine love, who taught the way of perfection through prayer and contemplation, help me to grow in union with God through a life of prayer.",
        essieMessage:
          "Teresa shows us that prayer is not just talking to God, but entering into intimate friendship with Him. Her Interior Castle teaches us that our souls are magnificent dwellings where God desires to meet us.",
        image: "🏰",
        languages: ["English", "Spanish", "French", "Italian"],
      },
    ],
  },
  {
    title: "Saints for Special Needs",
    description: "Saints who intercede for specific life situations",
    saints: [
      {
        name: "St. Jude Thaddeus",
        title: "Patron of Hopeless Cases",
        feastDay: "October 28",
        patronOf: "Desperate Situations, Lost Causes",
        biography:
          "One of the twelve apostles, St. Jude is invoked by those facing seemingly impossible situations.",
        prayer:
          "O most holy apostle St. Jude, faithful servant and friend of Jesus, pray for me who am so miserable. Help me in my present need. In return, I promise to make your name known and to have you honored.",
        essieMessage:
          "When life feels overwhelming and solutions seem impossible, St. Jude reminds us that nothing is hopeless with God. He intercedes for us in our darkest moments.",
        image: "🙏",
        languages: ["English", "Spanish", "Portuguese", "French"],
      },
      {
        name: "St. Rita of Cascia",
        title: "Saint of the Impossible",
        feastDay: "May 22",
        patronOf: "Difficult Marriages, Motherhood, Abuse Victims",
        biography:
          "After enduring a difficult marriage, St. Rita became a nun and was known for her devotion to Christ's passion.",
        prayer:
          "O holy patroness of those in need, St. Rita, so humble, so pure, so mortified, so patient and of such compassionate love for your Crucified Jesus, come to my assistance.",
        essieMessage:
          "Rita teaches us that even in the most difficult relationships and circumstances, God can work miracles. Her rose reminds us that beauty can bloom from suffering.",
        image: "🌹",
        languages: ["English", "Spanish", "Italian", "Portuguese"],
      },
      {
        name: "St. Anthony of Padua",
        title: "Wonder Worker of Padua",
        feastDay: "June 13",
        patronOf: "Lost Items, Poor, Travelers",
        biography:
          "Known for his powerful preaching and miraculous healing, St. Anthony helps us find what we have lost.",
        prayer:
          "St. Anthony, perfect imitator of Jesus, who received from God the special power of restoring lost things, grant that I may find what I have lost.",
        essieMessage:
          "Anthony helps us find not just lost objects, but lost hope, lost faith, and lost direction. He reminds us that God never loses track of us, even when we feel lost.",
        image: "🔍",
        languages: ["English", "Spanish", "Italian", "Portuguese", "Latin"],
      },
    ],
  },
  {
    title: "Modern Saints",
    description: "Saints for our contemporary world",
    saints: [
      {
        name: "St. John Paul II",
        title: "Pope of the Family",
        feastDay: "October 22",
        patronOf: "Families, World Youth Day, Poland",
        biography:
          "The Polish pope who helped end communism and taught about the dignity of human life and family.",
        prayer:
          "St. John Paul II, you were a living example of faith, hope, and love. Help me to live courageously for Christ and to defend the dignity of every human life.",
        essieMessage:
          "John Paul II shows us how to be saints in the modern world. His message 'Be not afraid!' encourages us to live our faith boldly in contemporary society.",
        image: "⛪",
        languages: ["English", "Spanish", "Polish", "Italian", "French"],
      },
      {
        name: "St. Padre Pio",
        title: "Miracle Worker of San Giovanni",
        feastDay: "September 23",
        patronOf: "Civil Defense, Adolescents, Stress Relief",
        biography:
          "The stigmatized Capuchin friar known for his mystical gifts and devotion to the suffering Christ.",
        prayer:
          "St. Padre Pio, you bore the wounds of Christ and understood suffering intimately. Help me to unite my sufferings with Jesus and to trust in His mercy.",
        essieMessage:
          "Padre Pio teaches us that our sufferings, when united with Christ's, become powerful prayers. His life shows us that holiness often comes through embracing the cross.",
        image: "✋",
        languages: ["English", "Italian", "Spanish", "Portuguese"],
      },
      {
        name: "St. Mother Teresa",
        title: "Saint of the Gutters",
        feastDay: "September 5",
        patronOf: "Missionaries, Poor, Sick",
        biography:
          "The Albanian nun who served the poorest of the poor in Calcutta and taught the world about loving service.",
        prayer:
          "St. Mother Teresa, help me to see Jesus in the faces of the poor and suffering. Give me a heart of compassion and hands ready to serve.",
        essieMessage:
          "Mother Teresa shows us that holiness is found in loving service to the least among us. Her example teaches us to do small things with great love.",
        image: "❤️",
        languages: ["English", "Spanish", "French", "Italian", "Portuguese"],
      },
    ],
  },
];

const dailyMessages = [
  {
    date: "Today",
    saint: "St. Thérèse of Lisieux",
    message:
      "Remember, dear soul, that even the smallest acts of love done with great faith can move mountains. Today, offer your simple tasks as prayers.",
    scripture: "Matthew 17:20",
    action: "Perform one small act of kindness today as a prayer.",
  },
  {
    date: "Yesterday",
    saint: "St. Joseph",
    message:
      "In silence and trust, great works are accomplished. Let your faithful work today be a prayer, just as my carpentry was worship.",
    scripture: "Psalm 127:1",
    action: "Offer your work today to God with quiet devotion.",
  },
];

export default function Saints() {
  const { t } = useTranslation();
  const [selectedSaint, setSelectedSaint] = useState<{
    name: string;
    title: string;
    feastDay: string;
    patronOf: string;
    biography: string;
    prayer: string;
    essieMessage: string;
    image: string;
    languages: string[];
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="min-h-screen bg-[#040404] text-white flex flex-col relative">
      <Header />

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 py-16 max-w-6xl">
          <div className="shimmer w-full h-full absolute top-0 left-0 pointer-events-none" />

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="heading-gradient">{t.saints.title}</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t.saints.description}
            </p>

            {/* Saints Spiritual Artwork */}
            <div className="mt-12 flex justify-center">
              <SpiritualArtwork
                type="saints"
                size="lg"
                showQuote={true}
                className="max-w-md"
              />
            </div>
          </div>

          {/* Saint Modal */}
          {selectedSaint && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-6xl">{selectedSaint.image}</div>
                      <div>
                        <h3 className="text-3xl font-bold mb-2">
                          <span className="heading-gradient">
                            {selectedSaint.name}
                          </span>
                        </h3>
                        <p className="text-gray-400 text-lg">
                          {selectedSaint.title}
                        </p>
                        <div className="flex gap-6 mt-3 text-sm">
                          <span className="text-[#6b9bcc]">
                            🗓️ {selectedSaint.feastDay}
                          </span>
                          <span className="text-[#6b9bcc]">
                            🙏 Patron of {selectedSaint.patronOf}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedSaint(null)}
                      className="text-gray-400 hover:text-white text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                      <div className="bg-black/20 p-6 rounded-lg border border-gray-700">
                        <h4 className="text-lg font-semibold mb-4 text-[#6b9bcc]">
                          Biography
                        </h4>
                        <p className="text-gray-300 leading-relaxed">
                          {selectedSaint.biography}
                        </p>
                      </div>

                      <div className="bg-black/20 p-6 rounded-lg border border-gray-700">
                        <h4 className="text-lg font-semibold mb-4 text-[#6b9bcc]">
                          Available Languages
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSaint.languages.map((lang) => (
                            <span
                              key={lang}
                              className="px-3 py-1 bg-gradient-to-r from-[#5261a1] to-[#6b9bcc] rounded-full text-sm"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-black/20 p-6 rounded-lg border border-gray-700">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            E
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold mb-4 text-center text-[#6b9bcc]">
                          Essie's Reflection
                        </h4>
                        <p className="text-gray-300 text-center leading-relaxed italic">
                          "{selectedSaint.essieMessage}"
                        </p>
                      </div>

                      <div className="bg-black/20 p-6 rounded-lg border border-gray-700">
                        <h4 className="text-lg font-semibold mb-4 text-[#6b9bcc]">
                          Prayer to {selectedSaint.name}
                        </h4>
                        <p className="text-gray-300 leading-relaxed italic">
                          {selectedSaint.prayer}
                        </p>
                        <p className="text-gray-400 text-center mt-4 text-sm">
                          Amen.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button className="button secondary">
                      Add to My Saints
                    </button>
                    <button className="button">Begin Novena</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Daily Spiritual Messages */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="heading-gradient">
                Daily Messages from the Saints
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dailyMessages.map((msg, index) => (
                <div
                  key={msg.date}
                  className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                      <span className="text-xl">📜</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{msg.date}</h3>
                      <p className="text-sm text-gray-400">
                        Message from {msg.saint}
                      </p>
                    </div>
                  </div>

                  <blockquote className="text-gray-300 italic mb-4 leading-relaxed">
                    "{msg.message}"
                  </blockquote>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-[#6b9bcc]">📖</span>
                      <span className="text-gray-400">
                        Scripture: {msg.scripture}
                      </span>
                    </div>
                    <div className="flex items-start space-x-2 text-sm">
                      <span className="text-[#6b9bcc]">✨</span>
                      <span className="text-gray-400">
                        Today's Action: {msg.action}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {saintCategories.map((category) => (
              <button
                key={category.title}
                onClick={() =>
                  setActiveCategory(saintCategories.indexOf(category))
                }
                className={`px-6 py-3 rounded-lg border transition-all ${
                  activeCategory === saintCategories.indexOf(category)
                    ? "bg-gradient-to-r from-[#5261a1] to-[#6b9bcc] border-[#6b9bcc]"
                    : "bg-black/30 border-gray-800 hover:border-[#6b9bcc]"
                }`}
              >
                <span className="font-semibold">{category.title}</span>
              </button>
            ))}
          </div>

          {/* Active Category Content */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                <span className="heading-gradient">
                  {saintCategories[activeCategory].title}
                </span>
              </h2>
              <p className="text-gray-300 text-lg">
                {saintCategories[activeCategory].description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {saintCategories[activeCategory].saints.map((saint) => (
                <div
                  key={saint.name}
                  className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800 hover:border-[#6b9bcc] transition-all group cursor-pointer"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                      {saint.image}
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-gradient">
                      {saint.name}
                    </h3>
                    <p className="text-gray-400 mb-3">{saint.title}</p>
                    <p className="text-sm text-[#6b9bcc] mb-4">
                      Feast Day: {saint.feastDay}
                    </p>

                    <div className="text-sm text-gray-400 mb-6">
                      <p className="mb-2">Patron of:</p>
                      <p className="text-gray-300">{saint.patronOf}</p>
                    </div>

                    <button
                      onClick={() => setSelectedSaint(saint)}
                      className="button w-full"
                    >
                      {t.saints.learnAndPray}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Essie's Saint Recommendation */}
          <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">E</span>
            </div>

            <h2 className="text-2xl font-bold mb-4">
              <span className="heading-gradient">
                {t.saints.essiesSaintForToday}
              </span>
            </h2>

            <blockquote className="text-lg text-gray-300 italic mb-6 leading-relaxed">
              "Today I encourage you to turn to St. Thérèse of Lisieux. Her
              Little Way reminds us that we don't need to be perfect to be
              holy—we just need to love God with childlike trust. Let her guide
              you in finding holiness in the ordinary moments of your day."
            </blockquote>

            {/* St. Thérèse Spiritual Artwork */}
            <div className="mb-8 flex justify-center">
              <SpiritualArtwork
                type="cross"
                size="sm"
                showQuote={false}
                className="max-w-xs"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setActiveCategory(0);
                  setSelectedSaint(saintCategories[0].saints[0]);
                }}
                className="button"
              >
                {t.saints.prayWithStTherese}
              </button>
              <a href="/about" className="button secondary">
                {t.saints.moreFromEssie}
              </a>
            </div>
          </div>
        </div>
      </main>

      <SisterGraceButton />
    </div>
  );
}
