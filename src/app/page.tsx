"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingParticles from "@/components/FloatingParticles";
import IntroPopup from "@/components/IntroPopup";
import GiftCard from "@/components/GiftCard";
import GiftOne from "@/components/GiftOne";
import GiftTwo from "@/components/GiftTwo";
import GiftThree from "@/components/GiftThree";
import BalloonEffects from "@/components/BalloonEffects";
import Fireworks from "@/components/Fireworks";
import BirthdayMusic from "@/components/BirthdayMusic";

export default function BirthdayPage() {
  const [stage, setStage] = useState<"intro" | "surprise" | "final">("intro");
  const [selectedGift, setSelectedGift] = useState<number | null>(null);

  const handleStart = () => {
    setStage("surprise");
  };

  const handleGiftClose = () => {
    setSelectedGift(null);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-black text-white">
      <FloatingParticles />
      <BalloonEffects />
      <BirthdayMusic />

      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <IntroPopup key="intro" onStart={handleStart} />
        )}

        {stage === "surprise" && (
          <motion.div
            key="surprise"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center"
          >
            <motion.h2
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl md:text-4xl font-light italic mb-12 text-center text-white/70"
            >
              Ohhh my sweeet boy… 🥹💙
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
              <GiftCard
                index={1}
                title="Childhood Memories"
                description="A journey back to where it all began..."
                onClick={() => setSelectedGift(1)}
              />
              <GiftCard
                index={2}
                title="Birthday Video"
                description="A special message from all of us!"
                onClick={() => setSelectedGift(2)}
              />
              <GiftCard
                index={3}
                title="Memory Gallery"
                description="Capturing every smile and silly moment."
                onClick={() => setSelectedGift(3)}
              />
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => setStage("final")}
              className="mt-20 px-8 py-3 glass rounded-full hover:bg-white/10 transition-colors text-sm tracking-widest uppercase"
            >
              Skip to the End ✨
            </motion.button>
          </motion.div>
        )}

        {stage === "final" && (
          <Fireworks key="final" onBack={() => setStage("surprise")} />
        )}
      </AnimatePresence>

      {/* Modals for Gifts */}
      <AnimatePresence>
        {selectedGift === 1 && <GiftOne onClose={handleGiftClose} />}
        {selectedGift === 2 && <GiftTwo onClose={handleGiftClose} />}
        {selectedGift === 3 && <GiftThree onClose={handleGiftClose} />}
      </AnimatePresence>
    </main>
  );
}
