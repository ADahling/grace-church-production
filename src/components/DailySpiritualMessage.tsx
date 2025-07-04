"use client";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "@/context/LanguageContext";

interface DailyMessage {
  saint: string;
  message: string;
  theme: string;
  scriptureReference: string;
  reflectionPrompt: string;
  liturgicalSeason: string;
  personalized?: boolean;
  cached?: boolean;
  timestamp: string;
}

interface DailySpiritualMessageProps {
  className?: string;
}

export default function DailySpiritualMessage({
  className = "",
}: DailySpiritualMessageProps) {
  const { t } = useTranslation();
  const [dailyMessage, setDailyMessage] = useState<DailyMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  const checkUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  }, [supabase.auth]);

  const fetchDailyMessage = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/ai/daily-message");

      if (!response.ok) {
        throw new Error("Failed to fetch daily message");
      }

      const data = await response.json();
      setDailyMessage(data);
    } catch (error) {
      console.error("Error fetching daily message:", error);
      setError(
        error instanceof Error ? error.message : t.dailyMessage.errorFetch,
      );
    } finally {
      setLoading(false);
    }
  }, [t.dailyMessage.errorFetch]);

  useEffect(() => {
    checkUser();
    fetchDailyMessage();
  }, [checkUser, fetchDailyMessage]);

  const handlePersonalizeMessage = async () => {
    if (!user) {
      alert(t.dailyMessage.loginPrompt);
      return;
    }

    try {
      const response = await fetch("/api/ai/daily-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          preferredSaints: [],
          spiritualFocus: null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate personalized message");
      }

      const personalizedData = await response.json();
      setDailyMessage(personalizedData);
    } catch (error) {
      console.error("Error generating personalized message:", error);
      setError(t.dailyMessage.errorPersonalized);
    }
  };

  if (loading) {
    return (
      <div
        className={`bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border ${className}`}
      >
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`bg-red-50 border border-red-200 p-6 rounded-lg ${className}`}
      >
        <div className="flex items-center space-x-2 text-red-700">
          <span>⚠️</span>
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={fetchDailyMessage}
          className="mt-3 text-sm text-red-600 hover:text-red-800 underline"
        >
          {t.dailyMessage.tryAgain}
        </button>
      </div>
    );
  }

  if (!dailyMessage) {
    return null;
  }

  return (
    <div
      className={`bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">✨</span>
          <h3 className="text-lg font-semibold text-gray-800">
            {t.dailyMessage.title}
          </h3>
        </div>
        <div className="text-xs text-gray-500">
          {dailyMessage.liturgicalSeason}
        </div>
      </div>

      {/* Saint and Theme */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">
            {t.dailyMessage.fromSaint} {dailyMessage.saint}
          </p>
          <span className="inline-block bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded-full">
            {dailyMessage.theme}
          </span>
        </div>
      </div>

      {/* Message */}
      <div className="mb-4">
        <blockquote className="text-gray-800 italic leading-relaxed">
          "{dailyMessage.message}"
        </blockquote>
      </div>

      {/* Expandable Content */}
      {expanded && (
        <div className="space-y-4 border-t pt-4">
          {/* Scripture Reference */}
          <div className="bg-white p-3 rounded border-l-4 border-blue-500">
            <p className="text-sm font-medium text-blue-800 mb-1">
              {t.dailyMessage.scriptureToday}
            </p>
            <p className="text-blue-700 text-sm">
              {dailyMessage.scriptureReference}
            </p>
          </div>

          {/* Reflection Prompt */}
          <div className="bg-white p-3 rounded border-l-4 border-green-500">
            <p className="text-sm font-medium text-green-800 mb-1">
              {t.dailyMessage.reflection}
            </p>
            <p className="text-green-700 text-sm">
              {dailyMessage.reflectionPrompt}
            </p>
          </div>

          {/* Personalization Option */}
          {user && !dailyMessage.personalized && (
            <div className="bg-white p-3 rounded border border-purple-200">
              <p className="text-sm text-gray-700 mb-2">
                {t.dailyMessage.personalizePrompt}
              </p>
              <button
                onClick={handlePersonalizeMessage}
                className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors"
              >
                {t.dailyMessage.getPersonalized}
              </button>
            </div>
          )}

          {dailyMessage.personalized && (
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <p className="text-sm text-purple-800">
                {t.dailyMessage.personalizedNote}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-amber-700 hover:text-amber-800 flex items-center space-x-1"
        >
          <span>
            {expanded ? t.dailyMessage.showLess : t.dailyMessage.readMore}
          </span>
          <span
            className={`transform transition-transform ${expanded ? "rotate-180" : ""}`}
          >
            ↓
          </span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchDailyMessage}
            className="text-sm text-gray-600 hover:text-gray-800"
            title={t.dailyMessage.refreshTitle}
          >
            🔄
          </button>
          <div className="text-xs text-gray-500">
            {dailyMessage.cached ? t.dailyMessage.cached : t.dailyMessage.fresh}{" "}
            •{new Date(dailyMessage.timestamp).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact version for sidebar or smaller spaces
export function DailySpiritualMessageCompact({
  className = "",
}: DailySpiritualMessageProps) {
  const { t } = useTranslation();
  const [dailyMessage, setDailyMessage] = useState<DailyMessage | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDailyMessage = useCallback(async () => {
    try {
      const response = await fetch("/api/ai/daily-message");
      if (response.ok) {
        const data = await response.json();
        setDailyMessage(data);
      }
    } catch (error) {
      console.error("Error fetching daily message:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDailyMessage();
  }, [fetchDailyMessage]);

  if (loading) {
    return (
      <div
        className={`bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg ${className}`}
      >
        <div className="animate-pulse">
          <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-2 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (!dailyMessage) return null;

  return (
    <div
      className={`bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border ${className}`}
    >
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-lg">✨</span>
        <h4 className="text-sm font-semibold text-gray-800">
          {t.dailyMessage.compactTitle}
        </h4>
      </div>

      <p className="text-xs text-gray-600 mb-2">
        {t.dailyMessage.fromSaint} {dailyMessage.saint}
      </p>

      <blockquote className="text-sm text-gray-800 italic leading-relaxed line-clamp-3">
        "{dailyMessage.message}"
      </blockquote>

      <div className="mt-2 flex items-center justify-between">
        <span className="inline-block bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded-full">
          {dailyMessage.theme}
        </span>
        <span className="text-xs text-gray-500">
          {dailyMessage.liturgicalSeason}
        </span>
      </div>
    </div>
  );
}
