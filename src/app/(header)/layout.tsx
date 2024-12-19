import LeftPanel from "@/components/leftpanel";
import { Navbar } from "@/components/navbar";
import RightPanel from "@/components/rightpanel";
import React from "react";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full max-w-[1280px] w-full relative">
      <div className="fixed max-w-[1280px] w-full bg-white rounded-b-xl z-20 shadow-md">
        <Navbar />
      </div>

      <div className="w-full flex pt-4 h-full mt-[50px]">
        <LeftPanel /> {/*ocultar dependiendo de la ubicacion*/}
        <div className="w-full h-full">{children}</div>
        <RightPanel />
      </div>
    </div>
  );
}
