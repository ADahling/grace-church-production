"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { LanguageSelector, useTranslation } from "../context/LanguageContext";

interface HeaderProps {
  variant?: "default" | "minimal";
}

export function Header({ variant = "default" }: HeaderProps) {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { href: "/prayers", label: t.nav.prayers },
    { href: "/divine-office", label: t.nav.divineOffice },
    { href: "/meditations", label: t.nav.meditations },
    { href: "/saints", label: t.nav.saints },
    { href: "/confession", label: t.nav.confession },
    { href: "/calendar", label: t.nav.calendar },
    { href: "/journal", label: t.nav.journal },
    { href: "/community", label: t.nav.community },
  ];

  const secondaryItems = [
    { href: "/about", label: t.nav.about },
    { href: "/faq", label: t.nav.faq },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-30 py-3 px-4 md:py-4 md:px-6 border-b border-gray-800 bg-[#040404]/95 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 md:gap-3 group min-w-0 flex-shrink-0"
          >
            {/* Brand Name */}
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-lg md:text-xl text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#6b9bcc] group-hover:to-[#5261a1] group-hover:bg-clip-text transition-all duration-300 truncate">
                Grace
              </span>
              {variant === "default" && (
                <span className="text-xs text-gray-400 -mt-1 hidden sm:block truncate">
                  Catholic Spiritual Wellness
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6">
            <div className="flex items-center gap-4">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-white hover:text-transparent hover:bg-gradient-to-r hover:from-[#6b9bcc] hover:to-[#5261a1] hover:bg-clip-text transition-all duration-300 font-medium relative group text-sm whitespace-nowrap"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6b9bcc] to-[#5261a1] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-700" />

            {/* Secondary Navigation */}
            <div className="flex items-center gap-3">
              {secondaryItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-400 hover:text-[#6b9bcc] transition-colors text-xs whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Tablet Navigation */}
          <nav className="hidden lg:flex xl:hidden items-center gap-4">
            <div className="flex items-center gap-3">
              {navigationItems.slice(0, 4).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-[#6b9bcc] transition-colors text-sm whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Right Side - Language Selector & Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
              aria-label="Toggle mobile menu"
            >
              <div className="w-5 h-5 md:w-6 md:h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-4 md:w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"}`}
                />
                <span
                  className={`block w-4 md:w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-4 md:w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-gray-800">
            <div className="space-y-4">
              {/* Language Selector for Mobile */}
              <div className="sm:hidden pb-4 border-b border-gray-800">
                <LanguageSelector />
              </div>

              {/* Primary Navigation */}
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-800 my-4" />

              {/* Secondary Navigation */}
              <div className="space-y-2">
                {secondaryItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block py-2 px-4 text-gray-400 hover:text-[#6b9bcc] transition-colors text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
