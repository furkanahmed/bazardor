"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getBanglaDate } from "@/lib/utils";
import { Store, User, LogOut, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [banglaDate, setBanglaDate] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setBanglaDate(getBanglaDate());
    // লোকালস্টোরেজ বা সেশন থেকে ইউজার চেক
    const savedUser = localStorage.getItem("bazardor_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bazardor_user");
    setUser(null);
    window.location.href = "/";
  };

    const navLinks = [
    { name: "হোম", href: "/" },
    { name: "চাল", href: "/category/chal" },
    { name: "ডাল", href: "/category/dal" },
    { name: "তেল", href: "/category/tel" },
    { name: "সবজি", href: "/category/sobji" },
    { name: "মাছ", href: "/category/mach" },
    { name: "মাংস", href: "/category/mangsho" },
    { name: "ডিম-দুধ", href: "/category/dim-dui" },
    { name: "মসলা", href: "/category/mosla" },
  ];


  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-18 border-b border-slate-100">
          {/* Logo & Bangla Date */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>বাজার দর</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">লাইভ</span>
              </div>
              <p className="text-xs text-slate-700 font-medium">{banglaDate || "আজকের তারিখ"}</p>
            </div>
          </Link>

          {/* User Auth Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 rounded-lg transition-colors border border-slate-200"
                >
                  {user.image ? <img src={user.image} alt="User" className="w-5 h-5 rounded-full object-cover" /> : <User className="w-4 h-4 text-emerald-600" />}
                  <span>{user.name || "আমার প্রোফাইল"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">লগআউট</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>সাইন ইন</span>
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm shadow-emerald-600/20 hover:shadow-md transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>সাইন আপ</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Category Navigation Bar */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

