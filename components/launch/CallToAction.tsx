'use client'

import { useContext } from "react";
import Image from "next/image";
import { ScrollProgressContext } from "./Story";
import Link from "next/link";
import Form from "@/app/rsvp/form";

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
        <div className="w-screen h-screen flex flex-col items-center justify-center p-8 relative">
          <div className="bg-sky-blue/30 border border-sky-blue p-6 rounded-md w-full max-w-4xl md:h-[50vh] backdrop-blur-sm flex flex-col justify-between text-center">
            <div className="flex-1 flex items-center justify-center">
              <Form />
            </div>
            <div className="mt-4">
              <span className="font-bold text-black">NOTE:</span> You can find additional questions answered on the <Link className="link" href="/info">Shipwrecked Information Docs</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}