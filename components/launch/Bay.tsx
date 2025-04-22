'use client'

import { useContext } from "react";
import { ScrollProgressContext } from "./Story";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import TriggerButton from "./TriggerButton";

// import { motion } from "motion/react";

export default function Bay({ start, end }:{ start: number, end: number }) {
  const [scrollPercent] = useContext(ScrollProgressContext);

  const duration = end - start
  const section1 = start + (duration * 1 / 3);
  const section2 = start + (duration * 2 / 3);
  const section3 = end;
  
  return (
    <div className="fixed inset-0 z-0">
      <div className="h-screen w-screen aspect-video flex" style={{
        backgroundImage: `url('/bay.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}>
        <div className="w-screen h-screen flex flex-col items-end justify-end p-8 md:pb-20 relative">
          <div className="bg-sand/60 border border-sand p-6 rounded-md w-full max-w-4xl backdrop-blur-md text-dark-brown">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">The Bay</h1>

            <AnimatePresence>
              {scrollPercent < section1 && (
              <motion.p
                key="bay-intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-base md:text-xl py-2"
              >
                Through <span className="font-bold">The Bay</span>, you&apos;ll earn an invitation to Shipwrecked. In The Bay, you will spend 60 hours making projects with the goal of making them <span className="font-bold">go viral</span>.
              </motion.p>
              )}

              {/* 0.5 - 0.55 */}
              {scrollPercent >= section1 && scrollPercent < section2 && (
              <motion.p
                key="viral-criteria"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-base md:text-xl py-2"
              >
                Going viral means making a really polished project you are extremely proud of, which you then promote to get other people to check it out! You can find the criteria for virality <Link href="/info/go-viral" className="link">here</Link>. Once you reach 60 hours & one of your projects has gone viral, you&apos;ll receive an invitation to Shipwrecked!
              </motion.p>
              )}

              {/* 0.55 - 0.60 */}
              {scrollPercent >= section2 && (
              <motion.p
                key="teamwork"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-base md:text-xl py-2"
              >
                Every week, you can meet up with your friends either in person or over <Link href="https://pier.hackclub.com" className="link">The Pier</Link>, our video game-like digital meeting space to work! You are welcome — and encouraged — to team up with a friend to make a project! Just note that if you are working in a group, you all must log 60 hours respectively on <a href="https://hackatime.hackclub.com" className="link">Hackatime</a> toward your project.
              </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-5">
            {scrollPercent < section1 && (
              <div className="flex gap-4">
                <TriggerButton targetPercent={start - 0.2} backwards waves></TriggerButton>
                <TriggerButton targetPercent={section2}>What is &quot;going viral?&quot;</TriggerButton>
              </div>
            )}
            {scrollPercent >= section1 && scrollPercent < section2 && (
              <div className="flex gap-4">
                <TriggerButton targetPercent={section1} backwards></TriggerButton>
                <TriggerButton targetPercent={section3}>How can I meet my team?</TriggerButton>
              </div>
            )}
            {scrollPercent >= section2 && (
              <div className="flex gap-4">
                <TriggerButton targetPercent={section2} backwards></TriggerButton>
                <TriggerButton targetPercent={end + 0.1} waves>I have more questions!</TriggerButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}