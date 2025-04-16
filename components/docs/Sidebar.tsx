import Tabs from "./Tabs";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-100 p-6 shadow-md ">
      <div className="mb-8">
        <div className="flex gap-2 flex-nowrap">
          <h1 className="text-2xl font-bold text-sky-800">Shipwrecked <br /><span className="text-sm">(as logo with alt tag)</span></h1>
          
        </div>
        <p className="text-base text-sky-600 mt-1">August 8-11</p>
      </div>
      <Tabs />
    </aside>
  )
}