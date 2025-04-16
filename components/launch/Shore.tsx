'use client';
import { useContext } from "react";
import { ScrollProgressContext } from "./Story";
import Image from "next/image";
import { motion } from "motion/react";

export default function Shore() {
  const [scrollPercent, scrollToPercent] = useContext(ScrollProgressContext);

  return (
    <motion.div className="fixed z-10 w-screen" style={{
      // Clamp the bottom for scroll percent 5–15% and translate up
      bottom: `-${Math.min(Math.max(scrollPercent, 0) / 0.10 * 100, 100)}%`,
    }}>
      <div className="h-screen w-screen">
        <div
          className="h-screen md:aspect-video"
          style={{
            backgroundImage: `url('/shore.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hidden md:flex w-screen h-screen md:p-40 flex-col justify-start">
            <div className="py-4 px-8 rounded w-fit">
              <div className="text-7xl text-white font-bold uppercase">Shipwrecked</div>
              <div className="text-2xl font-bold uppercase p-3 bg-sky-400 w-fit bg-white">August 8-11</div>
              <div className="mt-6">
                <div className="text-base italic bg-sky-400 p-2 w-fit">(keep scrolling!)</div>
              </div>
            </div>
          </div>
          <div className="md:hidden w-screen h-screen flex flex-col items-start justify-center p-8 relative">
            <div className="translate-y-[-25vh]">
              <div className="text-5xl font-bold uppercase">Shipwrecked</div>
              <div className="text-2xl font-bold uppercase">August 8-11</div>
            </div>
            <button className="p-4 uppercase italic bg-sky-500 rounded-md" onClick={() => {
              scrollToPercent(0.30);
            }}>What&apos;s Shipwrecked?</button>
            <button className="absolute bottom-20 right-10 text-6xl" onClick={() => {
              scrollToPercent(0);
            }}>
              <img src="/back-arrow.png" alt="arrow" className="w-20 h-20 rotate-270" />
            </button>
          </div>
        </div>
      </div>
      <div className="h-screen w-screen md:flex md:justify-center bg-slate-400 md:bg-[url('/sand.png')] md:bg-auto relative" style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="hidden md:flex w-screen h-screen md:p-40 flex-col justify-end">
          <div className="py-4 px-8 bg-white/30 rounded w-fit">
            <h1 className="text-6xl font-bold mb-4">Something washes up on <br /><span className="italic">the shore...</span></h1>
            <p className="text-xl italic">(scroll to continue)</p>
          </div>
        </div>
        <div className="md:hidden bg-amber-100 w-screen h-screen flex flex-col items-center justify-center p-8">
          <button onClick={() => {
              scrollToPercent(0.10);
            }}>
            <span className="sr-only">Go to next section</span>
            <Image src="/bottle.png" alt="" width={690} height={403} className="h-[20vh] w-auto"  />
          </button>
          <div className="space-y-3 my-6">
            <div className="size-1 rounded-full bg-black"></div>
            <div className="size-1 rounded-full bg-black"></div>
            <div className="size-1 rounded-full bg-black"></div>
          </div>
          <h1 className="text-4xl font-bold mb-4 italic text-center">Something washes up on the shore...</h1>
        </div>
      </div>
    </motion.div>
  )
}