"use client";

import React from "react";
import { useTranslation } from "../context/LanguageContext";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { href: "/privacy", label: t.footer.privacy },
    { href: "/terms", label: t.footer.terms },
    { href: "/cookies", label: t.footer.cookies },
  ];

  const quickLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.footer.about },
    { href: "/prayers", label: t.nav.prayers },
    { href: "/meditations", label: t.nav.meditations },
    { href: "/saints", label: t.nav.saints },
    { href: "/faq", label: t.nav.faq },
  ];

  const spiritualLinks = [
    { href: "/divine-office", label: t.nav.divineOffice },
    { href: "/journal", label: t.nav.journal },
    { href: "/community", label: t.nav.community },
    { href: "/hospice", label: t.nav.hospice },
    { href: "/contact", label: t.footer.contact },
  ];

  return (
    <footer className="bg-black text-white border-t border-white/10 relative z-10">
      <div className="container mx-auto px-4 py-8">
        {/* Brand Section */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-xl font-bold text-white">G</span>
          </div>
          <div className="text-2xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Grace
            </span>
          </div>
          <p className="text-gray-300 text-sm max-w-sm mx-auto">
            {t.footer.foundedWithLove}
          </p>
        </div>

        {/* Mission */}
        <div className="bg-black/80 border border-white/10 rounded-xl p-4 mb-6 max-w-md mx-auto">
          <p className="text-gray-100 text-sm text-center leading-relaxed">
            {t.footer.missionDescription}
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6 max-w-2xl mx-auto">
          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {t.footer.quickLinks}
              </span>
            </h4>
            <ul className="space-y-2">
              {quickLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-xs"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Spiritual Life */}
          <div>
            <h4 className="text-sm font-semibold mb-3">
              <span className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                {t.footer.spiritualLife}
              </span>
            </h4>
            <ul className="space-y-2">
              {spiritualLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors text-xs"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-sm font-semibold mb-3">
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                {t.footer.support}
              </span>
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@graces.church"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-xs"
                >
                  contact@graces.church
                </a>
              </li>
              <li>
                <a
                  href="mailto:essie@graces.church"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-xs"
                >
                  essie@graces.church
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-4 border-t border-white/10">
          <div className="text-center">
            <p className="text-gray-400 text-xs mb-2">
              © {currentYear}{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold">
                Grace
              </span>
              . {t.footer.copyright.replace("© 2025 Grace. ", "")}
            </p>
            
            {/* Legal Links */}
            <div className="flex justify-center items-center gap-4 mb-4">
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-xs"
                  >
                    {link.label}
                  </a>
                  {index < legalLinks.length - 1 && (
                    <span className="text-white/30">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Developer Signature */}
            <div className="bg-black/80 border border-white/10 rounded-lg px-4 py-2 inline-block">
              <div className="flex items-center gap-2 text-xs">
                <span className="animate-pulse">🌸</span>
                <span className="text-gray-100">
                  Crafted with love & code by{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent font-medium">
                    Alicia Dahling
                  </span>
                </span>
                <span className="animate-pulse">🌸</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

