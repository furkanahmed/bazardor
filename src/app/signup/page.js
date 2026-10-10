"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UserPlus, User, Mail, Lock, Store } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("অনুগ্রহ করে সব তথ্য পূরণ করুন!");
      return;
    }

    if (password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!");
      return;
    }

    setLoading(true);
    try {
      const newUser = { name, email, password };
      const storedUsers = JSON.parse(localStorage.getItem("bazardor_registered_users") || "[]");
      
      const alreadyExists = storedUsers.some((u) => u.email === email);
      if (alreadyExists) {
        toast.error("এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট আছে!");
        setLoading(false);
        return;
      }

      storedUsers.push(newUser);
      localStorage.setItem("bazardor_registered_users", JSON.stringify(storedUsers));

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! অনুগ্রহ করে সাইন ইন করুন।");
      setTimeout(() => {
        router.push("/signin");
      }, 1000);
    } catch (err) {
      toast.error("অ্যাকাউন্ট তৈরিতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    const demoUser = {
      name: provider === "Google" ? "গুগল ব্যবহারকারী" : "গিটহাব ব্যবহারকারী",
      email: `${provider.toLowerCase()}user@bazardor.com`,
    };
    localStorage.setItem("bazardor_user", JSON.stringify(demoUser));
    toast.success(`${provider} দিয়ে সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!`);
    setTimeout(() => {
      window.location.href = "/";
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl space-y-8">
        
        {/* Title & Logo */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/25">
            <Store className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1D271F] tracking-tight">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            প্রতিদিনের হালনাগাদ বাজারদর জানতে যুক্ত হোন
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">আপনার পূর্ণ নাম</label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: সাকিব হাসান"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-[#1D271F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">ইমেইল ঠিকানা</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-[#1D271F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">পাসওয়ার্ড</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৬ অক্ষর"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-[#1D271F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>{loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider absolute">অথবা</span>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin("Google")}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all cursor-pointer"
          >
            <span>Google দিয়ে সাইন আপ</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("GitHub")}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all cursor-pointer"
          >
            <span>GitHub দিয়ে সাইন আপ</span>
          </button>
        </div>

        {/* Switch to Sign In */}
        <p className="text-center text-xs font-medium text-slate-500">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline">
            সাইন ইন করুন
          </Link>
        </p>

      </div>
    </div>
  );
}
