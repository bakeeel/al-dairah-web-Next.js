"use client";

import React, { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { useI18n } from "@/lib/i18nContext";
import { CheckCircle2, MessageCircle, PhoneCall } from "lucide-react";

const DIRECT_PHONE = "+966 55 850 0251";
const DIRECT_WHATSAPP = "966558500251";
const TANKER_CAPACITY = 32000;
const PRESET_QUANTITIES = [20000, 32000, 33000, 36000];

function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export default function QuoteCalculator() {
  const { t, locale } = useI18n();

  const fuelOptions = useMemo(
    () => [
      { id: "diesel", label: t.calculator.diesel },
      { id: "gas91", label: t.calculator.gas91 },
      { id: "gas95", label: t.calculator.gas95 },
      { id: "gas98", label: t.calculator.gas98 },
    ],
    [t.calculator]
  );

  const cityOptions = useMemo(() => {
    if (!Array.isArray(siteConfig?.cities) || siteConfig.cities.length === 0) {
      return [
        {
          id: "makkah",
          label: locale === "ar" ? "مكة المكرمة" : "Makkah",
        },
      ];
    }
    return siteConfig.cities.map((c) => ({
      id: String(c.id),
      label: locale === "ar" ? c.nameAr : c.nameEn,
    }));
  }, [locale]);

  const [fuel, setFuel] = useState("diesel");
  const [liters, setLiters] = useState<number>(32000);
  const [selectedCityId, setSelectedCityId] = useState<string>(() => {
    const makkah = siteConfig?.cities?.find((c) => c.id === "makkah");
    return makkah ? String(makkah.id) : cityOptions[0]?.id || "makkah";
  });
  const [whatsappOpened, setWhatsappOpened] = useState(false);

  useEffect(() => {
    if (!cityOptions.some((c) => c.id === selectedCityId) && cityOptions[0]) {
      setSelectedCityId(cityOptions[0].id);
    }
  }, [cityOptions, selectedCityId]);

  const selectedCityLabel =
    cityOptions.find((c) => c.id === selectedCityId)?.label ||
    cityOptions[0]?.label ||
    "";

  const selectedFuelLabel =
    fuelOptions.find((f) => f.id === fuel)?.label || fuel;

  const recommendedTankers = Math.max(
    1,
    Math.ceil(liters / TANKER_CAPACITY)
  );

  const selectedIndex = PRESET_QUANTITIES.indexOf(liters);
  const progressPercent =
    selectedIndex >= 0
      ? ((selectedIndex + 1) / PRESET_QUANTITIES.length) * 100
      : 50;

  const whatsappText =
    locale === "ar"
      ? `السلام عليكم، أرغب بطلب عرض سعر من شركة الدائرة:\n• نوع الوقود: ${selectedFuelLabel}\n• الكمية: ${formatNumber(
          liters
        )} لتر\n• المدينة: ${selectedCityLabel}\n• عدد الصهاريج التقديري: ${recommendedTankers}`
      : `Hello, I would like to request a quote from AL_DAIRAH:\n• Fuel Type: ${selectedFuelLabel}\n• Quantity: ${formatNumber(
          liters
        )} L\n• City: ${selectedCityLabel}\n• Estimated Tankers: ${recommendedTankers}`;

  const whatsappHref = `https://wa.me/${DIRECT_WHATSAPP}?text=${encodeURIComponent(
    whatsappText
  )}`;

  const phoneHref = `tel:${DIRECT_PHONE.replace(/[^\d+]/g, "")}`;

  return (
    <section id="calculator" className="py-24 bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-bold text-xs">
            {t.calculator.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary">
            {t.calculator.title}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-glow-navy border border-primary/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* اختيار نوع الوقود */}
            <div>
              <label className="block text-sm font-bold text-primary mb-2.5">
                {t.calculator.fuelType}
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {fuelOptions.map((item) => {
                  const active = fuel === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setFuel(item.id)}
                      className={`py-3 px-4 rounded-full text-xs sm:text-sm font-bold border transition ${
                        active
                          ? "bg-primary text-highlight border-primary shadow-sm"
                          : "bg-surface text-primary border-primary/15 hover:border-accent"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* الكمية المطلوبة: 20,000 / 32,000 / 33,000 / 36,000 فقط */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-bold text-primary">
                <span>{t.calculator.quantity}</span>
                <span className="font-english text-accent">
                  {formatNumber(liters)} L
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" dir="ltr">
                {PRESET_QUANTITIES.map((preset) => {
                  const isSelected = liters === preset;
                  return (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setLiters(preset)}
                      className={`py-2.5 px-3 rounded-full text-xs sm:text-sm font-english font-bold border transition ${
                        isSelected
                          ? "bg-accent text-white border-accent shadow-sm"
                          : "bg-surface text-primary border-primary/15 hover:border-accent"
                      }`}
                    >
                      {formatNumber(preset)} L
                    </button>
                  );
                })}
              </div>

              {/* شريط التقدم الخاص بالسعات الأربع */}
              <div className="space-y-1.5 pt-1" dir="ltr">
                <div className="w-full h-2.5 rounded-full bg-primary/10 overflow-hidden">
                  <div
                    style={{ width: `${progressPercent}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-accent to-highlight transition-all duration-300"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-primary/55 font-english">
                  <span>20,000 L</span>
                  <span>36,000 L</span>
                </div>
              </div>
            </div>

            {/* اختيار المدينة */}
            <div>
              <label
                htmlFor="calculator-city-select"
                className="block text-sm font-bold text-primary mb-2"
              >
                {t.calculator.city}
              </label>
              <select
                id="calculator-city-select"
                value={selectedCityId}
                onChange={(e) => setSelectedCityId(e.target.value)}
                className="w-full rounded-full bg-surface border border-primary/15 px-5 py-3 text-sm font-medium text-primary focus:outline-none focus:border-accent"
              >
                {cityOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* أزرار واتساب والاتصال المباشر فقط */}
            <div className="pt-2 space-y-2.5">
              <p className="text-xs font-bold text-primary/80">
                {locale === "ar"
                  ? "أرسل الطلب مباشرة عبر واتساب أو اتصال:"
                  : "Send your request directly via WhatsApp or call:"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setWhatsappOpened(true)}
                  className="py-3.5 px-5 rounded-full bg-[#25D366] hover:brightness-105 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>
                    {locale === "ar" ? "إرسال عبر واتساب" : "Send via WhatsApp"}
                  </span>
                </a>

                <a
                  href={phoneHref}
                  aria-label={
                    locale === "ar"
                      ? `اتصال مباشر على ${DIRECT_PHONE}`
                      : `Call ${DIRECT_PHONE}`
                  }
                  className="py-3.5 px-5 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <PhoneCall className="w-4 h-4 text-highlight shrink-0" />
                  <span dir="ltr" className="font-english">
                    {DIRECT_PHONE}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* بطاقة الملخص المبدئي */}
          <div className="lg:col-span-5 bg-primary text-white rounded-3xl p-7 space-y-5">
            <h3 className="text-lg font-bold text-highlight border-b border-white/10 pb-3">
              {t.calculator.summaryTitle}
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-white/70">{t.calculator.fuelType}:</span>
                <span className="font-bold text-end">{selectedFuelLabel}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-white/70">{t.calculator.quantity}:</span>
                <span className="font-english font-bold text-highlight">
                  {formatNumber(liters)} L
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-white/70">{t.calculator.city}:</span>
                <span className="font-bold text-end">{selectedCityLabel}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-white/70">
                  {t.calculator.estimatedTrucks}:
                </span>
                <span className="font-english font-bold text-accent text-base">
                  {recommendedTankers}
                </span>
              </div>
            </div>

            {whatsappOpened && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-xs flex items-center gap-2 text-emerald-200">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  {locale === "ar"
                    ? "تم فتح واتساب مع تفاصيل الطلب المبدئي."
                    : "WhatsApp opened with your preliminary order details."}
                </span>
              </div>
            )}

            <p className="text-[11px] text-white/60 leading-relaxed">
              {t.calculator.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}