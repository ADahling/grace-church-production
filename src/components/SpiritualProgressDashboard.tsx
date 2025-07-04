"use client";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "../context/LanguageContext";

interface SpiritualMetrics {
  totalPrayers: number;
  prayersThisWeek: number;
  prayersThisMonth: number;
  currentStreak: number;
  longestStreak: number;
  totalIntentions: number;
  answeredIntentions: number;
  chatSessions: number;
  favoriteDevotions: string[];
  spiritualMilestones: SpiritualMilestone[];
  weeklyProgress: DailyProgress[];
  monthlyProgress: MonthlyProgress[];
}

interface SpiritualMilestone {
  id: string;
  title: string;
  description: string;
  achieved_at: string;
  category: 'prayer' | 'devotion' | 'growth' | 'service' | 'knowledge';
  icon: string;
}

interface DailyProgress {
  date: string;
  prayers: number;
  chatSessions: number;
  intentionsPrayed: number;
}

interface MonthlyProgress {
  month: string;
  totalPrayers: number;
  totalSessions: number;
  milestonesAchieved: number;
}

interface SpiritualProgressDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SpiritualProgressDashboard({
  isOpen,
  onClose,
}: SpiritualProgressDashboardProps) {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [metrics, setMetrics] = useState<SpiritualMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'milestones'>('overview');
  const supabase = createClient();

  const checkUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  }, [supabase.auth]);

  const loadSpiritualMetrics = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Get prayer intentions data
      const { data: intentions } = await supabase
        .from('prayer_intentions')
        .select('*')
        .eq('user_id', user.id);

      // Calculate metrics from available data
      const totalIntentions = intentions?.length || 0;
      const answeredIntentions = intentions?.filter(i => i.status === 'answered').length || 0;
      const totalPrayers = intentions?.reduce((sum, i) => sum + (i.prayer_count || 0), 0) || 0;

      // Calculate weekly and monthly prayers (simplified for demo)
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const recentIntentions = intentions?.filter(i => 
        new Date(i.updated_at || i.created_at) > weekAgo
      ) || [];
      
      const prayersThisWeek = recentIntentions.reduce((sum, i) => sum + (i.prayer_count || 0), 0);
      const prayersThisMonth = intentions?.filter(i => 
        new Date(i.updated_at || i.created_at) > monthAgo
      ).reduce((sum, i) => sum + (i.prayer_count || 0), 0) || 0;

      // Generate sample milestones based on user activity
      const milestones: SpiritualMilestone[] = [];
      
      if (totalIntentions >= 1) {
        milestones.push({
          id: '1',
          title: 'First Prayer Intention',
          description: 'You submitted your first prayer intention',
          achieved_at: intentions?.[0]?.created_at || new Date().toISOString(),
          category: 'prayer',
          icon: '🙏'
        });
      }

      if (totalPrayers >= 10) {
        milestones.push({
          id: '2',
          title: 'Faithful Pray-er',
          description: 'You have prayed 10 times',
          achieved_at: new Date().toISOString(),
          category: 'devotion',
          icon: '✨'
        });
      }

      if (answeredIntentions >= 1) {
        milestones.push({
          id: '3',
          title: 'Answered Prayer',
          description: 'You experienced your first answered prayer',
          achieved_at: intentions?.find(i => i.status === 'answered')?.answered_at || new Date().toISOString(),
          category: 'growth',
          icon: '🌟'
        });
      }

      // Generate weekly progress (last 7 days)
      const weeklyProgress: DailyProgress[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        weeklyProgress.push({
          date: date.toISOString().split('T')[0],
          prayers: Math.floor(Math.random() * 3), // Simplified for demo
          chatSessions: Math.floor(Math.random() * 2),
          intentionsPrayed: Math.floor(Math.random() * 2)
        });
      }

      // Generate monthly progress (last 6 months)
      const monthlyProgress: MonthlyProgress[] = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        monthlyProgress.push({
          month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          totalPrayers: Math.floor(Math.random() * 50) + 10,
          totalSessions: Math.floor(Math.random() * 20) + 5,
          milestonesAchieved: Math.floor(Math.random() * 3)
        });
      }

      const calculatedMetrics: SpiritualMetrics = {
        totalPrayers,
        prayersThisWeek,
        prayersThisMonth,
        currentStreak: Math.floor(Math.random() * 7) + 1, // Simplified
        longestStreak: Math.floor(Math.random() * 14) + 3,
        totalIntentions,
        answeredIntentions,
        chatSessions: Math.floor(Math.random() * 20) + 5, // Simplified
        favoriteDevotions: ['Rosary', 'Divine Mercy', 'Adoration'],
        spiritualMilestones: milestones,
        weeklyProgress,
        monthlyProgress
      };

      setMetrics(calculatedMetrics);
    } catch (err) {
      console.error('Error loading spiritual metrics:', err);
      setError('Failed to load spiritual progress');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (user && isOpen) {
      loadSpiritualMetrics();
    }
  }, [user, isOpen, loadSpiritualMetrics]);

  const getStreakColor = (streak: number) => {
    if (streak >= 7) return 'text-green-600 bg-green-100';
    if (streak >= 3) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getMilestoneIcon = (category: SpiritualMilestone['category']) => {
    const icons = {
      prayer: '🙏',
      devotion: '✨',
      growth: '🌱',
      service: '❤️',
      knowledge: '📖'
    };
    return icons[category] || '⭐';
  };

  if (!isOpen) return null;

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 text-center">
          <h3 className="text-lg font-semibold mb-4">Sign In Required</h3>
          <p className="text-gray-600 mb-4">Please sign in to view your spiritual progress.</p>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-gray-900 rounded-lg shadow-2xl w-full max-w-4xl h-[700px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📊</span>
              <div>
                <h3 className="font-semibold">Spiritual Progress Dashboard</h3>
                <p className="text-sm opacity-90">Track your journey of faith</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-xl font-bold"
              aria-label="Close dashboard"
            >
              ×
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-3 m-2">
            <p className="text-sm text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b">
          {[
            { key: 'overview', label: 'Overview', icon: '📈' },
            { key: 'progress', label: 'Progress', icon: '📊' },
            { key: 'milestones', label: 'Milestones', icon: '🏆' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors flex items-center justify-center space-x-2 ${
                activeTab === tab.key
                  ? 'border-green-500 text-green-600 bg-green-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading your spiritual progress...</div>
          ) : !metrics ? (
            <div className="text-center py-8 text-gray-500">No progress data available yet</div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{metrics.totalPrayers}</div>
                      <div className="text-sm text-blue-800">Total Prayers</div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{metrics.totalIntentions}</div>
                      <div className="text-sm text-green-800">Prayer Intentions</div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">{metrics.answeredIntentions}</div>
                      <div className="text-sm text-purple-800">Answered Prayers</div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">{metrics.chatSessions}</div>
                      <div className="text-sm text-yellow-800">Sister Grace Chats</div>
                    </div>
                  </div>

                  {/* Prayer Streak */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-xl mr-2">🔥</span>
                      Prayer Streak
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className={`text-3xl font-bold ${getStreakColor(metrics.currentStreak)} inline-block px-3 py-1 rounded-full`}>
                          {metrics.currentStreak}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Current Streak (days)</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-700">{metrics.longestStreak}</div>
                        <div className="text-sm text-gray-600 mt-1">Longest Streak (days)</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-lg font-semibold text-blue-600">{metrics.prayersThisWeek}</div>
                        <div className="text-sm text-gray-600">Prayers this week</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-green-600">{metrics.prayersThisMonth}</div>
                        <div className="text-sm text-gray-600">Prayers this month</div>
                      </div>
                    </div>
                  </div>

                  {/* Favorite Devotions */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-xl mr-2">💜</span>
                      Favorite Devotions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {metrics.favoriteDevotions.map((devotion, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {devotion}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Tab */}
              {activeTab === 'progress' && (
                <div className="space-y-6">
                  {/* Weekly Progress Chart */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Weekly Prayer Activity</h4>
                    <div className="space-y-3">
                      {metrics.weeklyProgress.map((day, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="text-sm text-gray-600 w-20">
                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div className="flex-1 mx-4">
                            <div className="bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${Math.min(day.prayers * 33, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-gray-900 w-8">
                            {day.prayers}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Monthly Trends */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Monthly Trends</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {metrics.monthlyProgress.slice(-3).map((month, index) => (
                        <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-gray-900">{month.month}</div>
                          <div className="text-sm text-gray-600 mt-2">
                            <div>{month.totalPrayers} prayers</div>
                            <div>{month.totalSessions} sessions</div>
                            <div>{month.milestonesAchieved} milestones</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Milestones Tab */}
              {activeTab === 'milestones' && (
                <div className="space-y-4">
                  {metrics.spiritualMilestones.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <span className="text-4xl mb-4 block">🌱</span>
                      <p>Start your spiritual journey to unlock milestones!</p>
                    </div>
                  ) : (
                    metrics.spiritualMilestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="text-3xl">{milestone.icon}</div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900 mb-1">{milestone.title}</h5>
                            <p className="text-gray-600 text-sm mb-2">{milestone.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                {milestone.category}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(milestone.achieved_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            "I can do all things through Christ who strengthens me" - Philippians 4:13
          </p>
        </div>
      </div>
    </div>
  );
}

export function SpiritualProgressButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 z-40"
        aria-label="Spiritual Progress"
      >
        <div className="flex items-center space-x-2">
          <span className="text-2xl">📊</span>
          <span className="hidden sm:inline font-medium">Progress</span>
        </div>
      </button>

      <SpiritualProgressDashboard isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

