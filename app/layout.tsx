import type { Metadata } from "next";
import { Baloo_Da_2, Poppins } from "next/font/google";
import "./globals.css";
import "@/app/info/info.css";
import SignUpButton from "@/components/common/SignUpButton";

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
  title: "Shipwrecked",
  description: "Join us for an unforgettable four days of hacking and adventure at Shipwrecked!",
  openGraph: {
    title: "Shipwrecked",
    description: "Join us for an unforgettable four days of hacking and adventure at Shipwrecked!",
    siteName: "Shipwrecked",
  },
  twitter: {
    title: "Shipwrecked",
    description: "Join us for an unforgettable four days of hacking and adventure at Shipwrecked!",
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
        <link rel="stylesheet" href="https://use.typekit.net/mfm5adk.css" />
      </head>
      <body className={`${poppins.variable} ${baloo.variable}`}>
        <SignUpButton />
        {children}
      </body>
    </html>
  );
}
