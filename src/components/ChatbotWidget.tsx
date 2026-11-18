"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import {
  Gift,
  Loader2,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  RotateCcw,
  Send,
  Sparkles,
  Tag,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { STORE_INFO, type CategoryIconName } from "@/payload/seed-data";
import { resolveShopeeMediaMatch } from "@/lib/shopee-catalog-map";
import { CategoryIcon } from "@/components/CategoryIcon";
import { cn } from "@/lib/utils";
import type {
  ChatbotProductCard,
  ChatbotUiPayload,
} from "@/lib/chatbot-fallback";

interface CartEntry {
  product: ChatbotProductCard;
  qty: number;
}

const SCENARIO_BUTTONS = [
  {
    id: "paket",
    title: "Paket Oleh-Oleh",
    subtitle: "Favorit & budget < Rp150rb",
    prompt: "Rekomendasi paket oleh-oleh Bangka terlaris budget di bawah 150rb",
    icon: Gift,
    tone: "text-brand-red bg-slate-100",
  },
  {
    id: "grosir",
    title: "Harga Ecer & Grosir",
    subtitle: "Cap AMEN & paket reseller",
    prompt: "Produk best seller Cap AMEN dan harga grosir",
    icon: Tag,
    tone: "text-brand-orange-dark bg-rose-50",
  },
  {
    id: "kirim",
    title: "Kirim Luar Pulau",
    subtitle: "Packing aman, berat & Shopee",
    prompt: "Info pengiriman luar kota, estimasi berat paket, dan Shopee",
    icon: Truck,
    tone: "text-brand-red bg-slate-100",
  },
  {
    id: "lokasi",
    title: "Lokasi & Jam Buka",
    subtitle: "Jl. Muhidin Sungailiat",
    prompt: "Alamat lengkap, jam buka toko, dan Google Maps",
    icon: MapPin,
    tone: "text-brand-orange-dark bg-rose-50",
  },
] as const;

const DEFAULT_FOLLOW_UPS = [
  "Produk harga grosir",
  "Info kirim luar kota",
  "Jam buka & lokasi",
];

function encodeWaText(text: string): string {
  return encodeURIComponent(text).replace(/[()]/g, (ch) =>
    ch === "(" ? "%28" : "%29"
  );
}

function formatRp(amount: number): string {
  return `Rp${Math.round(amount).toLocaleString("id-ID")}`;
}

function mapCategorySlugToIcon(slug: string): CategoryIconName {
  switch (slug) {
    case "kemplang-panggang":
      return "flame";
    case "kemplang-goreng":
      return "cookie";
    case "getas-ampiang-kericu":
      return "fish";
    case "terasi-bumbu-laut":
      return "utensils";
    case "kopi-sirup-minuman":
      return "coffee";
    default:
      return "sparkles";
  }
}

function resolveCardThumbnail(product: ChatbotProductCard): string {
  if (product.imageUrl && product.imageUrl.trim()) {
    return product.imageUrl.trim();
  }
  const matched = resolveShopeeMediaMatch(product.name, product.sku);
  return matched.imageUrl || "";
}

function renderInlineMarkdown(text: string): React.ReactNode[] {
  const tokenRegex = /(\[[^\]]+\]\((?:[^()\s]+|\([^)]*\))+\)|\*\*[^*]+\*\*|\*[^*\n]+\*)/g;
  const parts = text.split(tokenRegex);

  return parts.map((segment, index) => {
    if (!segment) return null;

    const linkMatch = segment.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isInternal = href.startsWith("/");
      const isSafeExternal =
        href.startsWith("https://") || href.startsWith("http://");

      if (isInternal) {
        return (
          <Link
            key={index}
            href={href}
            className="font-semibold text-brand-red underline underline-offset-2 hover:text-brand-red-dark"
          >
            {label}
          </Link>
        );
      }

      if (isSafeExternal) {
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-orange-dark underline underline-offset-2 hover:text-brand-red"
          >
            {label}
          </a>
        );
      }
      return <span key={index}>{label}</span>;
    }

    if (segment.startsWith("**") && segment.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-slate-900">
          {segment.slice(2, -2)}
        </strong>
      );
    }

    if (segment.startsWith("*") && segment.endsWith("*")) {
      return (
        <em key={index} className="italic text-slate-700">
          {segment.slice(1, -1)}
        </em>
      );
    }

    return <React.Fragment key={index}>{segment}</React.Fragment>;
  });
}

