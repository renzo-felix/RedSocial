"use client";

import { RootState } from "@/store/store";
import { UserState } from "@/types/userTypes";
// Para habilitar el renderizado en el cliente
import { usePathname } from "next/navigation";
// Cambia a usePathname
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const main_routes = ["/jobs", "/home", "/companies", "/people"];

const LeftPanel = () => {
  const pathname = usePathname(); // Usamos usePathname en lugar de useRouter
  const [currentRoute, setCurrentRoute] = useState<string>("");
  const user: UserState = useSelector<RootState, UserState>(
    (state) => state.user
  );
  useEffect(() => {
    setCurrentRoute(pathname);
  }, [pathname]);

  if (main_routes.includes(currentRoute))
    return (
      <div className="max-w-[17%] w-full bg-[#f7f5ed] h-fit mr-2 rounded-xl p-2 pl-4 pr-4 ">
        <div className="flex flex-col pt-4">
          <div className="flex items-center justify-center">
            <img src={user.profileImageUrl} className="w-[100px]" />
          </div>
          <div className="flex w-full justify-center pt-2">
            <p className="text-[20px]">
              Hola, <b>{user.name}</b>
            </p>
          </div>
          <div className="w-full bg-[#b1b1b1] h-[1px] mt-4 mb-4"></div>
          <div className="flex flex-col items-center justify-center pb-2">
            <h5>Estadísticas</h5>
            <div className="flex justify-center p-4 rounded-xl bg-white w-full mt-2">
              <ul className="pl-2 ml-0 pr-2">
                <li>
                  <b>223</b> Contactos
                </li>
                <li>
                  <b>5</b> Proyectos
                </li>
                <li>
                  <b>2</b> Postulaciones
                </li>
                <li>
                  <b>0</b> Prácticas
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  else return <div></div>;
};

export default LeftPanel;
