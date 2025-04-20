'use client'

import { useContext } from "react";
import { ScrollProgressContext } from "./Story";

// import { motion } from "motion/react";

export default function Faq() {
  const [, scrollToPercent] = useContext(ScrollProgressContext);
  
  return (
    <div className="fixed inset-0 z-0">
      <div className="h-screen aspect-video flex" style={{
        backgroundImage: `url('/bay.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="w-screen h-screen flex flex-col items-end justify-center p-8 relative">
          <div className="bg-sky-200/30 p-6 rounded-md w-full max-w-4xl md:h-[70vh] backdrop-blur-md">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-black">FAQ</h1>

            <button className="mt-3 bg-sky-400 rounded p-4">idk text here</button>
          </div>

          <button className="md:hidden absolute top-5 bottom-auto left- text-6xl" onClick={() => {
            scrollToPercent(0.15);
          }}>
            <img src="/back-arrow.png" alt="arrow" className="w-20 h-20" />
          </button>
        </div>
        
      </div>
    </div>
  )
}