"use client";

import { Header } from "../../components/Header";
import { SisterGraceButton } from "../../components/SisterGraceChatbot";

import { useState } from "react";

const divineOfficeHours = [
  {
    name: "Office of Readings",
    latin: "Officium Lectionis",
    time: "After Midnight",
    description: "Scripture readings and writings from the saints",
    duration: "20-30 min",
    psalms: ["Psalm 95", "Psalm 24", "Canticle"],
    available: true,
  },
  {
    name: "Morning Prayer",
    latin: "Lauds",
    time: "Dawn / 6:00 AM",
    description: "The Church's morning praise to God",
    duration: "15-20 min",
    psalms: ["Morning Psalm", "Canticle of Zechariah", "Intercessions"],
    available: true,
  },
  {
    name: "Midmorning Prayer",
    latin: "Terce",
    time: "9:00 AM",
    description: "Prayer of the third hour",
    duration: "5-10 min",
    psalms: ["Short Psalm", "Brief Reading"],
    available: true,
  },
  {
    name: "Midday Prayer",
    latin: "Sext",
    time: "12:00 PM",
    description: "Prayer of the sixth hour",
    duration: "5-10 min",
    psalms: ["Short Psalm", "Brief Reading"],
    available: true,
  },
  {
    name: "Midafternoon Prayer",
    latin: "None",
    time: "3:00 PM",
    description: "Prayer of the ninth hour",
    duration: "5-10 min",
    psalms: ["Short Psalm", "Brief Reading"],
    available: true,
  },
  {
    name: "Evening Prayer",
    latin: "Vespers",
    time: "Sunset / 6:00 PM",
    description: "The Church's evening praise to God",
    duration: "15-20 min",
    psalms: ["Evening Psalm", "Canticle of Mary", "Intercessions"],
    available: true,
  },
  {
    name: "Night Prayer",
    latin: "Compline",
    time: "Before Sleep",
    description: "Peaceful conclusion to the day",
    duration: "10-15 min",
    psalms: ["Night Psalm", "Canticle of Simeon"],
    available: true,
  },
];

const liturgicalInfo = {
  season: "Ordinary Time",
  week: "Week 10",
  date: "Friday, June 6, 2025",
  saint: "Saint Norbert, Bishop",
  color: "Green",
};

