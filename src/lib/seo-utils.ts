import type { Metadata } from 'next';

export const supportedLanguages = {
  'en': { locale: 'en-US', name: 'English', flag: '🇺🇸' },
  'es': { locale: 'es-ES', name: 'Español', flag: '🇪🇸' },
  'fr': { locale: 'fr-FR', name: 'Français', flag: '🇫🇷' },
  'it': { locale: 'it-IT', name: 'Italiano', flag: '🇮🇹' },
  'pt': { locale: 'pt-PT', name: 'Português', flag: '🇵🇹' },
  'la': { locale: 'la', name: 'Latina', flag: '⛪' }
} as const;

export type SupportedLanguage = keyof typeof supportedLanguages;

export function generateHreflangAlternates(currentPath: string = '/') {
  const alternates: Record<string, string> = {};
  
  Object.entries(supportedLanguages).forEach(([lang, config]) => {
    // For the main page, use the locale directly
    if (currentPath === '/') {
      alternates[config.locale] = `https://graces.church/${config.locale}`;
    } else {
      // For other pages, append the path
      alternates[config.locale] = `https://graces.church/${config.locale}${currentPath}`;
    }
  });
  
  return alternates;
}

export function generateMultilingualMetadata(
  title: string,
  description: string,
  currentPath: string = '/',
  language: SupportedLanguage = 'en'
): Metadata {
  const currentLocale = supportedLanguages[language];
  
  return {
    title: {
      default: title,
      template: "%s | Grace Church"
    },
    description,
    alternates: {
      canonical: `https://graces.church${currentPath}`,
      languages: generateHreflangAlternates(currentPath),
    },
    openGraph: {
      title,
      description,
      url: `https://graces.church${currentPath}`,
      siteName: "Grace Church",
      locale: currentLocale.locale,
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Grace - Catholic Spiritual Wellness Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
      creator: "@gracechurch",
    },
  };
}

export function generateLanguageSpecificStructuredData(language: SupportedLanguage = 'en') {
  const currentLocale = supportedLanguages[language];
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Grace - AI-Powered Catholic Spiritual Wellness",
    "url": "https://graces.church",
    "description": "Discover deeper faith through personalized prayers, sacred meditations, and spiritual guidance rooted in Catholic tradition.",
    "inLanguage": Object.values(supportedLanguages).map(lang => lang.locale),
    "availableLanguage": Object.values(supportedLanguages).map(lang => ({
      "@type": "Language",
      "name": lang.name,
      "alternateName": lang.locale
    })),
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://graces.church/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

// SEO-friendly URL generation for different languages
export function generateLocalizedUrl(path: string, language: SupportedLanguage): string {
  const locale = supportedLanguages[language].locale;
  return `https://graces.church/${locale}${path}`;
}

// Generate sitemap entries for all languages
export function generateMultilingualSitemapEntries(paths: string[]) {
  const entries: Array<{
    url: string;
    lastModified: Date;
    changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    priority: number;
    alternates?: Record<string, string>;
  }> = [];

  paths.forEach(path => {
    // Add main entry (English)
    entries.push({
      url: `https://graces.church${path}`,
      lastModified: new Date(),
      changeFrequency: path === '/' ? 'daily' : 'weekly',
      priority: path === '/' ? 1.0 : 0.8,
      alternates: generateHreflangAlternates(path)
    });

    // Add language-specific entries
    Object.entries(supportedLanguages).forEach(([lang, config]) => {
      if (lang !== 'en') { // Skip English as it's the main entry
        entries.push({
          url: `https://graces.church/${config.locale}${path}`,
          lastModified: new Date(),
          changeFrequency: path === '/' ? 'daily' : 'weekly',
          priority: path === '/' ? 0.9 : 0.7,
          alternates: generateHreflangAlternates(path)
        });
      }
    });
  });

  return entries;
}

