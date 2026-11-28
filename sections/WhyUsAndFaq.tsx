"use client";

import React, { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18nContext";
import { ChevronDown, CheckCircle } from "lucide-react";

export function WhyUsAndFaq() {
  const { locale } = useI18n();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
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

  const advantages = [
    {
      ar: "تسعير رسمي شفاف مطابق لتسعيرة أرامكو السعودية دون أي رسوم خفية.",
      en: "Transparent pricing aligned with official Saudi Aramco rates.",
    },
    {
      ar: "أسطول مجهز بصمامات أمان وأنظمة تتبع لحظي لضمان الكمية والنقاء.",
      en: "Fleet equipped with safety valves and live GPS tracking.",
    },
    {
      ar: "مرونة عالية في جدولة التوريد الليلي والنهاري لتجنب أوقات الذروة.",
      en: "Flexible day & night dispatch to avoid traffic congestion.",
    },
    {
      ar: "فوترة إلكترونية معتمدة (ZATCA) وتقارير شهرية شاملة للشركات.",
      en: "ZATCA-compliant e-invoicing and detailed monthly statements.",
    },
  ];

  const faqs = [
    {
      qAr: "ما هو الحد الأدنى لكمية طلب الديزل أو البنزين؟",
      aAr: "نوفر صهاريج تبدأ من 10,000 لتر للمواقع داخل المدن وتصل إلى 32,000+ لتر للتريلات الكبيرة.",
      qEn: "What is the minimum order volume for diesel or gasoline?",
      aEn: "We operate tankers starting from 10,000 liters up to 32,000+ liters.",
    },
    {
      qAr: "كم يستغرق وصول الشحنة بعد تأكيد الطلب؟",
      aAr: "داخل المدن الرئيسية (جدة، الرياض، الدمام) يتم التوريد خلال 6 إلى 24 ساعة حسب جدول التحميل.",
      qEn: "How fast is delivery after order confirmation?",
      aEn: "Within major hubs (Jeddah, Riyadh, Dammam), delivery takes 6 to 24 hours.",
    },
    {
      qAr: "هل توفرون عقود توريد آجلة أو دورية للمصانع ومحطات الوقود؟",
      aAr: "نعم، نبرم عقود توريد دورية مخصصة للشركات والمصانع والمحطات مع مدير حساب مخصص.",
      qEn: "Do you offer recurring supply contracts for factories and stations?",
      aEn: "Yes, we provide tailored recurring supply agreements with a dedicated account manager.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 bg-white font-arabic overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
        <div
          className={`lg:col-span-6 space-y-5 sm:space-y-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-extrabold text-xs">
            {locale === "ar" ? "لماذا شركة الدائرة؟" : "Why Choose AL_DAIRAH?"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary leading-tight">
            {locale === "ar" ? "ما الذي يميز التعامل معنا" : "What Sets Us Apart"}
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {advantages.map((adv, idx) => (
              <div
                key={idx}
                style={{ transitionDelay: `${140 + idx * 80}ms` }}
                className={`flex items-start gap-3.5 p-4 sm:p-4.5 rounded-2xl bg-surface border border-primary/10 hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <CheckCircle
                  className="w-5 h-5 text-accent shrink-0 mt-0.5"
                  strokeWidth={2.2}
                />
                <p className="text-xs sm:text-sm font-bold text-primary/85 leading-relaxed">
                  {locale === "ar" ? adv.ar : adv.en}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`lg:col-span-6 space-y-5 sm:space-y-6 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-extrabold text-xs">
            {locale === "ar" ? "الأسئلة الشائعة" : "FAQ"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary leading-tight">
            {locale === "ar"
              ? "إجابات سريعة لاستفساراتك"
              : "Quick Answers to Your Questions"}
          </h2>

          <div className="space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-surface ${
                    isOpen
                      ? "border-accent/50 shadow-sm"
                      : "border-primary/10 hover:border-primary/25"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-start flex items-center justify-between gap-3 font-extrabold text-xs sm:text-sm text-primary"
                  >
                    <span className="leading-snug">
                      {locale === "ar" ? item.qAr : item.qEn}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-accent shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={2.3}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 text-xs sm:text-[13px] font-medium text-primary/80 leading-relaxed border-t border-primary/10 pt-3">
                      {locale === "ar" ? item.aAr : item.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}