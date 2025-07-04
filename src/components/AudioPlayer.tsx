"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/context/LanguageContext";

interface AudioPlayerProps {
  title: string;
  audioUrl?: string;
  audioType: "spoken" | "chant" | "meditation" | "silence" | "sacred-music";
  duration?: number; // in seconds
  onPlay?: () => void;
  onPause?: () => void;
  onComplete?: () => void;
  autoGenerate?: boolean; // For AI-generated audio
  youtubeUrl?: string; // For YouTube music integration
}

export function AudioPlayer({
  title,
  audioUrl,
  audioType,
  duration = 300, // 5 minutes default
  onPlay,
  onPause,
  onComplete,
  autoGenerate = false,
  youtubeUrl,
}: AudioPlayerProps) {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle audio generation for AI features
  const generateAudio = async () => {
    if (!autoGenerate) return;

    setIsLoading(true);
    try {
      // Generate audio using the existing TTS API
      const response = await fetch('/api/audio/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: title,
          language: 'en', // Default to English, could be made configurable
          voice: 'female',
          speed: audioType === 'meditation' ? 0.8 : 1.0,
          prayerType: audioType === 'meditation' ? 'meditation' : 'traditional',
        }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating audio:", error);
      setIsLoading(false);
    }
  };

  const handlePlay = async () => {
    if (!audioUrl && autoGenerate) {
      await generateAudio();
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        onPause?.();
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        onPlay?.();

        // Update progress
        intervalRef.current = setInterval(() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }, 1000);
      }
    } else if (audioType === "silence") {
      // Handle silent meditation timer
      if (isPlaying) {
        setIsPlaying(false);
        onPause?.();
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      } else {
        setIsPlaying(true);
        onPlay?.();

        // Silent timer
        intervalRef.current = setInterval(() => {
          setCurrentTime((prev) => {
            const newTime = prev + 1;
            if (newTime >= duration) {
              setIsPlaying(false);
              onComplete?.();
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
              }
              return 0;
            }
            return newTime;
          });
        }, 1000);
      }
    }
  };

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    } else if (audioType === "silence") {
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getAudioIcon = () => {
    switch (audioType) {
      case "spoken":
        return "🗣️";
      case "chant":
        return "🎵";
      case "meditation":
        return "🧘";
      case "silence":
        return "🔇";
      case "sacred-music":
        return "🎼";
      default:
        return "🔊";
    }
  };

  const getAudioTypeLabel = () => {
    switch (audioType) {
      case "spoken":
        return t.audioPlayer.types.prayer;
      case "chant":
        return t.audioPlayer.types.chant;
      case "meditation":
        return t.audioPlayer.types.meditation;
      case "silence":
        return t.audioPlayer.types.silence;
      case "sacred-music":
        return "Sacred Music";
      default:
        return t.audioPlayer.types.audio;
    }
  };

  const totalDuration = audioRef.current?.duration || duration;
  const progress = (currentTime / totalDuration) * 100;

  return (
    <div className="card-premium p-6">
      {/* Hidden audio element */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
            onComplete?.();
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              audioRef.current.volume = volume;
              setCurrentTime(0);
            }
          }}
        />
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center">
          <span className="text-xl">{getAudioIcon()}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gradient">{title}</h3>
          <p className="text-sm text-gray-400">{getAudioTypeLabel()}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalDuration)}</span>
        </div>
        <div className="relative">
          <div className="w-full h-2 bg-black/30 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-[#6b9bcc] to-[#5261a1] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max={totalDuration}
            value={currentTime}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlay}
            disabled={isLoading}
            className="w-12 h-12 bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center text-white text-xl hover:scale-105 transition-transform disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              "⏸️"
            ) : (
              "▶️"
            )}
          </button>

          {autoGenerate && !audioUrl && (
            <div className="text-sm text-gray-400">
              {t.audioPlayer.aiGenerated}
            </div>
          )}
        </div>

        {/* Volume Control */}
        {audioType !== "silence" && (
          <div className="flex items-center gap-2">
            <span className="text-sm">🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-20 h-2 bg-black/30 rounded-full appearance-none slider"
            />
          </div>
        )}
      </div>

      {/* Sacred Meditation Timer */}
      {audioType === "silence" && isPlaying && (
        <div className="mt-4 text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🕊️</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {t.audioPlayer.sacredSilence}
          </p>
        </div>
      )}

      {/* YouTube Sacred Music Integration */}
      {audioType === "sacred-music" && (
        <div className="mt-6 border-t border-gray-700 pt-6">
          <div className="text-center mb-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#6b9bcc] to-[#5261a1] rounded-full flex items-center justify-center shadow-lg mb-3">
              <span className="text-3xl">🎼</span>
            </div>
            <h4 className="text-lg font-semibold mb-2">
              <span className="heading-gradient">Sacred Music Experience</span>
            </h4>
            <p className="text-sm text-gray-400">
              1 Hour of Gregorian Chant & Sacred Choir Music
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#6b9bcc]/10 to-[#5261a1]/10 border border-[#6b9bcc]/30 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">🎵</span>
              <span className="text-[#6b9bcc] font-bold text-lg">
                YouTube Sacred Music
              </span>
              <span className="text-2xl">🎵</span>
            </div>

            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Experience the beauty of traditional Catholic music with Gregorian
              chants and sacred choir harmonies, perfect for meditation and
              prayer.
            </p>

            <a
              href={youtubeUrl || "https://www.youtube.com/watch?v=Ed90FUyE4rM"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#6b9bcc] to-[#5261a1] hover:from-[#5261a1] hover:to-[#6b9bcc] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <span className="text-xl">🎵</span>
              <span>Listen on YouTube</span>
              <span className="text-sm opacity-80">↗</span>
            </a>

            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
              <span>🔗</span>
              <span>Opens in new tab for full YouTube experience</span>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-700/50">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <span>⏱️</span>
                  <span>60 minutes</span>
                </span>
                <span className="flex items-center gap-1">
                  <span>🎼</span>
                  <span>Gregorian Chant</span>
                </span>
                <span className="flex items-center gap-1">
                  <span>🙏</span>
                  <span>Sacred Music</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6b9bcc, #5261a1);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6b9bcc, #5261a1);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}
