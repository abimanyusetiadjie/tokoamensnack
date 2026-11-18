import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { LanguageProvider } from "@/lib/i18n";
import { STORE_INFO } from "@/payload/seed-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tokoamensnack.vercel.app"),
  title: {
    default:
      "Toko Amen Snack Sungailiat - Pusat Oleh-Oleh & Camilan Khas Bangka",
    template: "%s | Toko Amen Snack Sungailiat",
  },
  description:
    "Pusat oleh-oleh dan camilan khas Bangka berdiri sejak 1 Juni 2007 di Jl. Muhidin No.106 Sungailiat. Sedia Kemplang Panggang, Kemplang Pasir Cap AMEN, Getas Ikan, Kericu, Kecap Asin, dan Indomie Kaldu Udang Bangka. Pesan via WhatsApp atau Shopee.",
  openGraph: {
    title:
      "Toko Amen Snack Sungailiat - Pusat Oleh-Oleh & Camilan Khas Bangka",
    description:
      "Nikmati Kemplang Panggang, Kemplang Pasir Cap AMEN, Getas Ikan, hingga produk eksklusif khas Pulau Bangka. Melayani pembelian di toko & pengiriman ke seluruh Indonesia.",
    type: "website",
    locale: "id_ID",
    siteName: "Toko Amen Snack",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Toko Amen Snack Sungailiat - Pusat Oleh-Oleh & Camilan Khas Bangka",
    description:
      "Pusat oleh-oleh khas Bangka terlengkap di Sungailiat. Tersedia Cap AMEN, kemplang panggang, getas, dan camilan khas Bangka.",
  },
};

const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: STORE_INFO.name,
  alternateName: STORE_INFO.officialName,
  foundingDate: STORE_INFO.foundedIsoDate,
  description: STORE_INFO.footerDescription,
  telephone: "+6281368722622",
  priceRange: "Rp5.000 - Rp50.000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Muhidin No.106, Sungailiat",
    addressLocality: "Sungai Liat",
    addressRegion: "Kepulauan Bangka Belitung",
    postalCode: "33211",
    addressCountry: "ID",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "07:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "10:00",
      closes: "15:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: STORE_INFO.rating,
    reviewCount: STORE_INFO.reviewCount,
  },
  hasMap: STORE_INFO.googleMapsUrl,
  sameAs: [
    STORE_INFO.instagramUrl,
    STORE_INFO.tiktokUrl,
    STORE_INFO.facebookUrl,
    STORE_INFO.shopeeUrl,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD),
          }}
        />
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFab />
        </LanguageProvider>
      </body>
    </html>
  );
}