function FormattedBotMessage({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="space-y-1 text-xs leading-relaxed break-words">
      {lines.map((line, i) =>
        line.trim() === "" ? (
          <div key={i} className="h-1" />
        ) : (
          <p key={i}>{renderInlineMarkdown(line)}</p>
        )
      )}
    </div>
  );
}

function normalizeToolProduct(raw: Record<string, unknown>, idx: number): ChatbotProductCard {
  const priceNum = typeof raw.price === "number"
    ? raw.price
    : typeof raw.retailPrice === "number"
      ? raw.retailPrice
      : null;
  const wholesaleNum = typeof raw.wholesalePrice === "number" ? raw.wholesalePrice : null;
  return {
    id: String(raw.id || raw.sku || `tool-${idx}`),
    sku: String(raw.sku || ""),
    name: String(raw.name || "Produk Toko Amen Snack"),
    category: String(raw.category || "Oleh-Oleh Bangka"),
    categorySlug: String(raw.categorySlug || "kemplang-goreng"),
    price: priceNum,
    formattedPrice: String(raw.formattedPrice || (priceNum ? formatRp(priceNum) : "Hubungi CS")),
    wholesalePrice: wholesaleNum,
    formattedWholesalePrice: raw.formattedWholesalePrice ? String(raw.formattedWholesalePrice) : null,
    stock: Number(raw.stock ?? (raw.inStock ? 10 : 0)),
    unit: String(raw.unit || "Pcs"),
    weightGrams: typeof raw.weightGrams === "number" ? raw.weightGrams : null,
    imageUrl: String(raw.imageUrl || ""),
    shopeeUrl: String(raw.shopeeUrl || STORE_INFO.shopeeUrl),
  };
}

function extractMessageUi(message: UIMessage): ChatbotUiPayload {
  const products: ChatbotProductCard[] = [];
  const seenIds = new Set<string>();
  let suggestions: string[] = [];

  for (const part of message.parts || []) {
    const p = part as unknown as Record<string, unknown>;
    if (p.type === "data-store-ui" && p.data && typeof p.data === "object") {
      const payload = p.data as Partial<ChatbotUiPayload>;
      if (Array.isArray(payload.products)) {
        for (const item of payload.products) {
          if (item && !seenIds.has(item.id) && products.length < 3) {
            seenIds.add(item.id);
            products.push(item);
          }
        }
      }
      if (Array.isArray(payload.suggestions) && payload.suggestions.length > 0) {
        suggestions = payload.suggestions.slice(0, 3);
      }
    } else if (
      p.type === "tool-searchProducts" &&
      p.state === "output-available" &&
      p.output &&
      typeof p.output === "object"
    ) {
      const output = p.output as { products?: Record<string, unknown>[] };
      if (Array.isArray(output.products)) {
        output.products.forEach((rawItem, idx) => {
          const mapped = normalizeToolProduct(rawItem, idx);
          if (!seenIds.has(mapped.id) && products.length < 3) {
            seenIds.add(mapped.id);
            products.push(mapped);
          }
        });
      }
    }
  }

  return {
    products: products.slice(0, 3),
    suggestions: suggestions.slice(0, 3),
  };
}

