'use client';
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Background() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [clientDimensions, setClientDimensions] = useState({
    clientWidth: 0,
    clientHeight: 0,
  });

  const { clientWidth, clientHeight } = clientDimensions;

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      setScrollPercent(scrollTop / (scrollHeight - clientHeight));
    };

    const handleResize = () => {
      setClientDimensions({
        clientWidth: window.innerWidth,
        clientHeight: window.innerHeight,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      className="fixed w-full h-full bg-gradient-to-b from-[#000] to-[#fff] z-[-1]"
      style={{
        bottom: 0,
        left: 0,
      }}
    >
      {/* map 15-25% to 0 opacity to 1 to 0 */}
      <motion.div className={"fixed inset-0 z-50 bg-sky-500"} style={{
        opacity:
          scrollPercent < 0.15 ? 0 // less than 15% is invisible
          : scrollPercent >= 0.15 && scrollPercent <= 0.2 ? (scrollPercent - 0.15) / 0.05 // transitions 0 to 1 on 15-20%
          : scrollPercent > 0.2 && scrollPercent <= 0.22 ? 1 // is 1 on 20-22%
          : scrollPercent > 0.22 && scrollPercent <= 0.25 ? 1 - (scrollPercent - 0.22) / 0.05 // transitions 1 to 0 on 22-25%
          : 0, // greater than 25% is invisible
      }}>

      </motion.div>
      {scrollPercent < 0.21 && <div className="flex flex-col items-center fixed z-10" style={{
        // Clamp the bottom for scroll percent 5–15% and translate up
        bottom: `-${Math.min(Math.max(scrollPercent, 0) / 0.10 * 100, 100)}%`,
      }}>
        <div className="h-screen aspect-video" style={{
        }}>
          <div
            className="h-screen aspect-video"
            style={{
              backgroundImage: `url('/shore.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div className="h-screen aspect-video relative" style={{
          backgroundImage: `url('/sand.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        </div>
      </div>}
      {scrollPercent >= 0.21 && <div className="fixed inset-0 z-0">
        <motion.div className="h-screen aspect-video" style={{
          backgroundImage: `url('/hut.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>

        </motion.div>
      </div>}
    </motion.div>
  )
}
