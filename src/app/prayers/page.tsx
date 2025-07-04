"use client";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

import { useState } from "react";
import { AudioPlayer } from "../../components/AudioPlayer";
import AudioPrayerPlayer from "../../components/AudioPrayerPlayer";
import { Header } from "../../components/Header";
import { SisterGraceButton } from "../../components/SisterGraceChatbot";
import { useTranslation } from "../../context/LanguageContext";
import SpiritualArtwork from "../../components/SpiritualArtwork";

const prayerCategories = [
  {
    title: "Essential Prayers",
    description: "The foundation of Catholic prayer life",
    prayers: [
      {
        name: "Our Father",
        description: "The prayer Jesus taught us",
        duration: "1 min",
        difficulty: "Beginner",
        content: `Our Father, who art in heaven,
hallowed be thy name.
Thy kingdom come,
thy will be done,
on earth as it is in heaven.
Give us this day our daily bread,
and forgive us our trespasses,
as we forgive those who trespass against us,
and lead us not into temptation,
but deliver us from evil.
Amen.`,
      },
      {
        name: "Hail Mary",
        description: "Honoring the Mother of God",
        duration: "1 min",
        difficulty: "Beginner",
        content: `Hail Mary, full of grace,
the Lord is with thee.
Blessed art thou amongst women,
and blessed is the fruit of thy womb, Jesus.
Holy Mary, Mother of God,
pray for us sinners,
now and at the hour of our death.
Amen.`,
      },
      {
        name: "Glory Be",
        description: "Praise to the Trinity",
        duration: "30 sec",
        difficulty: "Beginner",
        content: `Glory be to the Father,
and to the Son,
and to the Holy Spirit,
as it was in the beginning,
is now, and ever shall be,
world without end.
Amen.`,
      },
    ],
  },
  {
    title: "The Holy Rosary",
    description: "Meditative prayer with Our Lady",
    prayers: [
      {
        name: "Joyful Mysteries",
        description: "Monday & Saturday - The early life of Jesus",
        duration: "20 min",
        difficulty: "Intermediate",
        content:
          "The Annunciation, The Visitation, The Nativity, The Presentation, The Finding in the Temple",
      },
      {
        name: "Sorrowful Mysteries",
        description: "Tuesday & Friday - The Passion of Christ",
        duration: "20 min",
        difficulty: "Intermediate",
        content:
          "The Agony, The Scourging, The Crowning with Thorns, The Carrying of the Cross, The Crucifixion",
      },
      {
        name: "Glorious Mysteries",
        description: "Wednesday & Sunday - The triumph of Christ",
        duration: "20 min",
        difficulty: "Intermediate",
        content:
          "The Resurrection, The Ascension, Pentecost, The Assumption, The Coronation of Mary",
      },
      {
        name: "Luminous Mysteries",
        description: "Thursday - The public ministry of Jesus",
        duration: "20 min",
        difficulty: "Intermediate",
        content:
          "The Baptism, The Wedding at Cana, The Proclamation, The Transfiguration, The Eucharist",
      },
    ],
  },
  {
    title: "Divine Mercy",
    description: "Prayers revealed to St. Faustina",
    prayers: [
      {
        name: "Divine Mercy Chaplet",
        description: "Prayer for God's mercy on us and the world",
        duration: "15 min",
        difficulty: "Intermediate",
        content:
          "Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your Dearly Beloved Son...",
      },
      {
        name: "Jesus, I Trust in You",
        description: "Short prayer of surrender",
        duration: "1 min",
        difficulty: "Beginner",
        content:
          "Jesus, I trust in You. Jesus, I trust in You. Jesus, I trust in You.",
      },
    ],
  },
];

