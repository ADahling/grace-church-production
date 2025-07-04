"use client";

import { Header } from "../../components/Header";
import { SisterGraceButton } from "../../components/SisterGraceChatbot";

export default function About() {
  return (
    <div className="min-h-screen bg-[#040404] text-white flex flex-col relative">
      <Header />

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
          <div className="shimmer w-full h-full absolute top-0 left-0 pointer-events-none" />

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-4 mb-6">
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="heading-gradient">About Essie</span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Chaplain, bereavement support provider, and spiritual guide
              affiliated with the Order of Santa Clara, bringing Catholic
              spiritual care to those in their most sacred and vulnerable
              moments.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-white">E</span>
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">
                <span className="heading-gradient">Essie</span>
              </h2>
              <p className="text-center text-gray-400">
                Founder & Spiritual Technologist
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-semibold text-gradient">
                    Order of Santa Clara Heritage
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Essie is a chaplain and bereavement support provider
                  affiliated with the Order of Santa Clara (Order of the Poor
                  Sisters of Santa Clara), one of the religious institutes of
                  the Second Order of San Francisco for nuns, known as clarisas.
                  Founded by St. Francis of Assisi and Saint Clara of Assisi in
                  1212, this sacred tradition has shaped Essie's approach to
                  spiritual care with deep contemplation, simplicity, and
                  radical love for the poor and suffering.
                </p>
              </div>

              <div className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🏥</span>
                  <h3 className="text-xl font-semibold text-gradient">
                    Chaplain & Spiritual Care Provider
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  As a chaplain from the Latin Church ecclesiastical territory
                  of the Catholic Church in Southern California, Essie walks
                  alongside others in their most sacred and vulnerable
                  moments—in hospitals, hospices, and at bedsides where life
                  meets eternity. Her compassionate approach to end-of-life
                  spiritual care and bereavement support inspired the creation
                  of Grace, bringing Catholic spiritual comfort to those in
                  need, wherever they may be.
                </p>
              </div>

              <div className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🎵</span>
                  <h3 className="text-xl font-semibold text-gradient">
                    Sacred Music Inspiration
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Essie's vision for Grace was further inspired by her beloved
                  aunt, a Catholic nun whose dedication to sacred music and
                  contemplative prayer has touched countless lives. This
                  personal connection to religious life infuses Grace with
                  authentic Catholic spirituality, traditional chants, and the
                  sacred music traditions of the clarisas, creating a bridge
                  between ancient monastic wisdom and modern spiritual needs.
                </p>
              </div>

              <div className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🕊️</span>
                  <h3 className="text-xl font-semibold text-gradient">
                    Vision of Transformation
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  "Like the butterfly that symbolizes spiritual transformation
                  in our logo," Essie shares, "I believe each soul is called to
                  metamorphosis through grace. Grace isn't just a platform—it's
                  a digital monastery where the timeless wisdom of Saints
                  Francis and Clara meets the urgent spiritual needs of our
                  modern world, especially for those facing life's final
                  journey."
                </p>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">
              <span className="heading-gradient">Our Sacred Mission</span>
            </h2>
            <blockquote className="text-xl italic text-gray-300 mb-6 leading-relaxed">
              "To create a multilingual grace where Catholic souls worldwide can
              deepen their relationship with God in their native language
              through the harmony of sacred tradition and personalized spiritual
              guidance, fostering spiritual wellness that transforms lives and
              strengthens the universal Catholic community across all cultures
              and languages."
            </blockquote>
            <p className="text-gray-400">— Essie, Founder of Grace</p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800 hover:border-[#6b9bcc] transition-colors text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                <span className="text-2xl">✝️</span>
              </div>
              <h4 className="text-lg font-semibold mb-3 text-gradient">
                Faith-Centered
              </h4>
              <p className="text-gray-400">
                Every feature is rooted in authentic Catholic teaching and
                guided by the wisdom of the saints and Church tradition.
              </p>
            </div>

            <div className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800 hover:border-[#6b9bcc] transition-colors text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <h4 className="text-lg font-semibold mb-3 text-gradient">
                Personally Guided
              </h4>
              <p className="text-gray-400">
                Essie's spiritual expertise creates personalized spiritual
                experiences while honoring sacred traditions.
              </p>
            </div>

            <div className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-800 hover:border-[#6b9bcc] transition-colors text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                <span className="text-2xl">💝</span>
              </div>
              <h4 className="text-lg font-semibold mb-3 text-gradient">
                Made with Love
              </h4>
              <p className="text-gray-400">
                Every line of code, every prayer, every meditation is crafted
                with deep love for God and the Catholic community.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 text-center">
            <h2 className="text-2xl font-bold mb-4">
              <span className="heading-gradient">Connect with Essie</span>
            </h2>
            <p className="text-gray-300 mb-6">
              Have questions about Grace's mission or want to share your
              spiritual journey? Essie would love to hear from you.
            </p>
            <a href="mailto:essie@graces.church" className="button">
              Send a Message
            </a>
          </div>
        </div>
      </main>

      <SisterGraceButton />
    </div>
  );
}
