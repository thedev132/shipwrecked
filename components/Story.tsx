'use client';
import { motion, useMotionValue, animate } from "motion/react";
import { createContext, useEffect, useState } from "react";
import Shore from "./Shore";
import Info from "./Info";

export const ScrollProgressContext = createContext<[number, (n: number) => void]>([0, () => {}]);

export default function Story() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const motionValue = useMotionValue(scrollPercent);

  useEffect(() => {
    // Sync motion value to scrollPercent
    const unsubscribe = motionValue.on("change", (latest: number) => {
      setScrollPercent(latest);
      // set scrolltop to match scrollpercent
      const scrollTop = latest * (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      window.scrollTo({
        top: scrollTop
      });
    });

    return () => unsubscribe();
  }, [motionValue]);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      setScrollPercent(scrollTop / (scrollHeight - clientHeight));
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToPercent = (percent: number) => {
    animate(motionValue, percent, {
      type: "spring",
      duration: 3,
      ease: 'easeIn', // 'cubic-bezier(0.83, 0, 0.17, 1)'
      bounce: 0,
    });
    // correct for scrollTop
    const scrollTop = percent * (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    window.scrollTo({
      top: scrollTop,
      behavior: "smooth",
    });
  }

  return (
    <ScrollProgressContext.Provider value={[scrollPercent, scrollToPercent]}>
      <motion.div
        className="fixed w-full h-full"
        style={{
          bottom: 0,
          left: 0,
        }}
      >
        {/* map 15-25% to 0 opacity to 1 to 0 */}
        <motion.div className="fixed inset-0 z-50 bg-sky-500 pointer-events-none" style={{
          opacity:
            scrollPercent < 0.15 ? 0 // less than 15% is invisible
            : scrollPercent >= 0.15 && scrollPercent <= 0.2 ? (scrollPercent - 0.15) / 0.05 // transitions 0 to 1 on 15-20%
            : scrollPercent > 0.2 && scrollPercent <= 0.22 ? 1 // is 1 on 20-22%
            : scrollPercent > 0.22 && scrollPercent <= 0.25 ? 1 - (scrollPercent - 0.22) / 0.05 // transitions 1 to 0 on 22-25%
            : 0, // greater than 25% is invisible
        }} />

        <div className="">
          {scrollPercent < 0.21 && <Shore />}
          {scrollPercent >= 0.21 && <Info /> }
        </div>
      </motion.div>
    </ScrollProgressContext.Provider>
  )
}
