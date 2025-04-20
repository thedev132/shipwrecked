'use client'

import { useContext } from "react";
import Image from "next/image";
import { ScrollProgressContext } from "./Story";
import FaqDisclosure from "./FaqDisclosure";
import Link from "next/link";

// import { motion } from "motion/react";

export default function Faq() {
  const [, scrollToPercent] = useContext(ScrollProgressContext);
  
  return (
    <div className="fixed inset-0 z-0">
      <div className="h-screen aspect-video flex" style={{
        backgroundImage: `url('/faq.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="w-screen h-screen flex flex-col items-center justify-center p-8 relative">
          <div className="bg-sky-blue/30 border border-sky-blue p-6 rounded-md w-full max-w-4xl md:h-[70vh] backdrop-blur-sm flex flex-col justify-between">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-dark-blue text-center">Frequently Asked Questions</h1>

              <FaqDisclosure />
            </div>
            <div className="mt-4">
              NOTE: You can find additional questions answered on the <Link className="link" href="/info">Shipwrecked Information Docs</Link>.
            </div>
          </div>

          <button className="md:hidden absolute top-5 bottom-auto left- text-6xl" onClick={() => {
            scrollToPercent(0.15);
          }}>
            <Image src="/back-arrow.png" alt="arrow" width={80} height={80} className="w-20 h-20" />
          </button>
        </div>
      </div>
    </div>
  )
}