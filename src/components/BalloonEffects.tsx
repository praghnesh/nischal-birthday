"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const colors = ["#ff00ff", "#002366", "#4b0082", "#ffd700", "#ff0000", "#00ff00"];

export default function BalloonEffects() {
  const [balloons, setBalloons] = useState<{ id: number; color: string; x: number; delay: number }[]>([]);

  useEffect(() => {
    const newBalloons = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      x: Math.random() * 100,
      delay: Math.random() * 20,
    }));
    setBalloons(newBalloons);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          initial={{ y: "110vh", x: `${balloon.x}vw` }}
          animate={{ 
            y: "-20vh",
            x: [`${balloon.x}vw`, `${balloon.x + 5}vw`, `${balloon.x - 5}vw`, `${balloon.x}vw`]
          }}
          transition={{ 
            y: { duration: 15 + Math.random() * 10, repeat: Infinity, delay: balloon.delay, ease: "linear" },
            x: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute w-8 h-10 md:w-12 md:h-16 rounded-full opacity-40 shadow-lg"
          style={{ backgroundColor: balloon.color }}
        >
          {/* Balloon String */}
          <div className="absolute top-full left-1/2 w-[1px] h-20 bg-white/20 origin-top" />
          {/* Shine */}
          <div className="absolute top-2 left-2 w-1/4 h-1/4 bg-white/30 rounded-full blur-[2px]" />
        </motion.div>
      ))}
    </div>
  );
}
