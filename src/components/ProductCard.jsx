"use client";

import Link from "next/link";
import { toBnDigit } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";

export default function ProductCard({ product }) {
  if (!product) return null;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pctVal = product.change?.pct ?? 0;

  const getUnitBn = (unit) => {
    if (unit === "kg") return "কেজি";
    if (unit === "litre") return "লিটার";
    if (unit === "dozen") return "ডজন";
    return unit || "কেজি";
  };

  return (
    <Link
      href={`/product/${product.slug || product.id}`}
      className="group bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/90 hover:border-emerald-500 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between min-h-[138px]"
    >
      {/* Top Row: Emoji Icon + Title + Unit */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
          {product.image || "🏷️"}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors truncate">
            {product.nameBn}
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            প্রতি {getUnitBn(product.unit)}
          </p>
        </div>
      </div>

      {/* Bottom Row: Today's Price (Left) + Change Badge (Right) */}
      <div className="flex items-end justify-between mt-3 pt-2">
        <div>
          <span className="text-[11px] font-medium text-slate-400 block leading-tight">
            আজকের দাম
          </span>
          <div className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight mt-0.5">
            {toBnDigit(product.today)}{" "}
            <span className="text-xs font-semibold text-slate-600">টাকা</span>
          </div>
        </div>

        {/* Change Badge (Figma style) */}
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold ${
            isUp
              ? "bg-rose-50 text-rose-600 border border-rose-200"
              : isDown
              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
              : "bg-slate-50 text-slate-600 border border-slate-200"
          }`}
        >
          {isUp ? (
            <TrendingUp className="w-3 h-3 text-rose-600" />
          ) : isDown ? (
            <TrendingDown className="w-3 h-3 text-emerald-600" />
          ) : (
            <Minus className="w-3 h-3 text-slate-400" />
          )}
          {isUp ? "▲ " : isDown ? "▼ " : "— "}
          {toBnDigit(pctVal)}%
        </span>
      </div>
    </Link>
  );
}
