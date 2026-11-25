"use client";

import React, { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18nContext";
import { Globe, Menu, X } from "lucide-react";

export default function Navbar() {
  const { t, locale, toggleLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-md py-3 shadow-glow-navy"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* الشعار داخل كبسولة بيضاء ناعمة لضمان وضوحه على الخلفية الكحلية */}
        <a href="#hero" className="flex items-center gap-3 bg-white/95 px-4 py-1.5 rounded-full shadow-md">
          <img
            src="/logo/LOGO-removebg-preview.png"
            alt="شركة الدائرة AL_DAIRAH"
            className="h-9 w-auto object-contain"
          />
        </a>

        {/* القائمة الرئيسية */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/90 hover:text-highlight transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-accent rounded-full transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* أزرار الإجراءات */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/25 text-white text-xs font-english hover:border-accent hover:text-highlight transition"
          >
            <Globe className="w-3.5 h-3.5 text-accent" />
            <span>{locale === "ar" ? "EN" : "عربي"}</span>
          </button>

          <a
            href="#calculator"
            className="circle-glow-btn bg-accent hover:bg-accent-hover text-white text-sm font-semibold px-6 py-2.5"
          >
            {t.nav.requestQuote}
          </a>
        </div>

        {/* زر قائمة الموبايل */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center"
          aria-label="القائمة"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* قائمة الموبايل المنسدلة */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary border-t border-white/10 px-6 py-5 space-y-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-white/90 hover:text-highlight font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={toggleLocale}
              className="px-4 py-2 rounded-full border border-white/25 text-white text-xs"
            >
              {locale === "ar" ? "English" : "العربية"}
            </button>
            <a
              href="#calculator"
              onClick={() => setMobileOpen(false)}
              className="bg-accent text-white px-5 py-2 rounded-full text-sm font-semibold"
            >
              {t.nav.requestQuote}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}