function ChatbotProductCardRow({
  product,
  qtyInCart,
  onIncrement,
  onDecrement,
}: {
  product: ChatbotProductCard;
  qtyInCart: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const thumbUrl = resolveCardThumbnail(product);
  const showImage = Boolean(thumbUrl) && !imgFailed;
  const hasPrice = Boolean(product.price && product.price > 0);
  const isReady = product.stock > 0;

  return (
    <div className="rounded-xl bg-white border border-slate-200/90 p-2.5 shadow-sm flex items-center gap-2.5">
      <div className="w-12 h-12 rounded-lg bg-brand-soft border border-slate-100 shrink-0 flex items-center justify-center overflow-hidden">
        {showImage ? (
          <img
            src={thumbUrl}
            alt={product.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-contain p-1"
          />
        ) : (
          <CategoryIcon
            name={mapCategorySlugToIcon(product.categorySlug)}
            className="w-5 h-5 text-brand-red"
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p
          title={product.name}
          className="text-xs font-bold text-slate-900 line-clamp-1 leading-snug"
        >
          {product.name}
        </p>

        <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
          <span className="text-xs font-extrabold text-brand-red">
            {product.formattedPrice}
          </span>
          {product.formattedWholesalePrice && (
            <span className="rounded-full bg-rose-50 border border-rose-200/80 px-1.5 py-0.5 text-[10px] font-bold text-brand-orange-dark">
              Grosir {product.formattedWholesalePrice}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500 font-medium">
          <span className="inline-flex items-center gap-1">
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                isReady ? "bg-emerald-500" : "bg-rose-500"
              )}
            />
            {isReady ? "Stok Ready" : "Habis"}
          </span>
          {product.weightGrams ? (
            <span>&bull; {product.weightGrams}g</span>
          ) : (
            <span>&bull; {product.unit}</span>
          )}
        </div>
      </div>

      <div className="shrink-0">
        {hasPrice ? (
          qtyInCart > 0 ? (
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-1 py-0.5 gap-1">
              <button
                type="button"
                onClick={onDecrement}
                aria-label={`Kurangi ${product.name}`}
                className="w-5 h-5 rounded-full hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-bold text-brand-dark min-w-[14px] text-center">
                {qtyInCart}
              </span>
              <button
                type="button"
                onClick={onIncrement}
                aria-label={`Tambah ${product.name}`}
                className="w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onIncrement}
              className="inline-flex items-center gap-1 rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-[11px] px-2.5 py-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Tambah</span>
            </button>
          )
        ) : (
          <a
            href={`${STORE_INFO.whatsappUrl}?text=${encodeWaText(
              `Halo Admin Toko Amen Snack, saya ingin menanyakan harga ${product.name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-brand-red/30 px-2.5 py-1 text-[11px] font-semibold text-brand-red hover:bg-slate-50"
          >
            Tanya WA
          </a>
        )}
      </div>
    </div>
  );
}

/**
 * Floating Store Assistant Chatbot (Single Launcher -> WA Header -> 4 Scenario Cards -> Max 3 Product Cards + Weight/Price Estimator -> 2-3 Follow-Up Chips).
 */
export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [cart, setCart] = useState<Record<string, CartEntry>>({});
  const [showCartDetails, setShowCartDetails] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    []
  );

  const { messages, sendMessage, setMessages, status, error } = useChat({
    transport,
  });

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ prompt?: string }>;
      setIsOpen(true);
      const prompt = custom?.detail?.prompt?.trim();
      if (prompt && !isBusy) {
        sendMessage({ text: prompt });
      }
    };
    window.addEventListener("amen:open-chat", handler);
    return () => window.removeEventListener("amen:open-chat", handler);
  }, [isBusy, sendMessage]);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, status]);

  const handleSend = (textToSend?: string) => {
    const trimmed = (textToSend ?? input).trim();
    if (!trimmed || isBusy) return;
    sendMessage({ text: trimmed });
    if (textToSend === undefined) {
      setInput("");
    }
  };

  const updateCartItem = (product: ChatbotProductCard, delta: number) => {
    setCart((prev) => {
      const current = prev[product.id];
      const nextQty = (current?.qty || 0) + delta;
      if (nextQty <= 0) {
        const next = { ...prev };
        delete next[product.id];
        return next;
      }
      return {
        ...prev,
        [product.id]: { product, qty: nextQty },
      };
    });
  };

  const cartEntries = useMemo(() => Object.values(cart), [cart]);
  const totalCartItems = useMemo(
    () => cartEntries.reduce((sum, entry) => sum + entry.qty, 0),
    [cartEntries]
  );
  const totalCartSubtotal = useMemo(
    () =>
      cartEntries.reduce(
        (sum, entry) => sum + entry.qty * Number(entry.product.price || 0),
        0
      ),
    [cartEntries]
  );
  const totalCartGrams = useMemo(
    () =>
      cartEntries.reduce(
        (sum, entry) => sum + entry.qty * Number(entry.product.weightGrams || 0),
        0
      ),
    [cartEntries]
  );

  const waCheckoutHref = useMemo(() => {
    if (cartEntries.length > 0) {
      const itemLines = cartEntries.map(
        (entry) =>
          `- ${entry.product.name} x${entry.qty} (${formatRp(
            entry.qty * Number(entry.product.price || 0)
          )})`
      );
      const summaryLines = [
        "Halo Admin Toko Amen Snack, saya ingin memesan:",
        ...itemLines,
        `Estimasi Subtotal: ${formatRp(totalCartSubtotal)}`,
        totalCartGrams > 0
          ? `Estimasi Berat: ${(totalCartGrams / 1000).toFixed(2)} kg`
          : "",
        "Mohon konfirmasi ketersediaan stok dan ongkirnya ya.",
      ]
        .filter(Boolean)
        .join("\n");
      return `${STORE_INFO.whatsappUrl}?text=${encodeWaText(summaryLines)}`;
    }

    const userQueries = messages
      .filter((m) => m.role === "user")
      .slice(-4)
      .map((m) =>
        (m.parts || [])
          .filter((p): p is { type: "text"; text: string } => p.type === "text")
          .map((p) => p.text)
          .join(" ")
          .trim()
      )
      .filter(Boolean);

    if (userQueries.length === 0) return STORE_INFO.whatsappDirectCta;
    const msgText = `Halo Admin Toko Amen Snack, saya melanjutkan chat dari website:\n${userQueries
      .map((q) => `- ${q}`)
      .join("\n")}\n\nMohon bantuannya ya.`;
    return `${STORE_INFO.whatsappUrl}?text=${encodeWaText(msgText)}`;
  }, [cartEntries, messages, totalCartGrams, totalCartSubtotal]);

  const lastAssistantIndex = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role !== "user") return i;
    }
    return -1;
  }, [messages]);

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 sm:left-auto z-50 flex flex-col items-end gap-2.5",
        isOpen && "left-4"
      )}
    >
      {isOpen && (
        <div
          role="dialog"
          aria-label="Asisten Virtual Toko Amen Snack"
          className="w-full sm:w-[400px] h-[min(78vh,560px)] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        >
          {/* Header with Direct "Chat WA Admin" */}
          <div className="bg-brand-red text-white px-3 py-2.5 flex items-center justify-between gap-1.5 shrink-0 border-b-2 border-brand-orange">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-white p-0.5 flex items-center justify-center shrink-0 shadow-sm">
                <img
                  src="/images/logo-amen-snack.webp"
                  alt="Logo Amen Snack"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[13px] leading-tight whitespace-nowrap">
                  Asisten Amen Snack
                </p>
                <p className="text-[10px] text-slate-200 flex items-center gap-1 mt-0.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Online &bull; Katalog Live</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <a
                href={waCheckoutHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] font-bold px-2 py-1 shadow-sm transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-3 h-3 shrink-0" />
                <span>Chat WA Admin</span>
              </a>

              {(messages.length > 0 || totalCartItems > 0) && (
                <button
                  type="button"
                  onClick={() => {
                    setMessages([]);
                    setCart({});
                    setShowCartDetails(false);
                  }}
                  title="Mulai ulang chat"
                  aria-label="Reset percakapan"
                  className="p-1.5 rounded-full hover:bg-white/15 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Tutup chat"
                className="p-1.5 rounded-full hover:bg-white/15 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto bg-[#fafaf8] px-3.5 py-3.5 space-y-3"
          >
            {/* 4 Scenario Cards when chat is empty */}
            {messages.length === 0 ? (
              <div className="space-y-3">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-3.5 shadow-sm space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-red">
                    <Sparkles className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                    <span>Halo! Mau cari oleh-oleh khas Bangka apa?</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pilih skenario keperluan di bawah ini atau langsung ketik nama camilan yang ingin dicek harga &amp; stoknya.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {SCENARIO_BUTTONS.map((sc) => {
                    const Icon = sc.icon;
                    return (
                      <button
                        key={sc.id}
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleSend(sc.prompt)}
                        className="text-left rounded-2xl bg-white border border-slate-200 hover:border-brand-red/50 p-3 shadow-sm transition-colors cursor-pointer disabled:opacity-50 flex flex-col justify-between gap-2"
                      >
                        <span
                          className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                            sc.tone
                          )}
                        >
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-brand-dark leading-snug">
                            {sc.title}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            {sc.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              messages.map((message, msgIdx) => {
                const isUser = message.role === "user";
                const textContent = (message.parts || [])
                  .filter(
                    (part): part is { type: "text"; text: string } =>
                      part.type === "text"
                  )
                  .map((p) => p.text)
                  .join("");

                const hasPendingTool = (message.parts || []).some(
                  (part) => part.type.startsWith("tool-") && !textContent
                );

                const ui = isUser
                  ? { products: [], suggestions: [] }
                  : extractMessageUi(message);

                const isLastAssistant = !isUser && msgIdx === lastAssistantIndex;
                const followUps =
                  isLastAssistant && !isBusy && (textContent || ui.products.length > 0)
                    ? (ui.suggestions.length > 0
                        ? ui.suggestions
                        : DEFAULT_FOLLOW_UPS
                      ).slice(0, 3)
                    : [];

                return (
                  <div key={message.id} className="space-y-2">
                    <div
                      className={cn(
                        "flex",
                        isUser ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-sm",
                          isUser
                            ? "bg-brand-red text-white rounded-tr-sm text-xs leading-relaxed"
                            : "bg-white text-slate-800 border border-slate-200 rounded-tl-sm"
                        )}
                      >
                        {isUser ? (
                          <p className="whitespace-pre-wrap break-words">
                            {textContent}
                          </p>
                        ) : textContent ? (
                          <FormattedBotMessage content={textContent} />
                        ) : hasPendingTool ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-red" />
                            Memeriksa katalog produk...
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Max 3 Visual Product Cards with + Tambah */}
                    {ui.products.length > 0 && (
                      <div className="space-y-1.5">
                        {ui.products.slice(0, 3).map((product) => (
                          <ChatbotProductCardRow
                            key={product.id}
                            product={product}
                            qtyInCart={cart[product.id]?.qty || 0}
                            onIncrement={() => updateCartItem(product, 1)}
                            onDecrement={() => updateCartItem(product, -1)}
                          />
                        ))}
                      </div>
                    )}

                    {/* 2-3 Concise Follow-up Chips below the last assistant message */}
                    {followUps.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {followUps.map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => handleSend(chip)}
                            className="rounded-full bg-white hover:bg-brand-soft text-brand-red border border-brand-red/25 px-2.5 py-1 text-[11px] font-semibold transition-colors cursor-pointer"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {isBusy && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-600 border border-slate-200 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-xs inline-flex items-center gap-2 shadow-sm">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-red" />
                  <span>Mencari info produk...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-2.5 text-xs">
                Koneksi chat sempat terputus. Silakan kirim ulang atau klik{" "}
                <a
                  href={waCheckoutHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline"
                >
                  Chat WA Admin
                </a>
                .
              </div>
            )}
          </div>

          {/* Mini Estimator Strip (Weight & Subtotal) + [Kirim ke WA ->] */}
          {totalCartItems > 0 && (
            <div className="bg-emerald-50 border-t border-emerald-200 px-3 py-2 shrink-0 space-y-1.5">
              {showCartDetails && (
                <div className="space-y-1 pb-1.5 border-b border-emerald-200/80 max-h-24 overflow-y-auto">
                  {cartEntries.map(({ product, qty }) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between gap-2 text-[11px] text-slate-700"
                    >
                      <span className="truncate font-medium">
                        {product.name} &times;{qty}
                      </span>
                      <span className="font-bold text-brand-dark shrink-0">
                        {formatRp(qty * Number(product.price || 0))}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowCartDetails((prev) => !prev)}
                    className="text-left text-xs text-slate-800 hover:underline cursor-pointer truncate"
                    title="Klik untuk lihat rincian item"
                  >
                    <strong className="text-brand-dark">{totalCartItems} item</strong>
                    {totalCartGrams > 0 && (
                      <span className="text-slate-600">
                        {" "}
                        &bull; {(totalCartGrams / 1000).toFixed(2)} kg
                      </span>
                    )}
                    {" "}&bull;{" "}
                    <strong className="text-brand-red">
                      {formatRp(totalCartSubtotal)}
                    </strong>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCart({});
                      setShowCartDetails(false);
                    }}
                    aria-label="Kosongkan daftar pesanan"
                    title="Hapus daftar pesanan"
                    className="p-1 rounded-full text-slate-500 hover:text-rose-600 hover:bg-white cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <a
                  href={waCheckoutHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs px-3 py-1.5 shadow-sm transition-colors shrink-0"
                >
                  <span>Kirim ke WA &rarr;</span>
                </a>
              </div>
            </div>
          )}

          {/* Input Bar */}
          <div className="bg-white border-t border-slate-200 p-2.5 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik kemplang, getas 250g, kopi..."
                disabled={isBusy}
                className="flex-1 rounded-full border border-slate-300 bg-brand-slate px-3.5 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-red focus:bg-white transition-colors"
              />
              <button
                type="submit"
                disabled={isBusy || !input.trim()}
                aria-label="Kirim pesan"
                className="h-9 w-9 rounded-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-45 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                {isBusy ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Compact circular FAB on mobile (matching tokomama.com WA circle footprint), pill on desktop */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Buka Asisten Toko & WhatsApp Toko Amen Snack"
        className={cn(
          "items-center justify-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-xs sm:text-sm w-12 h-12 sm:w-auto sm:h-12 sm:pl-3.5 sm:pr-4 shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-white/15",
          isOpen ? "hidden sm:inline-flex" : "inline-flex"
        )}
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Tutup Chat</span>
          </>
        ) : (
          <>
            <span className="relative flex items-center justify-center">
              <Sparkles className="w-5 h-5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#25D366] ring-2 ring-[#2E3677]" />
            </span>
            <span className="hidden sm:inline">Tanya Toko</span>
          </>
        )}
      </button>
    </div>
  );
}
