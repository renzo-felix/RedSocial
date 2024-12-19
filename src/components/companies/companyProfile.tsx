
import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { getBaseURL } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { UserState } from "@/types/userTypes";
import axios from "axios";

interface CompanyPerfil {
  Sunac: string;
  GitHub: string | null;
  IndustrySector: string;
  imageURL: string | null;
  PhoneNumber: string | null;
  Description: string | null;
  Address: string | null;
  InfoCorta: string;
  InfoLarga: string;
  PortadaImg: string | null;
  CompanyUserId: number;
}

interface PersonInfo {
  id: number;
  Username: string;
  email: string;
  Password: string;
  CompanyPerfil: CompanyPerfil;
}


export const CompanyCard = ({ info }: { info: PersonInfo | undefined }) => {
  const [followers, setFollowers] = useState<any[]>([]);
  const [lenFollowers, setLenFollowers] = useState<number>(0);
  const [loadingLen, setLoadingLen] = useState<boolean>(false);
  
  const user: UserState = useSelector<RootState, UserState>((state) => state.user);
  
  useEffect(() => {
    const fetchFollowers = async () => {
      setLoadingLen(true);
      try {
        const response = await axios.get(`${getBaseURL()}/student-profile/followers/${info.id}`);
        setFollowers(response.data);
        setLenFollowers(response.data.length);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
      setLoadingLen(false);
    };

    fetchFollowers();
  }, [info.id]);

  return (
    <div className="bg-[#f7f5ed] rounded-2xl m-0 p-0">
      {/* Banner Image */}
      <div className="w-full h-72 overflow-hidden rounded-t-2xl">
        <img src={info.CompanyPerfil.PortadaImg} alt="banner" className="w-full h-full object-cover" />
      </div>

      {/* Profile Image */}
      <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white -mt-20 ml-11">
        <img src={info.CompanyPerfil.imageURL} alt="User Profile" className="w-full h-full object-cover" />
      </div>

      {/* Name and Info */}
      <div className="pt-16 pl-11 grid grid-cols-2 gap-10 -mt-10">
        <div className="flex flex-col items-start">
          <div className="flex items-baseline gap-5">
            <h1 className="text-2xl font-bold">{info.Username}</h1>
            <span className="text-[#9E3F90]">
              <strong>{info.CompanyPerfil.Sunac}</strong>
            </span>
            {/* <span className="text-[#9E3F90]">
              <strong>{info.CompanyPerfil.IndustrySector}</strong>
            </span> */}
          </div>
          <p className="text-[#9E3F90]">{info.CompanyPerfil.IndustrySector}</p>

          <div className="col-span-2 mt-5">
            <h1 className="text-xl font-semibold mt-2">Información:</h1>
            <ul className="list-disc pl-5">
              <li><strong>Descripción: </strong> {info.CompanyPerfil.InfoCorta}</li>
              <li><strong>Dirección: </strong> {info.CompanyPerfil.InfoLarga}</li>
            </ul>
          </div>
        </div>

        {/* LinkedIn and GitHub Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex gap-3">
            <a href={"https://github.com/"+info.CompanyPerfil.GitHub} target="_blank" rel="noopener noreferrer">
              <FaGithub className="w-10 h-10" />
            </a>
            {/* <a href={ info.CompanyPerfil.Sunac} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="w-10 h-10" />
            </a> */}
          </div>
        </div>
      </div>

      
    </div>
  );
};
