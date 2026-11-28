"use client";

import React, { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18nContext";
import {
  Fuel,
  Flame,
  Building2,
  Factory,
  FileCheck2,
  Siren,
  ArrowUpLeft,
  ArrowUpRight,
} from "lucide-react";

export default function ServicesSection() {
  const { t, locale } = useI18n();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const icons = [Fuel, Flame, Building2, Factory, FileCheck2, Siren];

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

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-white font-arabic overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* رأس القسم */}
        <div
          className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2.5 sm:space-y-3 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-extrabold text-xs sm:text-[13px]">
            {t.services.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary leading-tight">
            {t.services.title}
          </h2>
        </div>

        {/* شبكة الخدمات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {t.services.items.map((service, index) => {
            const Icon = icons[index % icons.length];
            const cardNumber = String(index + 1).padStart(2, "0");

            return (
              <div
                key={index}
                style={{ transitionDelay: `${120 + index * 90}ms` }}
                className={`group relative bg-surface hover:bg-primary rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-primary/10 hover:border-primary shadow-sm hover:shadow-glow-navy transition-all duration-500 hover:-translate-y-2 active:scale-[0.99] flex flex-col justify-between ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div>
                  {/* دائرة الأيقونة */}
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-primary group-hover:bg-accent text-highlight group-hover:text-white ring-4 ring-primary/5 group-hover:ring-accent/25 flex items-center justify-center mb-5 sm:mb-6 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-sm">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" strokeWidth={2.15} />
                  </div>

                  {/* عنوان الخدمة */}
                  <h3 className="text-lg sm:text-xl font-extrabold text-primary group-hover:text-white mb-2.5 sm:mb-3 transition-colors leading-snug">
                    {service.title}
                  </h3>

                  {/* وصف الخدمة */}
                  <p className="text-xs sm:text-sm font-medium text-primary/75 group-hover:text-white/85 leading-relaxed transition-colors">
                    {service.desc}
                  </p>
                </div>

                {/* تذييل البطاقة */}
                <div className="mt-5 sm:mt-6 pt-4 border-t border-primary/10 group-hover:border-white/15 flex items-center justify-between text-xs sm:text-[13px] font-extrabold text-accent group-hover:text-highlight transition-colors">
                  <span className="px-2.5 py-0.5 rounded-full bg-accent/10 group-hover:bg-white/10 transition-colors">
                    {cardNumber}
                  </span>

                  <a
                    href="#calculator"
                    className="inline-flex items-center gap-1 py-1 hover:underline underline-offset-4 transition-transform group-hover:translate-x-[-2px] rtl:group-hover:translate-x-[-2px] ltr:group-hover:translate-x-[2px]"
                  >
                    <span>{t.nav.requestQuote}</span>
                    {locale === "ar" ? (
                      <ArrowUpLeft className="w-4 h-4 shrink-0" strokeWidth={2.3} />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={2.3} />
                    )}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}