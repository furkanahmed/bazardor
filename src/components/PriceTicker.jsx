"use client";

import { useEffect, useState } from "react";
import { toBnDigit } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export default function PriceTicker() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(() => {});
  }, []);

  if (products.length === 0) return null;

  const tickerItems = [...products, ...products];

  return (
    <div className="bg-[#1D271F] text-white text-xs py-2 overflow-hidden border-b border-emerald-950 shadow-inner">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-6">
        {tickerItems.map((item, idx) => {
          const isUp = item.change?.dir === "up";
          const isDown = item.change?.dir === "down";
          const pctVal = item.change?.pct ?? 0;

          return (
            <div key={`${item.id}-${idx}`} className="inline-flex items-center gap-2 px-2">
              <span className="text-sm">{item.image || "🏷️"}</span>
              <span className="font-semibold text-slate-100">{item.nameBn}</span>
              <span className="text-emerald-400 font-bold">
                {toBnDigit(item.today)} ৳/{item.unit === "kg" ? "কেজি" : item.unit === "litre" ? "লিটার" : item.unit === "dozen" ? "ডজন" : "পিস"}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-bold ${
                  isUp
                    ? "bg-rose-500/20 text-rose-400"
                    : isDown
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-slate-700 text-slate-300"
                }`}
              >
                {isUp ? (
                  <TrendingUp className="w-3 h-3" />
                ) : isDown ? (
                  <TrendingDown className="w-3 h-3" />
                ) : (
                  <Minus className="w-3 h-3" />
                )}
                {toBnDigit(pctVal)}%
              </span>
              <span className="text-slate-500 ml-2">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
