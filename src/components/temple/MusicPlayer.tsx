"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music, Sparkles } from "lucide-react";

const PRIMARY_AUDIO_SRC = "/assets/ya-devi-sarvabhuteshu.mp3";
const FALLBACK_AUDIO_SRC = "/assets/Ya%20Devi%20Sarvabhuteshu%20by%20Om%20Voices%20.mp3.mpeg";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.75;
    audio.loop = true;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("playing", handlePlay);
    audio.addEventListener("pause", handlePause);

    // If devotee previously explicitly paused audio, respect their preference
    const explicitlyPaused =
      typeof window !== "undefined" &&
      localStorage.getItem("mahalaxmi_music_disabled") === "true";

    if (!explicitlyPaused) {
      // 1. Try immediate unmuted autoplay
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Browser autoplay policy blocked unmuted sound on direct load.
            // Listen to the very first user interaction anywhere on the screen to trigger sound.
            const triggerEvents = [
              "click",
              "pointerdown",
              "touchstart",
              "touchend",
              "scroll",
              "wheel",
              "keydown",
            ];

            const unlockOnInteraction = () => {
              if (audioRef.current && audioRef.current.paused) {
                audioRef.current
                  .play()
                  .then(() => {
                    setIsPlaying(true);
                    cleanup();
                  })
                  .catch(() => {});
              }
            };

            const cleanup = () => {
              triggerEvents.forEach((evt) => {
                window.removeEventListener(evt, unlockOnInteraction);
              });
            };

            triggerEvents.forEach((evt) => {
              window.addEventListener(evt, unlockOnInteraction, {
                once: true,
                passive: true,
              });
            });
          });
      }
    }

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("playing", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        localStorage.removeItem("mahalaxmi_music_disabled");
      } catch {}
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio playback error:", err);
        });
    } else {
      try {
        localStorage.setItem("mahalaxmi_music_disabled", "true");
      } catch {}
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} autoPlay playsInline loop preload="auto">
        <source src={PRIMARY_AUDIO_SRC} type="audio/mpeg" />
        <source src={FALLBACK_AUDIO_SRC} type="audio/mpeg" />
      </audio>

      {/* Floating Bottom-Right Music Control Pill */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 select-none">
        <button
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause temple chants" : "Play temple chants"}
          className={`group relative flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full border transition-all duration-300 shadow-xl cursor-pointer ${
            isPlaying
              ? "bg-gradient-to-r from-[#2B0812] via-[#1A040A] to-[#2B0812] border-amber-400/60 shadow-[0_10px_25px_-5px_rgba(180,83,9,0.4)] text-amber-200"
              : "bg-stone-900/95 hover:bg-stone-900 border-amber-500/50 text-stone-200 shadow-2xl animate-bounce-subtle"
          }`}
        >
          {/* Animated Glowing Ring */}
          <span
            aria-hidden
            className={`absolute -inset-0.5 rounded-full blur-xs pointer-events-none transition-opacity duration-300 ${
              isPlaying
                ? "bg-gradient-to-r from-amber-400/40 via-yellow-400/20 to-amber-500/40 animate-pulse opacity-100"
                : "bg-amber-400/30 opacity-75"
            }`}
          />

          {/* Icon / Sound Visualizer Bars */}
          <div className="relative z-10 flex items-center justify-center size-7 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 shrink-0">
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-3.5 px-0.5">
                <span className="w-0.5 bg-amber-300 rounded-full animate-[bounce_0.8s_infinite] h-2.5" />
                <span className="w-0.5 bg-amber-400 rounded-full animate-[bounce_1.1s_infinite_0.2s] h-3.5" />
                <span className="w-0.5 bg-amber-200 rounded-full animate-[bounce_0.7s_infinite_0.4s] h-2" />
                <span className="w-0.5 bg-amber-300 rounded-full animate-[bounce_0.9s_infinite_0.1s] h-3" />
              </div>
            ) : (
              <VolumeX className="size-4 text-amber-300" />
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
              <Music className="size-4 text-amber-300 group-hover:scale-110 transition-transform" />
            )}
          </div>
        </button>
      </div>
    </>
  );
}
