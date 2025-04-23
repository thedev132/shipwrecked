'use client'

import { useContext, useEffect, useState } from "react";
import { ScrollProgressContext } from "./Story";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import TriggerButton from "./TriggerButton";

// iOS detection
const isIOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

export default function Bay({ start, end, previous, next }:{ start: number, end: number, previous: number, next: number }) {
  const [scrollPercent] = useContext(ScrollProgressContext);
  const [optimizedScroll, setOptimizedScroll] = useState(0);
  const [currentSection, setCurrentSection] = useState('intro');

  // Debounce scroll updates for iOS
  useEffect(() => {
    if (isIOS) {
      const timeout = setTimeout(() => {
        setOptimizedScroll(scrollPercent);
      }, 100); // Increased debounce time
      return () => clearTimeout(timeout);
    } else {
      setOptimizedScroll(scrollPercent);
    }
  }, [scrollPercent]);

  // Update section with debounce
  useEffect(() => {
    if (isIOS) {
      const timeout = setTimeout(() => {
        if (optimizedScroll < subsections.viral.start) {
          setCurrentSection('intro');
        } else if (optimizedScroll < subsections.teamwork.start) {
          setCurrentSection('viral');
        } else {
          setCurrentSection('teamwork');
        }
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [optimizedScroll]);

  const startWithWaveOffset = start + 0.075;
  const endWithWaveOffset = end - 0.075;

  const duration = endWithWaveOffset - startWithWaveOffset

  const subsections = {
    intro: { start: start, end: startWithWaveOffset + (duration * 1 / 3) },
    viral: { start: startWithWaveOffset + (duration * 1 / 3), end: startWithWaveOffset + (duration * 2 / 3) },
    teamwork: { start: startWithWaveOffset + (duration * 2 / 3), end: endWithWaveOffset },
  }
  
  return (
    <div className={`fixed inset-0 z-0 ${isIOS ? 'transform-gpu' : ''}`}>
      <div className="h-screen w-screen aspect-video flex" style={{
        backgroundImage: `url('/bay.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
        ...(isIOS ? { transform: 'translateZ(0)', willChange: 'transform' } : {})
      }}>
        <div className="w-screen h-screen flex flex-col items-end justify-end p-8 md:pb-20 relative">
          <div className="bg-sand/60 border border-sand p-6 rounded-md w-full max-w-4xl backdrop-blur-md text-dark-brown">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {currentSection === 'intro' ? "The Bay, Part 1" :
               currentSection === 'viral' ? "The Bay, Part 2" :
               "The Bay, Part 3"}
            </h1>

            {isIOS ? (
              <div className="relative">
                <div 
                  className={`absolute transition-opacity duration-300 ${currentSection === 'intro' ? 'opacity-100' : 'opacity-0'}`}
                >
                  <p className="text-base md:text-xl py-2">
                    Through <span className="font-bold">The Bay</span>, you&apos;ll earn an invitation to Shipwrecked. In The Bay, you will spend 60 hours making 4 projects (about 15 hours each) with the goal of making them <span className="font-bold">go viral</span>.
                  </p>
                </div>
                <div 
                  className={`absolute transition-opacity duration-300 ${currentSection === 'viral' ? 'opacity-100' : 'opacity-0'}`}
                >
                  <p className="text-base md:text-xl py-2">
                    Going viral means making really polished projects you are extremely proud of, which you then promote to get other people to check it out! You can find the criteria for virality <Link href="/info/go-viral" className="link">here</Link>. Once you reach 60 hours, ship 4 projects & one of your projects has gone viral, you&apos;ll receive an invitation to Shipwrecked!
                  </p>
                </div>
                <div 
                  className={`absolute transition-opacity duration-300 ${currentSection === 'teamwork' ? 'opacity-100' : 'opacity-0'}`}
                >
                  <p className="text-base md:text-xl py-2">
                    Every week, you can meet up with your friends either in person or over <Link href="https://pier.hackclub.com" className="link">The Pier</Link>, our video game-like digital meeting space to work!
                  </p>
                </div>
              </div>
            ) : (
              <AnimatePresence>
                {optimizedScroll < subsections.intro.end && (
                <motion.p
                  key="bay-intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-base md:text-xl py-2"
                >
                  Through <span className="font-bold">The Bay</span>, you&apos;ll earn an invitation to Shipwrecked. In The Bay, you will spend 60 hours making 4 projects (about 15 hours each) with the goal of making them <span className="font-bold">go viral</span>.
                </motion.p>
                )}

                {optimizedScroll >= subsections.viral.start && optimizedScroll < subsections.viral.end && (
                <motion.p
                  key="viral-criteria"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-base md:text-xl py-2"
                >
                  Going viral means making really polished projects you are extremely proud of, which you then promote to get other people to check it out! You can find the criteria for virality <Link href="/info/go-viral" className="link">here</Link>. Once you reach 60 hours, ship 4 projects & one of your projects has gone viral, you&apos;ll receive an invitation to Shipwrecked!
                </motion.p>
                )}

                {optimizedScroll >= subsections.teamwork.start && (
                <motion.p
                  key="teamwork"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-base md:text-xl py-2"
                >
                  Every week, you can meet up with your friends either in person or over <Link href="https://pier.hackclub.com" className="link">The Pier</Link>, our video game-like digital meeting space to work!
                </motion.p>
                )}
              </AnimatePresence>
            )}
          </div>
          <div className="mt-5">
            {currentSection === 'intro' && (
              <div className="flex gap-4">
                <TriggerButton targetPercent={previous-0.3} backwards waves></TriggerButton>
                <TriggerButton targetPercent={subsections.viral.start+0.01}>What is &quot;going viral?&quot;</TriggerButton>
              </div>
            )}
            {currentSection === 'viral' && (
              <div className="flex gap-4">
                <TriggerButton targetPercent={subsections.intro.end-0.01} backwards></TriggerButton>
                <TriggerButton targetPercent={subsections.teamwork.start+0.01}>How can I meet my team?</TriggerButton>
              </div>
            )}
            {currentSection === 'teamwork' && (
              <div className="flex gap-4">
                <TriggerButton targetPercent={subsections.viral.start+0.01} backwards></TriggerButton>
                <TriggerButton targetPercent={next} waves>I have more questions!</TriggerButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}