  
"use client";
import { Button } from "@/components/ui/button";
import React, {useState} from "react";
import { FaStar } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { useEffect} from "react";
import { FaUserCircle } from "react-icons/fa";
import { getBaseURL } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

//Redux 
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { UserState } from "@/types/userTypes";

//Para el dialogo: 
//para formulario: 
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
import axios from "axios";
interface ComentarioCompany {
  id: number;
  IndustrySector: string;
  imageURL: string;
  CompanyName: string;
  PublicationDate: string;
  ComentarioUser: string;
}
interface ComentarioStudent {
  id: number;
  Institute: string;
  imageURL: string;
  UserName: string;
  PublicationDate: string;
  ComentarioUser: string;
}

interface Commentario {
  ComentarioStudent?: ComentarioStudent;
  ComentarioCompany?: ComentarioCompany;
}

interface UserProfile {
  Institute: string;
  GitHub: string;
  Linkedin: string;
  Career: string;
  Cycle: number;
  Description: string | null;
  PhoneNumber: string;
  imageURL: string;
  studentUserId: number;
}

interface CompanyPerfil {
  Address: string;
  CompanyUserId: number;
  Description: string;
  GitHub: string;
  IndustrySector: string;
  PhoneNumber: string;
  Sunac: string;
  imageURL: string;
}

interface ExtraInfo {
  id: number;
  Name: string;
  Username: string;
  LastName: string;
  email: string;
  UserProfile?: UserProfile;
  CompanyPerfil?: CompanyPerfil;
}

interface Post {
  id: BigInteger;
  PublicationDate: string;
  TituloPost: string;
  Descripcion: string;
  ImgPostUrl: string;
  StudentId?: number; 
  CompanyId?: number; 
  PersonInfo: PersonInfo | null;
  extraInfo: ExtraInfo;
}

interface PersonInfo {
  Name: string;
  LastName: string;
  UserProfile?: UserProfile;
}



const base_url_comentarios = `${getBaseURL()}/postuser/FindCommentsByPostUser`;
const base_url_postComentario = `${getBaseURL()}/comentario`;
const base_url_reaction = `${getBaseURL()}/reaction`;
//ID


