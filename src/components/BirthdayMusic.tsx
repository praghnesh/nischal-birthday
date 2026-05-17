"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function BirthdayMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio("/nastelbom-happy-birthday-495860.mp3");
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;

    // Start music on very first user interaction (touch, click, or key)
    const startMusic = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    };

    document.addEventListener("touchstart", startMusic, { once: true, passive: true });
    document.addEventListener("click",      startMusic, { once: true });
    document.addEventListener("keydown",    startMusic, { once: true });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => { });
      setIsPlaying(true);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      title={isPlaying ? "Pause music" : "Play Happy Birthday 🎵"}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-5 right-5 z-[9999] w-11 h-11 rounded-full flex items-center justify-center text-xl select-none"
      style={{
        background: "linear-gradient(135deg, #7c3aed, #ec4899)",
        boxShadow: isPlaying
          ? "0 0 20px rgba(124,58,237,0.6)"
          : "0 2px 12px rgba(0,0,0,0.4)",
      }}
    >
      {/* Pulse ring when playing */}
      {isPlaying && (
        <motion.span
          className="absolute inset-0 rounded-full"
          animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
          style={{ background: "rgba(124,58,237,0.45)" }}
        />
      )}
      {/* Always show 🎵 — paused state shows it dimmed */}
      <span style={{ opacity: isPlaying ? 1 : 0.5 }}>🎵</span>
    </motion.button>
  );
}
