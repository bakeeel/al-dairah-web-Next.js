import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Poppins } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18nContext";
import { siteConfig } from "@/lib/siteConfig";

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-arabic",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "شركة الدائرة | AL_DAIRAH — نقل الديزل والبنزين من أرامكو في المملكة",
  description:
    "ناقل وقود رسمي مسجل لدى أرامكو السعودية ومرخص من الهيئة العامة للنقل. توريد الديزل والبنزين لمحطات الوقود والمصانع والمشاريع في جميع مناطق المملكة.",
  keywords: [
    "شركة الدائرة",
    "AL_DAIRAH",
    "نقل وقود",
    "نقل ديزل",
    "نقل بنزين",
    "ناقل أرامكو",
    "صهاريج وقود السعودية",
  ],
  openGraph: {
    title: "شركة الدائرة | AL_DAIRAH — نوصّل الطاقة بأمان وفي الموعد",
    description: "خدمات نقل الديزل والبنزين من مستودعات أرامكو إلى كافة مناطق المملكة.",
    type: "website",
    locale: "ar_SA",
    images: ["/logo/LOGO.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.company.nameAr,
    alternateName: siteConfig.company.nameEn,
    telephone: siteConfig.company.phone,
    email: siteConfig.company.email,
    taxID: siteConfig.company.crNumber,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jeddah",
      addressCountry: "SA",
    },
    areaServed: "Saudi Arabia",
  };

  return (
    <html lang="ar" dir="rtl" className={`${ibmArabic.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-arabic antialiased selection:bg-accent selection:text-white overflow-x-hidden">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}