export default function Prayers() {
  const { t } = useTranslation();
  const [selectedPrayer, setSelectedPrayer] = useState<{
    name: string;
    description: string;
    duration: string;
    difficulty: string;
    content: string;
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="min-h-screen bg-[#040404] text-white flex flex-col relative">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 py-16 max-w-6xl">
          <div className="shimmer w-full h-full absolute top-0 left-0 pointer-events-none" />

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="heading-gradient">{t.prayers.title}</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t.prayers.description}
            </p>

            {/* Prayer Spiritual Artwork */}
            <div className="mt-12 flex justify-center">
              <SpiritualArtwork
                type="prayer"
                size="md"
                showQuote={true}
                className="max-w-md"
              />
            </div>
          </div>

          {/* Prayer Modal */}
          {selectedPrayer && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        <span className="heading-gradient">
                          {selectedPrayer.name}
                        </span>
                      </h3>
                      <p className="text-gray-400">
                        {selectedPrayer.description}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-[#6b9bcc]">
                          ⏱️ {selectedPrayer.duration}
                        </span>
                        <span className="text-[#6b9bcc]">
                          📿 {selectedPrayer.difficulty}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedPrayer(null)}
                      className="text-gray-400 hover:text-white text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="bg-black/20 p-6 rounded-lg border border-gray-700 mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                      <span className="text-2xl">✝️</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-4 text-center text-[#6b9bcc]">
                      Essie's Guidance
                    </h4>
                    <p className="text-gray-300 text-center italic">
                      "Take a moment to center yourself before God. Breathe
                      deeply and open your heart to receive His grace through
                      this sacred prayer. Let the words flow from your soul, not
                      just your lips."
                    </p>
                  </div>

                  {/* Audio Prayer Player */}
                  <div className="mb-6">
                    <AudioPrayerPlayer 
                      text={selectedPrayer.content}
                      title={`${selectedPrayer.name} - Audio Prayer`}
                      className="mb-4"
                    />
                  </div>

                  <div className="text-center">
                    <pre className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap font-serif">
                      {selectedPrayer.content}
                    </pre>
                  </div>

                  <div className="flex gap-4 mt-8 justify-center">
                    <button className="button secondary">
                      Save to Favorites
                    </button>
                    <button className="button">Begin Prayer Session</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {prayerCategories.map((category, index) => (
              <button
                key={category.title}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-3 rounded-lg border transition-all ${
                  activeCategory === index
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
                  {prayerCategories[activeCategory].title}
                </span>
              </h2>
              <p className="text-gray-300 text-lg">
                {prayerCategories[activeCategory].description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prayerCategories[activeCategory].prayers.map((prayer, index) => (
                <div
                  key={prayer.name}
                  className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800 hover:border-[#6b9bcc] transition-all group cursor-pointer"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-2xl">🙏</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-gradient">
                      {prayer.name}
                    </h3>
                    <p className="text-gray-400 mb-4">{prayer.description}</p>

                    <div className="flex justify-center gap-4 text-sm text-gray-400 mb-6">
                      <span className="flex items-center gap-1">
                        <span className="text-[#6b9bcc]">⏱️</span>
                        {prayer.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-[#6b9bcc]">📿</span>
                        {prayer.difficulty}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedPrayer(prayer)}
                      className="button w-full"
                    >
                      Begin Prayer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Essie's Daily Recommendation */}
          <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">E</span>
            </div>

            <h2 className="text-2xl font-bold mb-4">
              <span className="heading-gradient">Essie's Prayer for Today</span>
            </h2>

            <blockquote className="text-lg text-gray-300 italic mb-6 leading-relaxed">
              "Today, I encourage you to spend extra time with the Rosary. Our
              Lady is always ready to intercede for us and guide us closer to
              her Son. Let the repetitive prayers quiet your mind and open your
              heart to God's peace."
            </blockquote>

            {/* Rosary Spiritual Artwork */}
            <div className="mb-8 flex justify-center">
              <SpiritualArtwork
                type="saints"
                size="sm"
                showQuote={false}
                className="max-w-xs"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setActiveCategory(1);
                  setSelectedPrayer(prayerCategories[1].prayers[0]);
                }}
                className="button"
              >
                Pray the Rosary Today
              </button>
              <a href="/about" className="button secondary">
                More from Essie
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <SisterGraceButton />
    </div>
  );
}
