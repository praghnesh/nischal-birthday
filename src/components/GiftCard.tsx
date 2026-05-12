"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { gsap } from "gsap";

interface GiftCardProps {
  index: number;
  title: string;
  description: string;
  onClick: () => void;
}

export default function GiftCard({ index, title, description, onClick }: GiftCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const xPercent = (x / width - 0.5) * 20;
    const yPercent = (y / height - 0.5) * -20;

    gsap.to(cardRef.current, {
      rotateX: yPercent,
      rotateY: xPercent,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 * index, duration: 0.8 }}
      className="perspective-1000 group cursor-pointer"
      onClick={onClick}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass p-8 rounded-[2rem] border-white/20 h-full flex flex-col items-center text-center group-hover:border-pink-glow/50 transition-colors duration-500 relative overflow-hidden"
      >
        {/* Ribbon Overlay Effect */}
        <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
          <div className="absolute top-4 right-[-32px] w-[120px] h-[30px] bg-gradient-to-r from-gold-bright to-yellow-600 rotate-45 flex items-center justify-center shadow-lg">
            <span className="text-[10px] font-bold text-black uppercase tracking-tighter">Premium</span>
          </div>
        </div>

        <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-royal-blue to-purple-deep flex items-center justify-center shadow-[0_0_20px_rgba(0,35,102,0.3)] group-hover:shadow-[0_0_30px_rgba(255,0,255,0.4)] transition-all duration-500">
          <Gift className="w-10 h-10 text-white" />
        </div>

        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent group-hover:from-pink-glow group-hover:to-gold-bright transition-all duration-500">
          {title}
        </h3>
        
        <p className="text-white/40 group-hover:text-white/70 transition-colors duration-500">
          {description}
        </p>

        <motion.div 
          className="mt-8 px-6 py-2 rounded-full border border-white/10 group-hover:border-white/30 text-xs font-semibold tracking-widest uppercase transition-colors"
          whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          Open Gift
        </motion.div>
        
        {/* Particle Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
    </motion.div>
  );
}
