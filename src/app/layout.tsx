import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const editorialSerif = localFont({ src: "./fonts/NotoSerif.ttf", variable: "--font-editorial", weight: "100 900", display: "swap" });

export const metadata: Metadata = {
  title: "Khoảng lặng — Ghi chép & suy ngẫm",
  description: "Một góc nhỏ dành cho những ghi chép về đời sống, việc đọc và những điều đáng nghĩ.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={editorialSerif.variable}>
      <body>
        <a className="skip-link" href="#noi-dung">Đến nội dung chính</a>
        {children}
      </body>
    </html>
  );
}
