'use client';
import { useContext, type ReactNode } from "react";
import { ScrollProgressContext } from "./Story";
import Image from "next/image";

export default function TriggerButton({ children, targetPercent, backwards = false, waves = false }: { children?: ReactNode, targetPercent: number, backwards?: boolean, waves?: boolean }) {
  const [, scrollToPercent] = useContext(ScrollProgressContext);

  return (
    <button className={`${children ? 'py-2 md:px-4 px-2' : 'p-2'} uppercase italic bg-dark-blue/60 text-sand border border-sand whitespace-nowrap text-xs md:text-base transition hover:border-yellow backdrop-blur-sm rounded-full cursor-pointer`} onClick={() => {
      scrollToPercent(targetPercent, waves ? undefined : 0.1);
    }}>
      <span className="flex items-center gap-3 flex-nowrap">
        {children}
        <Image src="/back-arrow.png" width={24} height={24} alt="next" className={`w-8 h-8 ${backwards ? '' : '-scale-x-100'}`} />
      </span> 
    </button>
  )
}