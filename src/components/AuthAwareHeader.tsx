"use client";

import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/context/LanguageContext";

interface AuthAwareHeaderProps {
  variant?: "default" | "minimal";
}

export function AuthAwareHeader({ variant = "default" }: AuthAwareHeaderProps) {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    // Get initial user
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const publicNavigationItems = [
    { href: "/prayers", label: t.nav.prayers },
    { href: "/meditations", label: t.nav.meditations },
    { href: "/saints", label: t.nav.saints },
    { href: "/about", label: t.nav.about },
  ];

  const authNavigationItems = [
    { href: "/dashboard", label: t.auth.dashboard },
    { href: "/prayers", label: t.nav.prayers },
    { href: "/journal", label: t.nav.journal },
    { href: "/community", label: t.nav.community },
    { href: "/saints", label: t.nav.saints },
  ];

  const navigationItems = user ? authNavigationItems : publicNavigationItems;

  return (
    <header className="sticky top-0 z-30 py-3 px-4 md:py-4 md:px-6 border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <Link
            href={user ? "/dashboard" : "/"}
            className="flex items-center gap-2 md:gap-3 group min-w-0 flex-shrink-0"
          >
            <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">G</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-lg md:text-xl text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300 truncate">
                Grace
              </span>
              {variant === "default" && (
                <span className="text-xs text-gray-500 -mt-1 hidden sm:block truncate">
                  Catholic Spiritual Wellness
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium relative group text-sm whitespace-nowrap"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            {loading ? (
              <div className="w-8 h-8 animate-pulse bg-gray-200 rounded"></div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <span className="hidden md:block text-sm text-gray-700">
                  {t.auth.welcomeBack}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {t.auth.signOut}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {t.auth.signIn}
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  {t.auth.joinFree}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label={t.auth.toggleMobileMenu}
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
          <div className="lg:hidden mt-4 py-4 border-t border-gray-200">
            <div className="space-y-4">
              {/* Primary Navigation */}
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-3 px-4 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Auth Section for Mobile */}
              {!user && (
                <>
                  <div className="h-px bg-gray-200 my-4" />
                  <div className="space-y-2">
                    <Link
                      href="/auth/login"
                      className="block py-3 px-4 text-gray-700 hover:text-purple-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t.auth.signIn}
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t.auth.joinFree}
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
