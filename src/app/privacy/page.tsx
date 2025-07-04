"use client";

import { Header } from "../../components/Header";
import { SisterGraceButton } from "../../components/SisterGraceChatbot";

export default function Privacy() {
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
              <span className="heading-gradient">Privacy Policy</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your spiritual journey is sacred to us. Here's how we protect and
              honor your privacy at Grace.
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
                <span className="heading-gradient">Our Sacred Commitment</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                At Grace, we understand that your spiritual journey is deeply
                personal and sacred. This Privacy Policy explains how we
                collect, use, protect, and respect your personal information
                when you use our Catholic spiritual wellness platform.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We are committed to maintaining the highest standards of privacy
                and security, treating your spiritual data with the same
                reverence we would treat the secrets of the confessional.
              </p>
            </div>

            {/* Information Collection */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">Information We Collect</span>
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                    Personal Information
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    When you create an account with Grace, we may collect your
                    name, email address, and faith tradition preferences. This
                    information helps Essie personalize your spiritual
                    experience and provide appropriate Catholic content.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                    Spiritual Data
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We collect information about your spiritual practices
                    including prayer history, meditation preferences, favorite
                    saints, and spiritual progress. This data is used
                    exclusively to enhance your personal spiritual journey and
                    is never shared with third parties.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                    Technical Information
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We automatically collect certain technical information
                    including device type, browser information, and usage
                    patterns to improve our platform's performance and your user
                    experience.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">
                  How We Use Your Information
                </span>
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc] text-xl">✝️</span>
                  <p className="text-gray-300">
                    Personalizing your spiritual experience with Essie's guided
                    prayers and meditations
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc] text-xl">📿</span>
                  <p className="text-gray-300">
                    Recommending appropriate Catholic practices based on your
                    spiritual needs
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc] text-xl">👥</span>
                  <p className="text-gray-300">
                    Connecting you with like-minded Catholics in our community
                    features
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc] text-xl">📧</span>
                  <p className="text-gray-300">
                    Sending you important updates, spiritual content, and
                    platform notifications
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc] text-xl">🛡️</span>
                  <p className="text-gray-300">
                    Maintaining the security and integrity of our platform
                  </p>
                </div>
              </div>
            </div>

            {/* Data Protection */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">
                  How We Protect Your Data
                </span>
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                    Encryption & Security
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    All data is encrypted both in transit and at rest using
                    industry-standard security protocols. Your spiritual
                    information is as protected as the most sensitive financial
                    data.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                    Access Controls
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Only essential team members have access to user data, and
                    all access is logged and monitored. We maintain strict
                    confidentiality agreements similar to those used in
                    spiritual direction.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                    Data Minimization
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We collect only the information necessary to provide you
                    with a meaningful spiritual experience and retain it only as
                    long as needed for those purposes.
                  </p>
                </div>
              </div>
            </div>

            {/* Sharing and Disclosure */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">Information Sharing</span>
              </h2>

              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell, rent, or trade your personal information to
                third parties. Your spiritual data remains confidential and is
                never shared without your explicit consent, except in the
                following limited circumstances:
              </p>

              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc]">•</span>
                  <span>When required by law or legal process</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc]">•</span>
                  <span>
                    To protect the safety and rights of our users and community
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc]">•</span>
                  <span>
                    With trusted service providers who help us operate the
                    platform (under strict confidentiality agreements)
                  </span>
                </li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">Your Privacy Rights</span>
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc] text-xl">📖</span>
                  <p className="text-gray-300">
                    <strong>Access:</strong> You can request a copy of all
                    personal data we hold about you
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc] text-xl">✏️</span>
                  <p className="text-gray-300">
                    <strong>Correction:</strong> You can update or correct your
                    personal information at any time
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc] text-xl">🗑️</span>
                  <p className="text-gray-300">
                    <strong>Deletion:</strong> You can request deletion of your
                    account and all associated data
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc] text-xl">📤</span>
                  <p className="text-gray-300">
                    <strong>Portability:</strong> You can export your spiritual
                    data to take with you
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b9bcc] text-xl">🚫</span>
                  <p className="text-gray-300">
                    <strong>Opt-out:</strong> You can unsubscribe from
                    communications while keeping your account
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 text-center">
              <h2 className="text-2xl font-bold mb-6">
                <span className="heading-gradient">
                  Questions About Privacy?
                </span>
              </h2>
              <p className="text-gray-300 mb-6">
                If you have any questions about this Privacy Policy or how we
                handle your spiritual data, please don't hesitate to reach out
                to Essie and our team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:privacy@graces.church" className="button">
                  Privacy Questions
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
