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
      href={`/product/${product.id || product.slug}`}
      className="group bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-emerald-500 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Emoji & Badge Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-center text-3xl shadow-xs group-hover:scale-110 transition-transform">
            {product.image || "🏷️"}
          </div>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
              isUp
                ? "bg-rose-50 text-rose-600 border border-rose-200"
                : isDown
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : "bg-slate-100 text-slate-600 border border-slate-200"
            }`}
          >
            {isUp ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : isDown ? (
              <TrendingDown className="w-3.5 h-3.5" />
            ) : (
              <Minus className="w-3.5 h-3.5" />
            )}
            {isUp ? "▲ " : isDown ? "▼ " : "— "}
            {toBnDigit(pctVal)}%
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-[#1D271F] group-hover:text-emerald-700 transition-colors line-clamp-1">
          {product.nameBn}
        </h3>

        {/* Unit Line */}
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          প্রতি {getUnitBn(product.unit)}
        </p>
      </div>

      {/* Price & Details Link */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-end justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-500 block">
            আজকের দাম
          </span>
          <div className="text-xl font-extrabold text-[#1D271F] tracking-tight">
            {toBnDigit(product.today)}{" "}
            <span className="text-sm font-bold text-emerald-600">টাকা</span>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white text-emerald-700 flex items-center justify-center transition-all shadow-xs">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
