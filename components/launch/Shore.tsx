'use client';
import { useContext } from "react";
import { ScrollProgressContext } from "./Story";
import Image from "next/image";
import { motion } from "motion/react";
import TriggerButton from "./TriggerButton";

export default function Shore() {
  const [scrollPercent, scrollToPercent] = useContext(ScrollProgressContext);

  return (
    <motion.div className="fixed z-10 w-screen" style={{
      // Clamp the bottom for scroll percent 5–15% and translate up
      bottom: `-${Math.min(Math.max(scrollPercent, 0) / 0.10 * 100, 100)}%`,
    }}>
      <div className="h-screen w-screen"
        style={{
          height: "200vh",
          backgroundImage: `url('/shore.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-screen md:aspect-video">
          <div className="flex w-screen h-screen md:px-30 md:py-20 px-15 py-10 flex-col justify-start">
            <div className="px-0 py-0 rounded w-fit">
              <Image src="/logo.png" width={0} height={0} alt="Shipwrecked" className="md:w-110 w-80 h-auto translate-x-[-25px]" />
              <div className="flex items-center">
                <Image src="/calendar-icon.png" width={0} height={0} alt="Calendar Icon" className="h-[3em] w-auto py-auto"/>
                <h2 className="md:text-3xl text-2xl font-bold text-white uppercase p-3 pl-1 w-fit text-outline-dark-blue">August 8 - 11, 2025</h2>
              </div>
              <div className="flex items-center">
                <Image src="/location-icon.png" width={0} height={0} alt="Location Icon" className="h-[3em] w-auto py-auto"/>
                <h2 className="md:text-3xl text-2xl font-bold text-white uppercase p-3 pl-1 w-fit text-outline-dark-blue">Cathleen Stone Island, Boston Harbor</h2>
              </div>
              <TriggerButton targetPercent={0.46}>What&apos;s Shipwrecked?</TriggerButton>
              <p className="text-sm italic text-sand py-2">(click here or scroll to continue)</p>
              <button className="absolute md:bottom-[calc(100vh+30px)] bottom-[calc(100vh+20px)] right-10 text-6xl" onClick={() => {
                scrollToPercent(0, 0.1);
              }}>
                <Image src="/back-arrow.png" width={80} height={80} alt="arrow" className="w-20 h-20 rotate-270" />
              </button>
            </div>
          </div>
        </div>
        <div className="w-screen h-screen flex flex-col items-center justify-center p-8">
          <button onClick={() => {
            scrollToPercent(0.10);
          }}>
            <span className="sr-only">Go to next section</span>
            <Image src="/bottle.png" alt="" style={{cursor: "pointer"}} width={690} height={403} className="h-auto md:w-[50vw] w-[75vw]"  />
          </button>
          <div className="space-y-3 my-6">
            <div className="size-2 rounded-full bg-[#3B2715]"></div>
            <div className="size-2 rounded-full bg-[#3B2715]"></div>
            <div className="size-2 rounded-full bg-[#3B2715]"></div>
          </div>
          <h1 className="text-5xl font-bold mb-4 italic text-center text-[#3B2715]">Something washes up on the shore...</h1>
          <p className="text-xl italic text-center text-[#3B2715]">(Click the bottle or scroll to continue)</p>
        </div>
      </div>
    </motion.div>
  )
}