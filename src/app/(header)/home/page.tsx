import Home from "../../../components/home";
import React from "react";
import { Posts } from "@/components/posts";

export default function Page() {
  return (
    <main className="w-full overflow-y-auto max-h-screen">
       <div>
       <Posts></Posts> 
       </div>
       <div className="h-20">
        
       </div>
    </main>
  );
}
