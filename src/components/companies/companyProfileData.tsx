"use client";
import { SearchBar } from "@/commons/searchbar";
import React, { useEffect, useState } from "react";
import { getBaseURL } from "@/lib/utils";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { UserState } from "@/types/userTypes";
import { CompanyCard } from "./companyProfile";
//Relevant information in localstorage
const base_url = `${getBaseURL()}/company-user`;

//Local storage
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



//-----------important
export const CompanyData = () => {
  const [personInfo, setPersonInfo] =  useState<PersonInfo | undefined>(undefined); // Permitir undeCambiar a un solo objeto en lugar de un array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Redux
  const user: UserState = useSelector<RootState, UserState>(
    (state) => state.user
  ); //ID
  console.log("user: ", user.id)

  useEffect(() => {
    
    const fetchPersonData = async () => {
      try {
        const response = await axios.get<PersonInfo>(`${base_url}/${user.id}`); // Realiza la petición
        setPersonInfo(response.data);
        setLoading(false); 
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          setError(`Error ${err.response.status}: ${err.response.statusText}`);
        } else {
          setError("An unexpected error occurred");
        }
        setLoading(false);
      }
    };

    fetchPersonData();
  }, [user.id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!personInfo) return <p>No se encontró la información.</p>;

  return (
    <div className="w-full rounded-xl">
      <CompanyCard info={personInfo} />
    </div>
  );
};
