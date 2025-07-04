"use client";

import { Header } from "../../components/Header";
import { SisterGraceButton } from "../../components/SisterGraceChatbot";
import { AudioPlayer } from "../../components/AudioPlayer";

import { useState } from "react";

const meditationCategories = [
  {
    title: "Lectio Divina",
    description: "Divine Reading - Ancient practice of scriptural meditation",
    meditations: [
      {
        name: "The Beatitudes",
        description: "Jesus' teaching on true happiness",
        duration: "15 min",
        difficulty: "Beginner",
        scripture: "Matthew 5:3-12",
        content:
          "Blessed are the poor in spirit, for theirs is the kingdom of heaven...",
        guidance:
          "Let Essie guide you through this foundational teaching of Jesus, reflecting on each beatitude and how it applies to your spiritual journey.",
      },
      {
        name: "The Good Shepherd",
        description: "Finding comfort in Christ's care",
        duration: "12 min",
        difficulty: "Beginner",
        scripture: "John 10:1-16",
        content:
          "I am the good shepherd. The good shepherd lays down his life for the sheep...",
        guidance:
          "Essie will help you meditate on Jesus as your personal shepherd, reflecting on His love and protection in your daily life.",
      },
      {
        name: "Mary's Magnificat",
        description: "Our Lady's song of praise",
        duration: "10 min",
        difficulty: "Intermediate",
        scripture: "Luke 1:46-55",
        content:
          "My soul magnifies the Lord, and my spirit rejoices in God my Savior...",
        guidance:
          "Join Essie in contemplating Mary's beautiful prayer of surrender and praise, learning from her perfect 'yes' to God.",
      },
    ],
  },
  {
    title: "Eucharistic Adoration",
    description: "Silent prayer before the Blessed Sacrament",
    meditations: [
      {
        name: "Sacred Heart Meditation",
        description: "Contemplating Jesus' love for humanity",
        duration: "20 min",
        difficulty: "Intermediate",
        scripture: "John 19:34",
        content: "From His pierced heart flows infinite love and mercy...",
        guidance:
          "Essie guides you in contemplating the Sacred Heart of Jesus, reflecting on His infinite love and mercy that flows from the Eucharist.",
      },
      {
        name: "Spiritual Communion",
        description: "Uniting with Jesus when unable to receive physically",
        duration: "8 min",
        difficulty: "Beginner",
        scripture: "John 6:56",
        content:
          "My Jesus, I believe that You are present in the Blessed Sacrament...",
        guidance:
          "When you cannot attend Mass, Essie helps you make a spiritual communion, drawing close to Jesus in prayer.",
      },
      {
        name: "Corpus Christi Reflection",
        description: "The gift of the Eucharist in our lives",
        duration: "25 min",
        difficulty: "Advanced",
        scripture: "1 Corinthians 11:23-26",
        content: "This is my body, which is given for you...",
        guidance:
          "Essie leads you in deep contemplation of the Eucharistic mystery, the source and summit of Catholic life.",
      },
    ],
  },
  {
    title: "Ignatian Spirituality",
    description: "Prayer methods of St. Ignatius of Loyola",
    meditations: [
      {
        name: "The Nativity Scene",
        description: "Imaginative prayer with the Holy Family",
        duration: "18 min",
        difficulty: "Intermediate",
        scripture: "Luke 2:1-20",
        content: "And she gave birth to her firstborn son...",
        guidance:
          "Using St. Ignatius' method, Essie helps you place yourself in the Nativity scene, experiencing God's love through imagination and emotion.",
      },
      {
        name: "The Examen",
        description: "Daily examination of conscience and gratitude",
        duration: "10 min",
        difficulty: "Beginner",
        scripture: "1 Thessalonians 5:17",
        content: "Pray without ceasing...",
        guidance:
          "Essie guides you through the Ignatian Examen, helping you recognize God's presence in your daily experiences and grow in gratitude.",
      },
      {
        name: "Contemplation on Love",
        description: "Recognizing God's love in all creation",
        duration: "30 min",
        difficulty: "Advanced",
        scripture: "1 John 4:16",
        content: "God is love, and whoever abides in love abides in God...",
        guidance:
          "In this profound meditation, Essie helps you contemplate how God's love permeates every aspect of creation and your personal life.",
      },
    ],
  },
];

