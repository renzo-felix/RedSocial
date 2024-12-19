"use client";

import { AppLogo } from "@/commons/logo";
import { usePathname, useRouter } from "next/navigation";
import React, { MouseEvent } from "react";
import { FaUserCircle } from "react-icons/fa";

const links = [
  { href: "/home", label: "Inicio" },
  { href: "/jobs", label: "Prácticas" },
  { href: "/companies", label: "Empresas" },
  { href: "/people", label: "Personas" },
];

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const goTo = (e: MouseEvent<HTMLAnchorElement>, option: string) => {
    e.preventDefault(); // Opcional
    router.push(option);
  };

  return (
    <div className="flex flex-row w-full h-[50px] justify-between rounded-xl bg-cardLight mt-2 pl-2 pr-2 relative">
      <div className="max-w-[25%] w-full flex items-center h-full p-2 ">
        <AppLogo />
      </div>
      <div className="max-w-[40%] w-full flex items-center justify-around p-2">
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => goTo(e, href)}
            className={`cursor-default hover:text-black transition-colors duration-300 ${
              pathname.includes(href) ? "text-black font-bold" : ""
            }`}
          >
            {label}
          </a>
        ))}
      </div>
      <div className="max-w-[25%] w-full flex justify-end items-center h-full p-2">
      <a
            href="/profile"
            onClick={(e) => goTo(e, "/profile")}
            className={`cursor-default hover:text-black transition-colors duration-300 ${
              pathname.includes("/profile") ? "text-black font-bold" : ""
            }`}
      >
        <FaUserCircle className="w-[35px] h-[35px]" />
      </a>
        
        

      </div>
    </div>
  );
};
