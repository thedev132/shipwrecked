'use client'

import { useContext } from "react";
import { ScrollProgressContext } from "./Story";

// import { motion } from "motion/react";

export default function Bay() {
  const [, scrollToPercent] = useContext(ScrollProgressContext);
  
  return (
    <div className="fixed inset-0 z-0">
      <div className="h-screen aspect-video flex" style={{
        backgroundImage: `url('/bay.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="w-screen h-screen flex flex-col items-end justify-center p-8 relative">
          <div className="bg-sky-200/30 p-6 rounded-md w-full max-w-4xl md:h-[70vh] backdrop-blur-md">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-black">The Bay</h1>

            <p className="text-base text-xl py-2">
                Through The Bay, you'll earn an invitaiton to Shipwrecked. In The Bay you will spend 60 hours making projects with the goal of making them go viral.
            </p>
            <p className="text-base text-xl py-2">
                What does going viral mean, you might wonder? Going viral means making a really polished project you are extremly proud of, which you then promote to get other people to check it out! You can find the criteria for virality <a href="https://shipwrecked.hackclub.com/info/go-viral" className="link">here</a>. Once you reach 60 hours & one of your projects has gone viral, you'll receive an invitation to Shipwrecked!.
            </p>
            <p className="text-base text-xl py-2">
                Every week, you can meet up with your friends either in person or over <a href="https://pier.hackclub.com" className="link">The Pier</a> - our video game-like digital meeting space to work! You are welcome — and encouraged — to team up with a friend to make a project! Just note that if you are working in a group, you all must have log 60 hours respectively on <a href="https://hackatime.hackclub.com" className="link">Hackatime</a> towards your project.
            </p>
            <button className="mt-3 bg-sky-400 rounded p-4">I have more questions!</button>
          </div>

          <button className="md:hidden absolute top-5 bottom-auto left- text-6xl" onClick={() => {
            scrollToPercent(0.15);
          }}>
            <img src="/back-arrow.png" alt="arrow" className="w-20 h-20" />
          </button>
        </div>
        
      </div>
    </div>
  )
}