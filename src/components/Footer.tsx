"use client";

import React, { useEffect } from "react";
import { useTranslation } from "../context/LanguageContext";

export function Footer() {
  const { t } = useTranslation();

  // NUCLEAR OPTION: JavaScript enforcement that runs continuously
  useEffect(() => {
    const enforceBlackFooter = () => {
      // Find all possible footer elements
      const footers = [
        ...document.querySelectorAll('footer'),
        ...document.querySelectorAll('[class*="footer"]'),
        ...document.querySelectorAll('[id*="footer"]'),
        ...document.querySelectorAll('div:last-child:has(a[href*="privacy"])'),
        ...document.querySelectorAll('section:last-child:has(a[href*="contact"])')
      ];

      footers.forEach(footer => {
        if (footer) {
          // Force black background with maximum priority
          footer.style.setProperty('background-color', '#000000', 'important');
          footer.style.setProperty('background', 'linear-gradient(135deg, #000000 0%, #1a1a1a 30%, #2d2d2d 50%, #1a1a1a 70%, #000000 100%)', 'important');
          footer.style.setProperty('color', '#ffffff', 'important');
          footer.style.setProperty('border-top', '1px solid rgba(255, 255, 255, 0.1)', 'important');
          
          // Force all child elements to be white text
          const children = footer.querySelectorAll('*');
          children.forEach(child => {
            child.style.setProperty('color', '#ffffff', 'important');
            child.style.setProperty('background-color', 'transparent', 'important');
          });

          // Force links to be light gray
          const links = footer.querySelectorAll('a');
          links.forEach(link => {
            link.style.setProperty('color', '#e5e7eb', 'important');
          });
        }
      });
    };

    // Run immediately
    enforceBlackFooter();

    // Run on DOM changes
    const observer = new MutationObserver(enforceBlackFooter);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Run every second as backup
    const interval = setInterval(enforceBlackFooter, 1000);

    // Run on window events
    window.addEventListener('load', enforceBlackFooter);
    window.addEventListener('resize', enforceBlackFooter);

    return () => {
      observer.disconnect();
      clearInterval(interval);
      window.removeEventListener('load', enforceBlackFooter);
      window.removeEventListener('resize', enforceBlackFooter);
    };
  }, []);

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

  // CSS-in-JS styles that cannot be overridden
  const footerStyles = {
    backgroundColor: '#000000',
    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 30%, #2d2d2d 50%, #1a1a1a 70%, #000000 100%)',
    color: '#ffffff',
    minHeight: '300px',
    width: '100%',
    position: 'relative' as const,
    zIndex: 10,
    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const containerStyles = {
    backgroundColor: 'transparent',
    color: '#ffffff',
    position: 'relative' as const,
    zIndex: 10
  };

  const overlayStyles = {
    position: 'absolute' as const,
    inset: '0',
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(26, 26, 26, 0.95) 50%, rgba(0, 0, 0, 0.98) 100%)',
    backgroundColor: '#000000',
    pointerEvents: 'none' as const,
    zIndex: 1
  };

  return (
    <footer 
      style={footerStyles}
      className="footer-component"
      data-footer="true"
    >
      {/* ABSOLUTE OVERLAY TO ENSURE DARKNESS */}
      <div style={overlayStyles}></div>
      
      <div style={containerStyles} className="container mx-auto px-4 py-8">
        {/* Brand Section */}
        <div className="text-center mb-8">
          <div 
            style={{ 
              backgroundColor: '#6b9bcc', 
              background: 'linear-gradient(135deg, #6b9bcc 0%, #5261a1 100%)',
              color: '#ffffff'
            }}
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
          >
            <span style={{ color: '#ffffff' }} className="text-xl font-bold">G</span>
          </div>
          <div className="text-2xl font-bold mb-2">
            <span 
              style={{ 
                background: 'linear-gradient(90deg, #6b9bcc 0%, #9370db 50%, #5261a1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Grace
            </span>
          </div>
          <p style={{ color: '#e5e7eb' }} className="text-sm max-w-sm mx-auto">
            {t.footer.foundedWithLove}
          </p>
        </div>

        {/* Mission */}
        <div 
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            maxWidth: '448px',
            margin: '0 auto 24px auto',
            color: '#ffffff'
          }}
        >
          <p style={{ color: '#f3f4f6' }} className="text-sm text-center leading-relaxed">
            {t.footer.missionDescription}
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6 max-w-2xl mx-auto">
          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3">
              <span 
                style={{ 
                  background: 'linear-gradient(90deg, #6b9bcc 0%, #9370db 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {t.footer.quickLinks}
              </span>
            </h4>
            <ul className="space-y-2">
              {quickLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{ color: '#e5e7eb' }}
                    className="hover:text-[#6b9bcc] transition-colors text-xs"
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
              <span 
                style={{ 
                  background: 'linear-gradient(90deg, #9370db 0%, #5261a1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {t.footer.spiritualLife}
              </span>
            </h4>
            <ul className="space-y-2">
              {spiritualLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{ color: '#e5e7eb' }}
                    className="hover:text-[#9370db] transition-colors text-xs"
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
              <span 
                style={{ 
                  background: 'linear-gradient(90deg, #5261a1 0%, #6b9bcc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {t.footer.support}
              </span>
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@graces.church"
                  style={{ color: '#e5e7eb' }}
                  className="hover:text-[#6b9bcc] transition-colors text-xs"
                >
                  contact@graces.church
                </a>
              </li>
              <li>
                <a
                  href="mailto:essie@graces.church"
                  style={{ color: '#e5e7eb' }}
                  className="hover:text-[#6b9bcc] transition-colors text-xs"
                >
                  essie@graces.church
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div 
          style={{ 
            paddingTop: '16px', 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#ffffff'
          }}
        >
          <div className="text-center">
            <p style={{ color: '#d1d5db' }} className="text-xs mb-2">
              © {currentYear}{" "}
              <span 
                style={{ 
                  background: 'linear-gradient(90deg, #6b9bcc 0%, #9370db 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '600'
                }}
              >
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
                    style={{ color: '#d1d5db' }}
                    className="hover:text-[#6b9bcc] transition-colors text-xs"
                  >
                    {link.label}
                  </a>
                  {index < legalLinks.length - 1 && (
                    <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Developer Signature */}
            <div 
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '8px 16px',
                display: 'inline-block',
                color: '#ffffff'
              }}
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="animate-pulse">🌸</span>
                <span style={{ color: '#f3f4f6' }}>
                  Crafted with love & code by{" "}
                  <span 
                    style={{ 
                      background: 'linear-gradient(90deg, #9370db 0%, #d8bfd8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontWeight: '500'
                    }}
                  >
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

