"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogIn, Mail, Lock, Store } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড দিন!");
      return;
    }

    setLoading(true);
    try {
      const storedUsers = JSON.parse(localStorage.getItem("bazardor_registered_users") || "[]");
      const matchedUser = storedUsers.find((u) => u.email === email && u.password === password);

      const activeUser = matchedUser || {
        name: email.split("@")[0] || "ব্যবহারকারী",
        email: email,
      };

      localStorage.setItem("bazardor_user", JSON.stringify(activeUser));
      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    } catch (err) {
      toast.error("লগইন করতে সমস্যা হয়েছে!");
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
    toast.success(`${provider} দিয়ে সফলভাবে সাইন ইন হয়েছে!`);
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
            স্বাগতম বাজার দর-এ
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            আপনার অ্যাকাউন্টে সাইন ইন করুন
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="••••••••"
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
            <LogIn className="w-4 h-4" />
            <span>{loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}</span>
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
            <span>Google দিয়ে সাইন ইন</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("GitHub")}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all cursor-pointer"
          >
            <span>GitHub দিয়ে সাইন ইন</span>
          </button>
        </div>

        {/* Switch to Sign Up */}
        <p className="text-center text-xs font-medium text-slate-500">
          নতুন ব্যবহারকারী?{" "}
          <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline">
            সাইন আপ করুন
          </Link>
        </p>

      </div>
    </div>
  );
}
