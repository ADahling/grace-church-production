import Script from 'next/script';

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Grace Church",
    "alternateName": "Grace - Catholic Spiritual Wellness",
    "url": "https://graces.church",
    "logo": "https://graces.church/logo.png",
    "description": "AI-powered Catholic spiritual wellness platform offering personalized prayers, sacred meditations, and spiritual guidance rooted in Catholic tradition.",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/gracechurch"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English", "Spanish", "French", "Italian", "Portuguese", "Latin"]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Grace - AI-Powered Catholic Spiritual Wellness",
    "url": "https://graces.church",
    "description": "Discover deeper faith through personalized prayers, sacred meditations, and spiritual guidance rooted in Catholic tradition.",
    "inLanguage": ["en", "es", "fr", "it", "pt", "la"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://graces.church/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Grace - Catholic Spiritual Wellness",
    "url": "https://graces.church",
    "description": "AI-powered Catholic spiritual wellness platform with prayer tracking, meditation guides, and spiritual direction.",
    "applicationCategory": "Religion & Spirituality",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "AI-powered spiritual guidance",
      "Prayer intention tracking", 
      "Sacred meditations",
      "Divine Office prayers",
      "Multilingual support",
      "Catholic saint information",
      "Spiritual progress tracking"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://graces.church"
      }
    ]
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="web-application-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}

