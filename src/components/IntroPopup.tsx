"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, XCircle, ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";

interface IntroPopupProps {
  onStart: () => void;
}

export default function IntroPopup({ onStart }: IntroPopupProps) {
  const [step, setStep] = useState<"intro" | "angry">("intro");
  const [isTypingDone, setIsTypingDone] = useState(false);

  const handleYes = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#002366", "#4b0082", "#ff00ff", "#ffd700"],
    });
    onStart();
  };

  const handleNo = () => {
    setStep("angry");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {step === "intro" ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            className="glass max-w-lg w-full p-8 md:p-12 text-center rounded-3xl relative overflow-hidden"
          >
            {/* Background Glows */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-royal-blue/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-pink-glow/20 rounded-full blur-3xl" />

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-3xl md:text-5xl font-bold mb-6 text-glow bg-gradient-to-r from-white via-pink-glow to-royal-blue bg-clip-text text-transparent"
            >
              Hey Nishcal... 💙
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              onAnimationComplete={() => setIsTypingDone(true)}
              className="text-lg md:text-2xl mb-10 text-white/80 leading-relaxed"
            >
              Neku oka special surprise plan chesam... <br />
              <span className="text-pink-glow font-semibold italic">Chustava?</span>
            </motion.p>

            <AnimatePresence>
              {isTypingDone && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 0, 255, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYes}
                    className="relative group px-10 py-4 bg-gradient-to-r from-royal-blue to-purple-deep text-white rounded-full font-bold text-xl overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      YES! <Heart className="w-5 h-5 fill-current" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, x: [0, -5, 5, -5, 5, 0] }}
                    onClick={handleNo}
                    className="px-10 py-4 border border-white/20 hover:bg-white/10 text-white/60 rounded-full font-semibold text-lg transition-colors"
                  >
                    No...
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="angry"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: [0, -10, 10, -10, 10, 0],
            }}
            transition={{ 
              x: { repeat: Infinity, duration: 0.1, repeatType: "mirror" },
              scale: { type: "spring", stiffness: 300 }
            }}
            className="glass border-red-500/50 p-12 text-center rounded-3xl"
          >
            <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
            <h2 className="text-5xl md:text-7xl font-black text-red-500 mb-8 uppercase tracking-tighter">
              HOW DARE YOU 😤
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setStep("intro")}
              className="flex items-center gap-2 mx-auto px-8 py-3 bg-white text-black rounded-full font-bold"
            >
              <ArrowLeft className="w-5 h-5" /> Go Back & Say Yes
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
