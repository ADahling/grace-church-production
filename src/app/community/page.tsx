"use client";

import { Header } from "../../components/Header";
import { SisterGraceButton } from "../../components/SisterGraceChatbot";

import { useState } from "react";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const communityGroups = [
  {
    name: "Global Rosary Circle",
    description:
      "Pray the Rosary together with Catholics from around the world",
    members: 2847,
    language: "Multilingual",
    schedule: "Daily at 3:00 PM GMT",
    category: "Prayer Circle",
    image: "📿",
  },
  {
    name: "Young Adults in Faith",
    description:
      "Catholic community for ages 18-35 seeking deeper spiritual growth",
    members: 1523,
    language: "English",
    schedule: "Weekly discussions",
    category: "Age Group",
    image: "👥",
  },
  {
    name: "Divine Mercy Devotion",
    description: "United in the prayers and devotions revealed to St. Faustina",
    members: 1892,
    language: "Multilingual",
    schedule: "Daily at 3:00 PM local time",
    category: "Devotion",
    image: "✝️",
  },
  {
    name: "Sacred Heart Family",
    description: "Families dedicated to the Sacred Heart of Jesus",
    members: 967,
    language: "Spanish/English",
    schedule: "First Friday devotions",
    category: "Family",
    image: "❤️",
  },
  {
    name: "Contemplative Prayer",
    description: "Silent prayer and contemplation in the Catholic tradition",
    members: 734,
    language: "English",
    schedule: "Mondays & Thursdays 7 PM",
    category: "Prayer Style",
    image: "🕊️",
  },
  {
    name: "Saints & Martyrs Study",
    description: "Learning from the examples of Catholic saints and martyrs",
    members: 1156,
    language: "Multilingual",
    schedule: "Weekly saint studies",
    category: "Study Group",
    image: "👑",
  },
];

const prayerRequests = [
  {
    id: 1,
    author: "Maria S.",
    title: "Healing for my mother",
    description:
      "Please pray for my mother's recovery from surgery. She's been in the hospital for a week and we're trusting in God's mercy.",
    category: "Health",
    timeAgo: "2 hours ago",
    prayers: 47,
    responses: 12,
    urgent: false,
  },
  {
    id: 2,
    author: "Anonymous",
    title: "For my marriage",
    description:
      "My husband and I are going through a difficult time. Please pray that we can work through our problems with God's help.",
    category: "Relationships",
    timeAgo: "4 hours ago",
    prayers: 89,
    responses: 23,
    urgent: false,
  },
  {
    id: 3,
    author: "John P.",
    title: "Job interview tomorrow",
    description:
      "I have an important job interview tomorrow that could change my family's situation. Please pray for God's will to be done.",
    category: "Career",
    timeAgo: "6 hours ago",
    prayers: 34,
    responses: 8,
    urgent: true,
  },
  {
    id: 4,
    author: "Sarah M.",
    title: "Conversion of my son",
    description:
      "Please pray for my adult son who has fallen away from the faith. I trust in the power of prayer and Mary's intercession.",
    category: "Faith",
    timeAgo: "1 day ago",
    prayers: 156,
    responses: 45,
    urgent: false,
  },
];

const recentTestimonies = [
  {
    author: "Teresa L.",
    content:
      "Thank you all for praying for my father's heart surgery. He came through beautifully and the doctors are amazed at his recovery. God is so good!",
    timeAgo: "3 hours ago",
    category: "Answered Prayer",
  },
  {
    author: "Michael R.",
    content:
      "The Rosary Circle helped me through the darkest period of my life. Praying with this community gave me strength I didn't know I had.",
    timeAgo: "1 day ago",
    category: "Community Support",
  },
  {
    author: "Ana G.",
    content:
      "Joining the Spanish-speaking family group has been such a blessing. It's wonderful to share our faith in our native language with others who understand our culture.",
    timeAgo: "2 days ago",
    category: "Cultural Connection",
  },
];

