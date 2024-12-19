"use client";

import Page from "@/app/(header)/jobs/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";

export const SearchBar = ({ page }: { page: string }) => {
  const [placeholder, setPlaceholder] = useState<string>("");
  useEffect(() => {
    setPlaceholder(`Buscar ${page}`);
  }, [page]);
  //focus:outline-[#cccccc] focus:ring-0
  return (
    <div className="w-full p-2 rounded-xl bg-[#f7f5ed] mb-2 flex flex-row">
      <div className="bg-white w-full rounded-[10px] flex flex-row items-center p-1 group  focus-within:outline focus-within:outline-[#cccccc]">
        <IoSearchOutline className="h-full ml-2 w-[23px]" />
        <input
          className="w-full rounded-[12px]  pl-2 pr-4 focus:outline-none focus:ring-0 "
          placeholder={placeholder}
        ></input>
        <Button variant="outline" className="border-none h-[32px]">
          <LuSettings2 className="m-0 p-0 h-[20px] w-[20px]" />
        </Button>
      </div>
    </div>
  );
};
