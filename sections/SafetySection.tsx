"use client";

import React, { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18nContext";
import {
  ShieldAlert,
  Satellite,
  UserCheck,
  Leaf,
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";

const HEX_CLIP =
  "polygon(25% 5%, 75% 5%, 98% 50%, 75% 95%, 25% 95%, 2% 50%)";

export default function SafetySection() {
  const { locale } = useI18n();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const badges = [
    {
      icon: BadgeCheck,
      titleAr: "ناقل مسجل لدى أرامكو السعودية",
      titleEn: "Saudi Aramco Registered Carrier",
      descAr: "مطابقة تامة لاشتراطات التحميل والسلامة في جميع محطات أرامكو.",
      descEn: "Full compliance with Aramco bulk plant loading & safety protocols.",
    },
    {
      icon: ShieldAlert,
      titleAr: "مرخص من الهيئة العامة للنقل (TGA)",
      titleEn: "Transport General Authority Licensed",
      descAr: "تراخيص نقل المواد البترولية والخطرة سارية ومحدثة.",
      descEn: "Active hazmat and petroleum transport permits across KSA.",
    },
    {
      icon: Satellite,
      live: true,
      titleAr: "تتبع GPS ومراقبة حية 24/7",
      titleEn: "24/7 Live GPS & Telemetry",
      descAr: "مراقبة مسار الشاحنة، السرعة، وفتح/إغلاق الصمامات لحظياً.",
      descEn: "Real-time route, speed, and valve security monitoring.",
    },
    {
      icon: UserCheck,
      titleAr: "سائقون معتمدون ومؤهلون",
      titleEn: "Certified Hazmat Drivers",
      descAr: "تدريب دوري على القيادة الدفاعية ومكافحة الحرائق وإجراءات الطوارئ.",
      descEn:
        "Periodic training in defensive driving, firefighting, and emergency response.",
    },
    {
      icon: Leaf,
      titleAr: "حماية البيئة ومنع الانسكاب",
      titleEn: "Environmental & Spill Protection",
      descAr: "أنظمة استرجاع الأبخرة وصمامات إغلاق تلقائي لمنع أي تسرب.",
      descEn: "Vapor recovery systems and auto shut-off valves for zero spills.",
    },
  ];

  return (
    <section
      id="safety"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-bold text-xs">
            {locale === "ar"
              ? "السلامة والجودة والاعتمادات"
              : "Safety, Quality & Accreditations"}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            {locale === "ar"
              ? "نلتزم بأعلى معايير السلامة في كل قطرة وقود"
              : "Committed to the Highest Safety Standards in Every Drop"}
          </h2>
        </div>

        {/* شريط الاعتمادات الرسمية بشكل سداسي */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div
            style={{ transitionDelay: "120ms" }}
            className={`p-5 sm:p-6 rounded-3xl bg-surface border border-primary/10 hover:border-accent/40 hover:-translate-y-1 shadow-sm flex items-center justify-between gap-4 transition-all duration-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {locale === "ar" ? "اعتماد رسمي" : "Official Accreditation"}
                </span>
              </span>
              <h3 className="text-base sm:text-lg font-bold text-primary leading-snug">
                {locale === "ar"
                  ? "مسجلين ناقل رسمي لدى أرامكو السعودية"
                  : "Official Registered Carrier at Saudi Aramco"}
              </h3>
            </div>

            <div
              style={{ clipPath: HEX_CLIP }}
              className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-primary text-highlight font-english font-bold flex items-center justify-center text-[10px] sm:text-xs text-center px-2 shadow-glow-navy"
            >
              ARAMCO
            </div>
          </div>

          <div
            style={{ transitionDelay: "220ms" }}
            className={`p-5 sm:p-6 rounded-3xl bg-surface border border-primary/10 hover:border-accent/40 hover:-translate-y-1 shadow-sm flex items-center justify-between gap-4 transition-all duration-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {locale === "ar" ? "ترخيص حكومي" : "Government License"}
                </span>
              </span>
              <h3 className="text-base sm:text-lg font-bold text-primary leading-snug">
                {locale === "ar"
                  ? "مرخصين من الهيئة العامة للنقل (TGA)"
                  : "Licensed by Transport General Authority (TGA)"}
              </h3>
            </div>

            <div
              style={{ clipPath: HEX_CLIP }}
              className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-accent text-white font-english font-bold flex items-center justify-center text-xs sm:text-sm shadow-glow-orange"
            >
              TGA
            </div>
          </div>
        </div>

        {/* بطاقات معايير السلامة الخمس بإطار سداسي */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                style={{ transitionDelay: `${260 + i * 90}ms` }}
                className={`p-5 sm:p-6 rounded-3xl bg-surface border border-primary/10 hover:border-accent hover:-translate-y-1.5 active:scale-[0.99] shadow-sm transition-all duration-500 group flex sm:flex-col items-start sm:items-center text-start sm:text-center gap-4 sm:gap-0 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <div className="relative shrink-0 sm:mx-auto sm:mb-4">
                  <div
                    style={{ clipPath: HEX_CLIP }}
                    className="w-14 h-14 sm:w-16 sm:h-16 bg-primary group-hover:bg-accent text-highlight group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  {b.live && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white" />
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <h4 className="font-bold text-primary text-sm mb-1.5 sm:mb-2 leading-snug">
                    {locale === "ar" ? b.titleAr : b.titleEn}
                  </h4>
                  <p className="text-xs text-primary/70 leading-relaxed">
                    {locale === "ar" ? b.descAr : b.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}