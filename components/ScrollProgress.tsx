"use client";

import React, { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, select, [data-cursor='expand']")) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden lg:block rounded-full border-2 border-accent transition-transform duration-150 ease-out"
      style={{
        width: hovered ? 48 : 22,
        height: hovered ? 48 : 22,
        backgroundColor: hovered ? "rgba(255, 122, 0, 0.15)" : "transparent",
        transform: `translate3d(${pos.x - (hovered ? 24 : 11)}px, ${
          pos.y - (hovered ? 24 : 11)
        }px, 0)`,
      }}
    />
  );
}

export function ScrollProgress() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setPercent(docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const r = 20;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="العودة للأعلى"
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-primary/90 backdrop-blur-md shadow-glow-navy flex items-center justify-center text-white hover:scale-110 transition-transform"
    >
      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={r} stroke="rgba(255,255,255,0.15)" strokeWidth="3" fill="none" />
        <circle
          cx="24"
          cy="24"
          r={r}
          stroke="#FF7A00"
          strokeWidth="3"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="absolute text-[10px] font-english font-bold">{percent}%</span>
    </button>
  );
}