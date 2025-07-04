"use client";

import React from "react";

interface FaithFlowerLoaderProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function FaithFlowerLoader({
  message = "Loading spiritual content...",
  size = "md",
  className = "",
}: FaithFlowerLoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-2xl",
    md: "w-12 h-12 text-4xl", 
    lg: "w-16 h-16 text-6xl",
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      {/* Animated Faith Flower */}
      <div className="relative">
        <div className={`${sizeClasses[size]} flex items-center justify-center`}>
          <span className="animate-spin-slow inline-block transform-gpu">
            🌸
          </span>
        </div>
        
        {/* Spiritual Glow Effect */}
        <div className="absolute inset-0 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-[#6b9bcc]/20 to-purple-400/20 rounded-full blur-lg"></div>
        </div>
        
        {/* Floating Petals */}
        <div className="absolute -top-2 -left-2 animate-bounce delay-100">
          <span className="text-xs opacity-60">🌺</span>
        </div>
        <div className="absolute -top-2 -right-2 animate-bounce delay-300">
          <span className="text-xs opacity-60">🌺</span>
        </div>
        <div className="absolute -bottom-2 -left-2 animate-bounce delay-500">
          <span className="text-xs opacity-60">🌺</span>
        </div>
        <div className="absolute -bottom-2 -right-2 animate-bounce delay-700">
          <span className="text-xs opacity-60">🌺</span>
        </div>
      </div>

      {/* Loading Message */}
      {message && (
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center animate-pulse">
          {message}
        </p>
      )}

      {/* Faith Dots */}
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-[#6b9bcc] rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-[#6b9bcc] rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-[#6b9bcc] rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  );
}

