'use client';
import { motion, useMotionValue, animate } from "motion/react";
import { useContext } from "react";
import { ScrollProgressContext } from "./Story";

export default function Waves() {
  const [scrollPercent, scrollToPercent] = useContext(ScrollProgressContext);

  const numFrames = 15;

  const startScroll = 0.21;
  const endScroll = 0.45;

  const halfFrames = Array.from({ length: numFrames }, (_, i) => <img className="absolute top-0 left-0 w-screen h-screen object-cover z-1000 transform scale-y-[-1]" id={`${i+1}`} src={`/waves/${i + 1}.png`} alt={`Waves (frame ${i + 1})`} />);

  const frames = [...halfFrames, ...halfFrames.slice().reverse()];

  return (
    <motion.div className="fixed z-10 w-screen">
        {/* map 15-25% to 0 opacity to 1 to 0 */}
        <motion.div className="fixed inset-0 z-50 pointer-events-none" style={{
          opacity:
            scrollPercent < startScroll ? 0 // less than 15% is invisible
            : scrollPercent >= startScroll && scrollPercent <= endScroll ? 1 // is 1 on 20-22%
            : 0, // greater than 25% is invisible
        }} />

        <div className="">
          {frames[Math.floor(((scrollPercent-startScroll)/(endScroll-startScroll))*(numFrames*2))]}
        </div>
      </motion.div>
  )
}
