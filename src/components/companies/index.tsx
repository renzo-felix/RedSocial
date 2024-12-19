"use client";

import { CompaniesCard } from "./card_info";
import { SearchBar } from "@/commons/searchbar";
import { Spinner } from "@/commons/spinner";
import { getCompanies } from "@/services/companies";
import { company_user_profile_info } from "@/types/companiesTypes";
import React, { useEffect, useState } from "react";

export const Companies = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const [companies, setCompanies] = useState<company_user_profile_info[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        console.log("data: ", data);
        setCompanies(data);
        setLoading(false);
        return data;
      } catch (error) {
        console.log(error);
        setLoading(false);
        alert("Algo salió mal");
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div className=" w-full rounded-xl">
      <SearchBar page={"empresas"} />
      {/* <div className="bg-[#f7f5ed] rounded-xl p-2">Lista de cards</div> */}
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        companies.map((company, i) => {
          return <CompaniesCard info={company} key={i} />;
        })
      )}
    </div>
  );
};
