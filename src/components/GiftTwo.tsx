"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Volume2 } from "lucide-react";
import Image from "next/image";
import EnvelopeLetter from "./EnvelopeLetter";

interface GiftTwoProps {
  onClose: () => void;
}

export default function GiftTwo({ onClose }: GiftTwoProps) {
  const [showLetter, setShowLetter] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 overflow-y-auto"
    >
      <button 
        onClick={onClose}
        className="fixed top-4 right-4 md:top-6 md:right-6 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all z-[70] shadow-xl"
      >
        <X className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {!showLetter ? (
        <div className="w-full max-w-4xl">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl md:text-5xl font-bold text-center mb-6 md:mb-8 text-glow"
          >
            A Special Message 🎬
          </motion.h2>

          <div className="relative aspect-[3/4] max-w-sm md:max-w-md mx-auto rounded-3xl overflow-hidden glass border-2 border-white/20 group">
            {/* Poster Image with Ken Burns effect when playing */}
            <motion.div 
              className="absolute inset-0"
              animate={isPlaying ? { scale: 1.15 } : { scale: 1 }}
              transition={{ duration: 5, ease: "linear" }}
            >
              <Image 
                src="/photos/video_poster.png"
                alt="Birthday Boy"
                fill
                className="object-cover object-top"
              />
            </motion.div>
            
            {/* SVG Birthday Cap Overlay */}
            <motion.div
              initial={{ y: -50, opacity: 0, rotate: -15 }}
              animate={{ y: 0, opacity: 1, rotate: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[0%] left-[50%] -translate-x-1/2 z-10 w-28 h-28 drop-shadow-2xl"
              style={{ transformOrigin: "bottom center" }}
            >
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Main Cone */}
                <path d="M20 90 L50 30 L80 90 Z" fill="#ff00ff" />
                {/* Bottom Rim */}
                <path d="M20 90 Q50 100 80 90 L80 85 Q50 95 20 85 Z" fill="#ffd700" />
                {/* Pompom */}
                <circle cx="50" cy="25" r="12" fill="#ffd700" />
                {/* Polka Dots */}
                <circle cx="40" cy="50" r="4" fill="#ffffff" />
                <circle cx="60" cy="65" r="5" fill="#ffffff" />
                <circle cx="50" cy="80" r="6" fill="#ffffff" />
              </svg>
            </motion.div>

            {/* Cake Animation at the bottom (Appears when playing) */}
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  initial={{ y: 100, opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="absolute bottom-[10%] left-0 right-0 flex justify-center z-20 pointer-events-none"
                >
                  <div className="text-8xl md:text-9xl drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] animate-bounce">
                    🎂
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dark overlay, Text & Play Button (Disappears when playing) */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div 
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center group-hover:bg-black/30 transition-colors z-30 cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                >
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.3)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-current ml-2" />
                  </motion.div>
                  
                  {/* Overlay Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">Nischal Sigireddy's Birthday Surprise</h3>
                        <p className="text-white/60 text-sm">Created with love by Family</p>
                      </div>
                      <Volume2 className="w-6 h-6 text-white/50" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Video Progress Bar (Appears when playing) */}
            {isPlaying && (
              <motion.div 
                className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-pink-glow to-gold-bright z-40 shadow-[0_0_15px_rgba(255,0,255,0.8)]"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
                onAnimationComplete={() => setShowLetter(true)}
              />
            )}
          </div>

          <p className="mt-8 text-center text-white/40 italic">
            Click the player to reveal the surprise...
          </p>
        </div>
      ) : (
        <EnvelopeLetter
          quote={`To Our Dearest Nischal Sigireddy 💙\n\nTime flies so fast, but every single moment we've spent with you is etched in our hearts forever.\n\nFrom your first steps to the amazing person you are today, you never cease to amaze us. ✨\n\nKeep shining your bright light on the world. Dream big, reach for the stars, and remember that we will always be your biggest cheerleaders. 🌟\n\nWishing you a birthday as magnificent as you are! 🎂💙`}
          signature="— With All Our Hearts"
          theme="gold"
          onComplete={onClose}
        />
      )}
    </motion.div>
  );
}
