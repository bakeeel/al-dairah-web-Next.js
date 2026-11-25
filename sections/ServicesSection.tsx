"use client";

import React from "react";
import { useI18n } from "@/lib/i18nContext";
import { Fuel, Flame, Building2, Factory, FileCheck2, Siren } from "lucide-react";

export default function ServicesSection() {
  const { t } = useI18n();
  const icons = [Fuel, Flame, Building2, Factory, FileCheck2, Siren];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-bold text-xs">
            {t.services.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary">
            {t.services.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {t.services.items.map((service, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={index}
                className="group relative bg-surface hover:bg-primary rounded-3xl p-8 border border-primary/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow-navy"
              >
                {/* دائرة الأيقونة */}
                <div className="w-16 h-16 rounded-full bg-primary group-hover:bg-accent text-highlight group-hover:text-white flex items-center justify-center mb-6 transition-colors">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-primary group-hover:text-white mb-3 transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-primary/70 group-hover:text-white/80 leading-relaxed transition-colors">
                  {service.desc}
                </p>

                <div className="mt-6 pt-4 border-t border-primary/10 group-hover:border-white/10 flex items-center justify-between text-xs font-bold text-accent group-hover:text-highlight">
                  <span>0{index + 1}</span>
                  <a href="#calculator">{t.nav.requestQuote} ←</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}