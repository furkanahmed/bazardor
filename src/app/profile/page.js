"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User, Mail, ShieldCheck, Edit3, ArrowLeft, LogOut } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("bazardor_user");
    if (!savedUser) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন!");
      router.push("/signin");
    } else {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        router.push("/signin");
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("bazardor_user");
    toast.success("সফলভাবে লগআউট হয়েছে!");
    setTimeout(() => {
      window.location.href = "/";
    }, 600);
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>মূল পাতায় ফিরে যান</span>
        </Link>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-5">
            {/* User Avatar: ছবি থাকলে ছবি, না থাকলে নামের আদ্যক্ষর */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-3xl shadow-inner border border-emerald-200">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt="User Avatar" className="w-full h-full object-cover" />
              ) : (
                user.name ? user.name.charAt(0).toUpperCase() : "U"
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-[#1D271F]">
                  {user.name || "ব্যবহারকারী"}
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ভেরিফাইড
                </span>
              </div>
              <p className="text-sm text-slate-500 font-medium mt-1">{user.email}</p>
            </div>
          </div>

          <Link
            href="/profile/update"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all self-start sm:self-auto cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>তথ্য আপডেট করুন</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <User className="w-4 h-4 text-emerald-600" />
              <span>পূর্ণ নাম</span>
            </div>
            <p className="text-base font-bold text-[#1D271F]">{user.name || "উল্লেখ নেই"}</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Mail className="w-4 h-4 text-emerald-600" />
              <span>ইমেইল অ্যাকাউন্ট</span>
            </div>
            <p className="text-base font-bold text-[#1D271F]">{user.email || "উল্লেখ নেই"}</p>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
}