export default function DivineOffice() {
  const [selectedHour, setSelectedHour] = useState<
    (typeof divineOfficeHours)[0] | null
  >(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [communityCount] = useState(1847); // Simulated live count

  const getCurrentHour = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 0 && hour < 6) return divineOfficeHours[0]; // Office of Readings
    if (hour >= 6 && hour < 9) return divineOfficeHours[1]; // Morning Prayer
    if (hour >= 9 && hour < 12) return divineOfficeHours[2]; // Midmorning
    if (hour >= 12 && hour < 15) return divineOfficeHours[3]; // Midday
    if (hour >= 15 && hour < 18) return divineOfficeHours[4]; // Midafternoon
    if (hour >= 18 && hour < 21) return divineOfficeHours[5]; // Evening Prayer
    return divineOfficeHours[6]; // Night Prayer
  };

  const currentHour = getCurrentHour();

  return (
    <div className="min-h-screen bg-[#040404] text-white flex flex-col relative">
      <Header />

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 py-16 max-w-6xl">
          <div className="shimmer w-full h-full absolute top-0 left-0 pointer-events-none" />

          {/* Hero Section with Live Community */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="heading-gradient">Divine Office</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Pray the Liturgy of the Hours with Catholics worldwide, guided by
              Essie's wisdom and the ancient rhythm of the Church.
            </p>

            {/* Live Prayer Community Counter */}
            <div className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800 max-w-md mx-auto mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-2xl font-bold text-[#6b9bcc]">
                  {communityCount.toLocaleString()}
                </span>
              </div>
              <p className="text-gray-300">
                Catholics praying together right now
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Join the global prayer community
              </p>
            </div>
          </div>

          {/* Current Liturgical Information */}
          <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 mb-16 text-center">
            <h2 className="text-2xl font-bold mb-6">
              <span className="heading-gradient">Today's Liturgy</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div>
                <div className="text-2xl mb-2">📅</div>
                <h3 className="font-semibold text-[#6b9bcc] mb-1">Date</h3>
                <p className="text-gray-300 text-sm">{liturgicalInfo.date}</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🗓️</div>
                <h3 className="font-semibold text-[#6b9bcc] mb-1">Season</h3>
                <p className="text-gray-300 text-sm">{liturgicalInfo.season}</p>
              </div>
              <div>
                <div className="text-2xl mb-2">📖</div>
                <h3 className="font-semibold text-[#6b9bcc] mb-1">Week</h3>
                <p className="text-gray-300 text-sm">{liturgicalInfo.week}</p>
              </div>
              <div>
                <div className="text-2xl mb-2">👑</div>
                <h3 className="font-semibold text-[#6b9bcc] mb-1">Saint</h3>
                <p className="text-gray-300 text-sm">{liturgicalInfo.saint}</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🟢</div>
                <h3 className="font-semibold text-[#6b9bcc] mb-1">Color</h3>
                <p className="text-gray-300 text-sm">{liturgicalInfo.color}</p>
              </div>
            </div>
          </div>

          {/* Prayer Hour Modal */}
          {selectedHour && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">
                        <span className="heading-gradient">
                          {selectedHour.name}
                        </span>
                      </h3>
                      <p className="text-gray-400 text-lg">
                        {selectedHour.latin}
                      </p>
                      <div className="flex gap-6 mt-3 text-sm">
                        <span className="text-[#6b9bcc]">
                          ⏰ {selectedHour.time}
                        </span>
                        <span className="text-[#6b9bcc]">
                          ⏱️ {selectedHour.duration}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedHour(null)}
                      className="text-gray-400 hover:text-white text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-black/20 p-6 rounded-lg border border-gray-700">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">E</span>
                      </div>
                      <h4 className="text-lg font-semibold mb-4 text-center text-[#6b9bcc]">
                        Essie's Guidance
                      </h4>
                      <p className="text-gray-300 text-center leading-relaxed">
                        "The Liturgy of the Hours connects us with the prayer of
                        the universal Church. As you pray these ancient words,
                        remember you're joining your voice with countless others
                        across the globe in praise of God."
                      </p>
                    </div>

                    <div className="bg-black/20 p-6 rounded-lg border border-gray-700">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                        <span className="text-2xl">🎵</span>
                      </div>
                      <h4 className="text-lg font-semibold mb-4 text-center text-[#6b9bcc]">
                        Prayer Components
                      </h4>
                      <div className="space-y-2 text-gray-300 text-sm">
                        {selectedHour.psalms.map((psalm, index) => (
                          <div
                            key={`psalm-${index}-${psalm.slice(0, 20)}`}
                            className="flex items-center space-x-2"
                          >
                            <span className="text-[#6b9bcc]">•</span>
                            <span>{psalm}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/20 p-6 rounded-lg border border-gray-700 mb-8">
                    <h4 className="text-lg font-semibold mb-4 text-[#6b9bcc]">
                      Audio Options
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`p-4 rounded-lg border transition-all ${
                          isPlaying
                            ? "border-[#6b9bcc] bg-[#6b9bcc]/20"
                            : "border-gray-700 hover:border-[#6b9bcc]"
                        }`}
                      >
                        <div className="text-2xl mb-2">
                          {isPlaying ? "⏸️" : "▶️"}
                        </div>
                        <p className="font-semibold text-white">
                          Spoken Prayer
                        </p>
                        <p className="text-sm text-gray-400">
                          English narration
                        </p>
                      </button>
                      <button className="p-4 rounded-lg border border-gray-700 hover:border-[#6b9bcc] transition-all">
                        <div className="text-2xl mb-2">🎼</div>
                        <p className="font-semibold text-white">
                          Gregorian Chant
                        </p>
                        <p className="text-sm text-gray-400">
                          Traditional Latin
                        </p>
                      </button>
                      <button className="p-4 rounded-lg border border-gray-700 hover:border-[#6b9bcc] transition-all">
                        <div className="text-2xl mb-2">🔇</div>
                        <p className="font-semibold text-white">
                          Silent Prayer
                        </p>
                        <p className="text-sm text-gray-400">Text only</p>
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button className="button secondary">
                      Join Prayer Community
                    </button>
                    <button className="button">
                      Begin {selectedHour.name}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Current Hour Highlight */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="heading-gradient">Pray Now</span>
            </h2>

            <div className="bg-gradient-to-r from-[#5261a1]/20 to-[#6b9bcc]/20 border border-[#6b9bcc] rounded-lg p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                <span className="text-3xl">⛪</span>
              </div>

              <h3 className="text-2xl font-bold mb-2">
                <span className="heading-gradient">{currentHour.name}</span>
              </h3>
              <p className="text-gray-400 mb-1">{currentHour.latin}</p>
              <p className="text-gray-300 mb-6">{currentHour.description}</p>

              <div className="flex justify-center gap-6 mb-6 text-sm">
                <span className="text-[#6b9bcc]">⏰ {currentHour.time}</span>
                <span className="text-[#6b9bcc]">⏱️ {currentHour.duration}</span>
                <span className="text-[#6b9bcc]">
                  👥 {communityCount} praying
                </span>
              </div>

              <button
                onClick={() => setSelectedHour(currentHour)}
                className="button mr-4"
              >
                Pray {currentHour.name}
              </button>
              <button className="button secondary">View All Hours</button>
            </div>
          </div>

          {/* All Prayer Hours */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="heading-gradient">The Seven Prayer Hours</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {divineOfficeHours.map((hour, index) => (
                <div
                  key={hour.name}
                  className={`bg-black/30 backdrop-blur-md p-6 rounded-lg border transition-all group cursor-pointer ${
                    hour.name === currentHour.name
                      ? "border-[#6b9bcc] bg-[#6b9bcc]/10"
                      : "border-gray-800 hover:border-[#6b9bcc]"
                  }`}
                  onClick={() => setSelectedHour(hour)}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-2xl">🕐</span>
                    </div>

                    <h3 className="text-lg font-bold mb-1 text-gradient">
                      {hour.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">{hour.latin}</p>
                    <p className="text-[#6b9bcc] text-sm mb-3">{hour.time}</p>

                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {hour.description}
                    </p>

                    <div className="text-xs text-gray-400 mb-4">
                      Duration: {hour.duration}
                    </div>

                    {hour.name === currentHour.name && (
                      <div className="bg-[#6b9bcc]/20 border border-[#6b9bcc]/50 rounded px-3 py-1 mb-4">
                        <span className="text-[#6b9bcc] text-xs font-semibold">
                          CURRENT HOUR
                        </span>
                      </div>
                    )}

                    <button className="button w-full text-sm">Pray Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About Divine Office */}
          <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">E</span>
            </div>

            <h2 className="text-2xl font-bold mb-4">
              <span className="heading-gradient">About the Divine Office</span>
            </h2>

            <blockquote className="text-lg text-gray-300 italic mb-6 leading-relaxed">
              "The Liturgy of the Hours is the Church's way of sanctifying time
              itself. When we pray these ancient prayers, we're not just talking
              to God individually—we're joining our voices with the universal
              Church in a symphony of praise that never ends. It's beautiful to
              imagine Catholics all over the world praying these same words at
              the same moments."
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/20 p-4 rounded-lg">
                <div className="text-2xl mb-2">📿</div>
                <h3 className="font-semibold text-[#6b9bcc] mb-2">
                  Ancient Tradition
                </h3>
                <p className="text-sm text-gray-300">
                  Rooted in Jewish temple prayer and early Christian practice
                </p>
              </div>

              <div className="bg-black/20 p-4 rounded-lg">
                <div className="text-2xl mb-2">🌍</div>
                <h3 className="font-semibold text-[#6b9bcc] mb-2">
                  Universal Prayer
                </h3>
                <p className="text-sm text-gray-300">
                  Catholics worldwide pray together across time zones
                </p>
              </div>

              <div className="bg-black/20 p-4 rounded-lg">
                <div className="text-2xl mb-2">⛪</div>
                <h3 className="font-semibold text-[#6b9bcc] mb-2">
                  Church's Prayer
                </h3>
                <p className="text-sm text-gray-300">
                  The official prayer of the Catholic Church throughout the day
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setSelectedHour(currentHour)}
                className="button"
              >
                Join Today's Prayer
              </button>
              <a href="/about" className="button secondary">
                Learn More from Essie
              </a>
            </div>
          </div>
        </div>
      </main>

      <SisterGraceButton />
    </div>
  );
}
