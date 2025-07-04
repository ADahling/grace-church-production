"use client";

import { Header } from "../../components/Header";
import { SisterGraceButton } from "../../components/SisterGraceChatbot";

export default function Cookies() {
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
              <span className="heading-gradient">Cookie Policy</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              How Grace uses cookies to enhance your spiritual journey while
              respecting your privacy and preferences.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Last Updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12">
            {/* Introduction */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">What Are Cookies?</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Cookies are small text files stored on your device when you
                visit Grace. Like the daily bread we pray for in the Our Father,
                these small elements nourish your experience by remembering your
                preferences and helping Essie provide you with personalized
                spiritual guidance.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We use cookies responsibly and in accordance with Catholic
                principles of stewardship, transparency, and respect for your
                personal choices.
              </p>
            </div>

            {/* Types of Cookies */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">
                  Types of Cookies We Use
                </span>
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-[#6b9bcc] flex items-center">
                    <span className="text-2xl mr-3">🔧</span>
                    Essential Cookies (Always Active)
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    These cookies are necessary for Grace to function and cannot
                    be disabled. They enable basic features like:
                  </p>
                  <div className="space-y-2 text-gray-300 ml-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-[#6b9bcc]">•</span>
                      <span>
                        Maintaining your login session during prayer and
                        meditation
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-[#6b9bcc]">•</span>
                      <span>
                        Remembering your privacy and cookie preferences
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-[#6b9bcc]">•</span>
                      <span>
                        Ensuring secure access to your spiritual content
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-[#6b9bcc]">•</span>
                      <span>Protecting against fraudulent activity</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-[#6b9bcc] flex items-center">
                    <span className="text-2xl mr-3">⚙️</span>
                    Functional Cookies (Optional)
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    These cookies enhance your spiritual experience by
                    remembering your preferences:
                  </p>
                  <div className="space-y-2 text-gray-300 ml-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-[#6b9bcc]">•</span>
                      <span>
                        Your favorite prayers and meditation preferences
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-[#6b9bcc]">•</span>
                      <span>
                        Language settings for multilingual spiritual content
                        (English, Spanish, French, Italian, Portuguese, Latin)
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-[#6b9bcc]">•</span>
                      <span>
                        Theme preferences (light/dark mode for meditation)
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-[#6b9bcc]">•</span>
                      <span>
                        Your place in ongoing prayer series or novenas
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-[#6b9bcc] flex items-center">
                    <span className="text-2xl mr-3">📊</span>
                    Analytics Cookies (Optional)
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    These cookies help Essie understand how the community uses
                    Grace to improve spiritual offerings:
                  </p>
                  <div className="space-y-2 text-gray-300 ml-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-[#6b9bcc]">•</span>
                      <span>
                        Which prayers and meditations are most spiritually
                        fruitful
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-[#6b9bcc]">•</span>
                      <span>
                        How long users spend in prayer and meditation sessions
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-[#6b9bcc]">•</span>
                      <span>
                        Technical performance to ensure smooth spiritual
                        experiences
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-[#6b9bcc]">•</span>
                      <span>
                        General usage patterns to guide Essie's content creation
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mt-3 italic">
                    Note: We never track personal spiritual content or prayer
                    intentions.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-[#6b9bcc] flex items-center">
                    <span className="text-2xl mr-3">🎯</span>
                    Personalization Cookies (Optional)
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    These cookies enable Essie to provide personalized spiritual
                    guidance:
                  </p>
                  <div className="space-y-2 text-gray-300 ml-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-[#6b9bcc]">•</span>
                      <span>
                        Recommendations for prayers based on your spiritual
                        journey stage
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-[#6b9bcc]">•</span>
                      <span>
                        Customized meditation lengths based on your availability
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-[#6b9bcc]">•</span>
                      <span>
                        Saint devotions aligned with your spiritual interests
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-[#6b9bcc]">•</span>
                      <span>
                        Liturgical season content tailored to your engagement
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">Third-Party Services</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Grace may use carefully selected third-party services that align
                with our Catholic values:
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                    Sacred Content Delivery
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Content delivery networks help ensure prayers and
                    meditations load quickly worldwide. These services may use
                    cookies for performance optimization.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                    Community Features
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Social sharing features for prayer intentions and spiritual
                    reflections may use cookies from platforms that align with
                    Catholic community values.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                    Payment Processing
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Secure payment processors for premium features use cookies
                    to ensure transaction security and prevent fraud.
                  </p>
                </div>
              </div>

              <p className="text-gray-300 text-sm mt-6 italic">
                We carefully vet all third-party services to ensure they respect
                privacy and align with Catholic values of human dignity.
              </p>
            </div>

            {/* Managing Cookies */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">
                  Managing Your Cookie Preferences
                </span>
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                    Grace Cookie Settings
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    You can manage your cookie preferences directly within Grace
                    through your account settings. Like choosing your level of
                    participation in community prayer, you have control over
                    your digital spiritual experience.
                  </p>
                  <button className="button">Manage Cookie Preferences</button>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                    Browser Settings
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    You can also control cookies through your browser settings.
                    Here's how:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <div className="space-y-2">
                      <p className="font-medium text-[#6b9bcc]">Chrome:</p>
                      <p>
                        Settings → Privacy and security → Cookies and other site
                        data
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-[#6b9bcc]">Firefox:</p>
                      <p>
                        Options → Privacy & Security → Cookies and Site Data
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-[#6b9bcc]">Safari:</p>
                      <p>Preferences → Privacy → Manage Website Data</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-[#6b9bcc]">Edge:</p>
                      <p>Settings → Cookies and site permissions</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700/30">
                  <h4 className="font-semibold text-[#6b9bcc] mb-2">
                    Impact of Disabling Cookies
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Disabling certain cookies may affect your spiritual
                    experience on Grace. Essential cookies cannot be disabled as
                    they're necessary for basic functionality, but optional
                    cookies can be turned off if you prefer a more minimal
                    digital presence during your spiritual practice.
                  </p>
                </div>
              </div>
            </div>

            {/* International Compliance */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">
                  International Cookie Compliance
                </span>
              </h2>

              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Grace respects cookie regulations across all jurisdictions
                  where our Catholic community resides:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                  <div>
                    <h3 className="font-semibold text-[#6b9bcc] mb-2">
                      European Union (GDPR)
                    </h3>
                    <p className="text-sm">
                      Explicit consent required for non-essential cookies. Clear
                      opt-in mechanisms provided.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#6b9bcc] mb-2">
                      United States
                    </h3>
                    <p className="text-sm">
                      Compliance with state privacy laws including CCPA and
                      emerging regulations.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#6b9bcc] mb-2">
                      Canada (PIPEDA)
                    </h3>
                    <p className="text-sm">
                      Privacy-by-design approach with meaningful consent for all
                      cookie categories.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#6b9bcc] mb-2">
                      Global Standards
                    </h3>
                    <p className="text-sm">
                      Adherence to international best practices for digital
                      privacy and religious freedom.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 text-center">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">
                  Questions About Cookies?
                </span>
              </h2>
              <p className="text-gray-300 mb-6">
                If you have questions about how Grace uses cookies or need help
                managing your preferences, Essie and our team are here to help
                guide you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:privacy@graces.church" className="button">
                  Cookie Questions
                </a>
                <a href="/privacy" className="button secondary">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SisterGraceButton />
    </div>
  );
}
