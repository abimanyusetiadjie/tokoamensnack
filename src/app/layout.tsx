import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { STORE_INFO } from "@/payload/seed-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tokoamensnack.vercel.app"),
  title: {
    default:
      "Toko Amen Snack Sungailiat - Pusat Oleh-Oleh & Camilan Khas Bangka",
    template: "%s | Toko Amen Snack Sungailiat",
  },
  description:
    "Pusat oleh-oleh dan camilan khas Bangka terlengkap di Jl. Muhidin No.106 Sungailiat. Sedia Kemplang Panggang, Kemplang Pasir Cap AMEN, Getas Ikan, Kericu, Kecap Asin, dan Indomie Kaldu Udang Bangka. Pesan via WhatsApp atau Shopee.",
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
  sameAs: [STORE_INFO.instagramUrl, STORE_INFO.shopeeUrl],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${playfair.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD),
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
