import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL("https://dromfs.com"),
  title: "دکتر حامد کرمانی | متخصص جراحی فک و صورت",
  description:
    "فلوشیپ جراحی‌های کرانیوفیشال — ارتوسرجری، جراحی دو فک، جنیوپلاستی، بلفاروپلاستی، ایمپلنت و بازسازی فک. رزرو نوبت: 02166921500",
  keywords: [
    "جراحی فک و صورت",
    "ارتوسرجری",
    "دکتر حامد کرمانی",
    "جراحی دو فک",
    "جنیوپلاستی",
    "بلفاروپلاستی",
    "ایمپلنت دندان",
  ],
  openGraph: {
    title: "دکتر حامد کرمانی | متخصص جراحی فک و صورت",
    description:
      "متخصص جراحی فک و صورت — فلوشیپ جراحی‌های کرانیوفیشال. ارتوسرجری، جراحی دو فک، جنیوپلاستی، بلفاروپلاستی، ایمپلنت.",
    type: "website",
    images: ["/frames/poster.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
