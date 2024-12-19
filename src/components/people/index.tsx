"use client";
import { PeopleCard } from "./card_info";
import { SearchBar } from "@/commons/searchbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBaseURL } from "@/lib/utils";

const base_url = `${getBaseURL()}/student-user`

interface UserProfile {
  Institute: string;
  GitHub: string;
  Linkedin: string;
  imageURL: string;
  PhoneNumber: string;
  Description: string;
  studentUserId: number;
}

interface PersonInfo {
  id: number;
  Name: string;
  LastName: string;
  email: string;
  Password: string;
  UserProfile?: UserProfile; 
}


export const People = () => {
  const [students, setStudents] = useState<PersonInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await axios.get<PersonInfo[]>(base_url);
        setStudents(response.data);
      } catch (err) {
        setError("Error al cargar los datos de estudiantes.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className=" w-full rounded-xl">
      <SearchBar page={"empresas"} />
      {/* <div className="bg-[#f7f5ed] rounded-xl p-2">Lista de cards</div> */}
      {students.map((people, i) => {
        return <PeopleCard info={people} key={i} />;
      })}
    </div>
  );
};
