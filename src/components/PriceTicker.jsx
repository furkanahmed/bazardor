"use client";

import { useEffect, useState } from "react";
import { toBnDigit } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function PriceTicker() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // API থেকে প্রোডাক্ট ডাটা ফেচ
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(() => {
        // ফলব্যাক ডামি ডাটা যদি নেটওয়ার্ক অফলাইন থাকে
        setProducts([
          { id: 1, nameBn: "মিনিকেট চাল", emoji: "🍚", priceToday: 72, unit: "কেজি", change: 2.5 },
          { id: 2, nameBn: "মসুর ডাল", emoji: "🫘", priceToday: 135, unit: "কেজি", change: -1.8 },
          { id: 3, nameBn: "সয়াবিন তেল", emoji: "🛢️", priceToday: 185, unit: "লিটার", change: 0.0 },
          { id: 4, nameBn: "আলু (দেশি)", emoji: "🥔", priceToday: 55, unit: "কেজি", change: 3.2 },
          { id: 5, nameBn: "পেঁয়াজ", emoji: "🧅", priceToday: 110, unit: "কেজি", change: -4.5 },
        ]);
      });
  }, []);

  if (products.length === 0) return null;

  // স্মুথ স্ক্রলিং এর জন্য লিস্টকে ডাবল করা হলো
  const tickerItems = [...products, ...products];

  return (
    <div className="bg-slate-900 text-white text-xs py-2 overflow-hidden border-b border-slate-800 shadow-inner">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-6">
        {tickerItems.map((item, idx) => {
          const changeVal = Number(item.change || 0);
          const isUp = changeVal > 0;
          const isDown = changeVal < 0;

          return (
            <div key={`${item.id}-${idx}`} className="inline-flex items-center gap-2 px-2">
              <span className="text-sm">{item.emoji || "🏷️"}</span>
              <span className="font-semibold text-slate-200">{item.nameBn || item.name}</span>
              <span className="text-emerald-400 font-medium">
                {toBnDigit(item.priceToday || item.price)} ৳/{item.unit || "কেজি"}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-semibold ${
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
                {toBnDigit(Math.abs(changeVal))}%
              </span>
              <span className="text-slate-600 ml-2">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
