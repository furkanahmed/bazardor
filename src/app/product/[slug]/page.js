"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { toBnDigit } from "@/lib/utils";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  Loader2,
  ShieldAlert,
} from "lucide-react";

function ProductDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // 1. Protected Route Check
  useEffect(() => {
    const user = localStorage.getItem("bazardor_user");
    if (!user) {
      toast.error("প্রোডাক্টের বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন!");
      router.push("/signin");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  // 2. Fetch Product Data
  useEffect(() => {
    if (!authChecked || !slug) return;

    fetch(`https://api.api-store.workers.dev/api/bazardor/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        // সিঙ্গেল অবজেক্ট অথবা অ্যারে হতে পারে
        if (data && !data.error) {
          setProduct(Array.isArray(data) ? data[0] : data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [authChecked, slug]);

  if (!authChecked || loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        <p className="text-sm font-medium text-slate-500">পণ্যের বিস্তারিত তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto my-16 p-10 bg-white border border-slate-200 rounded-3xl text-center space-y-4 shadow-sm">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-[#1D271F]">পণ্যটি খুঁজে পাওয়া যায়নি</h2>
        <p className="text-sm text-slate-500">অনুরোধকৃত পণ্যের তথ্য সিস্টেমে বিদ্যমান নেই।</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pctVal = product.change?.pct ?? 0;

  // বাজার ভিত্তিক দামের বিশ্লেষণ
  const markets = product.markets || [];
  const minPrice = markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : product.today;
  const maxPrice = markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : product.today;
  const avgPrice =
    markets.length > 0
      ? Math.round(
          markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) / markets.length
        )
      : product.today;

  const unitBn =
    product.unit === "kg"
      ? "কেজি"
      : product.unit === "litre"
      ? "লিটার"
      : product.unit === "dozen"
      ? "ডজন"
      : "পিস";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সকল পণ্যের তালিকায় ফিরে যান</span>
        </Link>
      </div>

      {/* 1. Top Summary Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-center text-5xl sm:text-6xl shadow-inner">
            {product.image || "🏷️"}
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                {product.categoryNameBn || "নিত্যপণ্য"}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                প্রতি {unitBn}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#1D271F] tracking-tight">
              {product.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              আজকের বাজারের হালনাগাদ দর ও পাইকারি-খুচরা তুলনা
            </p>
          </div>
        </div>

        {/* Change status badge */}
        <div className="flex flex-col items-start md:items-end">
          <span className="text-xs font-semibold text-slate-500 mb-1">গতকালের তুলনায় পরিবর্তন</span>
          <div
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-bold ${
              isUp
                ? "bg-rose-50 text-rose-600 border border-rose-200"
                : isDown
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : "bg-slate-100 text-slate-600 border border-slate-200"
            }`}
          >
            {isUp ? (
              <TrendingUp className="w-4 h-4" />
            ) : isDown ? (
              <TrendingDown className="w-4 h-4" />
            ) : (
              <Minus className="w-4 h-4" />
            )}
            {isUp ? "▲ " : isDown ? "▼ " : "— "}
            {toBnDigit(pctVal)}%
          </div>
        </div>
      </div>

      {/* 2. Price Summary Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Today's Price */}
        <div className="bg-white border-2 border-emerald-500/80 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-xs font-bold text-emerald-700 block">আজকের বাজার দর</span>
          <div className="text-2xl sm:text-3xl font-black text-[#1D271F]">
            {toBnDigit(product.today)} <span className="text-sm font-bold text-emerald-600">টাকা</span>
          </div>
          <span className="text-[11px] text-slate-500 block">প্রতি {unitBn}</span>
        </div>

        {/* Min Price */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 block">সর্বনিম্ন মূল্য</span>
          <div className="text-2xl sm:text-3xl font-black text-[#1D271F]">
            {toBnDigit(minPrice)} <span className="text-sm font-bold text-slate-500">টাকা</span>
          </div>
          <span className="text-[11px] text-slate-500 block">বিভিন্ন বাজার বিশ্লেষণে</span>
        </div>

        {/* Max Price */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 block">সর্বোচ্চ মূল্য</span>
          <div className="text-2xl sm:text-3xl font-black text-[#1D271F]">
            {toBnDigit(maxPrice)} <span className="text-sm font-bold text-slate-500">টাকা</span>
          </div>
          <span className="text-[11px] text-slate-500 block">সর্বোচ্চ খুচরা দর</span>
        </div>

        {/* Average Price */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 block">গড় মূল্য</span>
          <div className="text-2xl sm:text-3xl font-black text-[#1D271F]">
            {toBnDigit(avgPrice)} <span className="text-sm font-bold text-slate-500">টাকা</span>
          </div>
          <span className="text-[11px] text-slate-500 block">সারাদেশের গড় দর</span>
        </div>

      </div>

      {/* 3. বাজারভিত্তিক আজকের দাম (Markets Breakdown Table/Grid) */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#1D271F]">
                বাজারভিত্তিক আজকের দাম
              </h2>
              <p className="text-xs text-slate-500">
                দেশের বিভিন্ন পাইকারি ও খুচরা বাজারের লাইভ রেট
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            {toBnDigit(markets.length)} টি বাজার অন্তর্ভুক্ত
          </span>
        </div>

        {markets.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-6">বাজারভিত্তিক কোনো অতিরিক্ত তথ্য নেই।</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {markets.map((m, index) => (
              <div
                key={index}
                className="bg-slate-50/70 hover:bg-emerald-50/40 border border-slate-200/80 hover:border-emerald-300 rounded-2xl p-4 transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#1D271F]">{m.market}</h3>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>{m.division} বিভাগ</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-white border border-slate-200 font-semibold px-2 py-0.5 rounded-full text-slate-600">
                    রেঞ্জ
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">সর্বনিম্ন:</span>
                    <span className="font-bold text-[#1D271F]">{toBnDigit(m.min)} ৳</span>
                  </div>
                  <span className="text-slate-300">—</span>
                  <div className="text-right">
                    <span className="text-slate-500 block text-[10px]">সর্বোচ্চ:</span>
                    <span className="font-bold text-[#1D271F]">{toBnDigit(m.max)} ৳</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default function ProductDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        </div>
      }
    >
      <ProductDetailsContent />
    </Suspense>
  );
}
