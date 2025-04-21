'use client';
import { motion } from "motion/react";
import { useContext, useMemo } from "react";
import { ScrollProgressContext } from "./Story";
import Image from "next/image";

export default function Waves({ start, end }: { start: number | undefined, end: number | undefined }) {
  const [scrollPercent] = useContext(ScrollProgressContext);

  const numFrames = 10;

  // Memoize the frames to prevent recreating them on every render
  const frames = useMemo(() => {
    const halfFrames = Array.from({ length: numFrames }, (_, i) => (
      <Image 
        key={i}
        width={1920}
        height={1080}
        className="fixed top-0 left-0 w-screen h-screen object-cover z-1000 transform scale-y-[-1] pointer-events-none" 
        id={`${i+1}`} 
        src={`/waves/${i + 1}.png`} 
        alt="" 
        loading="eager"
      />
    ));
    return [...halfFrames, ...halfFrames.slice().reverse()];
  }, [numFrames]);

  return (
    <motion.div className="fixed z-10 w-screen">
      <div style={{
        opacity: !start && !end ? 0 : 1
      }}>
        {frames.map((frame, index) => (
          <div
            key={index}
            style={{
              opacity: (!start || !end) ? 0 : (Math.floor(((scrollPercent - start) / (end - start)) * (numFrames * 2)) === index ? 1 : 0),
            }}
          >
            {frame}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
