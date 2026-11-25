"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18nContext";
import { siteConfig } from "@/lib/siteConfig";
import { FileText, PhoneCall, Mail, QrCode, ShieldCheck } from "lucide-react";

const CR_NUMBER = "7026134838";
const DIRECT_PHONE = "+966 55 850 0251";
const DIRECT_EMAIL = "aldaa35028@gmail.com";
const QR_IMAGE_SRC = "/images/cr-qr-7026134838.png";

export function Footer() {
  const { t, locale } = useI18n();
  const [qrFallback, setQrFallback] = useState(false);

  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
        {/* الشعار والنبذة وزر طلب عرض سعر */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-block bg-white px-4 py-2 rounded-full">
            <img
              src="/logo/LOGO-removebg-preview.png"
              alt="AL_DAIRAH"
              className="h-10 w-auto"
            />
          </div>
          <p className="text-white/75 text-sm leading-relaxed max-w-md">
            {t.hero.subtitle}
          </p>

          {/* أيقونة / زر طلب عرض سعر */}
          <div className="pt-1 flex flex-wrap items-center gap-3">
            <a
              href="#calculator"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-accent hover:bg-accent-hover text-white font-bold text-xs sm:text-sm shadow-lg transition"
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>
                {locale === "ar" ? "طلب عرض سعر" : "Request a Quote"}
              </span>
            </a>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2 text-xs text-highlight">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              {locale === "ar"
                ? `السجل التجاري: ${CR_NUMBER}`
                : `CR: ${CR_NUMBER}`}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              {locale === "ar"
                ? "ناقل مسجل لدى أرامكو السعودية"
                : "Saudi Aramco Registered"}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              {locale === "ar" ? "مرخص من هيئة النقل TGA" : "TGA Licensed"}
            </span>
          </div>
        </div>

        {/* روابط سريعة */}
        <div className="lg:col-span-2">
          <h4 className="font-bold text-highlight mb-4">
            {locale === "ar" ? "روابط سريعة" : "Quick Links"}
          </h4>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li>
              <a href="#about" className="hover:text-accent transition">
                {t.nav.about}
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-accent transition">
                {t.nav.services}
              </a>
            </li>
            <li>
              <a href="#fleet" className="hover:text-accent transition">
                {t.nav.fleet}
              </a>
            </li>
            <li>
              <a href="#safety" className="hover:text-accent transition">
                {t.nav.safety}
              </a>
            </li>
            <li>
              <a href="#coverage" className="hover:text-accent transition">
                {t.nav.coverage}
              </a>
            </li>
          </ul>
        </div>

        {/* بيانات التواصل */}
        <div className="lg:col-span-3">
          <h4 className="font-bold text-highlight mb-4">{t.nav.contact}</h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li>
              {locale === "ar"
                ? siteConfig?.company?.hqCityAr || "مكة المكرمة"
                : siteConfig?.company?.hqCityEn || "Makkah"}
            </li>
            <li>
              <a
                href={`tel:${DIRECT_PHONE.replace(/[^\d+]/g, "")}`}
                dir="ltr"
                className="inline-flex items-center gap-2 hover:text-accent transition"
              >
                <PhoneCall className="w-4 h-4 text-highlight shrink-0" />
                <span>{DIRECT_PHONE}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${DIRECT_EMAIL}`}
                className="inline-flex items-center gap-2 hover:text-accent transition break-all"
              >
                <Mail className="w-4 h-4 text-highlight shrink-0" />
                <span>{DIRECT_EMAIL}</span>
              </a>
            </li>
          </ul>
        </div>

        {/* كود QR للسجل التجاري للفحص */}
        <div className="lg:col-span-2 flex flex-col items-start lg:items-end">
          <div className="bg-white text-[#0b132b] rounded-2xl p-3 shadow-lg w-full max-w-[170px] space-y-2">
            <div className="flex items-center justify-between gap-1 text-[10px] font-bold text-[#0b132b]/80">
              <span className="truncate">
                {locale === "ar" ? "فحص السجل التجاري" : "CR Verification"}
              </span>
              <QrCode className="w-3.5 h-3.5 text-accent shrink-0" />
            </div>

            {!qrFallback ? (
              <img
                src={QR_IMAGE_SRC}
                alt={`Commercial Register QR ${CR_NUMBER}`}
                onError={() => setQrFallback(true)}
                className="w-full h-auto rounded-lg object-contain border border-slate-200"
              />
            ) : (
              <div className="aspect-square w-full rounded-lg border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center p-2 text-center gap-1">
                <ShieldCheck className="w-6 h-6 text-accent" />
                <span className="text-[10px] font-bold leading-tight">
                  {locale === "ar"
                    ? "امسح رمز السجل الرسمي"
                    : "Scan Official CR QR"}
                </span>
              </div>
            )}

            <div className="text-center font-english font-extrabold text-xs tracking-wider text-[#0b132b] pt-0.5 border-t border-slate-200">
              {CR_NUMBER}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
        <p>
          © {new Date().getFullYear()}{" "}
          {siteConfig?.company?.nameAr || "شركة الدائرة للنقليات"} (AL_DAIRAH).{" "}
          {locale === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
        </p>
        <p>
          {locale === "ar"
            ? "السلامة أولاً • دقة في المواعيد"
            : "Safety First • On-Time Delivery"}
        </p>
      </div>
    </footer>
  );
}