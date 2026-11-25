"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setDone(true), 350);
          return 100;
        }
        return prev + 4;
      });
    }, 35);
    return () => clearInterval(timer);
  }, []);

  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{
            clipPath: "circle(0% at 50% 50%)",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F7F7F9]"
        >
          <div className="relative flex items-center justify-center w-44 h-44">
            {/* حلقة التقدم الدائرية بألوان الهوية */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 144 144">
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke="#E2E4EC"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke="url(#dairahGrad)"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="dairahGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1B1F4B" />
                  <stop offset="55%" stopColor="#FF7A00" />
                  <stop offset="100%" stopColor="#FFC400" />
                </linearGradient>
              </defs>
            </svg>

            {/* شعار الدائرة */}
            <img
              src="/logo/LOGO-removebg-preview.png"
              alt="الدائرة AL_DAIRAH"
              className="absolute w-28 h-auto object-contain"
            />
          </div>

          <div className="mt-4 flex items-center gap-2 font-english font-bold text-primary text-lg">
            <span>{progress}%</span>
          </div>
          <p className="text-xs text-primary/70 mt-1">جاري تهيئة منظومة النقل...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}