"use client"; // Asegúrate de que este código sea del lado del cliente si se necesita.

import { CompanyProfile } from "@/components/companies/profile";
import OtherProfile from "@/components/otherprofile/otherProfile_Student";
import React from "react";

export default function Page({ params }: { params: { studentUserId: string } }) {
  
    return (
      <main className="w-full overflow-y-auto max-h-screen">
      <div>
       <OtherProfile params={params}/> 
       </div>
       <div className="h-20">
        
       </div>
    </main>
  );
}

// export default function Page() {
//   return (
//     <main>
//       <h1></h1>
//     </main>
//   );
// }
