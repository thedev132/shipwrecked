import Story from "@/components/launch/Story";
import { ReactLenis } from 'lenis/react'

export default function Home() {
  return (
    <ReactLenis root>
      <div>
        <main className="h-[1000vh]">
          <Story />
        </main>
      </div>
    </ReactLenis>
  );
}
