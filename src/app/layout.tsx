import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#065f46",
};

export const metadata: Metadata = {
  title: "ঘাগড়া খিলমোগল হাকিম উদ্দিন সরকারি প্রাথমিক বিদ্যালয়",
  description: "Ghagra Khilmogal Hakim Uddin Government Primary School Official Website - Day to day activities, routine, notice board and academic information.",
  keywords: ["Ghagra Khilmogal Primary School", "ঘাগড়া খিলমোগল সরকারি প্রাথমিক বিদ্যালয়", "Primary Education Bangladesh", "DPE Notice"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-white text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
