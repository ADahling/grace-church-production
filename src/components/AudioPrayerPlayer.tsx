"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Square, Volume2, VolumeX, Settings } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AudioPrayerPlayerProps {
  text: string;
  title?: string;
  className?: string;
}

interface VoiceOption {
  voice: SpeechSynthesisVoice;
  label: string;
  language: string;
}

export default function AudioPrayerPlayer({ 
  text, 
  title = "Prayer Audio", 
  className = "" 
}: AudioPrayerPlayerProps) {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [volume, setVolume] = useState(0.8);
  const [showSettings, setShowSettings] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<VoiceOption[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [progress, setProgress] = useState(0);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Language mapping for voice selection
  const languageMap: Record<string, string[]> = {
    en: ['en-US', 'en-GB', 'en'],
    es: ['es-ES', 'es-MX', 'es-US', 'es'],
    fr: ['fr-FR', 'fr-CA', 'fr'],
    it: ['it-IT', 'it'],
    pt: ['pt-BR', 'pt-PT', 'pt'],
    la: ['la', 'en-US'] // Fallback to English for Latin
  };

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      const currentLangCodes = languageMap[language] || ['en-US'];
      
      const filteredVoices: VoiceOption[] = voices
        .filter(voice => 
          currentLangCodes.some(code => 
            voice.lang.toLowerCase().startsWith(code.toLowerCase())
          )
        )
        .map(voice => ({
          voice,
          label: `${voice.name} (${voice.lang})`,
          language: voice.lang
        }));

      // If no voices found for current language, fallback to English
      if (filteredVoices.length === 0) {
        const englishVoices = voices
          .filter(voice => voice.lang.toLowerCase().startsWith('en'))
          .map(voice => ({
            voice,
            label: `${voice.name} (${voice.lang})`,
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
  }, [language]);

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

  const startProgressTracking = () => {
    const words = text.split(' ');
    const totalWords = words.length;
    let currentWord = 0;

    progressIntervalRef.current = setInterval(() => {
      if (speechSynthesis.speaking && !speechSynthesis.paused) {
        currentWord += 1;
        const progressPercent = Math.min((currentWord / totalWords) * 100, 100);
        setProgress(progressPercent);
        
        if (currentWord >= totalWords) {
          clearInterval(progressIntervalRef.current!);
        }
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
    if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      startProgressTracking();
      return;
    }

    // Cancel any existing speech
    speechSynthesis.cancel();
    
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = isMuted ? 0 : volume;
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setProgress(0);
      startProgressTracking();
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      stopProgressTracking();
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(0);
      stopProgressTracking();
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
    stopProgressTracking();
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    stopProgressTracking();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (utteranceRef.current) {
      utteranceRef.current.volume = isMuted ? volume : 0;
    }
  };

  const getPlayButtonText = () => {
    if (isPlaying) return "Playing...";
    if (isPaused) return "Resume";
    return "Play Prayer";
  };

  return (
    <div className={`bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-100 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-full hover:bg-white/50 transition-colors"
          title="Audio Settings"
        >
          <Settings className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1 text-center">
          {Math.round(progress)}% complete
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={isPlaying ? handlePause : handlePlay}
          disabled={!text.trim()}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
          <span className="font-medium">{getPlayButtonText()}</span>
        </button>

        <button
          onClick={handleStop}
          disabled={!isPlaying && !isPaused}
          className="flex items-center gap-2 bg-gray-600 text-white px-4 py-3 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Square className="w-4 h-4" />
          <span>Stop</span>
        </button>

        <button
          onClick={toggleMute}
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-gray-600" />
          ) : (
            <Volume2 className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-4">
          <h4 className="font-semibold text-gray-800 mb-3">Audio Settings</h4>
          
          {/* Voice Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Voice
            </label>
            <select
              value={selectedVoice?.name || ''}
              onChange={(e) => {
                const voice = availableVoices.find(v => v.voice.name === e.target.value)?.voice;
                setSelectedVoice(voice || null);
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {availableVoices.map((voiceOption) => (
                <option key={voiceOption.voice.name} value={voiceOption.voice.name}>
                  {voiceOption.label}
                </option>
              ))}
            </select>
          </div>

          {/* Speed Control */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Speed: {rate.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Volume Control */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Pitch Control */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pitch: {pitch.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Browser Support Note */}
      {typeof window !== 'undefined' && !window.speechSynthesis && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            Audio playback is not supported in your browser. Please try a modern browser like Chrome, Firefox, or Safari.
          </p>
        </div>
      )}
    </div>
  );
}

