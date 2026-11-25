"use client";

import React, { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { useI18n } from "@/lib/i18nContext";

export default function StatsBar() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getLabel = (key: string) => {
    const sub = key.split(".")[1] as keyof typeof t.stats;
    return t.stats[sub];
  };

  return (
    <section id="stats" ref={ref} className="py-16 bg-primary text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
        {siteConfig.stats.map((item, idx) => {
          const radius = 52;
          const circ = 2 * Math.PI * radius;
          const fillPercent = item.id === "onTime" ? item.value : 78 + idx * 4;
          const offset = visible ? circ - (fillPercent / 100) * circ : circ;

          return (
            <div key={item.id} className="flex flex-col items-center text-center group">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="7"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke={idx % 2 === 0 ? "#FF7A00" : "#FFC400"}
                    strokeWidth="7"
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-english text-2xl font-bold text-white group-hover:text-highlight transition">
                    {visible ? item.value.toLocaleString() : 0}
                    <span className="text-accent text-base">{item.suffix}</span>
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-white/85">{getLabel(item.labelKey)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}