"use client";

import React, { useState, useEffect } from 'react';
import { bibleAPI, BiblePassage, BibleVerse, BibleBook, CATHOLIC_BIBLE_BOOKS } from '../../lib/bible-api';
import { useTranslation } from '../../context/LanguageContext';

export default function BiblePage() {
  const { t } = useTranslation();
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [passage, setPassage] = useState<BiblePassage | null>(null);
  const [randomVerse, setRandomVerse] = useState<BibleVerse | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'browse' | 'search' | 'daily'>('daily');

  // Load daily verse on component mount
  useEffect(() => {
    loadDailyVerse();
  }, []);

  const loadDailyVerse = async () => {
    setLoading(true);
    try {
      const verse = await bibleAPI.getRandomVerse();
      setRandomVerse(verse);
    } catch (error) {
      console.error('Error loading daily verse:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPassage = async (book: BibleBook, chapter: number) => {
    setLoading(true);
    try {
      const reference = `${book.name} ${chapter}`;
      const result = await bibleAPI.getPassage(reference);
      setPassage(result);
    } catch (error) {
      console.error('Error loading passage:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSelect = (book: BibleBook) => {
    setSelectedBook(book);
    setSelectedChapter(1);
    loadPassage(book, 1);
  };

  const handleChapterSelect = (chapter: number) => {
    if (selectedBook) {
      setSelectedChapter(chapter);
      loadPassage(selectedBook, chapter);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const results = await bibleAPI.searchVerses(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching verses:', error);
    } finally {
      setLoading(false);
    }
  };

  const oldTestamentBooks = CATHOLIC_BIBLE_BOOKS.filter(book => book.testament === 'Old');
  const newTestamentBooks = CATHOLIC_BIBLE_BOOKS.filter(book => book.testament === 'New');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-sm border-b border-blue-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              📖 {t.nav?.bible || 'Sacred Scripture'}
            </h1>
            <p className="text-blue-200 text-lg">
              Catholic Bible • Douay-Rheims Translation • 73 Books
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-1 border border-blue-500/20">
            {[
              { id: 'daily', label: '🌅 Daily Verse', icon: '🌅' },
              { id: 'browse', label: '📚 Browse Books', icon: '📚' },
              { id: 'search', label: '🔍 Search', icon: '🔍' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Verse Tab */}
        {activeTab === 'daily' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800/80 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  ✨ Daily Inspiration
                </h2>
                <p className="text-blue-200">
                  Let God's Word guide your day
                </p>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-300">Loading verse...</p>
                </div>
              ) : randomVerse ? (
                <div className="text-center">
                  <blockquote className="text-xl text-white leading-relaxed mb-6 italic">
                    "{randomVerse.text}"
                  </blockquote>
                  <cite className="text-blue-300 font-medium">
                    — {randomVerse.reference} ({randomVerse.translation})
                  </cite>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  Unable to load daily verse
                </div>
              )}

              <div className="text-center mt-8">
                <button
                  onClick={loadDailyVerse}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  🔄 New Verse
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Browse Books Tab */}
        {activeTab === 'browse' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Book Selection */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
                <h3 className="text-xl font-bold text-white mb-4">📚 Select Book</h3>
                
                {/* Old Testament */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-blue-300 mb-3">Old Testament (46 books)</h4>
                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {oldTestamentBooks.map((book) => (
                      <button
                        key={book.id}
                        onClick={() => handleBookSelect(book)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          selectedBook?.id === book.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
                        }`}
                      >
                        {book.name} ({book.chapters} ch)
                      </button>
                    ))}
                  </div>
                </div>

                {/* New Testament */}
                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-3">New Testament (27 books)</h4>
                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {newTestamentBooks.map((book) => (
                      <button
                        key={book.id}
                        onClick={() => handleBookSelect(book)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          selectedBook?.id === book.id
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
                        }`}
                      >
                        {book.name} ({book.chapters} ch)
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Chapter Selection & Content */}
            <div className="lg:col-span-2">
              {selectedBook ? (
                <div className="space-y-6">
                  {/* Chapter Selection */}
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
                    <h3 className="text-xl font-bold text-white mb-4">
                      📖 {selectedBook.name} - Chapter {selectedChapter}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map((chapter) => (
                        <button
                          key={chapter}
                          onClick={() => handleChapterSelect(chapter)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                            selectedChapter === chapter
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                              : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 hover:text-white'
                          }`}
                        >
                          {chapter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Passage Content */}
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-300">Loading passage...</p>
                      </div>
                    ) : passage ? (
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                          {passage.reference} ({passage.translation})
                        </h4>
                        <div className="space-y-3">
                          {passage.verses.map((verse, index) => (
                            <p key={index} className="text-gray-200 leading-relaxed">
                              <span className="text-blue-400 font-medium mr-2">
                                {verse.verse}.
                              </span>
                              {verse.text}
                            </p>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-400 py-8">
                        Select a book and chapter to read Scripture
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-blue-500/20 text-center">
                  <div className="text-6xl mb-4">📖</div>
                  <h3 className="text-xl font-bold text-white mb-2">Choose a Book</h3>
                  <p className="text-gray-400">
                    Select a book from the Old or New Testament to begin reading
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search Tab */}
        {activeTab === 'search' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">🔍 Search Scripture</h3>
              
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search for verses about love, peace, hope..."
                  className="flex-1 bg-slate-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  onClick={handleSearch}
                  disabled={loading || !searchQuery.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Search Results ({searchResults.length})
                </h4>
                <div className="space-y-4">
                  {searchResults.map((verse, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <blockquote className="text-gray-200 leading-relaxed mb-2">
                        "{verse.text}"
                      </blockquote>
                      <cite className="text-blue-300 text-sm">
                        — {verse.reference} ({verse.translation})
                      </cite>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {searchQuery && searchResults.length === 0 && !loading && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h4 className="text-lg font-semibold text-white mb-2">No Results Found</h4>
                <p className="text-gray-400">
                  Try searching for common themes like "love", "peace", or "hope"
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            📖 Catholic Bible with 73 books including Deuterocanonical texts
            <br />
            Translation: Douay-Rheims American 1899 Edition
          </p>
        </div>
      </div>
    </div>
  );
}

