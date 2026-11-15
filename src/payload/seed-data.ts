export type CategoryIconName =
  | "flame"
  | "cookie"
  | "fish"
  | "sparkles"
  | "utensils"
  | "coffee";

export interface FlyerItem {
  id: string;
  title: string;
  badge: string;
  period: string;
  description: string;
  alt: string;
  imageUrl: string;
  ctaLabel: string;
  ctaHref: string;
  isExternal?: boolean;
}

export interface ProductItem {
  id: string;
  code: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number | null;
  formattedPrice: string;
  badge: string;
  rating: number;
  description: string;
  imageUrl: string;
  shopeeUrl: string;
}

export interface CategoryItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: CategoryIconName;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatarInitials: string;
  avatarBg: string;
}

export interface PropositionBannerItem {
  id: string;
  title: string;
  alt: string;
  imageUrl: string;
  href: string;
}

export interface ValuePillarItem {
  id: string;
  title: string;
  description: string;
  iconName: "award" | "badgePercent" | "truck";
}

export interface StoreItem {
  id: number;
  branchCode: string;
  name: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  mapsUrl: string;
  wazeUrl: string;
  openingHoursWeekday: string;
  openingHoursSunday: string;
  placeId: string;
  featuredOnHomepage: boolean;
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  publishedAt: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];
  imageUrl: string;
}

export const STORE_INFO = {
  name: "Toko Amen Snack",
  officialName: "Toko Oleh-Oleh Khas Bangka Amen Snack",
  logoTitle: "AMEN SNACK",
  logoSubtitle: "Oleh-Oleh Khas Bangka",
  houseBrand: "Cap AMEN",
  tagline: "Pusat Oleh-Oleh & Camilan Khas Bangka Terlengkap di Sungailiat",
  announcementText:
    "🎉 Pusat Oleh-Oleh & Camilan Khas Bangka Terlengkap di Sungailiat — Melayani Pengiriman ke Seluruh Indonesia!",
  heroBadge: "🏆 Terdaftar di Sisparnas Kemenpar — Rating 4.5★ Google Maps",
  heroTitle: "Pusat Oleh-Oleh & Camilan Khas Bangka Terlengkap",
  heroSubtitle:
    "Nikmati gurih dan renyahnya Kemplang Panggang, Kemplang Pasir Cap AMEN, Getas Ikan, hingga produk eksklusif khas Pulau Bangka. Segar setiap hari dan ramah di kantong!",
  heroImage: "/images/hero/toko-amen-hero.webp",
  address:
    "Jl. Muhidin No.106, Sungailiat, Kec. Sungai Liat, Kabupaten Bangka, Kepulauan Bangka Belitung 33211, Indonesia",
  shortAddress: "Jl. Muhidin No.106, Sungailiat, Kab. Bangka 33211",
  phone: "0813-6872-2622",
  phoneInternational: "+62 813-6872-2622",
  whatsappNumber: "6281368722622",
  whatsappUrl: "https://wa.me/6281368722622",
  whatsappDirectCta:
    "https://wa.me/6281368722622?text=Halo%20Admin%20Toko%20Amen%20Snack,%20saya%20ingin%20bertanya%20katalog%20oleh-oleh%20khas%20Bangka",
  instagramHandle: "@toko.amensnack",
  instagramUrl: "https://www.instagram.com/toko.amensnack/",
  shopeeHandle: "amensnack",
  shopeeUrl: "https://shopee.co.id/amensnack",
  googleMapsPlaceId: "ChIJx6EI03XzIi4RkYWEXb-mtBk",
  googleMapsUrl:
    "https://www.google.com/maps/place//data=!4m2!3m1!19sChIJx6EI03XzIi4RkYWEXb-mtBk",
  wazeUrl:
    "https://www.waze.com/id/live-map/directions/id/kepulauan-bangka-belitung/toko-amen-snack?to=place.ChIJx6EI03XzIi4RkYWEXb-mtBk",
  rating: 4.5,
  reviewCount: 100,
  openingHours: {
    mondayToSaturday: "07.00 – 21.00 WIB",
    sunday: "10.00 – 15.00 WIB",
  },
  footerDescription:
    "Toko Amen Snack adalah pusat oleh-oleh dan camilan khas Bangka di Sungailiat yang menyediakan aneka kemplang, getas, kericu, dan makanan ringan berkualitas.",
} as const;

