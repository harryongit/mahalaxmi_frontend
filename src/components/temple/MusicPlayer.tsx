"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music, Sparkles } from "lucide-react";

const AUDIO_SRC = "/assets/Ya Devi Sarvabhuteshu by Om Voices .mp3.mpeg";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Default to ON as requested
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.7;
    audio.loop = true;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // 1. Attempt immediate unmuted play on load
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If browser policy delays unmuted audio until user interaction,
          // listen to any gentle user event to start playback immediately.
          const triggerEvents = [
            "pointerdown",
            "pointermove",
            "touchstart",
            "touchend",
            "scroll",
            "wheel",
            "click",
            "keydown",
            "focus",
          ];

          const unlockAndPlay = () => {
            if (audioRef.current && audioRef.current.paused) {
              audioRef.current
                .play()
                .then(() => {
                  setIsPlaying(true);
                  removeUnlockListeners();
                })
                .catch(() => {});
            }
          };

          const removeUnlockListeners = () => {
            triggerEvents.forEach((evt) => {
              window.removeEventListener(evt, unlockAndPlay);
            });
          };

          triggerEvents.forEach((evt) => {
            window.addEventListener(evt, unlockAndPlay, { once: true, passive: true });
          });
        });
    }

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio playback error:", err);
        });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        autoPlay
        playsInline
        loop
        preload="auto"
      />

      {/* Floating Bottom-Right Music Control Pill */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 select-none">
        <button
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause temple chants" : "Play temple chants"}
          className={`group relative flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full border transition-all duration-300 shadow-xl cursor-pointer ${
            isPlaying
              ? "bg-gradient-to-r from-[#2B0812] via-[#1A040A] to-[#2B0812] border-amber-400/60 shadow-[0_10px_25px_-5px_rgba(180,83,9,0.4)] text-amber-200"
              : "bg-stone-900/90 hover:bg-stone-900 border-stone-700/80 text-stone-300 shadow-lg"
          }`}
        >
          {/* Animated Glowing Ring when playing */}
          {isPlaying && (
            <span
              aria-hidden
              className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400/40 via-yellow-400/20 to-amber-500/40 blur-xs animate-pulse pointer-events-none"
            />
          )}

          {/* Equalizer Sound Waves when playing */}
          <div className="relative z-10 flex items-center justify-center size-7 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 shrink-0">
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-3.5 px-0.5">
                <span className="w-0.5 bg-amber-300 rounded-full animate-[bounce_0.8s_infinite] h-2.5" />
                <span className="w-0.5 bg-amber-400 rounded-full animate-[bounce_1.1s_infinite_0.2s] h-3.5" />
                <span className="w-0.5 bg-amber-200 rounded-full animate-[bounce_0.7s_infinite_0.4s] h-2" />
                <span className="w-0.5 bg-amber-300 rounded-full animate-[bounce_0.9s_infinite_0.1s] h-3" />
              </div>
            ) : (
              <VolumeX className="size-4 text-stone-400 group-hover:text-amber-200 transition-colors" />
            )}
          </div>

          {/* Track Details */}
          <div className="relative z-10 flex flex-col text-left pr-1">
            <span className="text-[11px] sm:text-xs font-serif font-bold tracking-wide text-amber-100 flex items-center gap-1">
              <span>Ya Devi Sarvabhuteshu</span>
              {isPlaying && <Sparkles className="size-2.5 text-amber-400 shrink-0" />}
            </span>
            <span className="text-[9px] font-medium text-amber-300/80 tracking-wider uppercase">
              {isPlaying ? "Divine Chants Playing" : "Tap to Play Chants"}
            </span>
          </div>

          {/* Quick Mute/Unmute Indicator */}
          <div className="relative z-10 pl-1 border-l border-amber-400/20">
            {isPlaying ? (
              <Volume2 className="size-4 text-amber-300 hover:scale-110 transition-transform" />
            ) : (
              <Music className="size-4 text-stone-400 group-hover:text-amber-300 transition-colors" />
            )}
          </div>
        </button>
      </div>
    </>
  );
}
