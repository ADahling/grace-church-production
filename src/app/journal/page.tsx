"use client";

import { Header } from "../../components/Header";
import { SisterGraceButton } from "../../components/SisterGraceChatbot";

import { useRef, useState } from "react";

const journalPrompts = [
  {
    category: "Daily Reflection",
    title: "Examen with Essie",
    prompts: [
      "What moment today did I feel closest to God?",
      "Where did I see God working in my life today?",
      "What challenged my faith today, and how did I respond?",
      "How did I show love to others today?",
      "What am I most grateful for in this moment?",
    ],
    scripture: "Psalm 139:23-24",
    essieGuidance:
      "The Examen helps us recognize God's presence in our daily experiences. Don't worry about perfect answers - just write honestly from your heart.",
  },
  {
    category: "Liturgical Seasons",
    title: "Advent Preparation",
    prompts: [
      "How is my heart preparing for Jesus' coming?",
      "What do I need to surrender to make room for Christ?",
      "What traditions help me connect with the mystery of the Incarnation?",
      "How can I serve others during this season of waiting?",
      "What does 'Emmanuel - God with us' mean to me personally?",
    ],
    scripture: "Isaiah 9:6",
    essieGuidance:
      "Advent is a time of holy waiting. Let your journal be a stable where Christ can be born anew in your heart.",
  },
  {
    category: "Saints & Virtues",
    title: "Walking with Saints",
    prompts: [
      "Which saint speaks to my heart right now, and why?",
      "What virtue do I most want to develop?",
      "How did the saints handle challenges similar to mine?",
      "What would [chosen saint] advise me in my current situation?",
      "How can I imitate Christ like my favorite saints did?",
    ],
    scripture: "Hebrews 12:1",
    essieGuidance:
      "The saints are our spiritual family. Write to them as you would to a beloved friend - they're listening and interceding for you.",
  },
  {
    category: "Prayer & Contemplation",
    title: "Deepening Prayer Life",
    prompts: [
      "How has my relationship with God evolved lately?",
      "What distracts me most during prayer, and how can I address it?",
      "When do I feel most at peace in God's presence?",
      "What is God asking of me in this season of life?",
      "How can I better listen for God's voice?",
    ],
    scripture: "1 Samuel 3:10",
    essieGuidance:
      "Prayer is a conversation with your beloved. Write your part of that conversation, knowing God hears every word and sees every tear.",
  },
];

const recentEntries = [
  {
    date: "Today",
    title: "Morning Gratitude",
    preview:
      "I woke up with such peace today, feeling Mary's presence as I prayed the Rosary...",
    mood: "Peaceful",
    category: "Daily Reflection",
  },
  {
    date: "Yesterday",
    title: "Struggling with Forgiveness",
    preview:
      "Lord, help me forgive as you forgive. This situation with my friend is so difficult...",
    mood: "Seeking",
    category: "Prayer & Contemplation",
  },
  {
    date: "2 days ago",
    title: "St. Thérèse's Little Way",
    preview:
      "Reading about the Little Flower today reminded me that sanctity is found in small things...",
    mood: "Inspired",
    category: "Saints & Virtues",
  },
];

