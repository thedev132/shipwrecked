'use client'

import { useContext } from "react";
import Image from "next/image";
import { ScrollProgressContext } from "./Story";
import Link from "next/link";
import Form from "@/app/rsvp/form";
import SignupProgress from "@/components/common/SignupProgress";

// import { motion } from "motion/react";
export default function CallToAction({ previous }:{ previous: number }) {
  const [, scrollToPercent] = useContext(ScrollProgressContext);
  
  return (
    <div className="fixed inset-0 z-0">
      <div className="h-screen w-screen aspect-video flex" style={{
        backgroundImage: `url('/faq.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="w-screen h-screen flex flex-col items-center p-2 sm:p-4">
          <div className="mt-1 sm:mt-4 w-full sm:w-[600px] max-w-4xl">
            <SignupProgress />
          </div>
          <div className="mt-1 sm:mt-4 bg-sky-blue/30 border border-sky-blue p-2 sm:p-4 rounded-md w-full max-w-4xl min-h-[400px] sm:min-h-[500px] backdrop-blur-sm flex flex-col justify-between text-center overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-center gap-1 sm:gap-2">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}