export default function Meditations() {
  const [selectedMeditation, setSelectedMeditation] = useState<{
    name: string;
    description: string;
    duration: string;
    difficulty: string;
    scripture: string;
    content: string;
    guidance: string;
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [meditationStarted, setMeditationStarted] = useState(false);

  const startMeditation = () => {
    setMeditationStarted(true);
    // Simulated meditation timer - would implement actual guided meditation
  };

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
              <span className="heading-gradient">Sacred Meditations</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Contemplative practices rooted in Catholic tradition, lovingly
              guided by Essie to deepen your relationship with God.
            </p>
          </div>

          {/* Sacred Music for Meditation */}
          <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 text-center mb-16 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6b9bcc]/5 to-[#5261a1]/5 rounded-lg"></div>

            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">🎼</span>
              </div>

              <h2 className="text-3xl font-bold mb-4">
                <span className="heading-gradient">
                  Sacred Music for Meditation
                </span>
              </h2>

              <p className="text-gray-300 mb-4 max-w-2xl mx-auto text-lg">
                Enhance your meditation experience with sacred music. Let the
                beautiful melodies create a peaceful atmosphere for your prayer
                and reflection.
              </p>

              <div className="bg-[#6b9bcc]/10 border border-[#6b9bcc]/30 rounded-lg p-4 mb-6 max-w-xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-xl">🎵</span>
                  <span className="text-[#6b9bcc] font-semibold">
                    YouTube Sacred Music Experience
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Click below to open 1 hour of Gregorian chant and sacred choir
                  music in a new tab
                </p>
              </div>

              <div className="flex justify-center">
                <AudioPlayer
                  title="Sacred Meditation Music"
                  audioType="sacred-music"
                  youtubeUrl="https://www.youtube.com/watch?v=Ed90FUyE4rM"
                />
              </div>

              <div className="mt-4 text-xs text-gray-500">
                ✨ Perfect for meditation, prayer, and spiritual reflection
              </div>
            </div>
          </div>

          {/* Meditation Modal */}
          {selectedMeditation && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                  {!meditationStarted ? (
                    <>
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-3xl font-bold mb-2">
                            <span className="heading-gradient">
                              {selectedMeditation.name}
                            </span>
                          </h3>
                          <p className="text-gray-400 text-lg">
                            {selectedMeditation.description}
                          </p>
                          <div className="flex gap-6 mt-3 text-sm">
                            <span className="text-[#6b9bcc]">
                              ⏱️ {selectedMeditation.duration}
                            </span>
                            <span className="text-[#6b9bcc]">
                              📿 {selectedMeditation.difficulty}
                            </span>
                            <span className="text-[#6b9bcc]">
                              📖 {selectedMeditation.scripture}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedMeditation(null);
                            setMeditationStarted(false);
                          }}
                          className="text-gray-400 hover:text-white text-2xl"
                        >
                          ×
                        </button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <div className="bg-black/20 p-6 rounded-lg border border-gray-700">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">
                              E
                            </span>
                          </div>
                          <h4 className="text-lg font-semibold mb-4 text-center text-[#6b9bcc]">
                            Essie's Guidance
                          </h4>
                          <p className="text-gray-300 text-center leading-relaxed">
                            {selectedMeditation.guidance}
                          </p>
                        </div>

                        <div className="bg-black/20 p-6 rounded-lg border border-gray-700">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                            <span className="text-2xl">📖</span>
                          </div>
                          <h4 className="text-lg font-semibold mb-4 text-center text-[#6b9bcc]">
                            Scripture Focus
                          </h4>
                          <p className="text-gray-300 text-center italic">
                            "{selectedMeditation.content}"
                          </p>
                          <p className="text-gray-400 text-center mt-3 text-sm">
                            — {selectedMeditation.scripture}
                          </p>
                        </div>
                      </div>

                      <div className="bg-black/20 p-6 rounded-lg border border-gray-700 mb-8">
                        <h4 className="text-lg font-semibold mb-4 text-[#6b9bcc]">
                          Preparation for Meditation
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                          <div className="text-center">
                            <div className="text-2xl mb-2">🕯️</div>
                            <p>
                              <strong>Sacred Space</strong>
                              <br />
                              Find a quiet place free from distractions
                            </p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl mb-2">🙏</div>
                            <p>
                              <strong>Prayer Posture</strong>
                              <br />
                              Sit comfortably with your back straight
                            </p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl mb-2">💨</div>
                            <p>
                              <strong>Breathe Deeply</strong>
                              <br />
                              Take three slow, deep breaths to center yourself
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 justify-center">
                        <button className="button secondary">
                          Save for Later
                        </button>
                        <button onClick={startMeditation} className="button">
                          Begin Meditation
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-6">
                        <span className="heading-gradient">
                          Meditation in Progress
                        </span>
                      </h3>

                      <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                        <span className="text-4xl">🕊️</span>
                      </div>

                      <p className="text-xl text-gray-300 mb-8">
                        Rest in God's presence...
                      </p>

                      <div className="bg-black/20 p-6 rounded-lg border border-gray-700 mb-8">
                        <p className="text-gray-300 italic">
                          "Be still and know that I am God." — Psalm 46:10
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedMeditation(null);
                          setMeditationStarted(false);
                        }}
                        className="button"
                      >
                        Complete Meditation
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {meditationCategories.map((category) => (
              <button
                key={category.title}
                onClick={() =>
                  setActiveCategory(meditationCategories.indexOf(category))
                }
                className={`px-6 py-3 rounded-lg border transition-all ${
                  activeCategory === meditationCategories.indexOf(category)
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
                  {meditationCategories[activeCategory].title}
                </span>
              </h2>
              <p className="text-gray-300 text-lg">
                {meditationCategories[activeCategory].description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meditationCategories[activeCategory].meditations.map(
                (meditation) => (
                  <div
                    key={meditation.name}
                    className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800 hover:border-[#6b9bcc] transition-all group cursor-pointer"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-2xl">🧘‍♀️</span>
                      </div>

                      <h3 className="text-xl font-bold mb-2 text-gradient">
                        {meditation.name}
                      </h3>
                      <p className="text-gray-400 mb-3">
                        {meditation.description}
                      </p>
                      <p className="text-sm text-[#6b9bcc] mb-4">
                        {meditation.scripture}
                      </p>

                      <div className="flex justify-center gap-4 text-sm text-gray-400 mb-6">
                        <span className="flex items-center gap-1">
                          <span className="text-[#6b9bcc]">⏱️</span>
                          {meditation.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-[#6b9bcc]">📿</span>
                          {meditation.difficulty}
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedMeditation(meditation)}
                        className="button w-full"
                      >
                        Begin Meditation
                      </button>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Essie's Daily Meditation */}
          <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">E</span>
            </div>

            <h2 className="text-2xl font-bold mb-4">
              <span className="heading-gradient">
                Essie's Meditation for Today
              </span>
            </h2>

            <blockquote className="text-lg text-gray-300 italic mb-6 leading-relaxed">
              "Today, I invite you to practice the Examen with me. Take 10
              minutes to reflect on your day, recognizing God's presence in both
              joys and challenges. This simple practice will transform how you
              see God working in your life."
            </blockquote>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setActiveCategory(2);
                  setSelectedMeditation(meditationCategories[2].meditations[1]);
                }}
                className="button"
              >
                Practice the Examen
              </button>
              <a href="/about" className="button secondary">
                More from Essie
              </a>
            </div>
          </div>
        </div>
      </main>

      <SisterGraceButton />
    </div>
  );
}
