"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { useI18n } from "@/lib/i18nContext";
import { MapPin } from "lucide-react";

interface HubPoint {
  id: string;
  nameAr: string;
  nameEn: string;
  x: number;
  y: number;
  isHq?: boolean;
  hqLabelAr?: string;
  hqLabelEn?: string;
}

const KEY_CITIES: HubPoint[] = [
  {
    id: "makkah",
    nameAr: "مكة المكرمة",
    nameEn: "Makkah",
    x: 31,
    y: 67,
    isHq: true,
    hqLabelAr: "مقرنا الرئيسي",
    hqLabelEn: "Main HQ",
  },
  {
    id: "jeddah",
    nameAr: "جدة",
    nameEn: "Jeddah",
    x: 24,
    y: 64,
    isHq: false,
  },
  {
    id: "taif",
    nameAr: "الطائف",
    nameEn: "Taif",
    x: 38,
    y: 66,
    isHq: false,
  },
  {
    id: "yanbu",
    nameAr: "ينبع",
    nameEn: "Yanbu",
    x: 23,
    y: 50,
    isHq: false,
  },
  {
    id: "tabuk",
    nameAr: "تبوك",
    nameEn: "Tabuk",
    x: 23,
    y: 25,
    isHq: false,
  },
  {
    id: "al-jouf",
    nameAr: "الجوف",
    nameEn: "Al-Jouf",
    x: 36,
    y: 22,
    isHq: false,
  },
  {
    id: "qassim",
    nameAr: "القصيم",
    nameEn: "Qassim",
    x: 50,
    y: 44,
    isHq: false,
  },
  {
    id: "jazan",
    nameAr: "جيزان",
    nameEn: "Jazan",
    x: 41,
    y: 86,
    isHq: false,
  },
];

