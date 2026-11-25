"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18nContext";
import { siteConfig } from "@/lib/siteConfig";
import { Phone, MapPin, Send, MessageCircle, PhoneCall } from "lucide-react";

const DIRECT_PHONE = "+966 55 850 0251";
const DIRECT_WHATSAPP = "966558500251";

export function ContactSection() {
  const { t, locale } = useI18n();
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    service: "نقل الديزل",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const buildWhatsappUrl = () => {
    const whatsappText =
      locale === "ar"
        ? `طلب عرض سعر - شركة الدائرة:\nالاسم: ${form.name || "-"}\nالشركة: ${
            form.company || "-"
          }\nالجوال: ${form.phone || "-"}\nالخدمة: ${form.service}\nالتفاصيل: ${
            form.message || "-"
          }`
        : `Quote Request - AL_DAIRAH:\nName: ${form.name || "-"}\nCompany: ${
            form.company || "-"
          }\nPhone: ${form.phone || "-"}\nService: ${form.service}\nDetails: ${
            form.message || "-"
          }`;

    return `https://wa.me/${DIRECT_WHATSAPP}?text=${encodeURIComponent(
      whatsappText
    )}`;
  };

  const validateForm = () => {
    const cleanedPhone = form.phone.replace(/\s+/g, "").trim();
    if (!form.name.trim() || !/^05\d{8}$/.test(cleanedPhone)) {
      setStatus("error");
      return false;
    }
    setStatus("sent");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    window.open(buildWhatsappUrl(), "_blank", "noopener,noreferrer");
  };

  const handleWhatsappClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validateForm()) {
      e.preventDefault();
    }
  };

  const phoneHref = `tel:${DIRECT_PHONE.replace(/[^\d+]/g, "")}`;
  const hqLabel =
    locale === "ar"
      ? siteConfig?.company?.hqCityAr || "مكة المكرمة"
      : siteConfig?.company?.hqCityEn || "Makkah";

  return (
    <section id="contact" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* نموذج التواصل */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-primary/10 shadow-sm">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-bold text-xs mb-3">
            {t.contact.tag}
          </span>
          <h2 className="text-3xl font-bold text-primary mb-6">
            {t.contact.title}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder={t.contact.name}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-full bg-surface border border-primary/15 px-5 py-3.5 text-sm text-primary focus:outline-none focus:border-accent"
              />
              <input
                type="text"
                placeholder={t.contact.company}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full rounded-full bg-surface border border-primary/15 px-5 py-3.5 text-sm text-primary focus:outline-none focus:border-accent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="tel"
                required
                dir="ltr"
                placeholder={t.contact.phone}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-full bg-surface border border-primary/15 px-5 py-3.5 text-sm text-primary text-start focus:outline-none focus:border-accent"
              />
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full rounded-full bg-surface border border-primary/15 px-5 py-3.5 text-sm text-primary focus:outline-none focus:border-accent"
              >
                {t.services.items.map((srv, i) => (
                  <option key={i} value={srv.title}>
                    {srv.title}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              rows={3}
              placeholder={t.contact.message}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-3xl bg-surface border border-primary/15 px-5 py-3.5 text-sm text-primary focus:outline-none focus:border-accent"
            />

            {status === "error" && (
              <p className="text-xs text-red-600 font-medium">
                {locale === "ar"
                  ? "يرجى إدخال الاسم ورقم جوال سعودي صحيح يبدأ بـ 05 (10 أرقام)."
                  : "Please enter your name and a valid 10-digit mobile starting with 05."}
              </p>
            )}

            {status === "sent" && (
              <p className="text-xs text-emerald-700 font-bold">
                {locale === "ar"
                  ? "تم تجهيز طلبك وإرساله إلى واتساب بنجاح."
                  : "Your request has been prepared for WhatsApp."}
              </p>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="circle-glow-btn bg-accent hover:bg-accent-hover text-white font-bold px-7 py-3.5 text-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t.contact.send}</span>
              </button>

              <a
                href={buildWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsappClick}
                className="rounded-full bg-[#25D366] text-white font-bold px-6 py-3.5 text-sm flex items-center gap-2 hover:opacity-90 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.contact.whatsappDirect}</span>
              </a>

              <a
                href={phoneHref}
                className="rounded-full bg-primary text-white font-bold px-6 py-3.5 text-sm flex items-center gap-2 hover:bg-primary/90 transition"
              >
                <PhoneCall className="w-4 h-4 text-highlight" />
                <span>{locale === "ar" ? "اتصال جوال" : "Call Mobile"}</span>
              </a>
            </div>
          </form>
        </div>

        {/* معلومات الاتصال المباشر وخريطة الموقع */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="bg-primary text-white rounded-3xl p-7 space-y-4">
            <h3 className="text-xl font-bold text-highlight">
              {locale === "ar"
                ? "قنوات التواصل المباشر"
                : "Direct Contact Channels"}
            </h3>

            <a
              href={phoneHref}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition"
            >
              <span className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </span>
              <div>
                <p className="text-xs text-white/60">{t.contact.callDirect}</p>
                <p className="font-english font-bold text-sm" dir="ltr">
                  {DIRECT_PHONE}
                </p>
              </div>
            </a>

            <a
              href={buildWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition"
            >
              <span className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </span>
              <div>
                <p className="text-xs text-white/60">
                  {locale === "ar" ? "واتساب مباشر" : "Direct WhatsApp"}
                </p>
                <p className="font-english font-bold text-sm" dir="ltr">
                  {DIRECT_PHONE}
                </p>
              </div>
            </a>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5">
              <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-accent" />
              </span>
              <div>
                <p className="text-xs text-white/60">
                  {locale === "ar" ? "المقر الرئيسي" : "Headquarters"}
                </p>
                <p className="font-bold text-sm">{hqLabel}</p>
              </div>
            </div>
          </div>

          {siteConfig?.company?.mapEmbedUrl && (
            <div className="rounded-3xl overflow-hidden border border-primary/10 h-56 shadow-sm">
              <iframe
                src={siteConfig.company.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={
                  locale === "ar"
                    ? `موقع شركة الدائرة - ${hqLabel}`
                    : `AL_DAIRAH Location - ${hqLabel}`
                }
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}