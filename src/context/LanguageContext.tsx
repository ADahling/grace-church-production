"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  type Language,
  type Translation,
  translations,
} from "../lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
  availableLanguages: { code: Language; name: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const availableLanguages = [
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "es" as Language, name: "Español", flag: "🇪🇸" },
  { code: "fr" as Language, name: "Français", flag: "🇫🇷" },
  { code: "it" as Language, name: "Italiano", flag: "🇮🇹" },
  { code: "pt" as Language, name: "Português", flag: "🇵🇹" },
  { code: "la" as Language, name: "Latina", flag: "⛪" },
];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isClient, setIsClient] = useState(false);

  // Set client flag after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load saved language preference on mount (only on client)
  useEffect(() => {
    if (!isClient) return;

    try {
      const savedLanguage = localStorage.getItem("grace-language") as Language;
      if (savedLanguage && translations[savedLanguage]) {
        setLanguageState(savedLanguage);
      } else {
        // Auto-detect browser language
        const browserLang = navigator.language.split("-")[0] as Language;
        if (translations[browserLang]) {
          setLanguageState(browserLang);
        }
      }
    } catch (error) {
      // Fallback to English if localStorage/navigator is not available
      console.warn("Language detection failed, using English as fallback:", error);
      setLanguageState("en");
    }
  }, [isClient]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    
    if (isClient) {
      try {
        localStorage.setItem("grace-language", lang);

        // Update document language attribute for accessibility
        document.documentElement.lang = lang;

        // Update document title based on language
        const titles = {
          en: "Grace - Catholic Spiritual Wellness",
          es: "Grace - Bienestar Espiritual Católico",
          fr: "Grace - Bien-être Spirituel Catholique",
          it: "Grace - Benessere Spirituale Cattolico",
          pt: "Grace - Bem-estar Espiritual Católico",
          la: "Grace - Salus Spiritualis Catholica",
        };
        document.title = titles[lang];
      } catch (error) {
        console.warn("Failed to update language preferences:", error);
      }
    }
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // During SSR or if provider is missing, return default English values
    // Only log warning on client side to avoid build noise
    if (typeof window !== "undefined") {
      console.warn("useLanguage: LanguageProvider not found, using English defaults");
    }
    return {
      language: "en" as Language,
      setLanguage: () => {},
      t: translations.en,
      availableLanguages,
    };
  }
  return context;
}

// Language selector component
export function LanguageSelector() {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-700 hover:border-[#6b9bcc] transition-colors bg-black/30 backdrop-blur-md"
      >
        <span className="text-lg">
          {availableLanguages.find((lang) => lang.code === language)?.flag}
        </span>
        <span className="text-sm font-medium">
          {availableLanguages.find((lang) => lang.code === language)?.name}
        </span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-black/30 backdrop-blur-md border border-gray-700 rounded-lg overflow-hidden z-50">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#6b9bcc]/20 transition-colors ${
                language === lang.code
                  ? "bg-[#6b9bcc]/10 text-[#6b9bcc]"
                  : "text-gray-300"
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Hook for quick translation access
export function useTranslation() {
  const { t, language } = useLanguage();
  return { t, language };
}