export default function CoverageMap() {
  const { locale } = useI18n();

  const citiesList: HubPoint[] = React.useMemo(() => {
    const baseCities: HubPoint[] = Array.isArray(siteConfig?.cities)
      ? siteConfig.cities.map((c: any) => ({
          id: String(c.id ?? c.nameEn ?? c.nameAr),
          nameAr: String(c.nameAr ?? ""),
          nameEn: String(c.nameEn ?? ""),
          x: Number(c.x ?? 50),
          y: Number(c.y ?? 50),
          isHq: false,
        }))
      : [];

    const merged = [...baseCities];
    for (const item of KEY_CITIES) {
      const idx = merged.findIndex(
        (m) =>
          m.id.toLowerCase() === item.id.toLowerCase() ||
          m.nameAr === item.nameAr
      );
      if (idx >= 0) {
        merged[idx] = {
          ...merged[idx],
          nameAr: item.nameAr,
          nameEn: item.nameEn,
          x: item.x,
          y: item.y,
          isHq: Boolean(item.isHq),
          hqLabelAr: item.hqLabelAr,
          hqLabelEn: item.hqLabelEn,
        };
      } else {
        merged.push(item);
      }
    }
    return merged;
  }, []);

  const [selectedCity, setSelectedCity] = useState<HubPoint>(
    () => citiesList.find((c) => c.id === "makkah") || citiesList[0]
  );

  const regionsAr = [
    "منطقة مكة المكرمة",
    "منطقة الرياض",
    "المنطقة الشرقية",
    "منطقة المدينة المنورة",
    "منطقة عسير",
    "منطقة القصيم",
    "منطقة تبوك",
    "منطقة حائل",
    "منطقة جازان",
    "منطقة الجوف",
    "منطقة الحدود الشمالية",
    "منطقة الباحة",
  ];

  const activeHub = selectedCity || citiesList[0];
  const makkahHub = citiesList.find((c) => c.id === "makkah") || citiesList[0];

  // إحداثيات بطاقة "مقرنا الرئيسي" في مساحة خالية بعيدة عن أسماء المدن
  const hqCardX = 6;
  const hqCardY = 81;
  const hqCardW = 24.5;
  const hqCardH = 7.4;

  return (
    <section
      id="coverage"
      className="py-24 bg-[#121731] text-white border-t border-white/10"
    >
      <style jsx>{`
        @keyframes dashFlow {
          to {
            stroke-dashoffset: -24;
          }
        }
        .route-line-animated {
          stroke-dasharray: 2.2 1.8;
          animation: dashFlow 1.6s linear infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* خريطة المملكة التفاعلية SVG */}
        <div className="lg:col-span-6 bg-[#171d3a] border border-white/10 rounded-3xl p-5 sm:p-6 relative shadow-2xl">
          <svg viewBox="0 0 100 100" className="w-full h-auto overflow-visible">
            <defs>
              <radialGradient id="hqGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFC400" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#FFC400" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* حدود مبسطة للمملكة العربية السعودية */}
            <path
              d="M 18 22 L 32 14 L 52 28 L 72 36 L 84 52 L 80 72 L 56 80 L 44 92 L 36 80 L 28 62 L 22 42 Z"
              fill="#11162e"
              stroke="#FF7A00"
              strokeWidth="0.75"
            />

            {/* خطوط الربط المتحركة من النقطة المحددة إلى بقية المدن */}
            {citiesList.map((city) => {
              if (city.id === activeHub.id) return null;
              const midX = (activeHub.x + city.x) / 2;
              const midY = (activeHub.y + city.y) / 2 - 2.2;
              const pathD = `M ${activeHub.x} ${activeHub.y} Q ${midX} ${midY} ${city.x} ${city.y}`;

              return (
                <path
                  key={`route-${activeHub.id}-${city.id}`}
                  d={pathD}
                  fill="none"
                  stroke="#FFC400"
                  strokeWidth="0.5"
                  opacity="0.82"
                  className="route-line-animated"
                />
              );
            })}

            {/* توهج المقر الرئيسي (مكة المكرمة فقط) */}
            <circle
              cx={makkahHub.x}
              cy={makkahHub.y}
              r="5.5"
              fill="url(#hqGlow)"
            />

            {/* نقاط المدن والتسميات */}
            {citiesList.map((city) => {
              const isSelected = activeHub.id === city.id;
              const isMakkah = city.id === "makkah";
              const isJeddah = city.id === "jeddah";
              const isTaif = city.id === "taif";
              const isYanbu = city.id === "yanbu";

              const labelX = isJeddah || isYanbu
                ? city.x - 2.2
                : isTaif
                ? city.x + 2.2
                : city.x;

              const labelY = isMakkah
                ? city.y + 4.4
                : isTaif || isYanbu
                ? city.y + 0.8
                : city.y - 2.4;

              const textAnchor = isJeddah || isYanbu
                ? "end"
                : isTaif
                ? "start"
                : "middle";

              return (
                <g
                  key={city.id}
                  onClick={() => setSelectedCity(city)}
                  className="cursor-pointer"
                >
                  {isSelected && (
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r="3.8"
                      fill="#FFC400"
                      opacity="0.3"
                    />
                  )}

                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={isSelected || city.isHq ? "1.9" : "1.35"}
                    fill={
                      isSelected
                        ? "#FFC400"
                        : city.isHq
                        ? "#FFC400"
                        : "#FF7A00"
                    }
                    stroke="#ffffff"
                    strokeWidth="0.4"
                  />

                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor={textAnchor}
                    fill="#ffffff"
                    fontSize={city.isHq || isTaif ? "2.45" : "2.3"}
                    fontWeight="bold"
                  >
                    {locale === "ar" ? city.nameAr : city.nameEn}
                  </text>
                </g>
              );
            })}

            {/* خط ربط أنيق يربط بطاقة المقر الرئيسي بنقطة مكة المكرمة */}
            <polyline
              points={`${makkahHub.x},${makkahHub.y + 1.8} ${makkahHub.x},${
                hqCardY + hqCardH / 2
              } ${hqCardX + hqCardW},${hqCardY + hqCardH / 2}`}
              fill="none"
              stroke="#FFC400"
              strokeWidth="0.5"
              strokeDasharray="1.4 1.2"
              opacity="0.75"
            />

            {/* بطاقة محسّنة لـ "مقرنا الرئيسي" في موقع منفصل وواضح */}
            <g
              onClick={() => setSelectedCity(makkahHub)}
              className="cursor-pointer"
            >
              <rect
                x={hqCardX}
                y={hqCardY}
                width={hqCardW}
                height={hqCardH}
                rx="1.6"
                fill="#11162e"
                stroke="#FFC400"
                strokeWidth="0.6"
              />
              <circle
                cx={hqCardX + 3.2}
                cy={hqCardY + hqCardH / 2}
                r="1.2"
                fill="#FF7A00"
              />
              <text
                x={hqCardX + 6.2}
                y={hqCardY + 3.2}
                textAnchor="start"
                fill="#FFC400"
                fontSize="1.75"
                fontWeight="bold"
              >
                {locale === "ar" ? "مكة المكرمة" : "Makkah"}
              </text>
              <text
                x={hqCardX + 6.2}
                y={hqCardY + 5.75}
                textAnchor="start"
                fill="#ffffff"
                fontSize="2.1"
                fontWeight="bold"
              >
                {locale === "ar"
                  ? makkahHub.hqLabelAr || "مقرنا الرئيسي"
                  : makkahHub.hqLabelEn || "Main HQ"}
              </text>
            </g>
          </svg>

          <div className="mt-4 flex items-center justify-between bg-[#11162e] px-5 py-3 rounded-full border border-white/10 text-xs">
            <span className="flex items-center gap-2 text-[#FFC400] font-bold">
              <MapPin className="w-4 h-4 text-[#FF7A00]" />
              {locale === "ar"
                ? `الوجهة المحددة: ${activeHub.nameAr}${
                    activeHub.isHq ? " — مقرنا الرئيسي" : ""
                  }`
                : `Selected Hub: ${activeHub.nameEn}${
                    activeHub.isHq ? " — Main HQ" : ""
                  }`}
            </span>
            <span className="text-white/70">
              {locale === "ar" ? "تغطية 24/7" : "24/7 Coverage"}
            </span>
          </div>
        </div>

        {/* تفاصيل المناطق والمدن */}
        <div className="lg:col-span-6 space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF7A00]/20 text-[#FFC400] font-bold text-xs border border-[#FF7A00]/30">
            {locale === "ar" ? "نطاق التغطية الجغرافية" : "Geographical Coverage"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
            {locale === "ar"
              ? "مقرنا الرئيسي مكة المكرمة، ونخدم جميع مناطق المملكة"
              : "Main HQ in Makkah, Serving All Regions Across the Kingdom"}
          </h2>
          <p className="text-white/75 text-base leading-relaxed">
            {locale === "ar"
              ? "انطلاقاً من مقرنا الرئيسي في مكة المكرمة وعبر محاور التشغيل في جدة والطائف ومختلف مناطق المملكة، نغطي المدن والمناطق الصناعية والمشاريع بكفاءة عالية. اضغط على أي مدينة في الخريطة لتتبع خطوط الإمداد."
              : "Operating from our main headquarters in Makkah and across Jeddah, Taif, and regional hubs nationwide, we supply cities, industrial zones, and projects."}
          </p>

          {/* كبسولات المناطق الدائرية */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            {regionsAr.map((reg, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-[#171d3a] border border-white/15 hover:border-[#FF7A00] text-xs font-medium transition"
              >
                {reg}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}