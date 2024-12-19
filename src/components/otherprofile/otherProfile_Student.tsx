// app/people/[studentUserId]/page.tsx

import { OtherPersonCard } from "./card_info/otherPersonCard_Sudent";
import React, { useEffect, useState } from "react";
import { getBaseURL } from "@/lib/utils";
import axios from "axios";
// Base URL de la API
const base_url = `${getBaseURL()}/student-user/`;

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
  UserProfile: UserProfile; 
}

export default function OtherProfile({ params }: { params: { studentUserId: string } }) {
  const [personInfo, setPersonInfo] = useState<PersonInfo | undefined>(undefined); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        const response = await axios.get<PersonInfo>(base_url + params.studentUserId); // Usar params.studentUserId
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
  }, [params.studentUserId]); // Dependencia de params.studentUserId

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full rounded-xl">
      {personInfo && <OtherPersonCard info={personInfo} id_user={params.studentUserId} />}
    </div>
  );
}
