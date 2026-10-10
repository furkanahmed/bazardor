"use client";

import { Store, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Left Text */}
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-400" />
            <p className="text-sm font-medium text-slate-200">
              বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          {/* Right Notice */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="italic">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
}