export default function Community() {
  const [selectedGroup, setSelectedGroup] = useState<
    (typeof communityGroups)[0] | null
  >(null);
  const [activeTab, setActiveTab] = useState("groups");
  const [showPrayerForm, setShowPrayerForm] = useState(false);

  return (
    <div className="min-h-screen bg-[#040404] text-white flex flex-col relative">
      <Header />

      {/* Prayer Request Modal */}
      {showPrayerForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-lg max-w-2xl w-full">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">
                  <span className="heading-gradient">Share Prayer Request</span>
                </h3>
                <button
                  onClick={() => setShowPrayerForm(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Brief description of your prayer request"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select className="form-input">
                    <option>Health & Healing</option>
                    <option>Relationships & Marriage</option>
                    <option>Faith & Conversion</option>
                    <option>Career & Finances</option>
                    <option>Family</option>
                    <option>Mental Health</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Prayer Request
                  </label>
                  <textarea
                    rows={6}
                    className="form-input"
                    placeholder="Share your heart with the community. Remember that others will be praying for this intention with love."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="anonymous" className="rounded" />
                  <label htmlFor="anonymous" className="text-sm text-gray-300">
                    Post anonymously
                  </label>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    type="button"
                    onClick={() => setShowPrayerForm(false)}
                    className="button secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="button">
                    Share Request
                  </button>
                </div>
              </form>
            </div>
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
              <span className="heading-gradient">
                Global Catholic Community
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with Catholics worldwide through prayer, support, and
              shared faith. Experience the universal Church in multiple
              languages with Essie's guidance.
            </p>
          </div>

          {/* Community Welcome */}
          <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="heading-gradient">
                Welcome to Our Global Catholic Community
              </span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Join Catholics from around the world in prayer, fellowship, and
              spiritual growth. Share your intentions, find prayer groups, and
              experience the power of community faith guided by Catholic
              tradition and Essie's wisdom.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: "groups", label: "Prayer Groups", icon: "👥" },
              { id: "requests", label: "Prayer Requests", icon: "🙏" },
              { id: "testimonies", label: "Testimonies", icon: "✨" },
              { id: "discussions", label: "Discussions", icon: "💬" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg border transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#5261a1] to-[#6b9bcc] border-[#6b9bcc]"
                    : "bg-black/30 border-gray-800 hover:border-[#6b9bcc]"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Prayer Groups Tab */}
          {activeTab === "groups" && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  <span className="heading-gradient">Join a Prayer Group</span>
                </h2>
                <p className="text-gray-300 text-lg">
                  Find your spiritual family in our multilingual Catholic
                  community
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communityGroups.map((group) => (
                  <div
                    key={group.name}
                    className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800 hover:border-[#6b9bcc] transition-all"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4">{group.image}</div>
                      <h3 className="text-xl font-bold mb-2 text-gradient">
                        {group.name}
                      </h3>
                      <p className="text-gray-400 mb-4 leading-relaxed">
                        {group.description}
                      </p>

                      <div className="space-y-2 text-sm text-gray-300 mb-6">
                        <div className="flex justify-between">
                          <span>Members:</span>
                          <span className="text-[#6b9bcc]">
                            {group.members.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Language:</span>
                          <span className="text-[#6b9bcc]">
                            {group.language}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Schedule:</span>
                          <span className="text-[#6b9bcc] text-xs">
                            {group.schedule}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="px-3 py-1 bg-[#6b9bcc]/20 text-[#6b9bcc] rounded-full text-xs">
                          {group.category}
                        </span>
                      </div>

                      <button className="button w-full">Join Group</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prayer Requests Tab */}
          {activeTab === "requests" && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  <span className="heading-gradient">
                    Community Prayer Requests
                  </span>
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  Lift each other up in prayer and experience God's love through
                  community
                </p>

                <button
                  onClick={() => setShowPrayerForm(true)}
                  className="button"
                >
                  Share Prayer Request
                </button>
              </div>

              <div className="space-y-6">
                {prayerRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {request.title}
                          </h3>
                          {request.urgent && (
                            <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">
                              Urgent
                            </span>
                          )}
                          <span className="px-2 py-1 bg-[#6b9bcc]/20 text-[#6b9bcc] rounded text-xs">
                            {request.category}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-3 leading-relaxed">
                          {request.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>By {request.author}</span>
                          <span>•</span>
                          <span>{request.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                      <div className="flex gap-4 text-sm">
                        <span className="text-[#6b9bcc]">
                          🙏 {request.prayers} praying
                        </span>
                        <span className="text-[#6b9bcc]">
                          💬 {request.responses} responses
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="button secondary text-sm">
                          I'm Praying
                        </button>
                        <button className="button text-sm">Respond</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testimonies Tab */}
          {activeTab === "testimonies" && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  <span className="heading-gradient">
                    Answered Prayers & Testimonies
                  </span>
                </h2>
                <p className="text-gray-300 text-lg">
                  Celebrate God's goodness and the power of community prayer
                </p>
              </div>

              <div className="space-y-6">
                {recentTestimonies.map((testimony, index) => (
                  <div
                    key={`testimony-${index}-${testimony.author.slice(0, 10)}`}
                    className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">✨</span>
                      </div>
                      <div className="flex-1">
                        <blockquote className="text-gray-300 leading-relaxed mb-3 italic">
                          "{testimony.content}"
                        </blockquote>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-white font-medium">
                              {testimony.author}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-400">
                              {testimony.timeAgo}
                            </span>
                          </div>
                          <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                            {testimony.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Essie's Community Message */}
          <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">E</span>
            </div>

            <h2 className="text-2xl font-bold mb-4">
              <span className="heading-gradient">A Message from Essie</span>
            </h2>

            <blockquote className="text-lg text-gray-300 italic mb-6 leading-relaxed">
              "Community is at the heart of our Catholic faith. When we pray
              together, support each other, and share our burdens, we become the
              hands and feet of Christ in the world. This global community spans
              languages and cultures, but we're united by our love for God and
              each other. Your presence here makes our family stronger."
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/20 p-4 rounded-lg">
                <div className="text-2xl mb-2">💕</div>
                <h3 className="font-semibold text-[#6b9bcc] mb-2">
                  Love in Action
                </h3>
                <p className="text-sm text-gray-300">
                  When we pray for others, we're loving as Christ loves
                </p>
              </div>

              <div className="bg-black/20 p-4 rounded-lg">
                <div className="text-2xl mb-2">🌍</div>
                <h3 className="font-semibold text-[#6b9bcc] mb-2">
                  Universal Church
                </h3>
                <p className="text-sm text-gray-300">
                  Experience the beauty of our global Catholic family
                </p>
              </div>

              <div className="bg-black/20 p-4 rounded-lg">
                <div className="text-2xl mb-2">🤝</div>
                <h3 className="font-semibold text-[#6b9bcc] mb-2">
                  Mutual Support
                </h3>
                <p className="text-sm text-gray-300">
                  We're strongest when we carry each other's burdens
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setActiveTab("groups")} className="button">
                Find Your Prayer Group
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
