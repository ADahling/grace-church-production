"use client";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
import AIPrayerGenerator from "@/components/AIPrayerGenerator";
import DailySpiritualMessage from "@/components/DailySpiritualMessage";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "@/context/LanguageContext";

type Prayer = Database["public"]["Tables"]["prayers"]["Row"];
type PrayerHistory = Database["public"]["Tables"]["user_prayer_history"]["Row"];
type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];

interface PrayerHistoryWithPrayer extends PrayerHistory {
  prayers: {
    title: string;
    category: string | null;
  } | null;
}

export default function Dashboard() {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [recentPrayers, setRecentPrayers] = useState<PrayerHistoryWithPrayer[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  const fetchUserProfile = useCallback(
    async (userId: string) => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (data) {
        setUserProfile(data);
      }
    },
    [supabase],
  );

  const fetchFeaturedPrayers = useCallback(async () => {
    const { data, error } = await supabase
      .from("prayers")
      .select("*")
      .eq("featured", true)
      .limit(6);

    if (data) {
      setPrayers(data);
    }
  }, [supabase]);

  const fetchRecentPrayers = useCallback(
    async (userId: string) => {
      const { data, error } = await supabase
        .from("user_prayer_history")
        .select(`
        *,
        prayers (
          title,
          category
        )
      `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);

      if (data) {
        setRecentPrayers(data);
      }
    },
    [supabase],
  );

  const checkUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/auth/login");
      return;
    }
    setUser(user);
    await Promise.all([
      fetchUserProfile(user.id),
      fetchFeaturedPrayers(),
      fetchRecentPrayers(user.id),
    ]);
    setLoading(false);
  }, [
    supabase.auth,
    router,
    fetchUserProfile,
    fetchFeaturedPrayers,
    fetchRecentPrayers,
  ]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const handlePrayNow = async (prayerId: string) => {
    if (!user) return;

    const { error } = await supabase.from("user_prayer_history").insert({
      user_id: user.id,
      prayer_id: prayerId,
      created_at: new Date().toISOString(),
    });

    if (!error) {
      fetchRecentPrayers(user.id);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t.dashboard.loadingJourney}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">G</span>
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                Grace
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {t.dashboard.welcome2}, {user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                {t.dashboard.signOut}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white mb-8">
          <h2 className="text-2xl font-bold mb-2">{t.dashboard.welcome}</h2>
          <p className="text-purple-100">{t.dashboard.subtitle}</p>
        </div>

        {/* AI Enhanced Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Spiritual Message */}
          <DailySpiritualMessage />

          {/* AI Prayer Generator */}
          <AIPrayerGenerator
            onPrayerGenerated={(prayer) => {
              // Refresh prayer history when new prayer is generated
              if (user) {
                fetchRecentPrayers(user.id);
              }
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Prayers */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t.dashboard.featuredPrayers}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prayers.map((prayer) => (
                <div
                  key={prayer.id}
                  className="bg-white rounded-lg shadow-sm border p-4"
                >
                  <h4 className="font-medium text-gray-900 mb-2">
                    {prayer.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {prayer.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {prayer.category}
                    </span>
                    <button
                      onClick={() => handlePrayNow(prayer.id)}
                      className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                    >
                      {t.dashboard.prayNow}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Recent Prayer Activity */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-3">
                {t.dashboard.recentActivity}
              </h4>
              {recentPrayers.length > 0 ? (
                <div className="space-y-3">
                  {recentPrayers.map((history) => (
                    <div
                      key={history.id}
                      className="flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0 w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {history.prayers?.title || "Prayer"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {history.created_at ? new Date(history.created_at).toLocaleDateString() : 'Unknown date'}
                        </p>
                        {history.duration && (
                          <p className="text-xs text-purple-600 mt-1">
                            {Math.round(history.duration / 60)} {t.dashboard.minutes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  <p className="text-sm">{t.dashboard.noPrayersYet}</p>
                  <p className="text-xs mt-1">
                    {t.dashboard.startPrayerJourney}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border p-4">
              <h4 className="font-medium text-gray-900 mb-3">
                {t.dashboard.yourJourney}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {t.dashboard.prayersThisWeek}
                  </span>
                  <span className="font-medium">{recentPrayers.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {t.dashboard.spiritualLevel}
                  </span>
                  <span className="font-medium text-purple-600">
                    {t.dashboard.growing}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {t.dashboard.daysActive}
                  </span>
                  <span className="font-medium">
                    {userProfile?.created_at
                      ? Math.floor(
                          (new Date().getTime() -
                            new Date(userProfile.created_at).getTime()) /
                            (1000 * 60 * 60 * 24),
                        )
                      : 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border p-4">
              <h4 className="font-medium text-gray-900 mb-3">
                {t.dashboard.quickActions}
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => router.push("/prayers")}
                  className="w-full text-left text-sm text-purple-600 hover:text-purple-800 py-2"
                >
                  {t.dashboard.browseAllPrayers}
                </button>
                <button
                  onClick={() => router.push("/saints")}
                  className="w-full text-left text-sm text-purple-600 hover:text-purple-800 py-2"
                >
                  {t.dashboard.discoverSaints}
                </button>
                <button
                  onClick={() => router.push("/journal")}
                  className="w-full text-left text-sm text-purple-600 hover:text-purple-800 py-2"
                >
                  {t.dashboard.spiritualJournal}
                </button>
                <button
                  onClick={() => router.push("/calendar")}
                  className="w-full text-left text-sm text-purple-600 hover:text-purple-800 py-2"
                >
                  {t.dashboard.liturgicalCalendar}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
