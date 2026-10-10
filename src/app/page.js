"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { ArrowDownCircle, Sparkles, TrendingUp, TrendingDown, LayoutGrid, Loader2 } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch live product list from API
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  // Top 6 price risers today
  const risingProducts = [...products]
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  // Top 6 price fallers today
  const fallingProducts = [...products]
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="pb-16 space-y-16">
      {/* 1. Hero / Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent border-b border-emerald-100/60 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold shadow-xs">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>দৈনন্দিন বাজার দর যাচাই করুন সহজে</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                সঠিক দামে কিনুন, <br />
                <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy decoration-2">
                  বাজার দর জানুন
                </span> প্রতিদিন!
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                রাজধানী ঢাকাসহ দেশের প্রধান পাইকারি ও খুচরা বাজারের নিত্যপ্রয়োজনীয় পণ্যের হালনাগাদ দরদাম এক ক্লিকেই জানুন। নিরাপদ কেনাকাটার আপনার নির্ভরযোগ্য মাধ্যম।
              </p>

              {/* Primary CTA Button: Scrolls down to #সব-পণ্য on the same page */}
              <div className="pt-2">
                <a
                  href="#সব-পণ্য"
                  className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <span>আজকের সব পণ্যের তালিকা</span>
                  <ArrowDownCircle className="w-5 h-5 animate-bounce" />
                </a>
              </div>
            </div>

            {/* Right Banner Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-emerald-100/50">
                <Image
                  src="/bazar-hero.png"
                  alt="বাজার দর হিরো ব্যানার"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto" />
          <p className="text-slate-500 font-medium text-sm">বাজারের হালনাগাদ তথ্য লোড হচ্ছে...</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* 2. Section A: আজ দাম বেড়েছে ▲ */}
          {risingProducts.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                      আজ দাম বেড়েছে ▲
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">গতকালের তুলনায় দাম বৃদ্ধি পাওয়া শীর্ষ পণ্যসমূহ</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {risingProducts.map((product) => (
                  <ProductCard key={product.id || product.slug} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* 3. Section B: আজ দাম কমেছে ▼ */}
          {fallingProducts.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                      আজ দাম কমেছে ▼
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">আজকের বাজারে স্বস্তিদায়ক দরে বিক্রি হওয়া পণ্যসমূহ</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {fallingProducts.map((product) => (
                  <ProductCard key={product.id || product.slug} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* 4. Section C: সব পণ্য (#সব-পণ্য anchor id) */}
          <section id="সব-পণ্য" className="space-y-6 scroll-mt-24">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    সব পণ্য
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">সকল নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজার তালিকা</p>
                </div>
              </div>
            </div>

            {/* Responsive Grid (3-4 cols on large screens, collapses on mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((product) => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
            </div>
          </section>

        </div>
      )}
    </div>
  );
}
