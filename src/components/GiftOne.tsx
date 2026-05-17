"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import EnvelopeLetter from "./EnvelopeLetter";

interface GiftOneProps {
  onClose: () => void;
}

const photos = [
  { src: "/photos/childhood_1_new.jpg", title: "Where it all started" },
  { src: "/photos/childhood_2_new.jpg", title: "Brothers 💙" },
  { src: "/photos/childhood_3_new.jpg", title: "Handsome Boy ✨" },
  { src: "/photos/family_1_new.png", title: "Family is everything" },
];

export default function GiftOne({ onClose }: GiftOneProps) {
  const [showLetter, setShowLetter] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 overflow-y-auto"
    >
      <button 
        onClick={onClose}
        className="fixed top-4 right-4 md:top-6 md:right-6 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all z-[70] shadow-xl"
      >
        <X className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {!showLetter ? (
        <div className="w-full max-w-5xl">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl md:text-5xl font-bold text-center mb-10 md:mb-12 text-glow"
          >
            Childhood Memories 🧸
          </motion.h2>

          <div className="relative h-[400px] md:h-[600px]">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              loop={true}
              autoplay={{ delay: 3000 }}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              navigation={true}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="w-full h-full"
            >
              {photos.map((photo, index) => (
                <SwiperSlide key={index} className="w-[300px] md:w-[450px]">
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white/10">
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                      <h3 className="text-xl font-semibold">{photo.title}</h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => setShowLetter(true)}
              className="px-8 py-3 md:px-10 md:py-4 bg-gold-bright text-black rounded-full font-bold text-lg md:text-xl hover:scale-105 transition-transform"
            >
              Open the Special Letter ✨
            </button>
          </motion.div>
        </div>
      ) : (
        <EnvelopeLetter
          quote={`Happy Birthday to the amazing 🤩 boy! 🎉\n\nYou are our greatest joy, our pride, and our biggest blessing.\n\nWatching you grow into such a wonderful person fills our heart with happiness. ✨\n\nMay your life always be filled with love, laughter, and success.\n\nLove you forever, dear! 💙`}
          signature="— With Endless Love"
          theme="blue"
          onComplete={onClose}
        />
      )}
    </motion.div>
  );
}
