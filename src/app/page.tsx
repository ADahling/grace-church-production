"use client";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

import Link from "next/link";
import { useState } from "react";
import { Header } from "../components/Header";
import { useTranslation } from "../context/LanguageContext";
import SpiritualArtwork from "../components/SpiritualArtwork";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#040404] text-white flex flex-col relative premium-background">
      <Header />

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        <div className="relative z-10">
          {/* Hero Section with Sacred Flowers */}
          <section className="container mx-auto px-4 py-16 text-center max-w-6xl">
            <div className="mb-16">
              <div className="flex justify-center items-center gap-4 mb-8">
                <h1 className="text-5xl md:text-7xl font-bold">
                  <span className="heading-gradient">{t.home.title}</span>
                </h1>
              </div>

              <h2 className="text-2xl md:text-4xl font-light mb-8">
                <span className="heading-gradient">{t.home.subtitle}</span>
              </h2>

              <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                {t.home.description}
              </p>

              {/* Sacred Spiritual Section */}
              <div className="flex flex-col lg:flex-row items-center gap-12 my-16 w-full">
                <div className="w-full lg:w-1/2">
                  <div className="flex flex-col items-center gap-8">
                    {/* Traditional Catholic Artwork */}
                    <SpiritualArtwork
                      type="jesus"
                      size="xl"
                      showQuote={true}
                      priority={true}
                      className="mb-8 transform hover:scale-105 transition-transform duration-300"
                    />

                    {/* Sacred Flower - Floating */}
                    <div className="relative">
                      <div className="w-64 h-64 mx-auto bg-gradient-to-br from-[#6b9bcc]/10 to-[#5261a1]/10 rounded-full" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src="https://ext.same-assets.com/239165245/3668259102.webp"
                          alt="Sacred Flower"
                          className="w-full max-w-xs mx-auto premium-float"
                          style={{ maxHeight: "240px", objectFit: "contain" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  {/* Community Message with Premium Design */}
                  <div className="glass-card p-8 text-center mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-gradient">
                      {t.home.globalCommunity}
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {t.home.globalCommunityDesc}
                    </p>
                  </div>

                  {/* Premium CTA */}
                  <div className="glass-card p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4 text-gradient">
                      {t.home.beginJourney}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {t.home.joinDescription}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/prayers" className="button flex-1">
                        {t.home.startPraying}
                      </Link>
                      <Link
                        href="/divine-office"
                        className="button secondary flex-1"
                      >
                        {t.nav.divineOffice} ⛪
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Features Section with Premium Cards */}
          <section className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="heading-gradient">
                  {t.home.spiritualJourneyBegins}
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                {t.home.guidedByEssie}
              </p>

              {/* Decorative Line */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#6b9bcc]"></div>
                <div className="w-2 h-2 bg-[#6b9bcc] rounded-full"></div>
                <div className="w-16 h-px bg-gradient-to-r from-[#6b9bcc] to-[#5261a1]"></div>
                <div className="w-2 h-2 bg-[#5261a1] rounded-full"></div>
                <div className="w-12 h-px bg-gradient-to-r from-[#5261a1] to-transparent"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Prayer Hub */}
              <Link href="/prayers" className="group">
                <div className="card-premium h-full group-hover:transform group-hover:scale-105">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform text-center">
                    🙏
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gradient text-center">
                    {t.home.prayerHub}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6 text-center">
                    {t.home.prayerHubDesc}
                  </p>
                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">✨</span>
                      <span>Our Father, Hail Mary, Glory Be</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">📿</span>
                      <span>Complete Rosary (All Mysteries)</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">💒</span>
                      <span>Divine Mercy Prayers</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Divine Office */}
              <Link href="/divine-office" className="group">
                <div className="card-premium h-full group-hover:transform group-hover:scale-105">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform text-center">
                    ⛪
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gradient text-center">
                    {t.home.liturgyOfHours}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6 text-center">
                    {t.home.liturgyOfHoursDesc}
                  </p>
                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">🕐</span>
                      <span>Seven Canonical Hours</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">🌍</span>
                      <span>Live Prayer Community</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">🎵</span>
                      <span>Audio Prayer Options</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Sacred Meditations */}
              <Link href="/meditations" className="group">
                <div className="card-premium h-full group-hover:transform group-hover:scale-105">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform text-center">
                    🕊️
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gradient text-center">
                    {t.home.sacredMeditationsFeature}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6 text-center">
                    {t.home.sacredMeditationsFeatureDesc}
                  </p>
                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">📖</span>
                      <span>Lectio Divina Sessions</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">🍞</span>
                      <span>Eucharistic Adoration</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">🔥</span>
                      <span>Ignatian Spirituality</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Saints & Messages */}
              <Link href="/saints" className="group">
                <div className="card-premium h-full group-hover:transform group-hover:scale-105">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform text-center">
                    👑
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gradient text-center">
                    {t.home.saintsMessages}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6 text-center">
                    {t.home.dailySpiritualWisdom}
                  </p>
                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">🌹</span>
                      <span>{t.home.popularModernSaints}</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">💌</span>
                      <span>{t.home.dailySpiritualMessages}</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">🌍</span>
                      <span>Multilingual Content</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Spiritual Journal */}
              <Link href="/journal" className="group">
                <div className="card-premium h-full group-hover:transform group-hover:scale-105">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform text-center">
                    📖
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gradient text-center">
                    Spiritual Journal
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6 text-center">
                    Sacred space for conversations with God featuring guided
                    prompts and voice journaling with transcription
                  </p>
                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">💭</span>
                      <span>Guided Spiritual Prompts</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">🎤</span>
                      <span>Voice Journaling</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">🤲</span>
                      <span>Essie's Wisdom Integration</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Global Community */}
              <Link href="/community" className="group">
                <div className="card-premium h-full group-hover:transform group-hover:scale-105">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform text-center">
                    🌍
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gradient text-center">
                    Global Community
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6 text-center">
                    Connect with Catholics worldwide through prayer requests,
                    multilingual groups, and answered prayer testimonies
                  </p>
                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">🙏</span>
                      <span>Prayer Request Sharing</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">🗣️</span>
                      <span>Multilingual Groups</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">⭕</span>
                      <span>Global Prayer Circles</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Catholic Calendar - NEW */}
              <Link href="/calendar" className="group">
                <div className="card-premium h-full group-hover:transform group-hover:scale-105">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform text-center">
                    📅
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gradient text-center">
                    Catholic Calendar
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6 text-center">
                    Daily Mass readings, saint feast days, and liturgical
                    celebrations following the Catholic Church calendar
                  </p>
                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">📖</span>
                      <span>Daily Mass Readings</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">👑</span>
                      <span>Saint Feast Days</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-black/20">
                      <span className="text-[#6b9bcc] text-lg">🕯️</span>
                      <span>Liturgical Seasons</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Essie's Mission Section with Sacred Design */}
          <section className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="card-premium text-center relative overflow-hidden">
              {/* Background Sacred Elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-[#6b9bcc]/10 to-[#5261a1]/10 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full"></div>

              <div className="relative z-10">
                <div className="flex justify-center items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center shimmer">
                    <span className="text-3xl font-bold text-white">E</span>
                  </div>
                  <h3 className="text-4xl font-bold text-gradient">
                    Guided by Essie
                  </h3>
                </div>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                  Chaplain, bereavement support provider, and spiritual guide
                  affiliated with the Order of Santa Clara. Essie brings
                  authentic Catholic spiritual care to those seeking deeper
                  faith through technology and tradition.
                </p>
                <Link href="/about" className="button text-lg py-3 px-8">
                  Discover Essie's Sacred Mission ✨
                </Link>
              </div>
            </div>
          </section>

          {/* Sister Grace Section with Premium Design */}
          <section className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="card-premium text-center">
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shimmer">
                  <span className="text-2xl">👼</span>
                </div>
                <h3 className="text-3xl font-bold text-gradient">
                  Meet Sister Grace
                </h3>
              </div>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Your AI spiritual companion available 24/7 for immediate
                Catholic spiritual guidance and support. Chat with Sister Grace
                in all 6 languages with authentic Catholic wisdom rooted in
                Church tradition.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {[
                  "🇺🇸 English",
                  "🇪🇸 Español",
                  "🇫🇷 Français",
                  "🇮🇹 Italiano",
                  "🇵🇹 Português",
                  "⛪ Latina",
                ].map((lang) => (
                  <span
                    key={lang}
                    className="px-4 py-2 glass-effect rounded-full text-sm text-gray-300 hover:text-[#6b9bcc] transition-colors"
                  >
                    {lang}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                Click the Sister Grace chat button on the right side to begin your
                conversation 💬
              </p>
            </div>
          </section>

          {/* Final Call to Action with Sacred Elements */}
          <section className="container mx-auto px-4 py-16 max-w-4xl text-center">
            <div className="relative">
              {/* Sacred Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6b9bcc]/5 to-[#5261a1]/5 rounded-2xl blur-xl"></div>

              <div className="relative z-10 p-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="heading-gradient">{t.home.nurtureSoul}</span>
                </h2>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  <span className="heading-gradient">
                    {t.home.letFaithFlourish}
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  {t.home.joinThousands}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/prayers"
                    className="button text-lg py-4 px-8 shimmer"
                  >
                    {t.home.beginJourneyButton}
                  </Link>
                  <Link
                    href="/about"
                    className="button secondary text-lg py-4 px-8"
                  >
                    {t.home.learnStoryButton}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
