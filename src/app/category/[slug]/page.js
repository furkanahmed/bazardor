"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { ChevronDown, ArrowLeft, AlertCircle, ShoppingBag, Loader2 } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

function CategoryContent() {
  const params = useParams();
  const slug = params?.slug;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default"); // default | asc | desc
  const [categoryInfo, setCategoryInfo] = useState(null);

  const categoryNames = {
    chal: { name: "চাল", icon: "🍚" },
    dal: { name: "ডাল", icon: "🫘" },
    tel: { name: "তেল", icon: "🛢️" },
    sobji: { name: "সবজি", icon: "🥬" },
    mach: { name: "মাছ", icon: "🐟" },
    mangsho: { name: "মাংস", icon: "🍗" },
    "dim-dui": { name: "ডিম-দুধ", icon: "🥚" },
    mosla: { name: "মসলা", icon: "🧂" },
  };

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    fetch(`${API_BASE_URL}/products?category=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
          if (data.length > 0) {
            setCategoryInfo({
              name: data[0].categoryNameBn || categoryNames[slug]?.name || slug,
              icon: data[0].categoryIcon || categoryNames[slug]?.icon || "🛒",
            });
          } else if (categoryNames[slug]) {
            setCategoryInfo(categoryNames[slug]);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching category products:", err);
        setLoading(false);
      });
  }, [slug]);

  // Sort products by numerical price (Asc/Desc)
  const sortedProducts = [...products].sort((a, b) => {
    const priceA = Number(a.today || 0);
    const priceB = Number(b.today || 0);

    if (sortOption === "asc") return priceA - priceB;
    if (sortOption === "desc") return priceB - priceA;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>মূল পাতায় ফিরে যান</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl shadow-inner">
            {categoryInfo?.icon || categoryNames[slug]?.icon || "📦"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1D271F]">
              {categoryInfo?.name || categoryNames[slug]?.name || slug} এর বাজারদর
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              আজকের হালনাগাদ খুচরা ও পাইকারি বাজার মূল্য
            </p>
          </div>
        </div>

        {products.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs sm:text-sm font-semibold text-slate-600 whitespace-nowrap">
              সাজান:
            </span>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-white border border-slate-300 hover:border-emerald-500 text-[#1D271F] text-xs sm:text-sm font-semibold rounded-xl pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-xs cursor-pointer transition-all"
              >
                <option value="default">ডিফল্ট</option>
                <option value="asc">দাম: কম থেকে বেশি</option>
                <option value="desc">দাম: বেশি থেকে কম</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col justify-between min-h-[138px] animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-200 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                  <div className="h-3 bg-slate-200 rounded-md w-1/2" />
                </div>
              </div>
              <div className="flex justify-between items-end mt-3 pt-2">
                <div className="space-y-1.5 w-1/2">
                  <div className="h-2.5 bg-slate-200 rounded w-1/2" />
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                </div>
                <div className="w-14 h-6 bg-slate-200 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm space-y-5 my-12">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#1D271F]">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h2>
            <p className="text-sm text-slate-500">
              ক্যাটাগরির স্লাগটি সঠিক নয় অথবা সাময়িকভাবে কোনো পণ্যের তথ্য নেই।
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id || product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
        </div>
      }
    >
      <CategoryContent />
    </Suspense>
  );
}