//Teimpo
const calcularTiempoPasado = (publicationDate: string): string => {
  const ahora = new Date(); 
  const fechaPublicacion = new Date(publicationDate); 

  const diferenciaMilisegundos = ahora.getTime() - fechaPublicacion.getTime();

  const diferenciaHoras = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));

  if (diferenciaHoras < 9) {
    return `Hace ${diferenciaHoras} ${diferenciaHoras === 1 ? "hora" : "horas"}`;
  } else {
    return "Hace más de 9 horas";
  }
}



  
export const PostCard = ({ info,  post_id  }: 
  
  { info: Post,  post_id:BigInteger }) => {
    const [seeComments, setSeeComments] = useState(false); 
    const [comentarios, setComentarios] = useState<Commentario[]>([]); 
    const [nuevoComentario, setNuevoComentario] = useState(""); 
    const [openDialog, setOpenDialog] = useState(false);
    //Comentarios post
    const [loadingComentario, setLoadingComentario] = useState(false);
    const [mensaje, setMensaje] = useState("");
    //Comentarios get all
    const [loadingComentarios, setLoadingComentarios] = useState(false);

    //Para los likes: 
    const [likeButtonText, setLikeButtonText] = useState("Me gusta");
    const [dislikeButtonText, setDislikeButtonText] = useState("No me gusta");
    // Redux
    const user: UserState = useSelector<RootState, UserState>(
    (state) => state.user
    ); //ID
    console.log("user: ", user.id)



    const onLike = async (post_id: BigInteger, userID: number, setLikeButtonText: React.Dispatch<React.SetStateAction<string>>) => {
      const body: any = {
        TypeReaction: "like",
        PostId: post_id,
      };
      
      if (user.type === 'student') { // Para la validacion de empresa o compañia
        body.StudentId = user.id; 
      } else  {
        body.CompanyId = user.id; 
      } 
      setLikeButtonText("Cargando...");
    
      try {
        const response = await axios.post<string>(base_url_reaction, body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          setLikeButtonText("Like enviado correctamente");
          setTimeout(() => {
            setLikeButtonText("Me gusta");
          }, 1000); // Restablecer después de 1 segundo
        } else {
          setLikeButtonText(`Error: ${response.status}`);
          setTimeout(() => {
            setLikeButtonText("Me gusta");
          }, 1000);
        }
      } catch (error) {
        console.error("Error al enviar el like:", error);
        setLikeButtonText("Hubo un error");
        setTimeout(() => {
          setLikeButtonText("Me gusta");
        }, 1000);
      }
    };
    
    const onDisLike = async (post_id: BigInteger, userID: number,setDislikeButtonText: React.Dispatch<React.SetStateAction<string>>) => {
      const body: any = {
        TypeReaction: "dislike",
        PostId: post_id,
      };
      
      if (user.type === 'student') { // Para la validacion de empresa o compañia
        body.StudentId = user.id; 
      } else  {
        body.CompanyId = user.id; 
      } 
      setDislikeButtonText("Cargando...");
    
      try {
        const response = await axios.post<string>(base_url_reaction, body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          setDislikeButtonText("Dislike añadido correctamente");
          setTimeout(() => {
            setDislikeButtonText("No me gusta");
          }, 1000); 
        } else {
          setDislikeButtonText(`Error: ${response.status}`);
          setTimeout(() => {
            setDislikeButtonText("No me gusta");
          }, 1000);
        }
      } catch (error) {
        console.error("Error al enviar el dislike:", error);
        setDislikeButtonText("Hubo un error");
        setTimeout(() => {
          setDislikeButtonText("No me gusta");
        }, 1000);
      }
    };
    // Fin de los likes
    const fetchComentarios = async (id: BigInteger) => {
      setLoadingComentarios(true)
      try {
        const comentariosResponse = await axios.get<Commentario[]>(`${base_url_comentarios}/${id}`);
        setComentarios(comentariosResponse.data);
        console.log("Comentarios data: ", comentariosResponse.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }finally{
        setLoadingComentarios(false); 
      }
    };
    // useEffect(() => {
    //   if (seeComments) {
    //     fetchComentarios(info.id); 
    //   }
    // }, [seeComments, info.id]); 


    const postComentario = async () => {
      
      if (!user.id) {
        console.error("El ID del estudiante no está disponible.");
        return;
      }

      const comentarioData:any = {
        ComentarioUser: nuevoComentario,
        PostId: info.id,
      };
      console.log("post_id", info.id)
      // Jugadita: 
      if (user.type === 'student') { // Para la validacion de empresa o compañia
        comentarioData.StudentId = user.id; 
      } else  {
        comentarioData.CompanyId = user.id; 
      } 
      
      setLoadingComentario(true); 
      setMensaje("Cargando...");
      try {
        const response = await axios.post(base_url_postComentario, comentarioData);
        console.log("Comentario enviado:", response.data);
        setNuevoComentario(""); 
        fetchComentarios(info.id); 
        setOpenDialog(false); 
        setMensaje("Comentario enviado correctamente"); 
      } catch (error) {
        console.error("Error al enviar el comentario:", error);
        setMensaje("Hubo un error al enviar el comentario"); 
      } finally {
        setLoadingComentario(false); 
      }
    };
    
    useEffect(() => {
      if (seeComments) {
        fetchComentarios(info.id); 
      }
    }, [seeComments, info.id]); 
    

  return (
    <div className="bg-[#f7f5ed] rounded-xl p-4 pl-6 pr-6 mb-2">
      {/* head */}
      <div className= "grid grid-cols-2" >
        <div className="flex gap-6">
          
          <div className= "w-16 h-16 rounded-lg border-5 border-red bg-red overflow-hidden  ">
            {info.extraInfo && info.StudentId && (
              <img src={info.extraInfo.UserProfile?.imageURL} alt="User Profile" />
            )}
            {info.extraInfo && info.CompanyId  && (
              <img src={info.extraInfo.CompanyPerfil?.imageURL} alt="User Profile" />
            )}
          </div>
          <div >
            <div className="flex gap-1 items-center ">
              {/* <h1 className="text-xl text-[#7E7A7A] ">{info.PersonInfo?.Name}</h1> */}
              {info.extraInfo && info.StudentId && (
              <h1>{info.extraInfo?.Name}  </h1>
            )}
            {info.extraInfo && info.CompanyId  && (
              <h1>{info.extraInfo?.Username} </h1>
            )}
            </div>
            {info.extraInfo && info.StudentId && (
              <p>{info.extraInfo?.LastName}  </p>
            )}
            {info.extraInfo && info.CompanyId  && (
              <p>{info.extraInfo?.email} </p>
            )}

            {/* <p className="text-gray-500">{info.PersonInfo?.LastName}</p> */}


          </div>
        </div>

        <div className="flex">
          <p className="ml-auto">{calcularTiempoPasado(info.PublicationDate)}</p>
        </div>
      </div>
      {/* img */}
      <div className="w-full overflow-hidden rounded-2xl mt-5">
        <img className="w-full object-cover" src={info.ImgPostUrl}></img>
      </div>
      {/* post info */}
      <div className="mt-6">
        <h1 className="mt-6">{info.TituloPost}</h1>
        <ul className="mt-3">
          <li className="text-justify">{info.Descripcion}</li>
        </ul>
      </div>
      {/* buttons */}
      <div className="flex gap-5 mt-6 items-center justify-center">
        <Button className="w-60 flex gap-3  overflow-hidden justify-center" onClick={() => onLike(post_id, user.id, setLikeButtonText)} >
        {likeButtonText} 
          <AiOutlineLike  className="h-5 w-5"/>
        </Button>
        <Button
          variant="outline"
         className="w-60 flex items-center justify-center overflow-hidden" onClick={() => onDisLike(post_id, user.id, setDislikeButtonText)} >
            <p className="mr-2">{dislikeButtonText}</p> 
            <AiOutlineDislike className="h-5 w-5" />
        </Button>
        <Button onClick={()=>{setSeeComments(!seeComments)}}
          variant="outline"
          className="w-60">
          Comentarios
          
        </Button>
        
      </div>
      {seeComments && (
            <div>
              <div className="mt-5   flex justify-center items-center">
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  
                  <DialogTrigger asChild onClick={() => setOpenDialog(true)}>
                    <Button
                      variant="link"
                      className="w-60">
                      Comentar
                    </Button>
                  </DialogTrigger>

                  <DialogContent 
                  aria-describedby="dialog-title"
                  className="overflow-y-auto max-h-screen  sm:max-w-[825px] flex flex-col items-center justify-center">
                    <DialogHeader className="text-center">
                      <DialogTitle id="dialog-title">Opina, interactúa, resalta</DialogTitle>
                      {/* <DialogDescription>Opina, interactúa, resalta</DialogDescription> */}
                    </DialogHeader>
                    
                    <Label htmlFor="nuevoComentario"></Label>
                    <Textarea className="h-40"
                      id="nuevoComentario"
                      value={nuevoComentario}
                      onChange={(e) => setNuevoComentario(e.target.value)}
                      placeholder="Escribe tu comentario"
                    />
                    <DialogFooter>
                    <Button
                      onClick={postComentario}
                      type="submit"
                      disabled={loadingComentario} 
                    >
                      {loadingComentario ? "Enviando..." : "Guardar cambios"}
                    </Button>
                     </DialogFooter>
                    </DialogContent>
                </Dialog >  
                </div>
                  <div className="bg-white mt-5 rounded-xl p-5">
                  {loadingComentarios ? (
                      <p>Cargando...</p>
                    ) : Array.isArray(comentarios) && comentarios.length > 0 ? (
                      comentarios.map((comentario, index) => (
                        <div key={index} className="mb-10">
                          <div className="flex gap-4 items-center">
                            <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                              {comentarios && comentario.ComentarioStudent && (
                                <img src={comentario.ComentarioStudent.imageURL} />
                              )}
                              {comentarios && comentario.ComentarioCompany && (
                                <img src={comentario.ComentarioCompany.imageURL} />
                              )}
                            </div>

                            {comentarios && comentario.ComentarioStudent && (
                                <h2 className="font-bold">{comentario.ComentarioStudent.UserName} </h2>
                              )}
                              {comentarios && comentario.ComentarioCompany && (
                                <h2 className="font-bold">{comentario.ComentarioCompany.CompanyName} </h2>
                              )}

                          
                            {comentarios && comentario.ComentarioStudent && (
                                <p className="text-gray-500 text-sm">
                                {calcularTiempoPasado(comentario.ComentarioStudent?.PublicationDate)}
                              </p>
                              )}
                              {comentarios && comentario.ComentarioCompany && (
                                <p className="text-gray-500 text-sm">
                                {calcularTiempoPasado(comentario.ComentarioCompany?.PublicationDate)}
                              </p>
                              )}

                          </div>
                          <ul className="text-justify ml-8">


                            {comentarios && comentario.ComentarioStudent && (
                                <p>{comentario.ComentarioStudent?.ComentarioUser}</p>
                              )}
                              {comentarios && comentario.ComentarioCompany && (
                                <p>{comentario.ComentarioCompany?.ComentarioUser}</p>
                              )}

                          </ul>
                        </div>
                      ))
                    ) : (
                      <p>No hay comentarios aún.</p>
                    )}

                </div>
            </div>
          )}
    </div>
  );
};
