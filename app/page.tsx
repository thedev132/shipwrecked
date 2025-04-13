import Story from "@/components/Story";
import { ReactLenis } from 'lenis/react'

export default function Home() {
  return (
    <ReactLenis root>
      <div>
        <main className="h-[1000vh]">
          <Story />
        </main>
        <footer className="bg-slate-400 h-[50vh]">
          hack club footers
        </footer>
      </div>
    </ReactLenis>
  );
}
