"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User, ArrowLeft, Save, Sparkles, Camera, UploadCloud } from "lucide-react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("bazardor_user");
    if (!savedUser) {
      toast.error("অনুগ্রহ করে সাইন ইন করুন!");
      router.push("/signin");
    } else {
      try {
        const u = JSON.parse(savedUser);
        setName(u.name || "");
        setEmail(u.email || "");
        setImage(u.image || "");
      } catch (e) {
        router.push("/signin");
      }
    }
  }, [router]);

  // Convert uploaded image file to base64 string
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("ছবির সাইজ সর্বোচ্চ ২ মেগাবাইট হতে হবে!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        toast.success("ছবি নির্বাচন করা হয়েছে!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("অনুগ্রহ করে একটি বৈধ নাম লিখুন!");
      return;
    }

    setLoading(true);
    try {
      const updatedUser = { name: name.trim(), email, image };
      localStorage.setItem("bazardor_user", JSON.stringify(updatedUser));

      const storedUsers = JSON.parse(localStorage.getItem("bazardor_registered_users") || "[]");
      const userIndex = storedUsers.findIndex((u) => u.email === email);
      if (userIndex !== -1) {
        storedUsers[userIndex].name = name.trim();
        storedUsers[userIndex].image = image;
        localStorage.setItem("bazardor_registered_users", JSON.stringify(storedUsers));
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
      setTimeout(() => {
        router.push("/profile");
      }, 700);
    } catch (err) {
      toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-1.5 border-b border-slate-100 pb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>প্রোফাইল কাস্টমাইজেশন</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1D271F] tracking-tight">
            ব্যবহারকারীর তথ্য আপডেট
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            আপনার নাম এবং প্রোফাইল ছবি পরিবর্তন করুন
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          
          {/* প্রোফাইল ছবি আপলোড সেকশন */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50/70 border-2 border-dashed border-slate-200 rounded-2xl space-y-3">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-emerald-100 text-emerald-800 border-4 border-white shadow-md flex items-center justify-center text-3xl font-black">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt="Profile" className="w-full h-full object-cover" />
                ) : name ? (
                  name.charAt(0).toUpperCase()
                ) : (
                  <User className="w-10 h-10 text-emerald-600" />
                )}
              </div>
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md cursor-pointer hover:bg-emerald-700 hover:scale-105 transition-all"
                title="নতুন ছবি আপলোড করুন"
              >
                <Camera className="w-4 h-4" />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <div className="text-center">
              <label htmlFor="profile-upload" className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer inline-flex items-center gap-1">
                <UploadCloud className="w-4 h-4" />
                <span>কম্পিউটার থেকে ছবি বেছে নিন</span>
              </label>
              <p className="text-[11px] text-slate-400 mt-0.5">PNG, JPG বা WebP (সর্বোচ্চ ২MB)</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              আপনার নাম (Name)
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-[#1D271F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1.5">
              ইমেইল (পরিবর্তনযোগ্য নয়)
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-400 cursor-not-allowed font-medium"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <Link
              href="/profile"
              className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-sm transition-all"
            >
              বাতিল
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/25 hover:shadow-lg transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? "সংরক্ষণ হচ্ছে..." : "আপডেট তথ্য সংরক্ষণ করুন"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
