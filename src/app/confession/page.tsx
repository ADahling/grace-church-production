"use client";

import { useState } from "react";
import { AudioPlayer } from "../../components/AudioPlayer";
import { Header } from "../../components/Header";
import { SisterGraceButton } from "../../components/SisterGraceChatbot";
import { useTranslation } from "@/context/LanguageContext";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface ExaminationCategory {
  title: string;
  commandment: string;
  questions: string[];
  icon: string;
}

const actOfContrition = `O my God, I am heartily sorry for having offended Thee, and I detest all my sins because I dread the loss of Heaven and the pains of Hell, but most of all because they offend Thee, my God, Who art all-good and deserving of all my love. I firmly resolve, with the help of Thy grace, to confess my sins, to do penance, and to amend my life. Amen.`;

export default function ConfessionPreparation() {
  const { t } = useTranslation();

  const examinationCategories: ExaminationCategory[] = [
    {
      title: t.confession.categories.loveOfGod,
      commandment: t.confession.commandments.firstThree,
      icon: "✝️",
      questions: [
        t.confession.questions.massAttendance,
        t.confession.questions.holyCommunion,
        t.confession.questions.godsName,
        t.confession.questions.catholicFaith,
        t.confession.questions.prayerLife,
        t.confession.questions.falseGods,
      ],
    },
    {
      title: t.confession.categories.loveOfNeighbor,
      commandment: t.confession.commandments.fourthThroughTenth,
      icon: "❤️",
      questions: [
        t.confession.questions.honorParents,
        t.confession.questions.selfishFamily,
        t.confession.questions.hatred,
        t.confession.questions.gossip,
        t.confession.questions.honesty,
        t.confession.questions.envy,
      ],
    },
    {
      title: t.confession.categories.purityAndChastity,
      commandment: t.confession.commandments.sixthAndNinth,
      icon: "🕊️",
      questions: [
        t.confession.questions.impurity,
        t.confession.questions.inappropriateMaterial,
        t.confession.questions.modesty,
      ],
    },
    {
      title: t.confession.categories.socialJustice,
      commandment: t.confession.commandments.seventhAndTenth,
      icon: "⚖️",
      questions: [t.confession.questions.honesty, t.confession.questions.envy],
    },
  ];

  const [currentStep, setCurrentStep] = useState<
    "introduction" | "examination" | "prayers" | "preparation"
  >("introduction");
  const [completedCategories, setCompletedCategories] = useState<Set<number>>(
    new Set(),
  );
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [reflectionNotes, setReflectionNotes] = useState<{
    [key: number]: string;
  }>({});

  const handleCategoryComplete = (categoryIndex: number) => {
    setCompletedCategories((prev) => new Set(prev).add(categoryIndex));
    setSelectedCategory(null);
  };

  const progress =
    (completedCategories.size / examinationCategories.length) * 100;

  return (
    <div className="min-h-screen bg-[#040404] text-white flex flex-col relative">
      <Header />

      <main className="flex-1 relative overflow-hidden">
        <div className="relative z-10">
          <div className="shimmer w-full h-full absolute top-0 left-0 pointer-events-none" />

          {/* Header Section */}
          <section className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🛐</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold">
                  <span className="heading-gradient">
                    {t.confession.pageTitle}
                  </span>
                </h1>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {t.confession.pageSubtitle}
              </p>
            </div>

            {/* Progress Bar */}
            {currentStep === "examination" && (
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>{t.confession.examinationProgress}</span>
                  <span>
                    {Math.round(progress)}% {t.confession.complete}
                  </span>
                </div>
                <div className="w-full h-3 bg-black/30 rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Step Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {["introduction", "examination", "prayers", "preparation"].map(
                (step, index) => (
                  <button
                    key={step}
                    onClick={() =>
                      setCurrentStep(
                        step as
                          | "introduction"
                          | "examination"
                          | "prayers"
                          | "preparation",
                      )
                    }
                    className={`px-4 py-2 rounded-lg transition-all text-sm ${
                      currentStep === step
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-black/30 hover:bg-black/50 text-gray-400"
                    }`}
                  >
                    {index + 1}.{" "}
                    {step === "introduction"
                      ? t.confession.introduction
                      : step === "examination"
                        ? t.confession.examination
                        : step === "prayers"
                          ? t.confession.prayers
                          : t.confession.preparation}
                  </button>
                ),
              )}
            </div>
          </section>

          {/* Introduction Step */}
          {currentStep === "introduction" && (
            <section className="container mx-auto px-4 py-8 max-w-4xl">
              <div className="card-premium p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-3xl">📖</span>
                </div>
                <h2 className="text-3xl font-bold mb-6 text-gradient">
                  {t.confession.welcomeTitle}
                </h2>
                <div className="max-w-2xl mx-auto space-y-6 text-gray-300">
                  <p className="text-lg leading-relaxed">
                    {t.confession.welcomeText}
                  </p>
                  <div className="bg-black/20 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-purple-300">
                      {t.confession.essieGuidanceTitle}
                    </h3>
                    <p className="italic">"{t.confession.essieGuidanceText}"</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-black/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-300 mb-2">
                        {t.confession.whatYoullDo}
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>{t.confession.examineConscience}</li>
                        <li>{t.confession.reflectRelationship}</li>
                        <li>{t.confession.preparePrayers}</li>
                        <li>{t.confession.receiveGuidance}</li>
                      </ul>
                    </div>
                    <div className="bg-black/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-300 mb-2">
                        {t.confession.timeNeeded}
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>{t.confession.examination10to15}</li>
                        <li>{t.confession.prayerPrep5}</li>
                        <li>{t.confession.spiritualReflection5to10}</li>
                        <li>{t.confession.totalTime}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentStep("examination")}
                  className="button text-lg py-3 px-8 mt-8"
                >
                  {t.confession.beginExamination}
                </button>
              </div>
            </section>
          )}

          {/* Examination Step */}
          {currentStep === "examination" && (
            <section className="container mx-auto px-4 py-8 max-w-6xl">
              {selectedCategory === null ? (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4 text-gradient">
                      Examination of Conscience
                    </h2>
                    <p className="text-gray-300">
                      Choose a category to begin your spiritual reflection
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {examinationCategories.map((category, index) => (
                      <div
                        key={`category-${index}-${category.title.slice(0, 15).replace(/\s+/g, '-')}`}
                        onClick={() => setSelectedCategory(index)}
                        className={`card-premium p-6 cursor-pointer transition-all hover:scale-105 ${
                          completedCategories.has(index)
                            ? "border-green-500 border-2"
                            : ""
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-2xl">{category.icon}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-gradient">
                            {category.title}
                          </h3>
                          <p className="text-sm text-gray-400 mb-4">
                            {category.commandment}
                          </p>
                          <div className="text-xs text-gray-500">
                            {category.questions.length} reflection questions
                          </div>
                          {completedCategories.has(index) && (
                            <div className="mt-3 text-green-400">
                              ✅ Completed
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {completedCategories.size ===
                    examinationCategories.length && (
                    <div className="card-premium p-8 text-center mt-8">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-2xl">✅</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-gradient">
                        Examination Complete!
                      </h3>
                      <p className="text-gray-300 mb-6">
                        You have completed your examination of conscience.
                        You're ready to proceed to prayers and final
                        preparation.
                      </p>
                      <button
                        onClick={() => setCurrentStep("prayers")}
                        className="button text-lg py-3 px-8"
                      >
                        Continue to Prayers 📿
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="max-w-4xl mx-auto">
                  <div className="card-premium p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2 text-gradient">
                          {examinationCategories[selectedCategory].title}
                        </h3>
                        <p className="text-gray-400">
                          {examinationCategories[selectedCategory].commandment}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="text-gray-400 hover:text-white text-2xl"
                      >
                        ×
                      </button>
                    </div>

                    <div className="space-y-4 mb-6">
                      <h4 className="text-lg font-semibold text-purple-300">
                        Reflect on these questions:
                      </h4>
                      {examinationCategories[selectedCategory].questions.map(
                        (question, qIndex) => (
                          <div
                            key={`${selectedCategory}-${qIndex}-${question.slice(0, 20)}`}
                            className="bg-black/20 p-4 rounded-lg"
                          >
                            <p className="text-gray-300">{question}</p>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-purple-300 mb-3">
                        Personal Reflection:
                      </h4>
                      <textarea
                        value={reflectionNotes[selectedCategory] || ""}
                        onChange={(e) =>
                          setReflectionNotes((prev) => ({
                            ...prev,
                            [selectedCategory]: e.target.value,
                          }))
                        }
                        placeholder="Write your thoughts and reflections here... (private notes)"
                        className="w-full h-32 bg-black/20 border border-gray-700 rounded-lg p-4 text-gray-300 placeholder-gray-500 resize-none focus:border-purple-500 focus:outline-none"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        🔒 Your reflections are private and stored only on your
                        device
                      </p>
                    </div>

                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="button secondary"
                      >
                        Back to Categories
                      </button>
                      <button
                        onClick={() => handleCategoryComplete(selectedCategory)}
                        className="button"
                      >
                        Mark Complete ✅
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Prayers Step */}
          {currentStep === "prayers" && (
            <section className="container mx-auto px-4 py-8 max-w-4xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gradient">
                  Prayers for Confession
                </h2>
                <p className="text-gray-300">
                  Prepare your heart with these traditional Catholic prayers
                </p>
              </div>

              <div className="space-y-8">
                {/* Act of Contrition */}
                <div className="card-premium p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💔</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gradient">
                      Act of Contrition
                    </h3>
                    <p className="text-gray-400">
                      Express your sorrow for sin and purpose of amendment
                    </p>
                  </div>

                  <AudioPlayer
                    title="Act of Contrition"
                    audioType="spoken"
                    duration={60}
                    autoGenerate={true}
                  />

                  <div className="bg-black/20 p-6 rounded-lg mt-6">
                    <pre className="text-gray-300 leading-relaxed whitespace-pre-wrap font-serif text-center">
                      {actOfContrition}
                    </pre>
                  </div>
                </div>

                {/* Prayer Before Confession */}
                <div className="card-premium p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🙏</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gradient">
                      Prayer Before Confession
                    </h3>
                    <p className="text-gray-400">
                      Ask for God's grace to make a good confession
                    </p>
                  </div>

                  <AudioPlayer
                    title="Prayer Before Confession"
                    audioType="spoken"
                    duration={45}
                    autoGenerate={true}
                  />

                  <div className="bg-black/20 p-6 rounded-lg mt-6">
                    <pre className="text-gray-300 leading-relaxed whitespace-pre-wrap font-serif text-center">
                      {`Come, Holy Spirit, enlighten my mind
that I may know my sins as they really are.
Touch my heart that I may be truly sorry for them.
Strengthen my will that I may have a firm purpose
to sin no more and to avoid the occasions of sin.
Grant me the grace to make a good confession. Amen.`}
                    </pre>
                  </div>
                </div>

                {/* Prayer After Confession */}
                <div className="card-premium p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl">✨</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gradient">
                      Prayer After Confession
                    </h3>
                    <p className="text-gray-400">
                      Thank God for His mercy and grace
                    </p>
                  </div>

                  <AudioPlayer
                    title="Prayer After Confession"
                    audioType="spoken"
                    duration={45}
                    autoGenerate={true}
                  />

                  <div className="bg-black/20 p-6 rounded-lg mt-6">
                    <pre className="text-gray-300 leading-relaxed whitespace-pre-wrap font-serif text-center">
                      {`Thank you, Jesus, for the gift of forgiveness.
Help me to avoid sin and to live as Your faithful disciple.
May I always remember Your great mercy
and strive to be worthy of Your love.
Guide me to live in Your grace each day. Amen.`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() => setCurrentStep("preparation")}
                  className="button text-lg py-3 px-8"
                >
                  Final Preparation 🕊️
                </button>
              </div>
            </section>
          )}

          {/* Final Preparation Step */}
          {currentStep === "preparation" && (
            <section className="container mx-auto px-4 py-8 max-w-4xl">
              <div className="card-premium p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌅</span>
                </div>
                <h2 className="text-3xl font-bold mb-6 text-gradient">
                  You Are Ready
                </h2>

                <div className="max-w-2xl mx-auto space-y-6">
                  <p className="text-lg text-gray-300">
                    You have completed your examination of conscience and prayer
                    preparation. Your heart is ready to receive God's abundant
                    mercy in the Sacrament of Reconciliation.
                  </p>

                  <div className="bg-black/20 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-yellow-300">
                      🌟 Final Reminders
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="text-left">
                        <h4 className="font-semibold text-purple-300 mb-2">
                          During Confession:
                        </h4>
                        <ul className="space-y-1 text-gray-300">
                          <li>• Be honest and sincere</li>
                          <li>• Confess all mortal sins</li>
                          <li>• Listen to the priest's counsel</li>
                          <li>• Accept your penance humbly</li>
                        </ul>
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-purple-300 mb-2">
                          After Confession:
                        </h4>
                        <ul className="space-y-1 text-gray-300">
                          <li>• Complete your penance</li>
                          <li>• Thank God for His mercy</li>
                          <li>• Strive to avoid occasions of sin</li>
                          <li>• Embrace your new life in grace</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/20 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-purple-300">
                      ✝️ Essie's Final Words
                    </h3>
                    <p className="italic text-gray-300">
                      "Remember, dear soul, that you are beloved by God beyond
                      measure. Step into that confessional as a cherished child
                      of the Most High, ready to be embraced by infinite Love.
                      Your courage to seek reconciliation fills the heart of God
                      with joy. Go in peace, and sin no more."
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setCurrentStep("introduction")}
                      className="button secondary"
                    >
                      Start Over
                    </button>
                    <button className="button">Find a Nearby Church 🏛️</button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <SisterGraceButton />
    </div>
  );
}
