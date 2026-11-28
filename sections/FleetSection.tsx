"use client";

import React, { useMemo, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { useI18n } from "@/lib/i18nContext";
import { RotateCw } from "lucide-react";

const TANKER_BRAND_LABEL = "شركة الدائرة للخدمات اللوجستية";

interface FleetTanker {
  id: string;
  capacity: number | string;
  unitAr: string;
  unitEn: string;
  nameAr: string;
  nameEn: string;
  axlesAr: string;
  axlesEn: string;
  compartments: number | string;
  idealForAr: string;
  idealForEn: string;
}

function parseCapacity(value: number | string | undefined): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value === "string") {
    const cleaned = Number(value.replace(/[^\d.]/g, ""));
    return Number.isFinite(cleaned) ? cleaned : 0;
  }
  return 0;
}

const EXTRA_TANKERS: FleetTanker[] = [
  {
    id: "tanker-33k",
    capacity: 33000,
    unitAr: "لتر",
    unitEn: "L",
    nameAr: "صهريج وقود سعة 33,000 لتر",
    nameEn: "33,000L Fuel Tanker",
    axlesAr: "نظام محاور ثقيل عالي الثبات",
    axlesEn: "Heavy-Duty High-Stability Axles",
    compartments: 4,
    idealForAr: "المحطات التجارية والمشاريع الإنشائية الكبرى",
    idealForEn: "Commercial stations & major construction sites",
  },
  {
    id: "tanker-36k",
    capacity: 36000,
    unitAr: "لتر",
    unitEn: "L",
    nameAr: "صهريج وقود سعة 36,000 لتر",
    nameEn: "36,000L Fuel Tanker",
    axlesAr: "نظام محاور مزدوج للنقل لمسافات طويلة",
    axlesEn: "Dual Heavy Axles for Long-Haul Supply",
    compartments: 4,
    idealForAr: "الإمداد عالي السعة للمصانع والمنشآت الصناعية",
    idealForEn: "High-volume supply for factories & industrial hubs",
  },
];

