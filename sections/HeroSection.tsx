"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18nContext";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { t, locale } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const truckRef = useRef<SVGGElement>(null);
  const dunesFarRef = useRef<SVGGElement>(null);
  const dunesNearRef = useRef<SVGGElement>(null);
  const refineryRef = useRef<SVGGElement>(null);
  const stationRef = useRef<SVGGElement>(null);
  const [videoAvailable, setVideoAvailable] = useState(true);
  const [sceneStage, setSceneStage] = useState(0); // 0: الفجر، 1: الطريق، 2: المصفاة، 3: الغروب والمحطة

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 35, clipPath: "circle(0% at 50% 50%)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "circle(150% at 50% 50%)",
          duration: 1.1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.4,
        }
      );

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;

          if (p < 0.25) setSceneStage(0);
          else if (p < 0.55) setSceneStage(1);
          else if (p < 0.8) setSceneStage(2);
          else setSceneStage(3);

          if (videoRef.current && videoRef.current.duration) {
            videoRef.current.currentTime = p * videoRef.current.duration;
          }

          if (truckRef.current) {
            const xMove = locale === "ar" ? 180 - p * 420 : -180 + p * 420;
            gsap.set(truckRef.current, { x: xMove });
          }
          if (dunesFarRef.current) {
            gsap.set(dunesFarRef.current, { x: p * 120 });
          }
          if (dunesNearRef.current) {
            gsap.set(dunesNearRef.current, { x: p * 260 });
          }
          if (refineryRef.current) {
            gsap.set(refineryRef.current, {
              opacity: p > 0.35 && p < 0.85 ? 1 : 0.15,
              x: (0.6 - p) * 300,
            });
          }
          if (stationRef.current) {
            gsap.set(stationRef.current, {
              opacity: p > 0.7 ? 1 : 0,
              x: (0.9 - p) * 280,
            });
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [locale]);

  const skyGradients = [
    "from-[#1B1F4B] via-[#3A285C] to-[#FF7A00]",
    "from-[#1B1F4B] via-[#273875] to-[#F59E0B]",
    "from-[#1E2952] via-[#33417A] to-[#FFC400]",
    "from-[#0F122E] via-[#4A1D42] to-[#FF7A00]",
  ];

  const stageLabelsAr = [
    "01 • الفجر: الانطلاق من مستودعات أرامكو",
    "02 • الطريق السريع: عبور المحاور الرئيسية",
    "03 • المنطقة الصناعية: مصافي وخزانات الإمداد",
    "04 • الغروب: الوصول الآمن لمحطة الوقود",
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative w-full min-h-[100dvh] h-screen overflow-hidden font-arabic bg-gradient-to-b ${skyGradients[sceneStage]} transition-colors duration-700`}
    >
      {/* فيديو الشاحنة السينمائي */}
      {videoAvailable && (
        <video
          ref={videoRef}
          src="/video/hero-truck.mp4"
          poster="/logo/LOGO.jpeg"
          muted
          loop
          playsInline
          autoPlay
          onError={() => setVideoAvailable(false)}
          className="absolute inset-0 w-full h-full object-cover opacity-55 mix-blend-luminosity"
        />
      )}

      {/* مشهد SVG Parallax متعدد الطبقات */}
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFC400" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FF7A00" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FF7A00" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="tankGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#E5E7EB" />
            <stop offset="100%" stopColor="#9CA3AF" />
          </linearGradient>
        </defs>

        <circle
          cx={320 + sceneStage * 180}
          cy={220 + sceneStage * 35}
          r="140"
          fill="url(#sunGlow)"
        />
        <circle
          cx={320 + sceneStage * 180}
          cy={220 + sceneStage * 35}
          r="44"
          fill="#FFC400"
        />

        <g ref={dunesFarRef} opacity="0.45">
          <path
            d="M-300 540 Q 150 380 550 530 T 1350 510 T 2000 540 L 2000 800 L -300 800 Z"
            fill="#C26D2D"
          />
        </g>

        <g ref={refineryRef} opacity="0.2" className="heat-haze">
          <rect
            x="780"
            y="420"
            width="90"
            height="120"
            rx="8"
            fill="#1B1F4B"
            stroke="#FF7A00"
            strokeWidth="2"
          />
          <rect
            x="890"
            y="440"
            width="110"
            height="100"
            rx="8"
            fill="#1B1F4B"
            stroke="#FFC400"
            strokeWidth="2"
          />
          <rect x="1030" y="340" width="18" height="200" fill="#0F122E" />
          <circle cx="1039" cy="332" r="10" fill="#FF7A00" />
        </g>

        <g ref={stationRef} opacity="0">
          <rect
            x="160"
            y="410"
            width="260"
            height="24"
            rx="6"
            fill="#1B1F4B"
            stroke="#FFC400"
            strokeWidth="3"
          />
          <rect x="190" y="434" width="14" height="115" fill="#E5E7EB" />
          <rect x="380" y="434" width="14" height="115" fill="#E5E7EB" />
          <rect x="260" y="485" width="45" height="65" rx="4" fill="#FF7A00" />
        </g>

        <g ref={dunesNearRef}>
          <path
            d="M-400 565 Q 80 460 480 565 T 1280 555 T 2100 565 L 2100 800 L -400 800 Z"
            fill="#9A4E1C"
          />
        </g>

        <rect x="0" y="555" width="1440" height="155" fill="#131629" />
        <line
          x1="0"
          y1="562"
          x2="1440"
          y2="562"
          stroke="#FF7A00"
          strokeWidth="4"
        />
        <line
          x1="0"
          y1="632"
          x2="1440"
          y2="632"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeDasharray="48 36"
        />
        <line
          x1="0"
          y1="702"
          x2="1440"
          y2="702"
          stroke="#FFC400"
          strokeWidth="4"
        />

        <g ref={truckRef} transform="translate(560, 495)">
          <ellipse
            cx="220"
            cy="128"
            rx="215"
            ry="14"
            fill="rgba(0,0,0,0.45)"
          />

          <rect
            x="110"
            y="22"
            width="310"
            height="78"
            rx="36"
            fill="url(#tankGrad)"
            stroke="#1B1F4B"
            strokeWidth="3"
          />
          <rect x="115" y="74" width="300" height="7" fill="#FF7A00" />
          <rect x="115" y="83" width="300" height="5" fill="#1B1F4B" />

          <circle
            cx="355"
            cy="52"
            r="20"
            fill="none"
            stroke="#1B1F4B"
            strokeWidth="4"
          />
          <path
            d="M 335 52 A 20 20 0 0 0 355 72"
            fill="none"
            stroke="#FF7A00"
            strokeWidth="4.5"
          />
          <text
            x="355"
            y="59"
            textAnchor="middle"
            fill="#FF7A00"
            fontWeight="800"
            fontSize="21"
          >
            D
          </text>
          <text
            x="235"
            y="58"
            textAnchor="middle"
            fill="#1B1F4B"
            fontWeight="800"
            fontSize="22"
          >
            شركة الدائرة
          </text>

          <path
            d="M 20 100 L 20 52 Q 22 25 55 25 L 102 25 L 102 100 Z"
            fill="#1B1F4B"
            stroke="#FF7A00"
            strokeWidth="2"
          />
          <path
            d="M 26 52 L 34 32 L 66 32 L 66 52 Z"
            fill="#38BDF8"
            opacity="0.75"
          />
          <circle cx="20" cy="84" r="5" fill="#FFC400" />
          <polygon
            points="15,84 -90,65 -90,105"
            fill="#FFC400"
            opacity="0.22"
          />

          {[48, 86, 330, 368, 404].map((cx, i) => (
            <g key={i}>
              <circle
                cx={cx}
                cy="108"
                r="18"
                fill="#0F122E"
                stroke="#374151"
                strokeWidth="3"
              />
              <circle cx={cx} cy="108" r="8" fill="#FF7A00" />
              <circle cx={cx} cy="108" r="3" fill="#FFFFFF" />
            </g>
          ))}
        </g>
      </svg>

      {/* طبقة تظليل لقراءة النصوص بوضوح */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/45 to-primary-dark/60" />

      {/* المحتوى النصي فوق الـ Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center pt-20 sm:pt-24 pb-20">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          <div className="hero-reveal inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-highlight text-xs sm:text-sm font-bold">
            <ShieldCheck
              className="w-4 h-4 text-accent shrink-0"
              strokeWidth={2.2}
            />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="hero-reveal text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.15]">
            {t.hero.title}
          </h1>

          <p className="hero-reveal text-sm sm:text-lg lg:text-xl font-medium text-white/90 leading-relaxed max-w-2xl">
            {t.hero.subtitle}
          </p>

          <div className="hero-reveal flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            <a
              href="#calculator"
              className="circle-glow-btn bg-accent hover:bg-accent-hover text-white font-extrabold px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base flex items-center gap-2"
            >
              <span>{t.hero.ctaPrimary}</span>
              {locale === "ar" ? (
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" strokeWidth={2.3} />
              ) : (
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" strokeWidth={2.3} />
              )}
            </a>

            <a
              href="#services"
              className="rounded-full border-2 border-white/75 hover:border-highlight hover:bg-white/10 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base transition"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* شريط مراحل الرحلة التفاعلي + مؤشر التمرير الدائري */}
        <div className="absolute bottom-6 sm:bottom-8 inset-x-4 sm:inset-x-6 max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-3 bg-primary/85 backdrop-blur-md border border-white/15 px-5 py-2.5 rounded-full text-xs font-bold text-white/95">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping shrink-0" />
            <span>{stageLabelsAr[sceneStage]}</span>
          </div>

          <a
            href="#stats"
            className="flex items-center gap-3 text-white/85 hover:text-highlight transition mx-auto sm:mx-0"
          >
            <span className="text-xs font-bold">{t.hero.scroll}</span>
            <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-accent flex items-center justify-center animate-bounce">
              <span className="w-2.5 h-2.5 rounded-full bg-highlight" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}