export function getProductWhatsappUrl(productName: string, formattedPrice?: string): string {
  const priceNote = formattedPrice ? ` (${formattedPrice})` : "";
  const message = `Halo Admin Toko Amen Snack, saya ingin memesan ${productName}${priceNote}. Apakah stok tersedia?`;
  return `${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export const FLYERS_COLLECTION: FlyerItem[] = [
  {
    id: "promo-cap-amen",
    title: 'Produk Spesial "Cap AMEN"',
    badge: "Signature House Brand",
    period: "Tersedia Setiap Hari",
    description:
      "Kemplang Goreng Pasir & Bantet produksi internal Cap AMEN lengkap dengan sambal terasi khas Bangka mulai Rp10.000.",
    alt: 'Banner Promo Produk Spesial Cap AMEN Toko Amen Snack',
    imageUrl: "/images/banners/promo-cap-amen.webp",
    ctaLabel: "Lihat Kemplang Cap AMEN",
    ctaHref: "/produk?kategori=kemplang-pasir",
  },
  {
    id: "promo-pengiriman-nasional",
    title: "Kirim Oleh-Oleh ke Seluruh Indonesia",
    badge: "Belanja Online & Offline",
    period: "Pengiriman Nasional",
    description:
      "Pesan praktis dari rumah melalui toko resmi Shopee amensnack atau hubungi admin WhatsApp kami di 0813-6872-2622.",
    alt: "Banner Layanan Pengiriman Nasional Toko Amen Snack",
    imageUrl: "/images/banners/promo-pengiriman-nasional.webp",
    ctaLabel: "Belanja di Shopee",
    ctaHref: STORE_INFO.shopeeUrl,
    isExternal: true,
  },
  {
    id: "promo-paket-wisatawan",
    title: "Kunjungi Toko Fisik di Jl. Muhidin No.106",
    badge: "Sisparnas Kemenpar • 4.5★ Google Maps",
    period: "Buka Setiap Hari",
    description:
      "Belanja langsung aneka kemplang, getas, kopi bangka, dan paket oleh-oleh keluarga di Jl. Muhidin No.106, Sungailiat.",
    alt: "Banner Etalase Toko Amen Snack Jl. Muhidin Sungailiat",
    imageUrl: "/images/banners/promo-paket-wisatawan.webp",
    ctaLabel: "Petunjuk Lokasi Toko",
    ctaHref: "/lokasi",
  },
];

export const CATEGORIES_COLLECTION: CategoryItem[] = [
  {
    id: "cat-1",
    slug: "kemplang-panggang",
    title: "Kemplang Panggang & Oven",
    description:
      "Kemplang bakar arang/oven khas Bangka lengkap dengan sambal terasi.",
    iconName: "flame",
  },
  {
    id: "cat-2",
    slug: "kemplang-pasir",
    title: "Kemplang Pasir & Goreng",
    description:
      "Kemplang sangrai pasir bebas minyak (termasuk produk khas Cap AMEN) serta kemplang siap goreng.",
    iconName: "cookie",
  },
  {
    id: "cat-3",
    slug: "getas-kerupuk",
    title: "Getas & Kerupuk Ikan",
    description:
      "Getas ikan tenggiri renyah dan aneka kerupuk olahan laut Bangka.",
    iconName: "fish",
  },
  {
    id: "cat-4",
    slug: "kericu-olahan-laut",
    title: "Kericu & Olahan Laut",
    description:
      "Camilan telur cumi (kericu) gurih dan hasil laut kering khas Pulau Bangka.",
    iconName: "sparkles",
  },
  {
    id: "cat-5",
    slug: "bumbu-terasi",
    title: "Bumbu & Terasi Bangka",
    description:
      "Terasi udang asli, kecap asin khas Bangka, dan bumbu masak tradisional.",
    iconName: "utensils",
  },
  {
    id: "cat-6",
    slug: "kopi-produk-khas",
    title: "Kopi & Produk Khas Bangka",
    description:
      "Kopi bubuk curah pilihan, kue tradisional, dan mi instan varian eksklusif Bangka.",
    iconName: "coffee",
  },
];

export const PRODUCTS_COLLECTION: ProductItem[] = [
  {
    id: "prd-01",
    code: "PRD-01",
    name: 'Kemplang Pasir Bantet "Cap AMEN"',
    category: "Kemplang Pasir",
    categorySlug: "kemplang-pasir",
    price: 10000,
    formattedPrice: "Rp10.000",
    badge: "Signature Brand",
    rating: 4.9,
    description:
      "Kemplang sangrai pasir khas produksi Cap AMEN lengkap dengan sambal terasi.",
    imageUrl: "/images/products/prd-01-kemplang-pasir-cap-amen.webp",
    shopeeUrl: STORE_INFO.shopeeUrl,
  },
  {
    id: "prd-02",
    code: "PRD-02",
    name: "Getas Istimewa Cap Obor (250g)",
    category: "Getas & Kerupuk",
    categorySlug: "getas-kerupuk",
    price: 20000,
    formattedPrice: "Rp20.000",
    badge: "Terlaris (4.9★)",
    rating: 4.9,
    description:
      "Kerupuk getas ikan pilihan yang renyah dan gurih dalam kemasan 250 gram.",
    imageUrl: "/images/products/prd-02-getas-cap-obor.webp",
    shopeeUrl: STORE_INFO.shopeeUrl,
  },
  {
    id: "prd-03",
    code: "PRD-03",
    name: "Indomie Kaldu Udang (Eksklusif Bangka)",
    category: "Produk Khas Bangka",
    categorySlug: "kopi-produk-khas",
    price: 5000,
    formattedPrice: "Rp5.000",
    badge: "Eksklusif Bangka",
    rating: 4.9,
    description:
      "Varian mi instan rasa Kaldu Udang yang hanya dipasarkan di wilayah Bangka (Rating 4.9).",
    imageUrl: "/images/products/prd-03-indomie-kaldu-udang-bangka.webp",
    shopeeUrl: STORE_INFO.shopeeUrl,
  },
  {
    id: "prd-04",
    code: "PRD-04",
    name: "Indomie Goreng Khas Bangka",
    category: "Produk Khas Bangka",
    categorySlug: "kopi-produk-khas",
    price: 7000,
    formattedPrice: "Rp7.000",
    badge: "Favorit Wisatawan",
    rating: 4.8,
    description:
      "Varian mi goreng khusus edisi Sumatera/Bangka yang populer sebagai buah tangan.",
    imageUrl: "/images/products/prd-04-indomie-goreng-bangka.webp",
    shopeeUrl: STORE_INFO.shopeeUrl,
  },
  {
    id: "prd-05",
    code: "PRD-05",
    name: "Kemplang Panggang JJ 2.5 Tali Biru",
    category: "Kemplang Panggang",
    categorySlug: "kemplang-panggang",
    price: 32000,
    formattedPrice: "Rp32.000",
    badge: "Best Seller",
    rating: 4.8,
    description:
      "Kemplang ikan panggang berkualitas dengan tekstur renyah dan cocolan sambal pekat.",
    imageUrl: "/images/products/prd-05-kemplang-panggang-jj.webp",
    shopeeUrl: STORE_INFO.shopeeUrl,
  },
  {
    id: "prd-06",
    code: "PRD-06",
    name: "Kemplang Panggang Khas Belinyu",
    category: "Kemplang Panggang",
    categorySlug: "kemplang-panggang",
    price: 37000,
    formattedPrice: "Rp37.000",
    badge: "Kualitas Premium",
    rating: 4.9,
    description:
      "Kemplang panggang autentik khas Belinyu dengan cita rasa ikan tenggiri asli.",
    imageUrl: "/images/products/prd-06-kemplang-panggang-belinyu.webp",
    shopeeUrl: STORE_INFO.shopeeUrl,
  },
  {
    id: "prd-07",
    code: "PRD-07",
    name: "Kecap Asin Asli Bangka Cap SS (300ml)",
    category: "Bumbu & Terasi",
    categorySlug: "bumbu-terasi",
    price: 16000,
    formattedPrice: "Rp16.000",
    badge: "Bumbu Kuliner",
    rating: 4.8,
    description:
      "Kecap asin legendaris khas Bangka untuk pelengkap hidangan dan cocolan.",
    imageUrl: "/images/products/prd-07-kecap-asin-cap-ss.webp",
    shopeeUrl: STORE_INFO.shopeeUrl,
  },
  {
    id: "prd-08",
    code: "PRD-08",
    name: "Kopi Curah No. 1 Khas Bangka (250g)",
    category: "Kopi & Minuman",
    categorySlug: "kopi-produk-khas",
    price: null,
    formattedPrice: "Hubungi CS",
    badge: "Aroma Khas",
    rating: 4.9,
    description:
      "Kopi bubuk pilihan nomor 1 khas Bangka dengan seduhan pekat dan harum.",
    imageUrl: "/images/products/prd-08-kopi-curah-bangka.webp",
    shopeeUrl: STORE_INFO.shopeeUrl,
  },
];

export const VALUE_PILLARS: ValuePillarItem[] = [
  {
    id: "pillar-1",
    title: "Asli & Berkualitas",
    description:
      "Menghadirkan kemplang, getas, dan camilan langsung dari produsen lokal terbaik di Bangka serta produk unggulan Cap AMEN.",
    iconName: "award",
  },
  {
    id: "pillar-2",
    title: "Harga Jujur & Bersahabat",
    description:
      "Harga ritel yang terjangkau mulai dari Rp5.000 hingga paket oleh-oleh keluarga yang hemat.",
    iconName: "badgePercent",
  },
  {
    id: "pillar-3",
    title: "Mudah Diakses (Offline & Online)",
    description:
      "Lokasi strategis di Jl. Muhidin Sungailiat serta melayani pemesanan online lewat WhatsApp dan Shopee.",
    iconName: "truck",
  },
];

export const PROPOSITION_BANNERS: PropositionBannerItem[] = [
  {
    id: "prop-1",
    title: "Pusat Oleh-Oleh Resmi Sungailiat",
    alt: "Terdaftar Sisparnas Kemenpar dengan Rating 4.5 Google Maps",
    imageUrl: "/images/banners/proposition-1.webp",
    href: "/lokasi",
  },
  {
    id: "prop-2",
    title: "Produksi Internal Cap AMEN",
    alt: "House Brand Cap AMEN Kemplang Pasir Bantet & Sambal Terasi",
    imageUrl: "/images/banners/proposition-2.webp",
    href: "/produk?kategori=kemplang-pasir",
  },
  {
    id: "prop-3",
    title: "Toko Fisik, WhatsApp & Shopee",
    alt: "Belanja Langsung di Sungailiat atau Pengiriman Seluruh Indonesia",
    imageUrl: "/images/banners/proposition-3.webp",
    href: "/katalog",
  },
];

export const TESTIMONIALS_COLLECTION: TestimonialItem[] = [
  {
    id: "testi-1",
    name: "Rina Wulandari",
    role: "Wisatawan Jakarta • Google Review",
    quote:
      "Setiap pulang liburan dari Sungailiat pasti mampir ke Toko Amen Snack. Kemplang Pasir Cap AMEN dan Getas Cap Obor-nya renyah, sambal terasinya mantap, harganya jujur!",
    rating: 5,
    avatarInitials: "RW",
    avatarBg: "bg-brand-red",
  },
  {
    id: "testi-2",
    name: "Hendra Saputra",
    role: "Pelanggan Sungailiat • Google Review",
    quote:
      "Oleh-oleh khas Bangka paling komplit di Jl. Muhidin. Bisa sekalian cari Indomie Kaldu Udang Bangka, Kecap Asin Cap SS, sampai kemplang panggang Belinyu.",
    rating: 5,
    avatarInitials: "HS",
    avatarBg: "bg-brand-orange",
  },
  {
    id: "testi-3",
    name: "Meilani Putri",
    role: "Pembeli Shopee amensnack",
    quote:
      "Sudah langganan kirim paket kemplang ke Bandung lewat Shopee amensnack dan WhatsApp admin. Packing rapi dan aman, kemplangnya sampai dalam kondisi utuh dan segar.",
    rating: 5,
    avatarInitials: "MP",
    avatarBg: "bg-slate-900",
  },
  {
    id: "testi-4",
    name: "Budi Santoso",
    role: "Kolega Wisatawan • Google Review",
    quote:
      "Pelayanan ramah dan staf cepat membantu pilihkan oleh-oleh khas untuk keluarga besar di Palembang. Kopi curah Bangka dan kemplang panggang JJ 2.5 selalu jadi favorit.",
    rating: 5,
    avatarInitials: "BS",
    avatarBg: "bg-rose-700",
  },
];

export const STORES_COLLECTION: StoreItem[] = [
  {
    id: 1,
    branchCode: "PUSAT SUNGAILIAT",
    name: "Toko Amen Snack — Sungailiat",
    address:
      "Jl. Muhidin No.106, Sungailiat, Kec. Sungai Liat, Kabupaten Bangka, Kepulauan Bangka Belitung 33211",
    phone: "0813-6872-2622",
    whatsappNumber: "6281368722622",
    mapsUrl: STORE_INFO.googleMapsUrl,
    wazeUrl: STORE_INFO.wazeUrl,
    openingHoursWeekday: "07.00 – 21.00 WIB",
    openingHoursSunday: "10.00 – 15.00 WIB",
    placeId: STORE_INFO.googleMapsPlaceId,
    featuredOnHomepage: true,
  },
];

export const BLOGS_COLLECTION: BlogPostItem[] = [
  {
    id: "blog-1",
    slug: "mengenal-perbedaan-kemplang-panggang-kemplang-pasir-dan-getas-khas-bangka",
    title:
      "Mengenal Perbedaan Kemplang Panggang, Kemplang Pasir, dan Getas Khas Bangka",
    publishedAt: "Panduan Kuliner Bangka",
    readTime: "3 menit baca",
    category: "Edukasi Camilan",
    excerpt:
      "Meskipun sama-sama berbahan dasar ikan tenggiri pilihan dan tepung tapioka, cara pengolahan ketiganya menghasilkan tekstur dan sensasi rasa yang berbeda.",
    content: [
      "Kemplang Panggang dibuat dengan cara dibakar di atas bara arang atau dipanggang menggunakan oven hingga mengembang garing dengan aroma smoky yang khas. Paling nikmat disantap bersama cocolan sambal terasi Bangka yang pedas-manis.",
      "Sementara itu, Kemplang Pasir (seperti produk andalan Kemplang Pasir Bantet 'Cap AMEN') disangrai menggunakan pasir bersih panas tanpa minyak goreng. Hasilnya tetap renyah, gurih, dan tidak berminyak sehingga awet disimpan sebagai buah tangan.",
      "Berbeda lagi dengan Getas (Kerupuk Ikan), adonannya dibentuk memanjang atau bulat kecil lalu digoreng hingga renyah padat. Getas Istimewa Cap Obor adalah salah satu varian terlaris di Toko Amen Snack karena cita rasa ikannya yang terasa kuat di setiap gigitan.",
    ],
    imageUrl: "/images/blog/blog-1-perbedaan-kemplang-getas.webp",
  },
  {
    id: "blog-2",
    slug: "5-oleh-oleh-wajib-saat-berkunjung-ke-sungailiat-kabupaten-bangka",
    title: "5 Oleh-Oleh Wajib Saat Berkunjung ke Sungailiat, Kabupaten Bangka",
    publishedAt: "Rekomendasi Wisatawan",
    readTime: "4 menit baca",
    category: "Tips Oleh-Oleh",
    excerpt:
      "Bingung memilih buah tangan sepulang dari wisata pantai di Sungailiat? Ini daftar 5 produk khas Bangka yang paling sering diborong wisatawan.",
    content: [
      "1. Kemplang Pasir Bantet Cap AMEN — Camilan house brand khas Toko Amen Snack yang praktis dibawa perjalanan jauh dan sudah dilengkapi sambal terasi.",
      "2. Kemplang Panggang Belinyu & JJ 2.5 Tali Biru — Primadona pecinta kerupuk ikan panggang dengan tekstur renyah dan rasa ikan tenggiri asli.",
      "3. Getas Istimewa Cap Obor (250g) — Kemasan pas untuk dibagikan kepada keluarga atau rekan kerja di kantor.",
      "4. Kecap Asin Asli Bangka Cap SS & Terasi Udang — Bumbu legendaris yang wajib dibawa pulang bagi penggemar masakan rumahan khas Bangka.",
      "5. Kopi Curah No. 1 & Indomie Kaldu Udang Bangka — Duo oleh-oleh unik yang menghadirkan nostalgia cita rasa Pulau Bangka di rumah.",
    ],
    imageUrl: "/images/blog/blog-2-oleh-oleh-wajib-sungailiat.webp",
  },
  {
    id: "blog-3",
    slug: "keunikan-indomie-kaldu-udang-yang-hanya-dijual-di-pulau-bangka",
    title:
      "Keunikan Indomie Kaldu Udang yang Hanya Dijual di Pulau Bangka",
    publishedAt: "Produk Eksklusif Lokal",
    readTime: "3 menit baca",
    category: "Cerita Produk",
    excerpt:
      "Selain kemplang dan getas, banyak wisatawan berburu Indomie Kaldu Udang dan Indomie Goreng edisi khusus Bangka sebagai oleh-oleh unik ramah kantong.",
    content: [
      "Tahukah Anda bahwa varian Indomie Kaldu Udang tidak dipasarkan secara bebas di seluruh kota di Indonesia? Produk ini menjadi buruan wisatawan karena cita rasa kaldu udangnya yang gurih dan aromatik, selaras dengan kultur kuliner bahari masyarakat Bangka.",
      "Di Toko Amen Snack Sungailiat, Indomie Kaldu Udang (Rp5.000) dan Indomie Goreng Khas Bangka (Rp7.000) selalu menjadi item pelengkap favorit di keranjang belanja wisatawan maupun pembeli online lewat Shopee amensnack.",
      "Karena harganya sangat terjangkau dan ringan dikemas, kedua varian mi instan ini cocok dijadikan oleh-oleh unik untuk teman dekat atau koleksi pencinta mi instan Nusantara.",
    ],
    imageUrl: "/images/blog/blog-3-indomie-kaldu-udang-bangka.webp",
  },
];
