import React from "react";

/**
 * Calm non-animated 8-card skeleton displayed during cold /produk navigation for low-spec PCs.
 */
export default function ProdukLoading() {
  return (
    <div className="min-h-screen bg-brand-soft overflow-x-clip">
      <div className="bg-brand-soft pt-8 pb-10 sm:pt-10 sm:pb-12 border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="h-3.5 w-28 rounded bg-slate-200/80 mb-3" />
          <div className="h-6 w-56 rounded-full bg-slate-200/80 mb-3" />
          <div className="h-10 w-80 max-w-full rounded-lg bg-slate-200/90" />
          <div className="h-5 w-[480px] max-w-full rounded bg-slate-200/70 mt-3" />
        </div>
      </div>

      <section className="py-10 sm:py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden"
              >
                <div className="aspect-square bg-slate-100" />
                <div className="p-4 sm:p-5 space-y-2.5">
                  <div className="h-3 w-24 rounded bg-slate-100" />
                  <div className="h-4 w-full rounded bg-slate-200/75" />
                  <div className="h-4 w-2/3 rounded bg-slate-100" />
                  <div className="pt-3 border-t border-slate-100 flex justify-between">
                    <div className="h-4 w-16 rounded bg-slate-100" />
                    <div className="h-5 w-20 rounded bg-slate-200/80" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
