import type { Metadata } from "next";
import { Baloo_Da_2, Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Adjust weights as needed
});

const baloo = Baloo_Da_2({
  variable: "--font-baloo",
  weight: ["700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShipWrecked!",
  description: "Join us for an unforgettable weekend of hacking and adventure at ShipWrecked!",
  openGraph: {
    title: "ShipWrecked!",
    description: "Join us for an unforgettable weekend of hacking and adventure at ShipWrecked!",
    siteName: "ShipWrecked!",
  },
  twitter: {
    title: "ShipWrecked!",
    description: "Join us for an unforgettable weekend of hacking and adventure at ShipWrecked!",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${baloo.variable}`}>
        {children}
      </body>
    </html>
  );
}
