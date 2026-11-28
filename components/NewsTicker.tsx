"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18nContext";
import { Megaphone, Pause, Play } from "lucide-react";

interface NewsItem {
  id: string;
  ar: string;
  en: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    id: "aramco-tga",
    ar: "شركة الدائرة للخدمات اللوجستية — ناقل معتمد لدى أرامكو السعودية ومرخص من الهيئة العامة للنقل (TGA) لتوريد الديزل والبنزين.",
    en: "AL-DAIRAH Logistics — Registered Saudi Aramco carrier and TGA-licensed operator for diesel and gasoline supply.",
  },
  {
    id: "hq-makkah",
    ar: "المقر الرئيسي في مكة المكرمة مع تغطية تشغيلية شاملة إلى جدة، الطائف، ينبع، تبوك، الجوف، القصيم، وجيزان.",
    en: "Headquartered in Makkah with operational coverage across Jeddah, Taif, Yanbu, Tabuk, Al-Jouf, Qassim, and Jazan.",
  },
  {
    id: "fleet-capacities",
    ar: "توفير صهاريج بسعات معتمدة (20,000 — 32,000 — 33,000 — 36,000 لتر) مع تتبع مباشر GPS على مدار الساعة.",
    en: "Dedicated tankers in 20k, 32k, 33k, and 36k liter capacities backed by 24/7 live GPS tracking and safety compliance.",
  },
];

export default function NewsTicker() {
  const { locale } = useI18n();
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isPaused = paused || hovered;
  const repeatedItems = [...NEWS_ITEMS, ...NEWS_ITEMS];

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full bg-primary/95 text-white border-t border-white/10 font-arabic select-none overflow-hidden"
      aria-label={locale === "ar" ? "شريط أخبار شركة الدائرة" : "AL-DAIRAH News Ticker"}
    >
      <div className="max-w-7xl mx-auto flex items-stretch h-9 sm:h-10">
        {/* شارة العنوان بنفس لون الهيدر */}
        <div className="shrink-0 bg-primary border-e border-white/15 px-3 sm:px-4 flex items-center gap-2 z-10">
          <Megaphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-highlight shrink-0" />
          <span className="text-xs sm:text-[13px] font-extrabold text-white whitespace-nowrap">
            {locale === "ar" ? "أخبار الدائرة" : "AL-DAIRAH News"}
          </span>
        </div>

        {/* المسار المتحرك للأخبار */}
        <div className="relative flex-1 overflow-hidden flex items-center">
          <div
            className={`flex items-center whitespace-nowrap will-change-transform ${
              locale === "ar" ? "animate-ticker-rtl" : "animate-ticker-ltr"
            }`}
            style={{
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {repeatedItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="inline-flex items-center px-4 sm:px-6 text-xs sm:text-[13px] font-medium text-white/95"
              >
                <span>{locale === "ar" ? item.ar : item.en}</span>
                <span
                  aria-hidden="true"
                  className="mx-4 sm:mx-6 h-3.5 w-[1px] bg-white/20 inline-block"
                />
              </div>
            ))}
          </div>
        </div>

        {/* زر إيقاف/تشغيل مؤقت */}
        <button
          type="button"
          onClick={() => setPaused((prev) => !prev)}
          aria-label={
            paused
              ? locale === "ar"
                ? "تشغيل شريط الأخبار"
                : "Resume news ticker"
              : locale === "ar"
              ? "إيقاف شريط الأخبار مؤقتاً"
              : "Pause news ticker"
          }
          title={
            paused
              ? locale === "ar"
                ? "تشغيل"
                : "Play"
              : locale === "ar"
              ? "إيقاف مؤقت"
              : "Pause"
          }
          className="shrink-0 px-2.5 sm:px-3.5 border-s border-white/10 text-white/80 hover:text-highlight hover:bg-white/5 transition flex items-center justify-center"
        >
          {paused ? (
            <Play className="w-3.5 h-3.5 text-highlight" />
          ) : (
            <Pause className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}