export default function Journal() {
  const [selectedPrompt, setSelectedPrompt] = useState<
    (typeof journalPrompts)[0] | null
  >(null);
  const [isWriting, setIsWriting] = useState(false);
  const [journalEntry, setJournalEntry] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    intervalRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Simulate transcription
    setTimeout(() => {
      setJournalEntry(
        (prev) =>
          prev +
          "\n\n[Voice note: Thank you Lord for this beautiful day and the peace you've given me in prayer this morning...]",
      );
      setShowVoiceModal(false);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#040404] text-white flex flex-col relative">
      <Header />

      {/* Voice Recording Modal */}
      {showVoiceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-lg max-w-md w-full p-8 text-center">
            <h3 className="text-2xl font-bold mb-6">
              <span className="heading-gradient">Voice Journaling</span>
            </h3>

            <div className="mb-8">
              <div
                className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  isRecording
                    ? "bg-red-500 animate-pulse"
                    : "bg-gradient-to-br from-[#6b9bcc] to-[#5261a1]"
                }`}
              >
                <span className="text-4xl">🎤</span>
              </div>

              <div className="text-2xl font-bold mb-2">
                {formatTime(recordingTime)}
              </div>

              <p className="text-gray-300">
                {isRecording
                  ? "Recording your spiritual thoughts..."
                  : "Ready to record"}
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowVoiceModal(false)}
                className="button secondary"
              >
                Cancel
              </button>

              {!isRecording ? (
                <button onClick={startRecording} className="button">
                  Start Recording
                </button>
              ) : (
                <button onClick={stopRecording} className="button">
                  Stop & Transcribe
                </button>
              )}
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Your voice is transcribed locally and never stored on our servers
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 py-16 max-w-6xl">
          <div className="shimmer w-full h-full absolute top-0 left-0 pointer-events-none" />

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="heading-gradient">Spiritual Journal</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Sacred space for your conversations with God, guided by Essie's
              wisdom and Catholic spiritual traditions.
            </p>
          </div>

          {/* Writing Interface */}
          {isWriting && (
            <div className="mb-16">
              <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    <span className="heading-gradient">New Journal Entry</span>
                  </h2>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowVoiceModal(true)}
                      className="button secondary flex items-center gap-2"
                    >
                      <span className="text-lg">🎤</span>
                      Voice Note
                    </button>
                    <button
                      onClick={() => setIsWriting(false)}
                      className="button secondary"
                    >
                      Close
                    </button>
                  </div>
                </div>

                {selectedPrompt && (
                  <div className="bg-black/20 p-6 rounded-lg border border-gray-700 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-[#6b9bcc] mb-3">
                          Today's Prompts
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                          {selectedPrompt.prompts.map((prompt, index) => (
                            <li
                              key={`prompt-${index}-${prompt.slice(0, 20).replace(/\s+/g, '-')}`}
                              className="flex items-start space-x-2"
                            >
                              <span className="text-[#6b9bcc] mt-1">•</span>
                              <span>{prompt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                          <span className="text-xl font-bold text-white">
                            E
                          </span>
                        </div>
                        <h4 className="font-semibold text-[#6b9bcc] mb-2 text-center">
                          Essie's Guidance
                        </h4>
                        <p className="text-sm text-gray-300 text-center italic">
                          "{selectedPrompt.essieGuidance}"
                        </p>
                        <p className="text-xs text-gray-400 text-center mt-2">
                          Scripture: {selectedPrompt.scripture}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Entry title (e.g., 'Morning Prayer Reflections')"
                    className="form-input"
                  />

                  <textarea
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    placeholder="Begin your conversation with God... Share your joys, struggles, hopes, and gratitude. This is your sacred space."
                    className="form-input min-h-96 resize-none"
                    rows={16}
                  />

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>
                        Words:{" "}
                        {
                          journalEntry
                            .split(" ")
                            .filter((word) => word.length > 0).length
                        }
                      </span>
                      <span>•</span>
                      <span>Private & Encrypted</span>
                    </div>

                    <div className="flex gap-3">
                      <button className="button secondary">Save Draft</button>
                      <button className="button">Save Entry</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Journal Prompts */}
          {!isWriting && (
            <>
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  <span className="heading-gradient">
                    Guided Journal Prompts
                  </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {journalPrompts.map((prompt, index) => (
                    <div
                      key={`journal-prompt-${index}-${prompt.title.slice(0, 15).replace(/\s+/g, '-')}`}
                      className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800 hover:border-[#6b9bcc] transition-all group cursor-pointer"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-2xl">📖</span>
                        </div>

                        <h3 className="text-lg font-bold mb-2 text-gradient">
                          {prompt.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                          {prompt.category}
                        </p>

                        <div className="text-xs text-gray-400 mb-6">
                          {prompt.prompts.length} prompts • Scripture:{" "}
                          {prompt.scripture}
                        </div>

                        <button
                          onClick={() => {
                            setSelectedPrompt(prompt);
                            setIsWriting(true);
                          }}
                          className="button w-full"
                        >
                          Start Writing
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Entries */}
              <div className="mb-16">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold">
                    <span className="heading-gradient">Recent Entries</span>
                  </h2>
                  <button
                    onClick={() => setIsWriting(true)}
                    className="button flex items-center gap-2"
                  >
                    <span className="text-lg">✍️</span>
                    New Entry
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentEntries.map((entry, index) => (
                    <div
                      key={`entry-${index}-${entry.title.slice(0, 15).replace(/\s+/g, '-')}`}
                      className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800 hover:border-[#6b9bcc] transition-all cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-white mb-1">
                            {entry.title}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {entry.date} • {entry.category}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              entry.mood === "Peaceful"
                                ? "bg-green-500/20 text-green-300"
                                : entry.mood === "Seeking"
                                  ? "bg-blue-500/20 text-blue-300"
                                  : "bg-purple-500/20 text-purple-300"
                            }`}
                          >
                            {entry.mood}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        {entry.preview}
                      </p>

                      <div className="flex justify-between items-center">
                        <button className="text-[#6b9bcc] text-sm hover:underline">
                          Continue Reading
                        </button>
                        <div className="flex gap-2">
                          <button className="text-gray-400 hover:text-white">
                            📝
                          </button>
                          <button className="text-gray-400 hover:text-white">
                            🔖
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Essie's Journal Wisdom */}
              <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">E</span>
                </div>

                <h2 className="text-2xl font-bold mb-4">
                  <span className="heading-gradient">
                    Essie's Journaling Wisdom
                  </span>
                </h2>

                <blockquote className="text-lg text-gray-300 italic mb-6 leading-relaxed">
                  "Your journal is a sacred conversation between you and God.
                  Don't worry about perfect grammar or profound insights—just
                  write honestly. Some days you'll pour out your heart, other
                  days you'll simply say 'Thank you.' Both are beautiful
                  prayers. Your written words become a record of God's
                  faithfulness in your life."
                </blockquote>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-black/20 p-4 rounded-lg">
                    <div className="text-2xl mb-2">💝</div>
                    <h3 className="font-semibold text-[#6b9bcc] mb-2">
                      Write with Love
                    </h3>
                    <p className="text-sm text-gray-300">
                      Journal as if writing to your dearest friend—because you
                      are.
                    </p>
                  </div>

                  <div className="bg-black/20 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🕊️</div>
                    <h3 className="font-semibold text-[#6b9bcc] mb-2">
                      Trust the Process
                    </h3>
                    <p className="text-sm text-gray-300">
                      Let the Holy Spirit guide your pen—He knows what needs to
                      be said.
                    </p>
                  </div>

                  <div className="bg-black/20 p-4 rounded-lg">
                    <div className="text-2xl mb-2">📚</div>
                    <h3 className="font-semibold text-[#6b9bcc] mb-2">
                      Review & Reflect
                    </h3>
                    <p className="text-sm text-gray-300">
                      Revisit old entries to see how God has been working in
                      your life.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => setIsWriting(true)} className="button">
                    Start Journaling Today
                  </button>
                  <a href="/about" className="button secondary">
                    More from Essie
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <SisterGraceButton />
    </div>
  );
}
