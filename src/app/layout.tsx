import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OSSOL - نظام إدارة الأصول",
  description: "نظام متكامل لإدارة الأصول والصيانة والتقارير المالية",
  keywords: ["OSSOL", "Asset Management", "إدارة الأصول", "Maintenance", "الصيانة"],
  authors: [{ name: "OSSOL Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "OSSOL - نظام إدارة الأصول",
    description: "نظام متكامل لإدارة الأصول والصيانة والتقارير المالية",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
