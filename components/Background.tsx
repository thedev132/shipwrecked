'use client';
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Background() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      setScrollPercent(scrollTop / (scrollHeight - clientHeight));
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  console.log(scrollPercent);
  // 0: 0% movement, 33% translate up, then translate right
  const KEYFRAMES = [
    {
      step: 0,
      transform: "translate(0, 0)",
    },
    {
      step: 0.33,
      transform: "translate(-50%, -50%)",
    },
    {
      step: 1,
      transform: "translate(0, 0)",
    },
  ];

  return (
    <motion.div
      className="fixed w-full h-full bg-gradient-to-b from-[#000] to-[#fff] z-[-1]"
      style={{
        bottom: 0,
        left: 0,
      }}
    >
      <div className="grid grid-cols-2 fixed aspect-video place-center" style={{
        height: '200vh',
        // Clamp the bottom for scroll percent 5–15% and translate up
        bottom: `-${Math.min(Math.max(scrollPercent - 0.05, 0) / 0.15 * 100, 100)}%`,

        // Clamp the left for scroll percent 25–40% and translate right
        left: `-${Math.min(Math.max((scrollPercent - 0.30) / 0.15 * 100, 0), 100)}%`,
      }}>
        <div className="h-screen aspect-video relative flex items-center justify-center">
          <img src="/shore.png" alt="" className="h-screen aspect-video" style={{
            maxWidth: "unset",
          }} />

          <div className="absolute top-0 left-0 h-screen aspect-video flex flex-col items-center justify-center z-10">
            <h1 className="text-6xl font-bold text-white bg-slate-500 p-4">
              Shipwrecked
            </h1>
            <p className="text-xl text-white p-3 bg-blue-500">
              August 8-11
            </p>
          </div>
        </div>
        <div className="h-screen aspect-video relative">
          <img src="/hut.png" alt="" className="h-screen aspect-video" />
        </div>
        <div className="h-screen aspect-video relative">
          <img src="/sand.png" alt="" className="h-screen aspect-video" />

          <div className="absolute top-0 left-0 h-screen aspect-video flex flex-col items-center justify-center z-10">
            <h1 className="text-6xl font-bold text-white bg-slate-500 p-4">
              something washes up on the shore
            </h1>
            <p className="text-xl text-white p-3 bg-blue-500">
              wowow lots of lore
            </p>
        </div>
        <div className="h-screen aspect-video relative">
          <img src="/sand.png" alt="" className="h-screen aspect-video" />
        </div>
        </div>
      </div>
    </motion.div>

  )
}