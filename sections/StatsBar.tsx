"use client";

import React, { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { useI18n } from "@/lib/i18nContext";

const RADIUS = 52;
const CIRC = 2 * Math.PI * RADIUS;
const DURATION = 1800; // مدة العدّ بالمللي ثانية

/** هل يفضّل المستخدم تقليل الحركة؟ */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** عدّاد تصاعدي بسلاسة (easeOutCubic) */
function useCountUp(target: number, start: boolean, reduced: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, reduced]);

  return value;
}

interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  labelKey: string;
  /** نسبة تعبئة الدائرة 0-100 (اختياري) */
  percent?: number;
}

function StatCircle({
  item,
  idx,
  label,
  visible,
  reduced,
  isRtl,
  locale,
}: {
  item: StatItem;
  idx: number;
  label: string;
  visible: boolean;
  reduced: boolean;
  isRtl: boolean;
  locale: string;
}) {
  const count = useCountUp(item.value, visible, reduced);

  // نسبة التعبئة: من الإعدادات إن وُجدت، وإلا 100 لنسبة التسليم، وإلا قيمة تجميلية ثابتة
  const fillPercent = item.percent ?? (item.id === "onTime" ? item.value : 78 + idx * 4);
  const offset = visible ? CIRC - (Math.min(fillPercent, 100) / 100) * CIRC : CIRC;

  const color = idx % 2 === 0 ? "#FF7A00" : "#FFC400";
  const formatted = count.toLocaleString(locale === "ar" ? "ar-SA" : "en-US");

  return (
    <div className="flex flex-col items-center text-center group">
      <div
        className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center"
        role="img"
        aria-label={`${label}: ${item.value.toLocaleString()}${item.suffix ?? ""}`}
      >
        <svg
          className={`w-full h-full -rotate-90 ${isRtl ? "scale-x-[-1]" : ""}`}
          viewBox="0 0 120 120"
          aria-hidden="true"
        >
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="7"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            stroke={color}
            strokeWidth="7"
            strokeDasharray={CIRC}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="none"
            style={{
              transition: reduced ? "none" : `stroke-dashoffset ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span
            dir="ltr"
            className="font-english text-xl sm:text-2xl font-bold text-white group-hover:text-highlight transition-colors"
          >
            {formatted}
            {item.suffix && <span className="text-accent text-base ms-0.5">{item.suffix}</span>}
          </span>
        </div>
      </div>

      <p className="mt-3 text-sm font-medium text-white/85">{label}</p>
    </div>
  );
}

export default function StatsBar() {
  const { t, locale } = useI18n();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const isRtl = locale === "ar";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // نكتفي بأول ظهور
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /** جلب النص من الترجمة بأمان (مثال المفتاح: "stats.trucks") */
  const getLabel = (key: string): string => {
    const sub = key.split(".")[1] as keyof typeof t.stats;
    return (t.stats?.[sub] as string) ?? "";
  };

  return (
    <section
      id="stats"
      ref={ref}
      aria-label={locale === "ar" ? "أرقامنا" : "Our numbers"}
      className="py-16 bg-primary text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
        {(siteConfig.stats as StatItem[]).map((item, idx) => (
          <StatCircle
            key={item.id}
            item={item}
            idx={idx}
            label={getLabel(item.labelKey)}
            visible={visible}
            reduced={reduced}
            isRtl={isRtl}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}