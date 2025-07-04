"use client";

import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { SisterGraceButton } from "../../components/SisterGraceChatbot";

interface Reading {
  reference: string;
  text: string;
}

interface DailyReadings {
  date: string;
  liturgicalSeason: string;
  seasonColor: string;
  firstReading: Reading;
  psalm: Reading;
  secondReading?: Reading;
  gospel: Reading;
}

interface Saint {
  name: string;
  feast: string;
  description: string;
  patronOf: string[];
  prayer: string;
}

interface LiturgicalDay {
  date: string;
  dayOfWeek: string;
  liturgicalTitle: string;
  season: string;
  seasonColor: string;
  rank: string;
  saints: Saint[];
  readings: DailyReadings;
}

export default function CatholicCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [liturgicalDay, setLiturgicalDay] = useState<LiturgicalDay | null>(
    null,
  );
  const [selectedReading, setSelectedReading] = useState<
    "first" | "psalm" | "second" | "gospel"
  >("gospel");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading liturgical data
    const loadLiturgicalData = () => {
      setIsLoading(true);

      // Mock data for demonstration - in production this would come from a Catholic API
      const mockLiturgicalDay: LiturgicalDay = {
        date: currentDate.toDateString(),
        dayOfWeek: currentDate.toLocaleDateString("en-US", { weekday: "long" }),
        liturgicalTitle: "Friday of the Second Week in Ordinary Time",
        season: "Ordinary Time",
        seasonColor: "#22c55e",
        rank: "Weekday",
        saints: [
          {
            name: "Saint Agnes",
            feast: "Virgin and Martyr",
            description:
              "Saint Agnes was a young Roman martyr who died around 304 AD during the persecution of Christians under Emperor Diocletian.",
            patronOf: ["Young girls", "Chastity", "Gardeners", "Girl Guides"],
            prayer:
              "Saint Agnes, virgin and martyr, you chose death rather than betray your faith and purity. Help us to remain faithful to Christ in all circumstances. Amen.",
          },
          {
            name: "Saint Vincent",
            feast: "Deacon and Martyr",
            description:
              "Saint Vincent of Saragossa was a deacon who suffered martyrdom during the persecution of Christians under Emperor Diocletian.",
            patronOf: ["Vinegrowers", "Sailors", "School children"],
            prayer:
              "Saint Vincent, faithful deacon and courageous martyr, intercede for us that we may serve Christ with the same dedication you showed. Amen.",
          },
        ],
        readings: {
          date: currentDate.toDateString(),
          liturgicalSeason: "Ordinary Time",
          seasonColor: "#22c55e",
          firstReading: {
            reference: "Hebrews 8:6-13",
            text: "But now Christ has obtained a more excellent ministry, and to that degree he is the mediator of a better covenant, which has been enacted through better promises. For if that first covenant had been faultless, there would have been no need to look for a second one...",
          },
          psalm: {
            reference: "Psalm 85:8-14",
            text: "Let me hear what God the Lord will speak, for he will speak peace to his people, to his faithful, to those who turn to him in their hearts. Surely his salvation is at hand for those who fear him, that his glory may dwell in our land...",
          },
          gospel: {
            reference: "Mark 3:13-19",
            text: "He went up the mountain and called to him those whom he wanted, and they came to him. And he appointed twelve, whom he also named apostles, to be with him, and to be sent out to proclaim the message...",
          },
        },
      };

      setTimeout(() => {
        setLiturgicalDay(mockLiturgicalDay);
        setIsLoading(false);
      }, 1000);
    };

    loadLiturgicalData();
  }, [currentDate]);

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getSeasonIcon = (season: string) => {
    switch (season) {
      case "Advent":
        return "🕯️";
      case "Christmas":
        return "⭐";
      case "Lent":
        return "✝️";
      case "Easter":
        return "🌅";
      case "Ordinary Time":
        return "🌿";
      default:
        return "📅";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#040404] text-white flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#6b9bcc] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-300">
              Loading today's liturgical calendar...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (!liturgicalDay) return null;

  return (
    <div className="min-h-screen bg-[#040404] text-white flex flex-col relative">
      <Header />

      <main className="flex-1 relative overflow-hidden">
        <div className="relative z-10">
          <div className="shimmer w-full h-full absolute top-0 left-0 pointer-events-none" />

          {/* Header Section */}
          <section className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                  <span className="text-3xl">📅</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold">
                  <span className="heading-gradient">Catholic Calendar</span>
                </h1>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Daily Mass readings, saint feast days, and liturgical
                celebrations guided by Catholic tradition
              </p>
            </div>

            {/* Date Navigation */}
            <div className="flex justify-center items-center gap-6 mb-8">
              <button
                onClick={() => navigateDate("prev")}
                className="button secondary p-3"
                aria-label="Previous day"
              >
                ←
              </button>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gradient mb-2">
                  {formatDate(currentDate)}
                </h2>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">
                    {getSeasonIcon(liturgicalDay.season)}
                  </span>
                  <span
                    className="text-lg font-semibold"
                    style={{ color: liturgicalDay.seasonColor }}
                  >
                    {liturgicalDay.season}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigateDate("next")}
                className="button secondary p-3"
                aria-label="Next day"
              >
                →
              </button>
            </div>

            {/* Liturgical Information */}
            <div className="card-premium p-8 text-center mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gradient">
                {liturgicalDay.liturgicalTitle}
              </h3>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="px-4 py-2 bg-black/20 rounded-full border border-gray-700">
                  {liturgicalDay.rank}
                </span>
                <span
                  className="px-4 py-2 rounded-full border"
                  style={{
                    backgroundColor: `${liturgicalDay.seasonColor}20`,
                    borderColor: liturgicalDay.seasonColor,
                  }}
                >
                  {liturgicalDay.season}
                </span>
              </div>
            </div>
          </section>

          {/* Main Content Grid */}
          <section className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Daily Readings */}
              <div className="lg:col-span-2">
                <div className="card-premium p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gradient text-center">
                    📖 Daily Mass Readings
                  </h3>

                  {/* Reading Selector */}
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    <button
                      onClick={() => setSelectedReading("first")}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        selectedReading === "first"
                          ? "bg-[#6b9bcc] text-white"
                          : "bg-black/20 hover:bg-black/40"
                      }`}
                    >
                      First Reading
                    </button>
                    <button
                      onClick={() => setSelectedReading("psalm")}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        selectedReading === "psalm"
                          ? "bg-[#6b9bcc] text-white"
                          : "bg-black/20 hover:bg-black/40"
                      }`}
                    >
                      Psalm
                    </button>
                    {liturgicalDay.readings.secondReading && (
                      <button
                        onClick={() => setSelectedReading("second")}
                        className={`px-4 py-2 rounded-lg transition-all ${
                          selectedReading === "second"
                            ? "bg-[#6b9bcc] text-white"
                            : "bg-black/20 hover:bg-black/40"
                        }`}
                      >
                        Second Reading
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedReading("gospel")}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        selectedReading === "gospel"
                          ? "bg-[#6b9bcc] text-white"
                          : "bg-black/20 hover:bg-black/40"
                      }`}
                    >
                      Gospel ✨
                    </button>
                  </div>

                  {/* Selected Reading Display */}
                  <div className="bg-black/20 rounded-lg p-6">
                    {selectedReading === "first" && (
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                          First Reading:{" "}
                          {liturgicalDay.readings.firstReading.reference}
                        </h4>
                        <p className="text-gray-300 leading-relaxed text-lg">
                          {liturgicalDay.readings.firstReading.text}
                        </p>
                      </div>
                    )}
                    {selectedReading === "psalm" && (
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                          Responsorial Psalm:{" "}
                          {liturgicalDay.readings.psalm.reference}
                        </h4>
                        <p className="text-gray-300 leading-relaxed text-lg italic">
                          {liturgicalDay.readings.psalm.text}
                        </p>
                      </div>
                    )}
                    {selectedReading === "second" &&
                      liturgicalDay.readings.secondReading && (
                        <div>
                          <h4 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                            Second Reading:{" "}
                            {liturgicalDay.readings.secondReading.reference}
                          </h4>
                          <p className="text-gray-300 leading-relaxed text-lg">
                            {liturgicalDay.readings.secondReading.text}
                          </p>
                        </div>
                      )}
                    {selectedReading === "gospel" && (
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                          Gospel: {liturgicalDay.readings.gospel.reference}
                        </h4>
                        <p className="text-gray-300 leading-relaxed text-lg font-medium">
                          {liturgicalDay.readings.gospel.text}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Audio Controls Placeholder */}
                  <div className="mt-6 flex justify-center gap-4">
                    <button className="button secondary text-sm">
                      🔊 Listen to Reading
                    </button>
                    <button className="button secondary text-sm">
                      📱 Share Reading
                    </button>
                  </div>
                </div>
              </div>

              {/* Saints of the Day */}
              <div>
                <div className="card-premium p-6">
                  <h3 className="text-xl font-bold mb-6 text-gradient text-center">
                    👑 Saints of the Day
                  </h3>

                  <div className="space-y-6">
                    {liturgicalDay.saints.map((saint, index) => (
                      <div key={`saint-${index}-${saint.name.replace(/\s+/g, '-')}`} className="bg-black/20 rounded-lg p-4">
                        <h4 className="text-lg font-semibold mb-2 text-[#6b9bcc]">
                          {saint.name}
                        </h4>
                        <p className="text-sm text-purple-300 mb-3">
                          {saint.feast}
                        </p>
                        <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                          {saint.description}
                        </p>

                        {saint.patronOf.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs text-gray-400 mb-1">
                              Patron of:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {saint.patronOf.map((patron, i) => (
                                <span
                                  key={`patron-${saint.name}-${i}-${patron.slice(0, 10)}`}
                                  className="text-xs bg-purple-500/20 px-2 py-1 rounded"
                                >
                                  {patron}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="bg-black/30 rounded p-3">
                          <p className="text-xs text-gray-400 mb-1">Prayer:</p>
                          <p className="text-sm text-gray-300 italic">
                            {saint.prayer}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="card-premium p-6 mt-6">
                  <h3 className="text-lg font-bold mb-4 text-gradient text-center">
                    🙏 Today's Spiritual Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full button secondary text-sm">
                      📿 Pray Today's Rosary
                    </button>
                    <button className="w-full button secondary text-sm">
                      ⛪ Divine Office
                    </button>
                    <button className="w-full button secondary text-sm">
                      📖 Journal Reflection
                    </button>
                    <button className="w-full button secondary text-sm">
                      🌍 Join Prayer Community
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Liturgical Calendar Preview */}
          <section className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="card-premium p-8 text-center">
              <h3 className="text-2xl font-bold mb-6 text-gradient">
                🗓️ Upcoming Liturgical Events
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="text-2xl mb-2">🕯️</div>
                  <h4 className="font-semibold text-purple-300">Next Sunday</h4>
                  <p className="text-sm text-gray-400">
                    Third Sunday in Ordinary Time
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="text-2xl mb-2">🌹</div>
                  <h4 className="font-semibold text-purple-300">Feb 2</h4>
                  <p className="text-sm text-gray-400">
                    Presentation of the Lord
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="text-2xl mb-2">💝</div>
                  <h4 className="font-semibold text-purple-300">Feb 14</h4>
                  <p className="text-sm text-gray-400">
                    Saints Cyril and Methodius
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <button className="button">
                  View Full Liturgical Calendar 📅
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SisterGraceButton />
    </div>
  );
}
