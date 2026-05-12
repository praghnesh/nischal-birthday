"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EnvelopeLetterProps {
  quote: string;
  signature: string;
  theme?: "blue" | "gold" | "purple";
  onComplete?: () => void;
}

export default function EnvelopeLetter({ quote, signature, theme = "blue", onComplete }: EnvelopeLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRead, setIsRead] = useState(false);

  const colors = {
    blue: { bg: "bg-[#fdfcf0]", accent: "bg-royal-blue", text: "text-royal-blue" },
    gold: { bg: "bg-[#fffdf0]", accent: "bg-gold-bright", text: "text-[#8a6d3b]" },
    purple: { bg: "bg-[#fef0ff]", accent: "bg-purple-deep", text: "text-purple-deep" },
  };

  const selected = colors[theme];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div 
        className="relative cursor-pointer perspective-1000"
        onClick={() => setIsOpen(true)}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -100 }}
              className="w-72 h-48 sm:w-96 sm:h-64 bg-[#e5e5e5] rounded-lg shadow-2xl relative flex items-center justify-center overflow-hidden"
              style={{ border: "1px solid rgba(0,0,0,0.1)" }}
            >
              {/* Envelope Flap Decoration */}
              <div className="absolute top-0 w-full h-full border-t-[100px] border-t-white/30 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent pointer-events-none" />
              
              {/* Wax Seal */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-12 h-12 rounded-full bg-red-700 shadow-lg border-2 border-red-800 flex items-center justify-center z-10"
              >
                <span className="text-white text-xl font-serif">N</span>
              </motion.div>
              
              <div className="absolute bottom-4 text-black/30 font-serif italic text-sm">
                Tap to open your message
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`w-full max-w-2xl ${selected.bg} p-6 sm:p-12 md:p-16 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden`}
            style={{ 
              backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')",
              minHeight: "400px"
            }}
          >
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-br from-black/5 to-transparent" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative z-10"
            >
              <div className={`font-serif text-lg sm:text-2xl md:text-3xl leading-relaxed whitespace-pre-wrap italic ${selected.text}`}>
                {quote.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.03 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: quote.length * 0.03 + 1 }}
                className={`mt-8 md:mt-12 text-right font-script text-xl md:text-4xl ${selected.text} opacity-80`}
                onAnimationComplete={() => setIsRead(true)}
              >
                {signature}
              </motion.div>
            </motion.div>

            {/* Decorative Corner */}
            <div className={`absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 ${selected.accent} opacity-20`} />
            <div className={`absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 ${selected.accent} opacity-20`} />
          </motion.div>
        )}
      </div>

      {isRead && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onComplete}
          className="mt-12 px-6 py-2 border-b border-white/30 text-white/50 hover:text-white transition-colors"
        >
          Close Letter
        </motion.button>
      )}
    </div>
  );
}
