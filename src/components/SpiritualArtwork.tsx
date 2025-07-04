import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import FaithFlowerLoader from "./FaithFlowerLoader";

interface SpiritualArtworkProps {
  type?: "jesus" | "mary" | "joseph" | "trinity" | "francis" | "saints" | "prayer" | "cross";
  size?: "sm" | "md" | "lg" | "xl";
  showQuote?: boolean;
  className?: string;
  priority?: boolean; // For above-the-fold images
}

export default function SpiritualArtwork({
  type = "jesus",
  size = "md",
  showQuote = false,
  className = "",
  priority = false,
}: SpiritualArtworkProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const getArtworkConfig = () => {
    switch (type) {
      case "jesus":
        return {
          image: "/images/spiritual/sacred-heart-jesus-ai.jpg",
          alt: "Sacred Heart of Jesus",
          quote: t.home.bibleQuote,
          reference: t.home.bibleReference,
        };
      case "mary":
        return {
          image: "/images/spiritual/virgin-mary-immaculate-heart-ai.jpg",
          alt: "Immaculate Heart of Mary",
          quote: "Pray for us sinners, now and at the hour of our death.",
          reference: "Hail Mary",
        };
      case "joseph":
        return {
          image: "/images/spiritual/saint-joseph-carpenter-ai.jpg",
          alt: "Saint Joseph the Carpenter",
          quote: "Go to Joseph.",
          reference: "Genesis 41:55",
        };
      case "trinity":
        return {
          image: "/images/spiritual/holy-trinity-ai.jpg",
          alt: "Holy Trinity",
          quote: "Glory be to the Father, and to the Son, and to the Holy Spirit.",
          reference: "Gloria Patri",
        };
      case "francis":
        return {
          image: "/images/spiritual/saint-francis-assisi-ai.jpg",
          alt: "Saint Francis of Assisi",
          quote: "Lord, make me an instrument of your peace.",
          reference: "Prayer of St. Francis",
        };
      case "saints":
        return {
          image: "/images/spiritual/our-lady-guadalupe-ai.jpg",
          alt: "Our Lady of Guadalupe and Catholic Saints",
          quote: "Pray for us sinners, now and at the hour of our death.",
          reference: "Hail Mary",
        };
      case "prayer":
        return {
          image: "/images/spiritual/praying-hands-rosary-ai.jpg",
          alt: "Hands in prayer with rosary",
          quote: "Be still and know that I am God.",
          reference: "Psalm 46:10",
        };
      case "cross":
        return {
          image: "/images/spiritual/catholic-crucifix-ai.jpg",
          alt: "Catholic Crucifix",
          quote:
            "For God so loved the world that he gave his one and only Son.",
          reference: "John 3:16",
        };
      default:
        return {
          image: "/images/spiritual/sacred-heart-jesus-ai.jpg",
          alt: "Sacred Heart of Jesus",
          quote: "Behold, I stand at the door and knock.",
          reference: "Revelation 3:20",
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-48 h-48";
      case "md":
        return "w-64 h-64";
      case "lg":
        return "w-80 h-80";
      case "xl":
        return "w-96 h-96";
      default:
        return "w-64 h-64";
    }
  };

  const artwork = getArtworkConfig();

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className={`spiritual-artwork ${className}`}>
        <div className="relative">
          <div
            className={`${getSizeClasses()} mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-400/60 relative`}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white/90 bg-gray-800/30">
              <div className="text-center">
                <div className="text-6xl mb-4">✝️</div>
                <p className="text-sm font-medium opacity-80">
                  {artwork.alt}
                </p>
              </div>
            </div>
          </div>
        </div>
        {showQuote && (
          <div className="mt-6 glass-card p-4 text-center">
            <blockquote className="text-gray-300 italic text-sm leading-relaxed mb-2">
              "{artwork.quote}"
            </blockquote>
            <cite className="text-[#6b9bcc] text-xs font-medium">
              — {artwork.reference}
            </cite>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`spiritual-artwork ${className}`}>
      <div className="relative">
        {/* Enhanced spiritual artwork container with refined golden border */}
        <div
          className={`${getSizeClasses()} mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-400/60 relative`}
        >
          {/* Refined golden frame with enhanced inner border */}
          <div className="absolute inset-2 border-2 border-yellow-300/40 rounded-lg shadow-inner bg-gradient-to-br from-yellow-300/10 via-yellow-200/5 to-yellow-300/10"></div>
          {/* Additional ornate frame layer */}
          <div className="absolute inset-1 border border-yellow-400/20 rounded-lg bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent"></div>
          {/* Catholic Artwork Image */}
          <div className="w-full h-full relative overflow-hidden rounded-md">
            {/* Enhanced golden frame effect */}
            <div className="absolute inset-4 border border-yellow-400/30 rounded-md z-10"></div>

            <Image
              src={artwork.image}
              alt={artwork.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{
                filter: "sepia(10%) saturate(120%) brightness(95%)",
                objectPosition: "center",
              }}
              priority={priority}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              onLoad={() => {
                console.log("SpiritualArtwork image loaded:", artwork.image);
                setImageLoaded(true);
                setImageError(false);
              }}
              onError={() => {
                console.log("SpiritualArtwork image error:", artwork.image);
                setImageError(true);
                setImageLoaded(false);
              }}
            />

            {/* Loading state UI - only show if not loaded and no error */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm">
                <FaithFlowerLoader 
                  message="Loading spiritual artwork..."
                  size="md"
                  className="text-white/90"
                />
              </div>
            )}
            
            {/* Fallback icon display */}
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center text-white/90 bg-gray-800/30">
                <div className="text-center">
                  {type === "jesus" && <div className="text-6xl mb-4">✝️</div>}
                  {type === "saints" && <div className="text-6xl mb-4">👑</div>}
                  {type === "prayer" && <div className="text-6xl mb-4">🙏</div>}
                  {type === "cross" && <div className="text-6xl mb-4">⛪</div>}
                  <p className="text-sm font-medium opacity-80">
                    {artwork.alt}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Optional spiritual quote */}
      {showQuote && (
        <div className="mt-6 glass-card p-4 text-center">
          <blockquote className="text-gray-300 italic text-sm leading-relaxed mb-2">
            "{artwork.quote}"
          </blockquote>
          <cite className="text-[#6b9bcc] text-xs font-medium">
            — {artwork.reference}
          </cite>
        </div>
      )}
    </div>
  );
}
