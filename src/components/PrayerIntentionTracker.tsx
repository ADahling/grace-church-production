"use client";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "../context/LanguageContext";

interface PrayerIntention {
  id: string;
  title: string;
  description: string | null;
  category: 'healing' | 'family' | 'work' | 'spiritual_growth' | 'guidance' | 'gratitude' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'active' | 'answered' | 'ongoing' | 'closed';
  created_at: string;
  updated_at: string;
  answered_at?: string | null;
  answer_description?: string | null;
  prayer_count: number;
  last_prayed_at?: string | null;
  tags: string[] | null;
  is_private: boolean;
  saint_intercession?: string | null;
  scripture_reference?: string | null;
}

interface PrayerIntentionTrackerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrayerIntentionTracker({
  isOpen,
  onClose,
}: PrayerIntentionTrackerProps) {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [intentions, setIntentions] = useState<PrayerIntention[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'answered' | 'all'>('active');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIntention, setNewIntention] = useState({
    title: '',
    description: '',
    category: 'spiritual_growth' as PrayerIntention['category'],
    priority: 'medium' as PrayerIntention['priority'],
    is_private: true,
    saint_intercession: '',
    tags: [] as string[]
  });
  const supabase = createClient();

  const checkUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  }, [supabase.auth]);

  const loadIntentions = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('prayer_intentions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIntentions(data || []);
    } catch (err) {
      console.error('Error loading prayer intentions:', err);
      setError('Failed to load prayer intentions');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (user && isOpen) {
      loadIntentions();
    }
  }, [user, isOpen, loadIntentions]);

  const handleAddIntention = async () => {
    if (!user || !newIntention.title.trim()) return;

    setLoading(true);
    try {
      const intention = {
        user_id: user.id,
        title: newIntention.title.trim(),
        description: newIntention.description?.trim() || null,
        category: newIntention.category,
        priority: newIntention.priority,
        is_private: newIntention.is_private,
        saint_intercession: newIntention.saint_intercession?.trim() || null,
        tags: newIntention.tags,
      };

      const { data, error } = await supabase
        .from('prayer_intentions')
        .insert([intention])
        .select()
        .single();

      if (error) throw error;

      setIntentions(prev => [data, ...prev]);
      setNewIntention({
        title: '',
        description: '',
        category: 'spiritual_growth',
        priority: 'medium',
        is_private: true,
        saint_intercession: '',
        tags: []
      });
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding prayer intention:', err);
      setError('Failed to add prayer intention');
    } finally {
      setLoading(false);
    }
  };

  const handlePrayForIntention = async (intentionId: string) => {
    if (!user) return;

    try {
      const currentIntention = intentions.find(i => i.id === intentionId);
      if (!currentIntention) return;

      const { error } = await supabase
        .from('prayer_intentions')
        .update({
          prayer_count: currentIntention.prayer_count + 1,
          last_prayed_at: new Date().toISOString(),
        })
        .eq('id', intentionId)
        .eq('user_id', user.id);

      if (error) throw error;

      setIntentions(prev => prev.map(intention => 
        intention.id === intentionId 
          ? { 
              ...intention, 
              prayer_count: intention.prayer_count + 1,
              last_prayed_at: new Date().toISOString()
            }
          : intention
      ));
    } catch (err) {
      console.error('Error updating prayer count:', err);
      setError('Failed to update prayer count');
    }
  };

  const handleMarkAnswered = async (intentionId: string, answerDescription: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('prayer_intentions')
        .update({
          status: 'answered',
          answered_at: new Date().toISOString(),
          answer_description: answerDescription,
        })
        .eq('id', intentionId)
        .eq('user_id', user.id);

      if (error) throw error;

      setIntentions(prev => prev.map(intention => 
        intention.id === intentionId 
          ? { 
              ...intention, 
              status: 'answered',
              answered_at: new Date().toISOString(),
              answer_description: answerDescription
            }
          : intention
      ));
    } catch (err) {
      console.error('Error marking intention as answered:', err);
      setError('Failed to mark intention as answered');
    }
  };

  const filteredIntentions = intentions.filter(intention => {
    if (activeTab === 'active') return intention.status === 'active' || intention.status === 'ongoing';
    if (activeTab === 'answered') return intention.status === 'answered';
    return true;
  });

  const getCategoryIcon = (category: PrayerIntention['category']) => {
    const icons = {
      healing: '🙏',
      family: '👨‍👩‍👧‍👦',
      work: '💼',
      spiritual_growth: '✨',
      guidance: '🧭',
      gratitude: '🙏',
      other: '💭'
    };
    return icons[category] || '💭';
  };

  const getPriorityColor = (priority: PrayerIntention['priority']) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority];
  };

  if (!isOpen) return null;

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 text-center">
          <h3 className="text-lg font-semibold mb-4">Sign In Required</h3>
          <p className="text-gray-600 mb-4">Please sign in to track your prayer intentions.</p>
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
      <div className="bg-white text-gray-900 rounded-lg shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🙏</span>
              <div>
                <h3 className="font-semibold">Prayer Intention Tracker</h3>
                <p className="text-sm opacity-90">Track your spiritual journey</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-xl font-bold"
              aria-label="Close tracker"
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
            { key: 'active', label: 'Active', count: intentions.filter(i => i.status === 'active' || i.status === 'ongoing').length },
            { key: 'answered', label: 'Answered', count: intentions.filter(i => i.status === 'answered').length },
            { key: 'all', label: 'All', count: intentions.length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-purple-500 text-purple-600 bg-purple-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Add New Button */}
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full mb-4 p-3 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:border-purple-400 hover:bg-purple-50 transition-colors"
            >
              + Add New Prayer Intention
            </button>
          )}

          {/* Add Form */}
          {showAddForm && (
            <div className="mb-4 p-4 border border-purple-200 rounded-lg bg-purple-50">
              <h4 className="font-semibold mb-3">New Prayer Intention</h4>
              
              <input
                type="text"
                placeholder="Title (e.g., Healing for my mother)"
                value={newIntention.title}
                onChange={(e) => setNewIntention(prev => ({ ...prev, title: e.target.value }))}
                className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              
              <textarea
                placeholder="Description (optional)"
                value={newIntention.description}
                onChange={(e) => setNewIntention(prev => ({ ...prev, description: e.target.value }))}
                className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <select
                  value={newIntention.category}
                  onChange={(e) => setNewIntention(prev => ({ ...prev, category: e.target.value as any }))}
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="healing">Healing</option>
                  <option value="family">Family</option>
                  <option value="work">Work</option>
                  <option value="spiritual_growth">Spiritual Growth</option>
                  <option value="guidance">Guidance</option>
                  <option value="gratitude">Gratitude</option>
                  <option value="other">Other</option>
                </select>
                
                <select
                  value={newIntention.priority}
                  onChange={(e) => setNewIntention(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              
              <input
                type="text"
                placeholder="Saint for intercession (optional)"
                value={newIntention.saint_intercession}
                onChange={(e) => setNewIntention(prev => ({ ...prev, saint_intercession: e.target.value }))}
                className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddIntention}
                  disabled={!newIntention.title.trim() || loading}
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Intention'}
                </button>
              </div>
            </div>
          )}

          {/* Intentions List */}
          {loading && intentions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Loading intentions...</div>
          ) : filteredIntentions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {activeTab === 'active' ? 'No active intentions' : 
               activeTab === 'answered' ? 'No answered intentions yet' : 
               'No intentions yet'}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredIntentions.map((intention) => (
                <div
                  key={intention.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getCategoryIcon(intention.category)}</span>
                      <h5 className="font-semibold text-gray-900">{intention.title}</h5>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(intention.priority)}`}>
                      {intention.priority}
                    </span>
                  </div>
                  
                  {intention.description && (
                    <p className="text-gray-600 text-sm mb-3">{intention.description}</p>
                  )}
                  
                  {intention.saint_intercession && (
                    <p className="text-purple-600 text-sm mb-2">
                      🕊️ Intercession: {intention.saint_intercession}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>Prayed {intention.prayer_count} times</span>
                    <span>{new Date(intention.created_at).toLocaleDateString()}</span>
                  </div>
                  
                  {intention.status === 'answered' && intention.answer_description && (
                    <div className="bg-green-50 border border-green-200 rounded p-3 mb-3">
                      <p className="text-green-800 text-sm font-medium">✅ Answered:</p>
                      <p className="text-green-700 text-sm">{intention.answer_description}</p>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    {intention.status !== 'answered' && (
                      <>
                        <button
                          onClick={() => handlePrayForIntention(intention.id)}
                          className="flex-1 bg-purple-500 text-white py-2 px-3 rounded text-sm hover:bg-purple-600"
                        >
                          🙏 Pray Now
                        </button>
                        <button
                          onClick={() => {
                            const answer = prompt('How was this prayer answered?');
                            if (answer) handleMarkAnswered(intention.id, answer);
                          }}
                          className="flex-1 bg-green-500 text-white py-2 px-3 rounded text-sm hover:bg-green-600"
                        >
                          ✅ Mark Answered
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            "Ask and it will be given to you; seek and you will find" - Matthew 7:7
          </p>
        </div>
      </div>
    </div>
  );
}

export function PrayerIntentionButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 z-40"
        aria-label="Prayer Intentions"
      >
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🙏</span>
          <span className="hidden sm:inline font-medium">Prayer Intentions</span>
        </div>
      </button>

      <PrayerIntentionTracker isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

