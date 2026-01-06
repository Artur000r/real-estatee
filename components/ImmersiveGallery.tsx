"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface GalleryProps {
  images: string[];
}

export default function ImmersiveGallery({ images }: GalleryProps) {
  const [index, setIndex] = useState<number | null>(null);

  // Ստեղնաշարով կառավարում
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "ArrowRight") setIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((index - 1 + images.length) % images.length);
      if (e.key === "Escape") setIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, images.length]);

  return (
    <div className="relative">
      {/* 1. Bento Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
        <motion.div 
          whileHover={{ scale: 0.99 }}
          onClick={() => setIndex(0)}
          className="md:col-span-2 h-full cursor-pointer overflow-hidden rounded-[32px] relative group"
        >
          <img src={images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Maximize2 className="text-white" size={32} />
          </div>
        </motion.div>
        
        <div className="md:col-span-2 grid grid-cols-2 gap-4 h-full">
          {images.slice(1, 5).map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 0.98 }}
              onClick={() => setIndex(i + 1)}
              className="relative h-full cursor-pointer overflow-hidden rounded-2xl group"
            >
              <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              {i === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-bold">
                  +{images.length - 5} նկար
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. Fullscreen Lightbox */}
      <AnimatePresence>
        {index !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-20"
          >
            <button 
              onClick={() => setIndex(null)}
              className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
            >
              <X size={40} />
            </button>

            <button 
              className="absolute left-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setIndex((index - 1 + images.length) % images.length)}
            >
              <ChevronLeft size={48} />
            </button>

            <motion.img 
              key={index}
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -50 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              src={images[index]} 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />

            <button 
              className="absolute right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setIndex((index + 1) % images.length)}
            >
              <ChevronRight size={48} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-10 text-white/70 font-mono tracking-widest">
              {index + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}