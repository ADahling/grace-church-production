"use client";

import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-[#040404] text-white flex flex-col relative">
      {/* Header */}
      <header className="py-4 px-6 flex justify-between items-center border-b border-gray-800 relative z-10">
        <div className="flex items-center gap-2">
          <img
            src="https://ext.same-assets.com/1398508920/3204955780.svg"
            alt="Grace Logo"
            className="h-10"
            width="40"
            height="40"
            style={{ width: "40px", height: "40px" }}
          />
          <span className="font-bold text-xl">Grace</span>
        </div>
        <div className="flex items-center gap-4">
          <Link className="text-gray-300 hover:text-primary" href="/">
            {t.notFound.home}
          </Link>
          <a className="text-gray-300 hover:text-primary" href="/about">
            About Essie
          </a>
          <a
            href="mailto:contact@graces.church"
            className="button secondary text-sm py-2"
          >
            Contact Us
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div className="shimmer w-full h-full absolute top-0 left-0 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 text-center max-w-2xl">
          {/* Sacred Elements Background */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-10 left-10 text-6xl">✝️</div>
            <div className="absolute top-20 right-16 text-4xl">🙏</div>
            <div className="absolute bottom-20 left-20 text-5xl">🕊️</div>
            <div className="absolute bottom-16 right-12 text-4xl">⛪</div>
          </div>

          {/* Main Content */}
          <div className="relative">
            {/* Sacred Number */}
            <div className="mb-8">
              <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-[#6b9bcc] via-[#5261a1] to-purple-500 bg-clip-text text-transparent mb-4">
                404
              </div>
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#6b9bcc]/20 to-[#5261a1]/20 rounded-full blur-xl" />
            </div>

            {/* Spiritual Message */}
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-gray-800 mb-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                <span className="text-2xl">🧭</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="heading-gradient">
                  {t.notFound.pageNotFound}
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                {t.notFound.wanderMessage}
              </p>

              <blockquote className="text-lg italic text-gray-300 mb-6 leading-relaxed">
                {t.notFound.psalm23}
              </blockquote>

              <p className="text-gray-400 mb-6">{t.notFound.psalmReference}</p>

              <div className="bg-black/20 p-6 rounded-lg border border-gray-700 mb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-white">E</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-[#6b9bcc]">
                  {t.notFound.messageFromEssie}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t.notFound.essieMessage}
                </p>
              </div>
            </div>

            {/* Navigation Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Link
                href="/"
                className="bg-black/30 backdrop-blur-md p-4 rounded-lg border border-gray-800 hover:border-[#6b9bcc] transition-all group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  🏠
                </div>
                <h3 className="font-semibold text-white mb-1">
                  {t.notFound.home}
                </h3>
                <p className="text-sm text-gray-400">
                  {t.notFound.returnToGrace}
                </p>
              </Link>

              <a
                href="/prayers"
                className="bg-black/30 backdrop-blur-md p-4 rounded-lg border border-gray-800 hover:border-[#6b9bcc] transition-all group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  🙏
                </div>
                <h3 className="font-semibold text-white mb-1">
                  {t.notFound.prayers}
                </h3>
                <p className="text-sm text-gray-400">
                  {t.notFound.findPeaceInPrayer}
                </p>
              </a>

              <a
                href="/meditations"
                className="bg-black/30 backdrop-blur-md p-4 rounded-lg border border-gray-800 hover:border-[#6b9bcc] transition-all group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  🧘‍♀️
                </div>
                <h3 className="font-semibold text-white mb-1">
                  {t.notFound.meditations}
                </h3>
                <p className="text-sm text-gray-400">
                  {t.notFound.sacredContemplation}
                </p>
              </a>

              <a
                href="/saints"
                className="bg-black/30 backdrop-blur-md p-4 rounded-lg border border-gray-800 hover:border-[#6b9bcc] transition-all group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  👑
                </div>
                <h3 className="font-semibold text-white mb-1">
                  {t.notFound.saints}
                </h3>
                <p className="text-sm text-gray-400">
                  {t.notFound.heavenlyIntercession}
                </p>
              </a>
            </div>

            {/* Emergency Spiritual Help */}
            <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-3 text-red-300">
                {t.notFound.needSpiritualSupport}
              </h3>
              <p className="text-gray-300 mb-4">
                {t.notFound.difficultTimeMessage}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/contact" className="button">
                  {t.notFound.contactEssie}
                </a>
                <a href="/prayers" className="button secondary">
                  {t.notFound.emergencyPrayers}
                </a>
              </div>
            </div>

            {/* Return Home */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="button">
                {t.notFound.returnToGraceButton}
              </Link>
              <a href="/about" className="button secondary">
                {t.notFound.learnAboutMission}
              </a>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
