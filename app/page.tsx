import Image from "next/image";
import styles from "./page.module.css";
import Background from "@/components/Background";
import { ReactLenis, useLenis } from 'lenis/react'

export default function Home() {
  return (
    <ReactLenis root>
      <div>
        <main className="h-[1000vh]">
          <Background />
        </main>
        <footer className="bg-slate-400 h-[50vh]">
          hack club footers
        </footer>
      </div>
    </ReactLenis>
  );
}
