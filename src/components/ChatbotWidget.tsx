"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  Bot,
  Loader2,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { STORE_INFO } from "@/payload/seed-data";
import { cn } from "@/lib/utils";

const QUICK_PROMPTS = [
  "Harga Kemplang Cap AMEN",
  "Cek Getas 250g & 500g",
  "Jam buka & alamat toko",
  "Produk harga grosir",
];

/**
 * Safely renders inline markdown bold (**text**), italic (*text*),
 * and links ([label](url)) into React nodes without dangerouslySetInnerHTML.
 */
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
    <div className="space-y-1.5 text-[13px] leading-relaxed break-words">
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

/**
 * Floating Store Assistant Chatbot + Direct WhatsApp launcher.
 */
export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
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

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2.5">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Asisten Virtual Toko Amen Snack"
          className="w-[calc(100vw-2rem)] sm:w-[390px] h-[min(76vh,540px)] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="bg-brand-red text-white px-4 py-3.5 flex items-center justify-between gap-2 shrink-0 border-b-2 border-brand-orange">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm leading-tight truncate">
                  Asisten Toko Amen Snack
                </p>
                <p className="text-[11px] text-slate-200 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Cek Harga, Stok &amp; Jam Buka Live</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={() => setMessages([])}
                  title="Mulai percakapan baru"
                  aria-label="Reset percakapan"
                  className="p-1.5 rounded-full hover:bg-white/15 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
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
            className="flex-1 overflow-y-auto bg-[#fafaf8] px-3.5 py-4 space-y-3"
          >
            {/* Welcome Card */}
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-3.5 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-red">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>Halo! Ada yang bisa saya bantu?</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Saya terhubung langsung ke katalog live{" "}
                <strong>Toko Amen Snack Sungailiat</strong>. Tanyakan harga
                eceran/grosir, ketersediaan stok, atau jam operasional kami.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {QUICK_PROMPTS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    disabled={isBusy}
                    onClick={() => handleSend(q)}
                    className="rounded-full bg-brand-soft hover:bg-slate-200/80 text-brand-dark border border-slate-200 px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {messages.map((message) => {
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

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    isUser ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-2xs",
                      isUser
                        ? "bg-brand-red text-white rounded-tr-sm text-[13px] leading-relaxed"
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
              );
            })}

            {isBusy && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-600 border border-slate-200 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-xs inline-flex items-center gap-2 shadow-2xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-red" />
                  <span>Mencari info produk...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-2.5 text-xs">
                Koneksi chat sempat terputus. Silakan kirim ulang atau hubungi{" "}
                <a
                  href={STORE_INFO.whatsappDirectCta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline"
                >
                  WhatsApp Admin
                </a>
                .
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-slate-200 p-3 space-y-2 shrink-0">
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
                placeholder="Tanya harga kemplang, stok, jam buka..."
                disabled={isBusy}
                className="flex-1 rounded-full border border-slate-300 bg-brand-slate px-4 py-2 text-xs sm:text-sm text-brand-dark focus:outline-none focus:border-brand-red focus:bg-white transition-colors"
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

            <div className="flex items-center justify-between px-1 text-[10px] text-slate-500">
              <span>Data sinkron real-time dengan toko</span>
              <a
                href={(() => {
                  const userQueries = messages
                    .filter((m) => m.role === "user")
                    .slice(-4)
                    .map((m) =>
                      (m.parts || [])
                        .filter(
                          (p): p is { type: "text"; text: string } =>
                            p.type === "text"
                        )
                        .map((p) => p.text)
                        .join(" ")
                        .trim()
                    )
                    .filter(Boolean);
                  if (userQueries.length === 0) return STORE_INFO.whatsappDirectCta;
                  const summaryText = `Halo Admin Toko Amen Snack, saya melanjutkan chat dari website:\n${userQueries
                    .map((q) => `- ${q}`)
                    .join("\n")}\n\nMohon bantuannya ya.`;
                  return `${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(summaryText)}`;
                })()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:underline"
              >
                <MessageCircle className="w-3 h-3" />
                {messages.length > 0 ? "Bawa Histori ke WA Admin" : "Chat Admin WA"}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Docked Floating Action Buttons (AI Assistant + Direct WhatsApp) */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Buka Asisten Chat Toko Amen Snack"
          className="inline-flex items-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-xs sm:text-sm pl-3.5 pr-4 h-11 sm:h-12 shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          {isOpen ? (
            <>
              <X className="w-4 h-4 shrink-0" />
              <span>Tutup Chat</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-rose-200 shrink-0" />
              <span>Tanya Toko</span>
            </>
          )}
        </button>

        <a
          href={STORE_INFO.whatsappDirectCta}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pesan via WhatsApp Toko Amen Snack"
          title="Chat Admin Toko Amen Snack (0813-6872-2622)"
          className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
        >
          <MessageCircle
            className="w-5 h-5 sm:w-6 sm:h-6 fill-white/15"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  );
}