export default function FleetSection() {
  const { locale } = useI18n();
  const [angle, setAngle] = useState(0);

  const fleetList: FleetTanker[] = useMemo(() => {
    const base: FleetTanker[] = Array.isArray(siteConfig?.fleet)
      ? siteConfig.fleet.map((item: any, index: number) => ({
          id: String(item?.id ?? `fleet-${index}`),
          capacity: item?.capacity ?? 0,
          unitAr: String(item?.unitAr ?? "لتر"),
          unitEn: String(item?.unitEn ?? "L"),
          nameAr: String(item?.nameAr ?? ""),
          nameEn: String(item?.nameEn ?? ""),
          axlesAr: String(item?.axlesAr ?? ""),
          axlesEn: String(item?.axlesEn ?? ""),
          compartments: item?.compartments ?? 4,
          idealForAr: String(item?.idealForAr ?? ""),
          idealForEn: String(item?.idealForEn ?? ""),
        }))
      : [];

    const merged: FleetTanker[] = [...base];

    for (const extra of EXTRA_TANKERS) {
      const extraCap = parseCapacity(extra.capacity);
      const exists = merged.some(
        (item) =>
          item.id.toLowerCase() === extra.id.toLowerCase() ||
          parseCapacity(item.capacity) === extraCap
      );
      if (!exists) {
        merged.push(extra);
      }
    }

    return merged.sort(
      (a, b) => parseCapacity(a.capacity) - parseCapacity(b.capacity)
    );
  }, []);

  const defaultSelectedIdx = useMemo(() => {
    const idx = fleetList.findIndex(
      (item) => parseCapacity(item.capacity) >= 32000
    );
    return idx >= 0 ? idx : 0;
  }, [fleetList]);

  const [selectedIdx, setSelectedIdx] = useState<number>(defaultSelectedIdx);

  const safeIdx =
    selectedIdx >= 0 && selectedIdx < fleetList.length ? selectedIdx : 0;
  const tanker = fleetList[safeIdx];

  if (!tanker) {
    return null;
  }

  const tankWidth = Math.min(340, 220 + safeIdx * 24);
  const tankCenterX = 110 + tankWidth / 2;
  const rearWheel1 = 110 + tankWidth - 45;
  const rearWheel2 = 110 + tankWidth - 12;

  return (
    <section
      id="fleet"
      className="py-16 sm:py-24 bg-surface font-arabic overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5 sm:gap-6">
          <div className="space-y-2.5 sm:space-y-3">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-extrabold text-xs">
              {locale === "ar" ? "أسطولنا الحديث" : "Our Modern Fleet"}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary leading-tight">
              {locale === "ar"
                ? "صهاريج مصممة لأعلى معايير الأمان والسعة"
                : "Tankers Engineered for Safety & Capacity"}
            </h2>
          </div>

          {/* أزرار اختيار السعة */}
          <div className="flex flex-wrap gap-2">
            {fleetList.map((item, idx) => {
              const isActive = safeIdx === idx;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 active:scale-95 ${
                    isActive
                      ? "bg-primary text-highlight shadow-glow-navy"
                      : "bg-white text-primary border border-primary/15 hover:border-accent hover:-translate-y-0.5"
                  }`}
                >
                  {item.capacity} {locale === "ar" ? item.unitAr : item.unitEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* بطاقة العرض التفاعلية 360 درجة */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-primary/10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full h-60 sm:h-80 rounded-3xl bg-gradient-to-b from-primary to-primary-dark flex items-center justify-center overflow-hidden p-4 sm:p-6">
              {/* منصة العرض التفاعلية */}
              <div
                className="transition-transform duration-300"
                style={{
                  transform: `perspective(900px) rotateY(${angle}deg)`,
                }}
              >
                <svg viewBox="0 0 480 150" className="w-72 sm:w-[430px] h-auto">
                  <rect
                    x="110"
                    y="20"
                    width={tankWidth}
                    height="76"
                    rx="35"
                    fill="#FFFFFF"
                    stroke="#FF7A00"
                    strokeWidth="3"
                  />
                  <rect
                    x="115"
                    y="72"
                    width={tankWidth - 10}
                    height="8"
                    fill="#FF7A00"
                  />

                  {/* اسم الشركة مكتوب مباشرة على جسم التانكي */}
                  <text
                    x={tankCenterX}
                    y="45"
                    textAnchor="middle"
                    fill="#1B1F4B"
                    fontWeight="800"
                    fontSize="11.5"
                  >
                    {TANKER_BRAND_LABEL}
                  </text>
                  <text
                    x={tankCenterX}
                    y="62"
                    textAnchor="middle"
                    fill="#FF7A00"
                    fontWeight="800"
                    fontSize="9.5"
                  >
                    {tanker.capacity} {tanker.unitAr} • AL_DAIRAH
                  </text>

                  <path
                    d="M 20 96 L 20 50 Q 22 24 55 24 L 102 24 L 102 96 Z"
                    fill="#FF7A00"
                  />
                  {[48, 86, rearWheel1, rearWheel2].map((cx, i) => (
                    <circle
                      key={i}
                      cx={cx}
                      cy="105"
                      r="16"
                      fill="#0F122E"
                      stroke="#FFC400"
                      strokeWidth="3"
                    />
                  ))}
                </svg>
              </div>

              {/* شريط تدوير 360° */}
              <div className="absolute bottom-3.5 sm:bottom-4 inset-x-3.5 sm:inset-x-6 flex items-center gap-2.5 sm:gap-3 bg-white/10 backdrop-blur-md px-3.5 sm:px-4 py-2 rounded-full">
                <button
                  type="button"
                  onClick={() => setAngle(0)}
                  aria-label="إعادة ضبط زاوية العرض"
                  className="text-highlight hover:text-white active:rotate-[-45deg] transition-transform shrink-0"
                >
                  <RotateCw className="w-4 h-4 shrink-0" strokeWidth={2.2} />
                </button>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  aria-label="تدوير الشاحنة 360 درجة"
                  className="w-full accent-accent cursor-pointer"
                />
                <span className="text-xs text-white font-bold shrink-0">
                  {angle}°
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            <div className="inline-block px-4 py-1 rounded-full bg-highlight/20 text-primary font-extrabold text-xs sm:text-sm">
              {tanker.capacity} {locale === "ar" ? tanker.unitAr : tanker.unitEn}
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-primary leading-snug">
              {locale === "ar" ? tanker.nameAr : tanker.nameEn}
            </h3>

            <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center gap-4 py-2.5 border-b border-primary/10">
                <span className="text-primary/65 font-medium">
                  {locale === "ar" ? "نظام المحاور" : "Axle Configuration"}
                </span>
                <span className="font-extrabold text-primary text-end">
                  {locale === "ar" ? tanker.axlesAr : tanker.axlesEn}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4 py-2.5 border-b border-primary/10">
                <span className="text-primary/65 font-medium">
                  {locale === "ar"
                    ? "عدد الخزانات المعزولة"
                    : "Isolated Compartments"}
                </span>
                <span className="font-extrabold text-primary">
                  {tanker.compartments}
                </span>
              </div>
              <div className="flex justify-between items-start gap-4 py-2.5 border-b border-primary/10">
                <span className="text-primary/65 font-medium shrink-0">
                  {locale === "ar" ? "الاستخدام المثالي" : "Ideal Application"}
                </span>
                <span className="font-extrabold text-primary text-end max-w-[220px] leading-relaxed">
                  {locale === "ar" ? tanker.idealForAr : tanker.idealForEn}
                </span>
              </div>
            </div>

            <div className="pt-1">
              <a
                href="#calculator"
                className="circle-glow-btn inline-flex items-center justify-center w-full sm:w-auto bg-accent hover:bg-accent-hover text-white font-extrabold px-7 py-3.5 text-sm transition"
              >
                {locale === "ar"
                  ? "احجز هذا الصهريج الآن"
                  : "Book This Tanker Now"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}