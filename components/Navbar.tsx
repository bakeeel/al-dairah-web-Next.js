"use client";

import React, { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18nContext";
import { Globe, Menu, X } from "lucide-react";
import NewsTicker from "@/components/NewsTicker";

export default function Navbar() {
  const { t, locale, toggleLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("resize", handleResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  const links = [
    { href: "#hero", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#fleet", label: t.nav.fleet },
    { href: "#safety", label: t.nav.safety },
    { href: "#coverage", label: t.nav.coverage },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 font-arabic transition-all duration-300 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-md shadow-glow-navy"
          : "bg-primary/80 sm:bg-primary/65 backdrop-blur-md"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled ? "py-2.5 sm:py-3" : "py-3.5 sm:py-4"
        }`}
      >
        {/* الشعار داخل كبسولة بيضاء ناعمة لضمان وضوحه على الخلفية الكحلية */}
        <a
          href="#hero"
          onClick={() => setMobileOpen(false)}
          className="shrink-0 flex items-center gap-3 bg-white/95 px-3.5 sm:px-4 py-1.5 rounded-full shadow-md hover:bg-white transition"
        >
          <img
            src="/logo/LOGO-removebg-preview.png"
            alt="شركة الدائرة AL_DAIRAH"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </a>

        {/* القائمة الرئيسية للكمبيوتر */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 xl:gap-8"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] xl:text-base font-bold tracking-normal text-white/95 hover:text-highlight transition-colors relative group whitespace-nowrap py-1"
            >
              {link.label}
              <span className="absolute bottom-0 start-0 w-0 h-0.5 bg-accent rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* أزرار الإجراءات للكمبيوتر */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/25 text-white text-xs sm:text-sm font-bold font-arabic hover:border-accent hover:text-highlight transition whitespace-nowrap"
          >
            <Globe className="w-4 h-4 text-accent shrink-0" />
            <span>{locale === "ar" ? "EN" : "عربي"}</span>
          </button>

          <a
            href="#calculator"
            className="circle-glow-btn bg-accent hover:bg-accent-hover text-white text-sm sm:text-[15px] font-bold px-5 xl:px-6 py-2.5 whitespace-nowrap transition"
          >
            {t.nav.requestQuote}
          </a>
        </div>

        {/* زر قائمة الجوال */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 text-white flex items-center justify-center border border-white/15 transition"
          aria-label={locale === "ar" ? "القائمة" : "Menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="w-5 h-5 text-highlight" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* شريط الأخبار أسفل شريط التنقل مباشرة */}
      {!mobileOpen && <NewsTicker />}

      {/* قائمة الجوال المنسدلة */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary/98 backdrop-blur-lg border-t border-white/10 px-4 sm:px-6 py-5 shadow-2xl max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col divide-y divide-white/10"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-base sm:text-[17px] font-bold text-white/95 hover:text-highlight transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 mt-2 border-t border-white/15 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                toggleLocale();
                setMobileOpen(false);
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/25 text-white text-xs sm:text-sm font-bold font-arabic hover:border-accent hover:text-highlight transition"
            >
              <Globe className="w-4 h-4 text-accent" />
              <span>{locale === "ar" ? "English" : "العربية"}</span>
            </button>

            <a
              href="#calculator"
              onClick={() => setMobileOpen(false)}
              className="bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-full text-sm font-bold text-center transition"
            >
              {t.nav.requestQuote}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}