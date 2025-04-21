'use client';
import { motion, useMotionValue, animate } from "motion/react";
import { createContext, useEffect, useState } from "react";
import Shore from "./Shore";
import Info from "./Info";
import Waves from "./Waves";
import Bay from "./Bay";
import Faq from "./Faq";

export const ScrollProgressContext = createContext<[number, (n: number, duration?: number) => void]>([0, () => { }]);

export default function Story() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const motionValue = useMotionValue(scrollPercent);

  const shoreEnd = 0.21;
  const wavesEnd = 0.45;
  const infoEnd = 0.55;
  const waves2End = 0.70;
  const bayEnd = 0.87;
  const waves3End = 0.95;

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

  const scrollToPercent = (percent: number, duration?: number) => {
    animate(motionValue, percent, {
      type: "spring",
      duration: duration || 5,
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
        {/* <motion.div className="fixed inset-0 z-50 pointer-events-none" style={{
          opacity:
            scrollPercent < 0.15 ? 0 // less than 15% is invisible
            : scrollPercent >= 0.15 && scrollPercent <= 0.2 ? (scrollPercent - 0.15) / 0.05 // transitions 0 to 1 on 15-20%
            : scrollPercent > 0.2 && scrollPercent <= 0.22 ? 1 // is 1 on 20-22%
            : scrollPercent > 0.22 && scrollPercent <= 0.25 ? 1 - (scrollPercent - 0.22) / 0.05 // transitions 1 to 0 on 22-25%
            : 0, // greater than 25% is invisible
        }} /> */}

        <div className="">
          shore: 0-0.21
          {scrollPercent < (shoreEnd + (wavesEnd - shoreEnd) / 2) && <Shore />}
          {(scrollPercent >= shoreEnd && scrollPercent < wavesEnd) && <Waves start={shoreEnd} end={wavesEnd} />}
          {(scrollPercent >= (wavesEnd - (wavesEnd - shoreEnd) / 2) && scrollPercent < infoEnd + (waves2End - infoEnd) / 2) && <Info bayStart={waves2End} shoreEnd={shoreEnd} />}
          {(scrollPercent >= infoEnd && scrollPercent < waves2End) && <Waves start={infoEnd} end={waves2End} />}
          {(scrollPercent >= waves2End - (waves2End - infoEnd) / 2) && scrollPercent < bayEnd + (waves3End - bayEnd) / 2 && <Bay start={waves2End} end={bayEnd} />}
          {(scrollPercent >= bayEnd && scrollPercent < waves3End) && <Waves start={bayEnd} end={waves3End} />}
          {(scrollPercent >= waves3End - (waves3End - bayEnd) / 2) && <Faq bayEnd={bayEnd} />}
        </div>
      </motion.div>
    </ScrollProgressContext.Provider>
  )
}
