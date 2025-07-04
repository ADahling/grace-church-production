"use client";

import { Header } from "../../components/Header";
import { SisterGraceButton } from "../../components/SisterGraceChatbot";

export default function Terms() {
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
              <span className="heading-gradient">Terms of Service</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Sacred guidelines for our Catholic spiritual wellness community
              built with love by Essie.
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
                <span className="heading-gradient">
                  Welcome to Our Sacred Community
                </span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Welcome to Grace, a Catholic spiritual wellness platform created
                with love by Essie. These Terms of Service ("Terms") govern your
                use of our platform and represent our commitment to creating a
                sacred, respectful space for spiritual growth.
              </p>
              <p className="text-gray-300 leading-relaxed">
                By using Grace, you agree to these Terms and join our community
                of Catholics seeking deeper relationship with God through
                prayer, meditation, and sacred tradition.
              </p>
            </div>

            {/* Acceptance */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">Agreement to Terms</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                By accessing or using Grace, you confirm that:
              </p>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc]">•</span>
                  <span>
                    You are at least 13 years old (or have parental consent)
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc]">•</span>
                  <span>
                    You agree to use the platform respectfully and in accordance
                    with Catholic values
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc]">•</span>
                  <span>
                    You understand this platform complements but does not
                    replace traditional spiritual direction
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc]">•</span>
                  <span>
                    You will honor the sacred nature of the content and
                    community
                  </span>
                </div>
              </div>
            </div>

            {/* Platform Use */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">Sacred Use Guidelines</span>
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                    Respectful Participation
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Grace is designed as a sacred space for Catholic spiritual
                    wellness. We ask all users to participate with reverence,
                    kindness, and respect for our shared faith and the diverse
                    backgrounds within our Catholic community.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                    Spiritual Content
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    All prayers, meditations, and spiritual content are provided
                    for personal spiritual growth. While carefully crafted by
                    Essie according to Catholic teaching, they are meant to
                    supplement, not replace, the Sacraments, Mass attendance,
                    and guidance from qualified priests and spiritual directors.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                    Community Interactions
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    When participating in community features, please maintain
                    Christian charity in all interactions. Share your faith
                    journey authentically while respecting others' spiritual
                    experiences and maintaining appropriate boundaries.
                  </p>
                </div>
              </div>
            </div>

            {/* Prohibited Activities */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">Community Standards</span>
              </h2>

              <p className="text-gray-300 leading-relaxed mb-4">
                To maintain our sacred community, the following activities are
                not permitted:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start space-x-3">
                    <span className="text-red-400">✗</span>
                    <span>Content that contradicts Catholic teaching</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-red-400">✗</span>
                    <span>Harassment or unkind behavior</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-red-400">✗</span>
                    <span>Sharing inappropriate or offensive material</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-red-400">✗</span>
                    <span>Spamming or commercial solicitation</span>
                  </div>
                </div>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start space-x-3">
                    <span className="text-red-400">✗</span>
                    <span>Impersonating others or false identity</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-red-400">✗</span>
                    <span>Violating others' privacy</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-red-400">✗</span>
                    <span>Technical abuse or hacking attempts</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-red-400">✗</span>
                    <span>Copyright infringement</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">
                  Sacred Content & Ownership
                </span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                All spiritual content, prayers, meditations, and platform
                features are created with love by Essie and are protected by
                intellectual property laws. While we encourage personal use for
                spiritual growth, commercial use requires explicit permission.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Traditional Catholic prayers and Scripture remain in the public
                domain and belong to the Church and all believers. Essie's
                unique interpretations, guided meditations, and platform
                innovations are proprietary to Grace.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">
                  Spiritual Guidance Disclaimer
                </span>
              </h2>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Grace provides spiritual wellness content for personal growth
                  and is not a substitute for:
                </p>
                <div className="space-y-2 text-gray-300 ml-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-[#6b9bcc]">•</span>
                    <span>
                      Professional spiritual direction from qualified priests or
                      spiritual directors
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-[#6b9bcc]">•</span>
                    <span>
                      The Sacraments, especially the Eucharist and
                      Reconciliation
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-[#6b9bcc]">•</span>
                    <span>
                      Regular Mass attendance and participation in parish life
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-[#6b9bcc]">•</span>
                    <span>
                      Professional mental health or medical care when needed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Termination */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">Account Management</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You may discontinue your use of Grace at any time. We reserve
                the right to suspend or terminate accounts that violate these
                Terms or disrupt our sacred community, always with Christian
                charity and after appropriate warnings when possible.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Upon termination, your access to premium features will end, but
                your spiritual growth and relationship with God continues beyond
                any platform.
              </p>
            </div>

            {/* Legal Compliance */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">
                  Legal Compliance & Jurisdiction
                </span>
              </h2>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Grace operates under the guidance of multilegal frameworks to
                  ensure compliance across various jurisdictions where our
                  Catholic community members reside. These Terms are governed by
                  applicable laws while respecting the universal nature of
                  Catholic faith.
                </p>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start space-x-3">
                    <span className="text-[#6b9bcc]">•</span>
                    <span>
                      International users: Grace complies with applicable
                      international religious freedom and data protection laws
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-[#6b9bcc]">•</span>
                    <span>
                      US users: These Terms are governed by applicable federal
                      and state laws respecting religious practice
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-[#6b9bcc]">•</span>
                    <span>
                      EU users: GDPR compliance for all data processing
                      activities
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-[#6b9bcc]">•</span>
                    <span>
                      All jurisdictions: Respect for local laws while
                      maintaining Catholic teaching integrity
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Our multilegal approach ensures that Catholics worldwide can
                  access Grace's spiritual resources while maintaining
                  compliance with their local legal requirements.
                </p>
              </div>
            </div>

            {/* Dispute Resolution */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">Dispute Resolution</span>
              </h2>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  In the spirit of Matthew 18:15-17, we encourage resolving any
                  disputes through peaceful dialogue and Christian mediation:
                </p>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start space-x-3">
                    <span className="text-[#6b9bcc]">1.</span>
                    <span>
                      <strong>Direct Communication:</strong> Contact Essie or
                      our support team directly to address concerns
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-[#6b9bcc]">2.</span>
                    <span>
                      <strong>Mediation:</strong> Seek Christian mediation
                      services if direct communication doesn't resolve issues
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-[#6b9bcc]">3.</span>
                    <span>
                      <strong>Legal Arbitration:</strong> As a last resort,
                      through appropriate multilegal channels in your
                      jurisdiction
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  We believe most conflicts can be resolved through prayer,
                  understanding, and Christian charity before requiring legal
                  intervention.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">
                  Limitation of Liability
                </span>
              </h2>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  While we strive to provide meaningful spiritual content
                  through Essie's guidance, Grace is provided "as is" for
                  spiritual enrichment purposes:
                </p>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start space-x-3">
                    <span className="text-[#6b9bcc]">•</span>
                    <span>
                      Grace supplements but does not replace professional
                      spiritual direction, medical care, or psychological
                      counseling
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-[#6b9bcc]">•</span>
                    <span>
                      Technical issues or service interruptions may occur and
                      are addressed promptly when possible
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-[#6b9bcc]">•</span>
                    <span>
                      Users are responsible for their own spiritual discernment
                      and should consult qualified clergy for serious spiritual
                      matters
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-[#6b9bcc]">•</span>
                    <span>
                      Our liability is limited to the extent permitted by
                      applicable multilegal frameworks while maintaining our
                      commitment to serve
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">Updates to Terms</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                As Grace grows under Essie's guidance, these Terms may be
                updated to reflect new features, community needs, and evolving
                multilegal requirements across jurisdictions. We will:
              </p>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc]">•</span>
                  <span>
                    Notify users of significant changes via email and platform
                    announcements
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc]">•</span>
                  <span>
                    Maintain our commitment to Catholic values and spiritual
                    growth in all updates
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc]">•</span>
                  <span>
                    Ensure continued compliance with multilegal frameworks in
                    all jurisdictions we serve
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc]">•</span>
                  <span>
                    Provide reasonable notice periods before major changes take
                    effect
                  </span>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mt-4">
                Continued use of Grace after updates constitutes acceptance of
                revised Terms.
              </p>
            </div>

            {/* Contact Section */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 text-center">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">
                  Questions About These Terms?
                </span>
              </h2>
              <p className="text-gray-300 mb-6">
                If you have questions about these Terms of Service or need
                clarification about our community guidelines, Essie and our team
                are here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:legal@graces.church" className="button">
                  Legal Questions
                </a>
                <a
                  href="mailto:contact@graces.church"
                  className="button secondary"
                >
                  General Support
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
