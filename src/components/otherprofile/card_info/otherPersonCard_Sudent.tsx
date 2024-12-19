"use client";
import React, { useState, useEffect } from 'react';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import axios from 'axios';
import { getBaseURL } from '@/lib/utils';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { UserState } from "@/types/userTypes";
import { FollowerStudenteCard } from '@/components/user/followerscard_students';
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
const base_url_seguidores = `${getBaseURL()}/student-profile/followers`;


export const OtherPersonCard = ({ info, id_user }: { info: PersonInfo | undefined, id_user:any}) => {
  //-------------------------------
  const [infoUse, setUpdatedInfoUse] = useState(info); 
  const [isFollowing, setIsFollowing] = useState(false);
    // Seguidores
    const [followers, setFollowers] = useState<any[]>([])
    const [lenfFollowers, setLenFollowers] = useState<any>([])
    const [loadingLen, setloadingLen] = useState<any>(false)
  const user: UserState = useSelector<RootState, UserState>(
    (state) => state.user
  ); //ID
  console.log("user: ", user.id)
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        setloadingLen(true)
        const response = await axios.get(`${base_url_seguidores}/${info.id}`);
        if (response.status === 200) {
          console.log("Followers es: ", response.data.length)
          setLenFollowers(response.data.length)
          setFollowers(response.data); 
        }
        setloadingLen(false)

      } catch (error) {
        setloadingLen(false)
        console.error("Error fetching followers:", error);
      } finally{
        setloadingLen(false)

      }
    };

    fetchFollowers();
  }, [info?.id]);
  const handleFollow = async (follow_id) => {
    try {
      console.log("user.id", user.id)
      console.log("follow_id.id", follow_id)
      const url = `${getBaseURL()}/student-profile/${user.id}/follow-user/${follow_id}`
      if (user.id == follow_id){
        alert("No puedes seguirte a ti mismo");
        return;
      }
      console.log("url: ", url)
      await axios.post(url);
      setIsFollowing(true);
      console.log("Follow correcto")
    } catch (error: any) {
      if (error.response && error.response.status === 400 && error.response.data.message === "Ya sigues a este estudiante.") {
        setIsFollowing(true);
        alert("Ya sigues a este estudiante.");
      } else {
        console.error("Error al seguir al usuario:", error);
        alert("Ocurrió un error al intentar seguir al usuario.");
      }
    }
    
  };
  return (
    // Container
    <div className="bg-[#f7f5ed] rounded-2xl m-0 p-0"> 

      <div className="w-full h-72 overflow-hidden rounded-t-2xl">
        <img src={infoUse.UserProfile.imageURL} alt="banner" className="w-full h-full object-cover" />
      </div>

      <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white -mt-20 ml-11">
        <img src={infoUse.UserProfile.imageURL} alt="User Profile" className="w-full h-full object-cover" />
      </div>
      {/* Nombre e informacion */}
      <div className="pt-16 pl-11 grid grid-cols-2 gap-10 -mt-10">
        <div className="flex flex-col items-start ">
          <div className="flex items-baseline gap-5">
            <h1 className="text-2xl font-bold">{infoUse.Name}</h1>
            <span className="text-[#9E3F90]">
            <strong>{infoUse.UserProfile.PhoneNumber}</strong>
            </span>
          </div>
          <p className="text-gray-500">Ciencia de la computación</p>
            
          <div className="col-span-2 mt-5">
            <h1 className="text-xl font-semibold mt-2">Información:</h1>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Centro Educativo</strong>: {infoUse.UserProfile.Institute}
                </li>
                <li>
                  <strong>Descripción: </strong>: {infoUse.UserProfile.Description}
                </li>
            </ul>
          </div>
        </div>
        {/* Buttons lilnkedin and github */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex gap-3">
            <div >
            <a href={infoUse.UserProfile.GitHub} target="_blank" rel="noopener noreferrer">
              <FaGithub className="w-10 h-10" />
            </a>
            
            </div>

            <div >
              <a href={infoUse.UserProfile.Linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="w-10 h-10" />
              </a>
            </div>
          </div>

          <div className="mt-0 space-y-4">
          <button 
              className={`w-48 py-2 ${isFollowing ? 'bg-gray-400' : 'bg-[#207DCC]'} text-white rounded-md font-bold`} 
              onClick={() => handleFollow(info.id)}
              disabled={isFollowing}
            >
              {isFollowing ? 'Siguiendo' : 'Añadir'}
            </button>
          </div>
        </div>
        
        {/* Habilidades tecnicas */}
        {/* <div className="col-span-2">
          <h1 className="text-xl font-semibold mt-4">Habilidades Técnicas</h1>
          <div className="flex flex-wrap gap-4 mt-2">
            {info.abilities?.map((habilidad, index) => (
              <div key={index} className="bg-white rounded-lg p-2 min-w-[100px] text-center">
                {habilidad}
              </div>
            ))}
          </div>
        </div> */}

        <div className="col-span-2">
        <h1 className="text-xl font-semibold mt-4">
            Seguidores{" "}
            <strong className="text-[#9E3F90]">
              {loadingLen ? (
                <span>Cargando...</span> 
              ) : (
                `(${lenfFollowers})` 
              )}
            </strong>
          </h1>
          
          <span >
            
          </span>
          {followers.length > 0 ? (
            <ul className="list-disc pl-5 mt-2">
              {followers.map((people, i) => {
               return <FollowerStudenteCard info={people} key={i} />;
             })}
            </ul>
          ) : (
            <p>No tienes aúnseguidores.</p>
          )}
        </div>  


      </div>
    </div>
  );
};

