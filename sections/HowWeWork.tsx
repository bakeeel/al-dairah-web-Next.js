"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18nContext";

const NODES = [
  { x: 100, y: 90, labelAr: "مستودع أرامكو", labelEn: "Aramco Bulk Plant" },
  { x: 366, y: 90, labelAr: "التحميل والوزن", labelEn: "Loading & Sealing" },
  { x: 633, y: 90, labelAr: "النقل المراقب GPS", labelEn: "GPS Transit" },
  { x: 900, y: 90, labelAr: "التسليم والفوترة", labelEn: "Delivery & Invoice" },
];

const ROUTE_PATH =
  "M 100 90 C 260 20, 340 160, 500 90 C 660 20, 740 160, 900 90";

export default function HowWeWork() {
  const { t, locale } = useI18n();
  const [activeStep, setActiveStep] = useState(0);

  const safeStep = Math.min(Math.max(activeStep, 0), NODES.length - 1);
  const pointerNode = NODES[safeStep];
  const progressDashOffset = 1000 - ((safeStep + 1) / NODES.length) * 1000;

  return (
    <section className="py-16 sm:py-24 bg-primary text-white overflow-hidden">
      <style jsx>{`
        @keyframes pointerPulse {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-3px) scale(1.06);
          }
        }
        .pointer-float {
          transform-box: fill-box;
          transform-origin: center;
          animation: pointerPulse 2s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-highlight font-bold text-xs">
            {t.workflow.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            {t.workflow.title}
          </h2>
        </div>

        {/* خريطة مسار سلسلة الإمداد التفاعلية SVG */}
        <div className="bg-primary-dark/80 border border-white/10 rounded-3xl p-4 sm:p-8 lg:p-10 mb-8 sm:mb-12 overflow-x-auto">
          <svg
            viewBox="0 0 1000 190"
            className="w-full min-w-[540px] h-auto overflow-visible"
            role="img"
            aria-label={
              locale === "ar"
                ? "خريطة مسار سلسلة الإمداد التفاعلية"
                : "Interactive supply chain route map"
            }
          >
            {/* المسار الدائري المتموج الخلفي */}
            <path
              d={ROUTE_PATH}
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="6"
              strokeDasharray="12 10"
            />

            {/* المسار النشط المتقدم */}
            <path
              d={ROUTE_PATH}
              fill="none"
              stroke="#FF7A00"
              strokeWidth="6"
              strokeDasharray="1000"
              strokeDashoffset={progressDashOffset}
              className="transition-all duration-700 ease-out"
            />

            {/* مؤشر المركبة / الصهريج المتحرك على المسار */}
            <g
              transform={`translate(${pointerNode.x}, ${pointerNode.y - 44})`}
              className="transition-all duration-700 ease-out pointer-events-none"
            >
              <g className="pointer-float">
                <rect
                  x="-26"
                  y="-13"
                  width="52"
                  height="22"
                  rx="7"
                  fill="#FFC400"
                  stroke="#121731"
                  strokeWidth="2.5"
                />
                <circle cx="-13" cy="11" r="4.2" fill="#FFFFFF" stroke="#121731" strokeWidth="2" />
                <circle cx="13" cy="11" r="4.2" fill="#FFFFFF" stroke="#121731" strokeWidth="2" />
                <text
                  x="0"
                  y="2"
                  textAnchor="middle"
                  fill="#121731"
                  fontSize="8.5"
                  fontWeight="800"
                >
                  0{safeStep + 1}
                </text>
              </g>
            </g>

            {/* العقد الأربع على المسار */}
            {NODES.map((node, idx) => {
              const isCurrent = safeStep === idx;
              const isCompleted = safeStep >= idx;

              return (
                <g
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className="cursor-pointer group"
                >
                  {isCurrent && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="32"
                      fill="#FFC400"
                      opacity="0.18"
                    />
                  )}

                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isCurrent ? 25 : 20}
                    fill={isCompleted ? "#FF7A00" : "#1B1F4B"}
                    stroke="#FFC400"
                    strokeWidth="3"
                    className="transition-all duration-300"
                  />
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontWeight="bold"
                    fontSize="14"
                  >
                    {idx + 1}
                  </text>
                  <text
                    x={node.x}
                    y="148"
                    textAnchor="middle"
                    fill={isCurrent ? "#FFC400" : "#FFFFFF"}
                    fontSize="14"
                    fontWeight={isCurrent ? "700" : "600"}
                    className="transition-colors duration-300"
                  >
                    {locale === "ar" ? node.labelAr : node.labelEn}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* بطاقات المراحل الأربع */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {t.workflow.steps.map((step, i) => {
            const isActive = safeStep === i;
            return (
              <button
                type="button"
                key={step.num}
                onClick={() => setActiveStep(i)}
                className={`text-start p-5 sm:p-6 rounded-3xl border transition-all duration-300 active:scale-[0.99] ${
                  isActive
                    ? "bg-accent text-white border-highlight shadow-glow-orange -translate-y-1"
                    : "bg-white/5 text-white border-white/10 hover:border-accent hover:-translate-y-0.5"
                }`}
              >
                <span className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary-dark text-highlight font-english font-bold text-xs sm:text-sm mb-3.5 sm:mb-4">
                  {step.num}
                </span>
                <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-white/85 leading-relaxed">
                  {step.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}