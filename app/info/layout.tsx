"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import info from "@/app/info/info.json";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Adjust weights as needed
});

export default function MDInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get current pathname to determine active link
  const pathname = typeof window !== "undefined" ? usePathname() || "" : "";
  const currentId = pathname.split("/").pop();

  return (
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
                      href={`/info/${item.slug}`}
                      className={`block py-2 px-4 rounded text-center transition ${
                        currentId === item.name
                          ? "bg-sky-400 font-medium" // Darker active background
                          : "bg-sky-200 hover:bg-sky-300" // Slightly darker default and hover backgrounds
                      }`}
                    >
                      {item.name}
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
  );
}
