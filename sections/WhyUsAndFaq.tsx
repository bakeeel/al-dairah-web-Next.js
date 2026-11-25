"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18nContext";
import { ChevronDown, CheckCircle } from "lucide-react";

export function WhyUsAndFaq() {
  const { locale } = useI18n();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-6 space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-bold text-xs">
            {locale === "ar" ? "لماذا شركة الدائرة؟" : "Why Choose AL_DAIRAH?"}
          </span>
          <h2 className="text-3xl font-bold text-primary">
            {locale === "ar" ? "ما الذي يميز التعامل معنا" : "What Sets Us Apart"}
          </h2>

          <div className="space-y-4">
            {advantages.map((adv, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-surface border border-primary/5"
              >
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-primary/85 leading-relaxed">
                  {locale === "ar" ? adv.ar : adv.en}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs">
            {locale === "ar" ? "الأسئلة الشائعة" : "FAQ"}
          </span>
          <h2 className="text-3xl font-bold text-primary">
            {locale === "ar" ? "إجابات سريعة لاستفساراتك" : "Quick Answers to Your Questions"}
          </h2>

          <div className="space-y-3">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-primary/10 overflow-hidden bg-surface"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-start flex items-center justify-between font-bold text-sm text-primary"
                >
                  <span>{locale === "ar" ? item.qAr : item.qEn}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-accent transition-transform ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-primary/75 leading-relaxed border-t border-primary/5 pt-3">
                    {locale === "ar" ? item.aAr : item.aEn}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}