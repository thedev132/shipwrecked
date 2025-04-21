import Tabs from "./Tabs";
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-100 p-6 shadow-md ">
      <div className="mb-8">
        <div className="flex gap-2 flex-nowrap items-center justify-center">
           <Image src="/logo.png" width={0} height={0} alt="Shipwrecked Logo" className="md:w-110 w-80 h-auto" />
          
        </div>
        <p className="text-xl text-sky-600 mt-1" style={{fontFamily: "var(--font-baloo)"}}>August 8-11</p>
      </div>
      <Tabs />
    </aside>
  )
}