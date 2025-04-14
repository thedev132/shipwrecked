"use client";

import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import info from "@/app/info/info.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function MDInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get current pathname to determine active link
  const pathname = usePathname?.() || "";
  const currentId = pathname.split("/").pop();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <div className="flex min-h-screen">
          {/* Left side menu */}
          <aside className="w-64 bg-sky-100 p-6 shadow-md">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-sky-800">Shipwrecked</h1>
              <p className="text-sm text-sky-600 mt-1">August 8-11</p>
            </div>
            <nav>
              <ul className="space-y-3">
                {/* Dynamically generate links from info.json */}
                {info.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/info/${item.name}`}
                      className={`block py-2 px-4 rounded transition ${
                        currentId === item.name
                          ? "bg-sky-200 font-medium"
                          : "hover:bg-sky-200"
                      }`}
                    >
                      {/* Capitalize first letter of name for display */}
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-8 bg-white">
            <div className="max-w-3xl mx-0">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
