import React from "react";
import { MessageCircle } from "lucide-react";
import { STORE_INFO } from "@/payload/seed-data";

/**
 * Floating WhatsApp quick-order button fixed in bottom-right viewport.
 */
export function WhatsAppFab() {
  return (
    <a
      href={STORE_INFO.whatsappDirectCta}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pesan via WhatsApp Toko Amen Snack"
      title="Chat Admin Toko Amen Snack (0813-6872-2622)"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl transition-transform hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
    >
      <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-white/15" aria-hidden="true" />
    </a>
  );
}
