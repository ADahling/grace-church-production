"use client";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

import { Header } from "../../components/Header";
import { SisterGraceButton } from "../../components/SisterGraceChatbot";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#040404] text-white flex flex-col relative">
      <Header />

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
          <div className="shimmer w-full h-full absolute top-0 left-0 pointer-events-none" />

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="heading-gradient">Contact Essie</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have a question about your spiritual journey? Want to share how
              Grace has touched your heart? Essie would love to hear from you in
              English, Spanish, French, Italian, Portuguese, or Latin.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">Send a Message</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="How should Essie address you?"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="general">General Question</option>
                    <option value="spiritual">Spiritual Guidance</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="media">Media & Press</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="What's on your heart?"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="form-input"
                    placeholder="Share your thoughts, questions, or spiritual journey with Essie..."
                    required
                  />
                </div>

                <button type="submit" className="button w-full">
                  Send Message with Love ❤️
                </button>
              </form>
            </div>

            {/* Contact Information & Essie's Message */}
            <div className="space-y-8">
              {/* Essie's Personal Message */}
              <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">E</span>
                  </div>
                  <h3 className="text-xl font-bold">
                    <span className="heading-gradient">
                      A Message from Essie
                    </span>
                  </h3>
                </div>

                <blockquote className="text-gray-300 leading-relaxed italic text-center">
                  "Dear soul, I created Grace as a labor of love for our global
                  Catholic community. Every prayer, meditation, and feature
                  comes from my heart to yours in multiple languages—English,
                  Spanish, French, Italian, Portuguese, and Latin. Whether
                  you're seeking spiritual guidance, have suggestions for
                  improvement, or simply want to share your faith journey in
                  your native language, I'm here to listen. Your spiritual
                  growth is my joy, and your multilingual feedback helps make
                  Grace a more sacred space for Catholics worldwide."
                </blockquote>

                <p className="text-center text-gray-400 mt-4">
                  — Essie, Founder of Grace
                </p>
              </div>

              {/* Contact Methods */}
              <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold mb-6">
                  <span className="heading-gradient">Ways to Connect</span>
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">📧</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        Email Essie Directly
                      </h4>
                      <p className="text-gray-400 text-sm mb-2">
                        For personal spiritual questions and heartfelt messages
                      </p>
                      <a
                        href="mailto:essie@graces.church"
                        className="text-[#6b9bcc] hover:text-[#5261a1]"
                      >
                        essie@graces.church
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🛠️</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        Technical Support
                      </h4>
                      <p className="text-gray-400 text-sm mb-2">
                        For platform issues and technical questions
                      </p>
                      <a
                        href="mailto:support@graces.church"
                        className="text-[#6b9bcc] hover:text-[#5261a1]"
                      >
                        support@graces.church
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">💼</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        Partnerships & Media
                      </h4>
                      <p className="text-gray-400 text-sm mb-2">
                        For collaboration and press inquiries
                      </p>
                      <a
                        href="mailto:partnerships@graces.church"
                        className="text-[#6b9bcc] hover:text-[#5261a1]"
                      >
                        partnerships@graces.church
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Expectations */}
              <div className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-4 text-[#6b9bcc]">
                  Response Times
                </h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Personal messages to Essie:</span>
                    <span className="text-[#6b9bcc]">2-3 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Technical support:</span>
                    <span className="text-[#6b9bcc]">1-2 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>General inquiries:</span>
                    <span className="text-[#6b9bcc]">1-3 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Partnership requests:</span>
                    <span className="text-[#6b9bcc]">1 week</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  * Response times may be longer during major Catholic holidays
                  as Essie observes sacred seasons
                </p>
              </div>
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 text-center mt-16">
            <h2 className="text-2xl font-bold mb-6">
              <span className="heading-gradient">Sacred Communication</span>
            </h2>
            <p className="text-gray-300 mb-6">
              When reaching out, please remember that Grace is a sacred space.
              We approach all communications with Christian charity, respect,
              and love. While Essie provides spiritual guidance through the
              platform, she encourages consulting with your local priest or
              spiritual director for formal spiritual direction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/about" className="button secondary">
                Learn More About Essie
              </a>
              <a href="/faq" className="button secondary">
                Check Our FAQ First
              </a>
            </div>
          </div>
        </div>
      </main>

      <SisterGraceButton />
    </div>
  );
}
