"use client";

import React, { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18nContext";
import { Target, Compass, Award } from "lucide-react";

export default function AboutSection() {
  const { t, locale } = useI18n();
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

  const milestones = [
    {
      year: "2015",
      titleAr: "التأسيس والانطلاقة",
      titleEn: "Foundation & Launch",
      descAr: "بداية العمل بأسطول متخصص لنقل الوقود في المنطقة الغربية.",
      descEn:
        "Started operations with a specialized fuel fleet in the Western Region.",
    },
    {
      year: "2016",
      titleAr: "الاعتماد الرسمي من أرامكو",
      titleEn: "Official Saudi Aramco Registration",
      descAr:
        "التسجيل كناقل رسمي معتمد لدى أرامكو السعودية وتطبيق معايير السلامة الصارمة.",
      descEn:
        "Registered as an official Saudi Aramco carrier with strict HSE compliance.",
    },
    {
      year: "2016",
      titleAr: "التغطية الوطنية والتتبع الذكي",
      titleEn: "Nationwide Expansion & GPS Fleet",
      descAr:
        "توسيع شبكة الإمداد لتشمل الرياض، المنطقة الشرقية، الجنوب، والشمال.",
      descEn:
        "Expanded supply network to Riyadh, Eastern, Southern, and Northern regions.",
    },
    {
      year: "2026",
      titleAr: "أسطول حديث وحلول رقمية",
      titleEn: "Modern Fleet & Digital Logistics",
      descAr:
        "أكثر من 85 صهريجاً حديثاً وإدارة طلبات فورية لخدمة قطاع الطاقة والصناعة.",
      descEn:
        "Over 85 modern tankers with real-time dispatch serving energy & industry.",
    },
  ];

  const visionCards = [
    {
      icon: Compass,
      iconWrapperClass: "bg-primary text-highlight shadow-sm",
      title: t.about.visionTitle,
      text: t.about.visionText,
    },
    {
      icon: Award,
      iconWrapperClass: "bg-accent text-white shadow-sm",
      title: t.about.missionTitle,
      text: t.about.missionText,
    },
    {
      icon: Target,
      iconWrapperClass: "bg-highlight text-primary shadow-sm",
      title: t.about.goalTitle,
      text: t.about.goalText,
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-surface font-arabic overflow-hidden"
    >
      <style jsx>{`
        @keyframes orbitSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes softFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .orbit-ring {
          animation: orbitSpin 28s linear infinite;
        }
        .circle-float {
          animation: softFloat 5s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* إطار دائري بصري يعكس هوية الدائرة */}
          <div
            className={`lg:col-span-5 flex justify-center transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <div className="relative w-64 h-64 sm:w-96 sm:h-96 flex items-center justify-center circle-float">
              {/* الحلقة الخارجية الدوارة */}
              <div className="absolute inset-0 rounded-full border-[3px] sm:border-4 border-dashed border-accent/65 orbit-ring pointer-events-none">
                <span className="absolute -top-3 right-10 sm:right-12 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-accent shadow-glow-orange" />
                <span className="absolute -bottom-2.5 left-12 sm:left-14 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-highlight" />
              </div>

              {/* الدائرة الداخلية الثابتة */}
              <div className="w-[calc(100%-24px)] h-[calc(100%-24px)] sm:w-[calc(100%-32px)] sm:h-[calc(100%-32px)] rounded-full bg-primary overflow-hidden flex flex-col items-center justify-center p-5 sm:p-8 text-center text-white shadow-glow-navy relative">
                <div className="bg-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full mb-3 sm:mb-5 shadow-sm">
                  <img
                    src="/logo/LOGO-removebg-preview.png"
                    alt="AL_DAIRAH"
                    className="h-9 sm:h-12 w-auto"
                  />
                </div>
                <p className="text-sm sm:text-lg font-extrabold text-highlight leading-snug px-2">
                  {locale === "ar"
                    ? "دائرة متكاملة من الأمان والموثوقية"
                    : "A Complete Circle of Safety & Trust"}
                </p>
                <span className="mt-2 sm:mt-3 text-xs sm:text-[13px] font-bold text-white/80 tracking-wide">
                  CR: 7026134838 • KSA
                </span>
              </div>
            </div>
          </div>

          {/* النص التعريفي + الرؤية والرسالة والهدف */}
          <div
            className={`lg:col-span-7 space-y-5 sm:space-y-6 transition-all duration-700 delay-150 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-extrabold text-xs sm:text-[13px]">
              {t.about.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary leading-tight">
              {t.about.title}
            </h2>
            <p className="text-primary/80 text-sm sm:text-base lg:text-[17px] font-medium leading-relaxed">
              {t.about.desc}
            </p>

            {/* بطاقات الرؤية والرسالة والهدف */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-2">
              {visionCards.map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={idx}
                    style={{ transitionDelay: `${200 + idx * 110}ms` }}
                    className={`bg-white p-4 sm:p-5 rounded-3xl border border-primary/10 shadow-sm hover:border-accent/50 hover:-translate-y-1 active:scale-[0.99] transition-all duration-500 group ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-2xl ${card.iconWrapperClass} flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform duration-300`}
                    >
                      <IconComponent
                        className="w-5 h-5 shrink-0"
                        strokeWidth={2.2}
                      />
                    </div>
                    <h3 className="font-extrabold text-primary text-sm sm:text-base mb-1.5">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] font-medium text-primary/75 leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* الخط الزمني التفاعلي المتجاوب */}
        <div className="mt-14 sm:mt-20 pt-10 sm:pt-12 border-t border-primary/10">
          <div className="relative space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {/* خط اتصال رأسي للجوال فقط */}
            <div
              aria-hidden="true"
              className="sm:hidden absolute top-3 bottom-3 right-3.5 ltr:right-auto ltr:left-3.5 w-0.5 bg-primary/15"
            />

            {milestones.map((m, idx) => (
              <div
                key={`${m.year}-${idx}`}
                style={{ transitionDelay: `${250 + idx * 120}ms` }}
                className={`relative pr-9 sm:pr-0 ltr:pr-0 ltr:pl-9 sm:ltr:pl-0 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                {/* نقطة الخط الزمني للجوال */}
                <span
                  aria-hidden="true"
                  className="sm:hidden absolute top-6 right-2 ltr:right-auto ltr:left-2 w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-surface"
                />

                <div className="h-full bg-white p-5 sm:p-6 rounded-3xl border border-primary/10 hover:border-accent hover:-translate-y-1 shadow-sm transition-all duration-300 group">
                  <span className="inline-flex items-center px-4 py-1 rounded-full bg-primary text-highlight font-extrabold text-xs sm:text-sm mb-3 group-hover:bg-accent group-hover:text-white transition">
                    {m.year}
                  </span>
                  <h4 className="font-extrabold text-primary text-sm sm:text-base mb-1.5">
                    {locale === "ar" ? m.titleAr : m.titleEn}
                  </h4>
                  <p className="text-xs sm:text-[13px] font-medium text-primary/75 leading-relaxed">
                    {locale === "ar" ? m.descAr : m.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}