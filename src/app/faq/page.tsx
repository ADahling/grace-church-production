"use client";

import { Header } from "../../components/Header";
import { SisterGraceButton } from "../../components/SisterGraceChatbot";

import { useState } from "react";

const faqs = [
  {
    category: "About Grace",
    questions: [
      {
        question: "What is Grace?",
        answer:
          "Grace is a multilingual Catholic spiritual wellness platform designed to deepen your relationship with God through personalized prayers, sacred meditations, and traditional Catholic practices guided by our founder Essie in English, Spanish, French, Italian, Portuguese, and Latin. We combine ancient wisdom with personal spiritual direction to create a truly sacred digital experience accessible to Catholics worldwide in their native language.",
      },
      {
        question: "Who is Essie and why did she create Grace?",
        answer:
          "Essie is our founder, a devoted Catholic with expertise in both spiritual direction and Catholic theology. She felt called to create Grace during a moment of deep prayer, envisioning a platform where Catholic souls could encounter God through the beauty of sacred tradition enhanced by personalized spiritual guidance.",
      },
      {
        question: "Is Grace affiliated with the Catholic Church?",
        answer:
          "While Grace is independently founded by Essie, our content and practices are deeply rooted in authentic Catholic teaching, guided by the wisdom of the saints and Church tradition. We aim to complement, not replace, your relationship with your local parish and spiritual director.",
      },
    ],
  },
  {
    category: "Faith & Guidance",
    questions: [
      {
        question: "How does personalized spiritual guidance work?",
        answer:
          "Essie's spiritual guidance in Grace serves to personalize your spiritual journey while maintaining the authenticity of Catholic teachings. She helps create customized prayer experiences, suggests relevant scripture passages, and connects you with appropriate devotions based on your spiritual needs and the liturgical calendar.",
      },
      {
        question: "Will this replace traditional Catholic practices?",
        answer:
          "Absolutely not. Grace enhances traditional Catholic practices rather than replacing them. Essie creates personalized experiences around timeless prayers like the Rosary, Divine Mercy Chaplet, and Lectio Divina, making these sacred traditions more accessible and engaging for modern Catholics.",
      },
      {
        question: "How do you ensure theological accuracy?",
        answer:
          "All content on Grace is carefully reviewed by Essie against official Catholic teaching and the wisdom of the saints. Every recommendation is grounded in approved Catholic texts, papal encyclicals, and the writings of Church doctors to ensure theological soundness.",
      },
    ],
  },
  {
    category: "Spiritual Practices",
    questions: [
      {
        question: "What types of prayers are available?",
        answer:
          "Grace offers a comprehensive collection of Catholic prayers including traditional prayers (Our Father, Hail Mary, Glory Be), the complete Rosary with all mysteries, Divine Mercy Chaplet, novenas to various saints, and personalized prayer experiences based on your spiritual needs.",
      },
      {
        question: "How does AI-guided meditation work?",
        answer:
          "Essie creates personalized meditation experiences based on Catholic contemplative traditions like Lectio Divina, Adoration, and Ignatian spirituality. She considers your spiritual state, current liturgical season, and personal devotions to guide you through meaningful encounters with God.",
      },
      {
        question: "Can I request prayers for specific intentions?",
        answer:
          "Yes! Grace allows you to submit prayer intentions and connects you with personalized prayers crafted by Essie for your specific needs. You can also join community prayer circles where fellow Catholics pray for shared intentions.",
      },
    ],
  },
  {
    category: "Community & Support",
    questions: [
      {
        question: "Is there a community aspect to Grace?",
        answer:
          "Absolutely! Grace includes features for connecting with fellow Catholics worldwide through multilingual prayer groups, devotion communities, discussion forums in multiple languages, and shared spiritual experiences while maintaining a safe, faith-centered environment. Our global community prays together in English, Spanish, French, Italian, Portuguese, and Latin.",
      },
      {
        question: "How do I get spiritual guidance?",
        answer:
          "While Grace provides personalized spiritual recommendations through Essie's guidance, we always encourage consultation with qualified spiritual directors and priests. The platform can help prepare you for spiritual direction by organizing your thoughts and highlighting areas for growth.",
      },
      {
        question: "Is my spiritual data private?",
        answer:
          "Your spiritual journey is sacred to us. We implement the highest security standards to protect your prayer history, intentions, and personal spiritual data. Your information is never shared without your explicit consent, and you have complete control over your privacy settings.",
      },
    ],
  },
  {
    category: "Getting Started",
    questions: [
      {
        question: "When will Grace be available?",
        answer:
          "Grace is currently in development with love and care by Essie. Sign up for updates on our homepage to be among the first to experience this sacred digital grace when we launch.",
      },
      {
        question: "Will Grace be free to use?",
        answer:
          "We believe spiritual wellness should be accessible to all Catholics. Grace will offer essential features for free, with premium features available for those who wish to support the platform's mission and access advanced personalized spiritual guidance from Essie.",
      },
      {
        question: "What languages does Grace support?",
        answer:
          "Grace is designed as a truly multilingual platform supporting English, Spanish, French, Italian, Portuguese, and Latin. Essie provides spiritual guidance and all prayers, meditations, and community features in these languages to serve the global Catholic community. Users can seamlessly switch between languages and participate in multilingual prayer groups.",
      },
      {
        question: "Do I need to be Catholic to use Grace?",
        answer:
          "While Grace is specifically designed for Catholics and rooted in Catholic teaching, we welcome all Christians who are drawn to Catholic spiritual practices and traditions. Our multilingual platform celebrates the universal call to holiness across all cultures and languages.",
      },
    ],
  },
];

export default function FAQ() {
  const [openQuestions, setOpenQuestions] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
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
              <span className="heading-gradient">Frequently Asked</span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-light mb-8">
              <span className="heading-gradient">Questions</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about Grace, multilingual Catholic
              spiritual wellness, and Essie's approach to deepening faith across
              cultures and languages.
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-12">
            {faqs.map((category, categoryIndex) => (
              <div
                key={category.category}
                className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800"
              >
                <h3 className="text-2xl font-bold mb-6">
                  <span className="heading-gradient">{category.category}</span>
                </h3>

                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const key = `${categoryIndex}-${questionIndex}`;
                    const isOpen = openQuestions[key];

                    return (
                      <div
                        key={`${category.category}-${questionIndex}`}
                        className="border border-gray-700 rounded-lg overflow-hidden"
                      >
                        <button
                          className="w-full p-4 text-left bg-black/20 hover:bg-black/40 transition-colors flex justify-between items-center"
                          onClick={() =>
                            toggleQuestion(categoryIndex, questionIndex)
                          }
                        >
                          <span className="font-semibold text-gray-200">
                            {faq.question}
                          </span>
                          <span
                            className={`text-[#6b9bcc] transition-transform ${isOpen ? "rotate-180" : ""}`}
                          >
                            ▼
                          </span>
                        </button>

                        {isOpen && (
                          <div className="p-4 border-t border-gray-700 bg-black/10">
                            <p className="text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 text-center mt-16">
            <h2 className="text-2xl font-bold mb-4">
              <span className="heading-gradient">Still Have Questions?</span>
            </h2>
            <p className="text-gray-300 mb-6">
              Can't find what you're looking for? Essie and our team are here to
              help guide you on your spiritual journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:contact@graces.church" className="button">
                Email Support
              </a>
              <a href="/about" className="button secondary">
                Learn About Essie
              </a>
            </div>
          </div>
        </div>
      </main>

      <SisterGraceButton />
    </div>
  );
}
