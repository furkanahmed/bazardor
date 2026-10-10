import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

export const metadata = {
  title: "বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের বাজারদর",
  description: "বাংলাদেশি নিত্যপ্রয়োজনীয় পণ্যের সঠিক বাজার দর ট্র্যাকিং ও তুলনা প্ল্যাটফর্ম।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={`${hindSiliguri.className} antialiased bg-white text-[#1D271F] min-h-screen flex flex-col`}>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        
        {/* Suspense দিয়ে র‍্যাপ করায় usePathname আর এরর দেবে না */}
        <Suspense fallback={<div className="h-18 bg-white border-b" />}>
          <Navbar />
        </Suspense>

        <PriceTicker />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
