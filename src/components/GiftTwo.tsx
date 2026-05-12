"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Play, Volume2 } from "lucide-react";
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

          <div className="relative aspect-video rounded-3xl overflow-hidden glass border-2 border-white/20 group">
            {/* Placeholder for Video - Using a styled container with cinematic vibes */}
            <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/20 via-purple-deep/20 to-pink-glow/20 flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30"
              >
                <Play className="w-10 h-10 text-white fill-current" />
              </motion.div>
            </div>
            
            {/* Overlay Text */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Nishcal's Birthday Surprise</h3>
                  <p className="text-white/60 text-sm">Created with love by Family</p>
                </div>
                <Volume2 className="w-6 h-6 text-white/50" />
              </div>
            </div>

            {/* Click to "Play" (which actually just shows the letter after a bit) */}
            <div 
              className="absolute inset-0 cursor-pointer" 
              onClick={() => setIsPlaying(true)}
            >
              {isPlaying && (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="absolute inset-0 bg-black flex items-center justify-center"
                 >
                   <p className="text-white/50 italic">Video processing... 🎥</p>
                   <motion.div 
                     className="absolute bottom-0 left-0 h-1 bg-pink-glow"
                     initial={{ width: 0 }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 3 }}
                     onAnimationComplete={() => setShowLetter(true)}
                   />
                 </motion.div>
              )}
            </div>
          </div>

          <p className="mt-8 text-center text-white/40 italic">
            Click the player to reveal the surprise...
          </p>
        </div>
      ) : (
        <EnvelopeLetter
          quote={`To Our Sweet Boy Nishcal 💙\n\nTime chala fast ga vellipoyindhi… nee chinnappati memories ippatiki fresh ga unnayi…\n\nNee first smile, nee first school day, nee funny expressions… anni maa heart lo forever untayi… ✨\n\nNuvvu eppudu ila happy ga navvuthu undali…\n\nMay your future shine brighter than stars 🌟\n\nHappy Birthday Ra Nanna 🎂💙`}
          signature="— With All Our Hearts"
          theme="gold"
          onComplete={onClose}
        />
      )}
    </motion.div>
  );
}
