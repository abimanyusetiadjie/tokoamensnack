"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

type ChatbotWidgetComponent = React.ComponentType<{
  initialOpen?: boolean;
  initialPrompt?: string | null;
}>;

/**
 * Lightweight lazy-mounted Store Assistant launcher so @ai-sdk/react and catalog maps
 * never bloat initial JS parse time on Windows 7 / Chrome 109 until hovered or opened.
 */
export function WhatsAppFab() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [wantsOpen, setWantsOpen] = useState(false);
  const [queuedPrompt, setQueuedPrompt] = useState<string | null>(null);
  const [LoadedWidget, setLoadedWidget] = useState<ChatbotWidgetComponent | null>(
    null
  );

  useEffect(() => {
    const onOpenChat = (event: Event) => {
      const custom = event as CustomEvent<{ prompt?: string }>;
      if (custom?.detail?.prompt) {
        setQueuedPrompt(custom.detail.prompt);
      }
      setWantsOpen(true);
      setShouldLoad(true);
    };
    window.addEventListener("amen:open-chat", onOpenChat);
    return () => window.removeEventListener("amen:open-chat", onOpenChat);
  }, []);

  useEffect(() => {
    if (!shouldLoad || LoadedWidget) return;
    let active = true;
    import("@/components/ChatbotWidget")
      .then((mod) => {
        if (active) {
          setLoadedWidget(() => mod.ChatbotWidget);
        }
      })
      .catch(() => {
        if (active) {
          setWantsOpen(false);
          setShouldLoad(false);
        }
      });
    return () => {
      active = false;
    };
  }, [shouldLoad, LoadedWidget]);

  if (LoadedWidget) {
    return (
      <LoadedWidget
        initialOpen={wantsOpen}
        initialPrompt={queuedPrompt}
      />
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2.5">
      <button
        type="button"
        onMouseEnter={() => setShouldLoad(true)}
        onFocus={() => setShouldLoad(true)}
        onTouchStart={() => setShouldLoad(true)}
        onClick={() => {
          setWantsOpen(true);
          setShouldLoad(true);
        }}
        aria-expanded={false}
        aria-label="Buka Asisten Toko & WhatsApp Toko Amen Snack"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-xs sm:text-sm w-12 h-12 sm:w-auto sm:h-12 sm:pl-3.5 sm:pr-4 shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-white/15"
      >
        {wantsOpen ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          <span className="relative flex items-center justify-center">
            <WhatsAppIcon className="w-5 h-5 sm:w-4 sm:h-4 text-[#25D366] shrink-0" />
            <Sparkles className="w-2.5 h-2.5 text-amber-300 absolute -top-1 -right-1 shrink-0" />
          </span>
        )}
        <span className="hidden sm:inline">Tanya Toko</span>
      </button>
    </div>
  );
}
