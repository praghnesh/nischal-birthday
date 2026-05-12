"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function Fireworks() {
  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[70] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background Animated Gradients */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-tr from-royal-blue via-purple-deep to-pink-glow animate-pulse" />
      </div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, duration: 1 }}
        className="relative z-10 text-center"
      >
        <motion.h1
          animate={{ 
            scale: [1, 1.1, 1],
            textShadow: [
              "0 0 20px #fff, 0 0 30px #002366",
              "0 0 40px #fff, 0 0 60px #ff00ff",
              "0 0 20px #fff, 0 0 30px #002366"
            ]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl md:text-9xl font-black italic tracking-tighter text-white"
        >
          WE LOVE YOU <br />
          <span className="bg-gradient-to-r from-gold-bright via-pink-glow to-white bg-clip-text text-transparent">
            NISHCAL 💙
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 text-xl md:text-3xl text-white/60 font-light tracking-widest uppercase"
        >
          Happy Birthday Once Again! ✨
        </motion.p>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
         {Array.from({ length: 20 }).map((_, i) => (
           <motion.div
             key={i}
             className="absolute w-2 h-2 bg-white rounded-full blur-[1px]"
             initial={{ 
               x: Math.random() * 100 + "vw", 
               y: Math.random() * 100 + "vh",
               opacity: 0 
             }}
             animate={{ 
               opacity: [0, 1, 0],
               scale: [0, 1.5, 0],
               y: "-=100" 
             }}
             transition={{ 
               duration: 2 + Math.random() * 3, 
               repeat: Infinity, 
               delay: Math.random() * 5 
             }}
           />
         ))}
      </div>
    </div>
  );
}
