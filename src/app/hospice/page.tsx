"use client";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

import React from "react";
import { useTranslation } from "../../context/LanguageContext";

export default function HospicePage() {
  const { t } = useTranslation();

  const hospiceResources = [
    {
      title: "End-of-Life Prayers",
      description: "Sacred prayers for those approaching their final journey, bringing comfort and peace to patients and families.",
      icon: "🙏",
      link: "/prayers?category=end-of-life"
    },
    {
      title: "Bereavement Support",
      description: "Spiritual guidance and prayers for families and loved ones during the grieving process.",
      icon: "💝",
      link: "/prayers?category=bereavement"
    },
    {
      title: "Chaplain Resources",
      description: "Tools and prayers specifically designed for chaplains and spiritual care providers in hospice settings.",
      icon: "✝️",
      link: "/prayers?category=chaplain"
    },
    {
      title: "Family Comfort Prayers",
      description: "Prayers to bring peace and strength to families during difficult times.",
      icon: "👨‍👩‍👧‍👦",
      link: "/prayers?category=family"
    },
    {
      title: "Sacred Music & Chants",
      description: "Traditional Catholic chants and sacred music for peaceful moments and reflection.",
      icon: "🎵",
      link: "/meditations?category=music"
    },
    {
      title: "Saints for Comfort",
      description: "Learn about saints who provide special comfort during illness and end-of-life care.",
      icon: "👼",
      link: "/saints?category=comfort"
    }
  ];

  const emergencyPrayers = [
    {
      title: "Prayer for the Dying",
      prayer: "Into your hands, O Lord, I commend my spirit. You have redeemed me, O Lord, God of truth.",
      reference: "Luke 23:46"
    },
    {
      title: "Prayer for Peace",
      prayer: "May the Lord bless you and keep you. May the Lord make his face shine upon you and be gracious to you.",
      reference: "Numbers 6:24-25"
    },
    {
      title: "Prayer for Families",
      prayer: "Eternal rest grant unto them, O Lord, and let perpetual light shine upon them. May they rest in peace.",
      reference: "Traditional Catholic Prayer"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Hospice & End-of-Life Care
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Sacred spiritual resources for hospice care providers, patients, and families during life's most sacred transitions
            </p>
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <span className="text-2xl">🕊️</span>
              <p className="text-lg italic">
                "Blessed are those who mourn, for they will be comforted" - Matthew 5:4
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Essie's Mission */}
      <section className="py-16 bg-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Essie's Sacred Mission</h2>
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-8 border border-blue-500/20">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  E
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                As a chaplain and bereavement support provider affiliated with the Order of Santa Clara, 
                Essie walks alongside others in their most sacred and vulnerable moments—in hospitals, 
                hospices, and at bedsides where life meets eternity.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Her compassionate approach to end-of-life spiritual care and bereavement support inspired 
                the creation of Grace, bringing Catholic spiritual comfort to those in need, wherever they may be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hospice Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Hospice Care Resources</h2>
            <p className="text-gray-400 text-lg">
              Comprehensive spiritual tools for hospice care providers and families
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hospiceResources.map((resource, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{resource.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{resource.title}</h3>
                <p className="text-gray-400 mb-4">{resource.description}</p>
                <a
                  href={resource.link}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Access Resources →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Prayers */}
      <section className="py-16 bg-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Emergency Prayers</h2>
            <p className="text-gray-400 text-lg">
              Quick access to essential prayers for immediate spiritual comfort
            </p>
          </div>

          <div className="space-y-6">
            {emergencyPrayers.map((prayer, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-blue-500/20"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{prayer.title}</h3>
                <blockquote className="text-gray-300 text-lg italic mb-3 leading-relaxed">
                  "{prayer.prayer}"
                </blockquote>
                <cite className="text-blue-400 text-sm">— {prayer.reference}</cite>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Hospice Support */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-8 border border-blue-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">Need Immediate Spiritual Support?</h2>
            <p className="text-gray-300 text-lg mb-6">
              Our hospice care team is here to provide spiritual comfort and guidance during difficult times.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:essie@graces.church"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors"
              >
                Contact Essie Directly
              </a>
              <button
                onClick={() => {
                  // This would trigger the Sister Grace chatbot
                  const chatButton = document.querySelector('[aria-label*="Sister Grace"], [class*="sister-grace"], button:has-text("Sister Grace")') as HTMLElement;
                  if (chatButton) chatButton.click();
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors"
              >
                Chat with Sister Grace
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Available 24/7 for spiritual guidance and support
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

