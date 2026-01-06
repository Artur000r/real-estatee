"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Ուշադիր եղիր, որ այստեղ գրված լինի 'export function'
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 z-[110] origin-left"
      style={{ scaleX }}
    />
  );
}