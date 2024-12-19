"use client";
import React, { useState, useEffect } from 'react';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import axios from 'axios';
import { changeUploadImage } from '@/lib/utils';
//para formulario: 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getBaseURL } from '@/lib/utils';
import { FollowerStudenteCard } from '../followerscard_students';
//Redux
import { useDispatch, UseDispatch } from 'react-redux';
import { set, setProfileImage } from '@/store/user';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { UserState } from "@/types/userTypes";

const base_url = `${getBaseURL()}/student-user`;
const base_url_seguidores = `${getBaseURL()}/student-profile/followers`;

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

export const PersonCard = ({ info }: { info: PersonInfo | undefined }) => {
  const dispatch = useDispatch();
  
  //-------------------------------
  const [updatedInfo, setUpdatedInfo] = useState(info); 
  const [infoUse, setUpdatedInfoUse] = useState(info); 

  //---Imagen
  const [file, setFile] = useState<File | null>(null);

  // Seguidores
  const [followers, setFollowers] = useState<any[]>([])
  const [lenfFollowers, setLenFollowers] = useState<any>([])
  const [loadingLen, setloadingLen] = useState<any>(false)

  //Uso dereudx: 
  const user: UserState = useSelector<RootState, UserState>(
    (state) => state.user
  ); //ID
  console.log("user: ", user.id)
  console.log("Aquiiiiiiiii")

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        setloadingLen(true);
        const url = `${base_url_seguidores}/${user.id}`
        console.log("url__:",  url)
        const response = await axios.get(url);
        if (response.status === 200) {
          console.log("Followers es: ", response.data.length)
          setLenFollowers(response.data.length)
          setFollowers(response.data); 
          setloadingLen(false)
        }
      } catch (error) {
        console.error("Error fetching followers:", error);
      } finally{
        setloadingLen(false)
      }
    };

    fetchFollowers();
  }, [info?.id]);

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    setFile(e.target.files[0]);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id in updatedInfo.UserProfile) {
      setUpdatedInfo(prev => ({
        ...prev,
        UserProfile: {
          ...prev.UserProfile,
          [id]: value,
        }
      }));
    } else {
      setUpdatedInfo(prev => ({
        ...prev,
        [id]: value,
      }));
    }
  };
  
  

  const handleSubmit = async () => {
    const phoneRegex = /^[0-9]{9}$/;
    const id = localStorage.getItem('userId');
    //-important

    if (!phoneRegex.test(updatedInfo.UserProfile.PhoneNumber)) {
      alert("El número de teléfono debe contener exactamente 9 dígitos.");
      return;
    }
    try {
      // const imageURL = await changeUploadImage(file);
    
      // console.log("La url de la imagen es: ", imageURL)

      const response = await axios.put(`${base_url}/${user.id}`, {
        Name: updatedInfo.Name,
        LastName: updatedInfo.LastName,
        Password: updatedInfo.Password,
        email: updatedInfo.email
      });

      if (response.status === 200) {
        //
        // dispatch(setProfileImage({profileImageUrl: imageURL}))
        // dispatch(set({profileImageUrl: imageURL}))

        // alert('Profile updated successfully!');
        setUpdatedInfo(prev => ({
          ...prev,
          Name: updatedInfo.Name,
          LastName: updatedInfo.LastName,
          email: updatedInfo.email,
        }));
        setUpdatedInfoUse(prev => ({
          ...prev,
          Name: updatedInfo.Name,
          LastName: updatedInfo.LastName,
          email: updatedInfo.email,
        }));
      }
    } catch (error) {
      console.error(error);
      alert('Error updating profile');
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
            <a
            href={
              info.UserProfile.GitHub.startsWith('https://github.com/')
                ? info.UserProfile.GitHub
                : 'https://github.com/' + info.UserProfile.GitHub
            }
            target="_blank"
            rel="noopener noreferrer"
          >

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
            {/* <button className="w-48 py-2 bg-[#207DCC] text-white rounded-md font-bold">Añadir</button> */}
            {/* <button className="w-48 py-2 bg-[#FFFFFF] text-[#B5B2AD] rounded-md font-bold">Chat</button> */}
            <Dialog >

              <DialogTrigger asChild>
                <Button className="w-48 bg-[#207DCC]">Editar perfil</Button>
              </DialogTrigger>

              <DialogContent className="overflow-y-auto max-h-screen  sm:max-w-[825px] flex flex-col items-center justify-center">
                {/* profile User img */}
                <div className="flex items-center justify-center w-36 h-36 rounded-full overflow-hidden border-4 border-white">
                  <img src={infoUse.UserProfile.imageURL} alt="banner" className="w-full h-full object-cover" />
                </div>
                <DialogHeader className="text-center">
                  <DialogTitle className="text-center">Edita tu perfil</DialogTitle>
                  <DialogDescription className="text-center">
                    Añades tus habilidades y demuestra de qué estás hecho
                  </DialogDescription>
                </DialogHeader>
                

                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                  {/* Nombre */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="Name" className="text-right">
                      Nombre
                    </Label>
                    <Input
                      id="Name"
                      value={updatedInfo.Name}  // Usa 'value' en lugar de 'value'
                      onChange={handleChange}
                      className="col-span-3"
                    />
                  </div>

                  {/* Apellidos */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="LastName" className="text-right">
                      Apellidos
                    </Label>
                    <Input
                      id="LastName"
                      value={updatedInfo.LastName}
                      onChange={handleChange}
                      className="col-span-3"

                    />
                  </div>

                  {/* Email */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      onChange={handleChange}
                      value={updatedInfo.email}
                      className="col-span-3"
                    />
                  </div>

                  {/* password */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input
                      id="password"
                      onChange={handleChange}
                      value={updatedInfo.Password}
                      className="col-span-3"
                    />
                  </div>

                  

                 



                </div>

                <DialogFooter>
                  <Button  onClick={handleSubmit} type="submit">Guardar cambios</Button>
                </DialogFooter>
              </DialogContent>


            </Dialog>
            
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
        {/* Seguidores */}

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

