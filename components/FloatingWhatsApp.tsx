"use client";

import React, { useEffect, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { useI18n } from "@/lib/i18nContext";
import { MessageCircle, ArrowUp } from "lucide-react";

export function FloatingWhatsApp() {
  const { locale } = useI18n();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const rawWhatsapp = siteConfig?.company?.whatsapp || "";
  const cleanWhatsapp = String(rawWhatsapp).replace(/[^\d]/g, "");
  const defaultMessage =
    locale === "ar"
      ? "السلام عليكم، أرغب في الاستفسار وطلب عرض سعر لنقل الوقود من شركة الدائرة."
      : "Hello, I would like to inquire and request a fuel transport quote from AL_DAIRAH.";

  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 rtl:right-auto rtl:right-6 z-50 flex flex-col items-center gap-3">
      {/* زر العودة للأعلى */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={locale === "ar" ? "العودة للأعلى" : "Scroll to top"}
        title={locale === "ar" ? "العودة للأعلى" : "Scroll to top"}
        className={`w-11 h-11 rounded-full bg-[#121731]/95 hover:bg-[#1B1F4B] text-[#FFC400] border border-white/15 shadow-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1 ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* زر واتساب العائم */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={locale === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
        title={locale === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
        className="group relative w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-200"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
        <MessageCircle className="w-7 h-7 relative z-10" />
      </a>
    </div>
  );
}