import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Quản trị — Khoảng lặng", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="site-container py-8">
    <header className="border-b border-rule pb-5"><Link className="font-serif text-2xl font-bold" href="/">Khoảng lặng</Link></header>
    {children}
  </div>;
}
