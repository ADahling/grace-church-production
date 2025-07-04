"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface AudioPrayerPlayerProps {
  text: string;
  language?: string;
  title?: string;
  className?: string;
}

interface VoiceOption {
  voice: SpeechSynthesisVoice;
  name: string;
  language: string;
}

export function AudioPrayerPlayer({ 
  text, 
  language = 'en', 
  title = 'Prayer Audio',
  className = '' 
}: AudioPrayerPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [availableVoices, setAvailableVoices] = useState<VoiceOption[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize languageMap to prevent useEffect dependency issues
  const languageMap = useMemo(() => ({
    'en': ['en-US', 'en-GB', 'en-AU', 'en-CA'],
    'es': ['es-ES', 'es-MX', 'es-AR', 'es-CO'],
    'fr': ['fr-FR', 'fr-CA'],
    'it': ['it-IT'],
    'pt': ['pt-BR', 'pt-PT'],
    'la': ['la'] // Latin (may not be available)
  }), []);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      const targetLanguages = languageMap[language as keyof typeof languageMap] || ['en-US'];
      
      const filteredVoices: VoiceOption[] = voices
        .filter(voice => targetLanguages.some(lang => voice.lang.startsWith(lang.split('-')[0])))
        .map(voice => ({
          voice,
          name: voice.name,
          language: voice.lang
        }));

      if (filteredVoices.length === 0) {
        // Fallback to English voices if target language not available
        const englishVoices = voices
          .filter(voice => voice.lang.startsWith('en'))
          .map(voice => ({
            voice,
            name: voice.name,
            language: voice.lang
          }));
        
        setAvailableVoices(englishVoices);
        setSelectedVoice(englishVoices[0]?.voice || null);
      } else {
        setAvailableVoices(filteredVoices);
        setSelectedVoice(filteredVoices[0]?.voice || null);
      }
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [language, languageMap]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const startProgressTracking = (utterance: SpeechSynthesisUtterance) => {
    const words = text.split(' ');
    let currentWordIndex = 0;
    
    progressIntervalRef.current = setInterval(() => {
      if (currentWordIndex < words.length) {
        const progressPercent = (currentWordIndex / words.length) * 100;
        setProgress(progressPercent);
        currentWordIndex++;
      }
    }, 200); // Update every 200ms
  };

  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handlePlay = () => {
    if (isPaused && utteranceRef.current) {
      speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    if (!selectedVoice) {
      console.warn('No voice selected for audio playback');
      return;
    }

    // Cancel any existing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.rate = 0.9; // Slightly slower for prayer
    utterance.pitch = 1;
    utterance.volume = isMuted ? 0 : volume;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      startProgressTracking(utterance);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      stopProgressTracking();
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setIsPaused(false);
      stopProgressTracking();
    };

    utterance.onpause = () => {
      setIsPaused(true);
      setIsPlaying(false);
    };

    utterance.onresume = () => {
      setIsPaused(false);
      setIsPlaying(true);
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (isPlaying) {
      speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
      stopProgressTracking();
    }
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    stopProgressTracking();
  };

  const handleRestart = () => {
    handleStop();
    setTimeout(() => {
      handlePlay();
    }, 100);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (utteranceRef.current) {
      utteranceRef.current.volume = isMuted ? volume : 0;
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (utteranceRef.current && !isMuted) {
      utteranceRef.current.volume = newVolume;
    }
  };

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-blue-100 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Volume2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {selectedVoice ? selectedVoice.name : 'Loading voices...'}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>Prayer Audio</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-4">
        {/* Play/Pause Button */}
        <button
          onClick={isPlaying ? handlePause : handlePlay}
          disabled={!selectedVoice}
          className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </button>

        {/* Restart Button */}
        <button
          onClick={handleRestart}
          disabled={!selectedVoice}
          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:bg-gray-50 disabled:dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Volume Controls */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={toggleMute}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-200"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Voice Selection */}
      {availableVoices.length > 1 && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Voice Selection
          </label>
          <select
            value={selectedVoice?.name || ''}
            onChange={(e) => {
              const voice = availableVoices.find(v => v.voice.name === e.target.value)?.voice;
              setSelectedVoice(voice || null);
            }}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {availableVoices.map((voiceOption) => (
              <option key={voiceOption.voice.name} value={voiceOption.voice.name}>
                {voiceOption.name} ({voiceOption.language})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Text Preview */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-h-24 overflow-y-auto">
          {text.length > 150 ? `${text.substring(0, 150)}...` : text}
        </p>
      </div>
    </div>
  );
}

