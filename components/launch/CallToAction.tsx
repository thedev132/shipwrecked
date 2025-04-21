'use client'

import { useContext } from "react";
import Image from "next/image";
import { ScrollProgressContext } from "./Story";
import Link from "next/link";

// import { motion } from "motion/react";
export default function Faq({ previous }:{ previous: number }) {
  const [, scrollToPercent] = useContext(ScrollProgressContext);
  
  return (
    <div className="fixed inset-0 z-0">
      <div className="h-screen w-screen aspect-video flex" style={{
        backgroundImage: `url('/faq.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="w-screen h-screen flex flex-col items-center justify-center p-8 relative">
          <div className="bg-sky-blue/30 border border-sky-blue p-6 rounded-md w-full max-w-4xl md:h-[70vh] backdrop-blur-sm flex flex-col justify-between text-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-dark-blue text-center">Unlock Shipwrecked</h1>
            </div>
            <div className="mt-4">
              NOTE: You can find additional questions answered on the <Link className="link" href="/info">Shipwrecked Information Docs</Link>.
            </div>
          </div>

          <button className="absolute top-5 bottom-auto left-5 text-6xl" onClick={() => {
            scrollToPercent(previous);
          }}>
            <Image src="/back-arrow.png" alt="arrow" width={80} height={80} className="w-20 h-20" />
          </button>
        </div>
      </div>
    </div>
  )
}