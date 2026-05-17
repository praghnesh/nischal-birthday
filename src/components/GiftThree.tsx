"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import EnvelopeLetter from "./EnvelopeLetter";

interface GiftThreeProps {
  onClose: () => void;
}

const items = [
  { src: "/photos/gallery_1_new.jpg", title: "Brotherhood 🤜🤛", desc: "Best brothers forever!", size: "tall" },
  { src: "/photos/gallery_2_new.jpg", title: "Style Icon ✨", desc: "Always looking sharp!", size: "tall" },
  { src: "/photos/childhood_1_new.jpg", title: "School Memories 📸", desc: "First day of school… you were so brave!", size: "normal" },
  { src: "/photos/family_1_new.png", title: "Family Moments 🎉", desc: "Celebrations are better with you.", size: "normal" },
  { src: "/photos/childhood_2_new.jpg", title: "Chilipi Panulu 😜", desc: "Nee mischiefs common eh ga!", size: "tall" },
  { src: "/photos/childhood_3_new.jpg", title: "Posing 📸", desc: "Always ready for a picture!", size: "tall" },
  { src: "/photos/nischal_grandma.jpg", title: "Ammamma Tho 🥹", desc: "Ammamma love anni words lo cheppalenem!", size: "tall" },
  { src: "/photos/nischal_dad_bro.jpg", title: "Nanna & Bro 💙", desc: "Anni special days tho unnaru mee kosam!", size: "normal" },
  { src: "/photos/nischal_family_new.png", title: "Family Selfie 🫶", desc: "Mee family love anni kante powerful!", size: "normal" },
];

export default function GiftThree({ onClose }: GiftThreeProps) {
  const [showLetter, setShowLetter] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col items-center p-4 overflow-y-auto"
    >
      <button 
        onClick={onClose}
        className="fixed top-4 right-4 md:top-6 md:right-6 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all z-[70] shadow-xl"
      >
        <X className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {!showLetter ? (
        <div className="w-full max-w-6xl py-20">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl md:text-5xl font-bold text-center mb-10 md:mb-16 text-glow"
          >
            Memory Gallery 🖼️
          </motion.h2>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer break-inside-avoid rounded-2xl overflow-hidden border border-white/10 glass"
                onClick={() => setSelectedImg(item.src)}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  width={500}
                  height={item.size === "tall" ? 700 : 400}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 text-pink-glow mb-2">
                    <span className="text-sm font-bold uppercase tracking-wider">{item.title}</span>
                  </div>
                  <p className="text-white/90 text-sm italic">{item.desc}</p>
                  <ZoomIn className="absolute top-4 right-4 w-5 h-5 text-white/50" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 text-center"
          >
            <button
              onClick={() => setShowLetter(true)}
              className="px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-purple-deep to-pink-glow text-white rounded-full font-bold text-lg md:text-2xl shadow-[0_0_30px_rgba(255,0,255,0.3)] hover:scale-105 transition-transform"
            >
              The Final Heartfelt Note 💙
            </button>
          </motion.div>
        </div>
      ) : (
        <EnvelopeLetter
          quote={`Our Precious Nischal Sigireddy… 💙\n\nNo matter how old you get, you will always be the light of our lives.\n\nYour happiness is our happiness, and your success is our proudest achievement.\n\nEvery memory we make with you turns into a beautiful story we cherish deeply. ✨\n\nNever stop smiling, never stop dreaming, and never forget how endlessly you are loved.\n\nHappy Birthday Once Again! 🎂✨`}
          signature="— With Eternal Love"
          theme="purple"
          onComplete={onClose}
        />
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-8 cursor-zoom-out"
          >
            <div className="relative max-w-5xl w-full h-full">
              <Image
                src={selectedImg}
                alt="Selected"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
