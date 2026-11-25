"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import ar from "@/locales/ar.json";
import en from "@/locales/en.json";

type Locale = "ar" | "en";
type Dictionary = typeof ar;

interface I18nContextProps {
  locale: Locale;
  dir: "rtl" | "ltr";
  t: Dictionary;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextProps | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ar");

  const dir = locale === "ar" ? "rtl" : "ltr";
  const t = locale === "ar" ? ar : en;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const toggleLocale = () => {
    setLocale((prev) => (prev === "ar" ? "en" : "ar"));
  };

  return (
    <I18nContext.Provider value={{ locale, dir, t, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}