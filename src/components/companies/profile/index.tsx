"use client";

import { UserComment } from "./comment";
import ModalStructure from "@/commons/ModalStructure/Index";
import { Spinner } from "@/commons/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCompanieById, updateCompany } from "@/services/companies";
import { RootState } from "@/store/store";
import { company_user_profile_info } from "@/types/companiesTypes";
import { UserState } from "@/types/userTypes";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useSelector } from "react-redux";

//https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png
//despues de pedir al back

const users_test_info = [
  {
    profile_img_url:
      "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png",
    name: "Rodrigo Perez",
    time_ago: "2 semanas",
    xp: 4,
    role: "Estudiante",
    details:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente vitae distinctio fugit voluptatibus at ratione perferendis aliquid repellendus optio nostrum aperiam vero minus explicabo sed, soluta porro ad aspernatur odio. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, hic quae, necessitatibus sed harum atque eius porro nihil similique repudiandae fugit sapiente sunt modi nemo suscipit. Voluptate culpa recusandae adipisci?",
  },
  {
    profile_img_url:
      "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png",
    name: "Daniel Molina",
    time_ago: "1 mes",
    xp: 2,
    role: "Estudiante",
    details:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente vitae distinctio fugit voluptatibus at ratione perferendis aliquid repellendus optio nostrum aperiam vero minus explicabo sed, soluta porro ad aspernatur odio. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, hic quae, necessitatibus sed harum atque eius porro nihil similique repudiandae fugit sapiente sunt modi nemo suscipit. Voluptate culpa recusandae adipisci?",
  },
  {
    profile_img_url:
      "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png",
    name: "Valeria Perez",
    time_ago: "3 semanas",
    xp: 1,
    role: "Estudiante",
    details:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente vitae distinctio fugit voluptatibus at ratione perferendis aliquid repellendus optio nostrum aperiam vero minus explicabo sed, soluta porro ad aspernatur odio. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, hic quae, necessitatibus sed harum atque eius porro nihil similique repudiandae fugit sapiente sunt modi nemo suscipit. Voluptate culpa recusandae adipisci?",
  },
];

export const CompanyProfile = () => {
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [localInfo, setLocalInfo] = useState<company_user_profile_info | null>(
    null
  );
  const [formData, setFormData] = useState<company_user_profile_info | null>(
    null
  );
  const user: UserState = useSelector<RootState, UserState>(
    (state) => state.user
  );

  const onChangeSomeProp = (
    newVal: any,
    field: string,
    subfield: string | null,
    limit: number
  ) => {
    if (newVal.length <= limit) {
      setFormData((prevFormData) => {
        // Clon profundo para evitar mutaciones
        const temp = JSON.parse(JSON.stringify(prevFormData));

        if (subfield) {
          temp[field][subfield] = newVal;
        } else {
          temp[field] = newVal;
        }

        return temp;
      });
    }
  };

  const sendData = async () => {
    try {
      const response = await updateCompany(formData);
      console.log("Datos actualizados", response);
      window.location.reload();
      // setLocalInfo(response);
      // setFormData(response);
    } catch (error) {
      console.log(error);
      alert("Algo salió mal");
    }
  };

  const onClickSaveChanges = () => {
    sendData();
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getCompanieById(id);
        setLocalInfo(data);
        setFormData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        alert("Algo salió mal");
      }
    };
    fetchInfo();
  }, []);

  return (
    <div className="flex w-full h-full items-center flex-col">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="w-full flex flex-col rounded-t-xl h-full">
            <div className={`h-[200px] w-auto overflow-hidden relative`}>
              <img
                src={
                  localInfo?.CompanyPerfil.PortadaImg ||
                  "https://venngage-wordpress.s3.amazonaws.com/uploads/2022/09/business-background-3-1024x585.png"
                }
                alt="Cropped example"
                className="w-full h-full object-cover object-center rounded-t-xl"
              />
            </div>

            <div className="flex relative bg-transparent">
              <div className="flex bg-white rounded-xl absolute left-[20px] top-[-40px] p-2">
                <img
                  className="w-[50px] h-[50px] "
                  src={
                    localInfo?.CompanyPerfil.imageURL ||
                    "https://www.gighub.ai/assets/images/company.png"
                  }
                />
              </div>
            </div>
            <div className="flex flex-col p-4 rounded-b-xl h-[60%] h-full bg-[#f7f5ed] pl-6 pr-6">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col pt-4">
                  <div className="flex flex-row items-center">
                    <h4>{localInfo?.Username}</h4>
                    <div className="flex items-center justify-center h-full pl-4 text-[#9e3f90] pt-1">
                      <p>
                        <b>500+ seguidores</b>
                      </p>
                    </div>
                  </div>
                  <p>{localInfo?.CompanyPerfil.IndustrySector}</p>
                </div>
                <div className="flex flex-row justify-end ">
                  <div className="flex flex-row justify-between pr-6">
                    {localInfo?.CompanyPerfil.GitHub && (
                      <Link
                        href={localInfo?.CompanyPerfil.GitHub}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub className="w-[25px] h-[25px] mr-2" />
                      </Link>
                    )}
                    {/* <Link
                        href={info.linkedIn_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin className="w-[25px] h-[25px]" />
                      </Link> */}
                  </div>
                  {user.id != parseInt(id) && (
                    <div className="flex flex-col w-[120px]">
                      <Button className="bg-sky-600 rounded-[12px] max-w-[120px] w-full mb-2">
                        Seguir
                      </Button>

                      {/* <Button
                        className="rounded-[12px] max-w-[120px] w-full"
                        variant="outline"
                      >
                        Chat
                      </Button> */}
                    </div>
                  )}
                  {user.id == parseInt(id) && (
                    <div className="flex flex-col w-[120px]">
                      <Button
                        className="bg-sky-600 rounded-[12px] max-w-[120px] w-full mb-2"
                        onClick={() => setShowModal(true)}
                      >
                        Editar Perfil
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col pt-4">
                <span>
                  <b>RUC: </b>
                  {localInfo?.CompanyPerfil.Sunac || "--"}
                </span>
                <span>
                  <b>Dirección: </b>
                  {localInfo?.CompanyPerfil.Address || "--"}
                </span>
                <span>
                  <b>Teléfono: </b>
                  {localInfo?.CompanyPerfil.PhoneNumber || "--"}
                </span>
              </div>
              <div className="flex flex-col pt-4">
                <h5>Información</h5>
                <p>{localInfo?.CompanyPerfil.InfoLarga}</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#f7f5ed] rounded-xl p-4 pr-6 pl-6 mt-2">
            <h5>Testimonios ex-practicantes</h5>
          </div>
          {users_test_info.map((comment, i) => {
            return <UserComment key={i} info={comment} />;
          })}
        </>
      )}
      {/*modal de edicion de perfil*/}
      {showModal && (
        <ModalStructure handleCloseModal={() => setShowModal(false)}>
          <div className="flex flex-col items-center gap-y-4 w-full ">
            <h3>Editar Perfil</h3>
            <form className="w-full justify-center flex flex-wrap gap-y-2 gap-x-4">
              <div className="grid w-fit  items-center gap-1.5">
                <Label htmlFor="username">Nombre</Label>
                <Input
                  id="username"
                  className="w-fit px-4 py-2"
                  type="text"
                  value={formData?.Username}
                  placeholder="Cambiar nombre"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChangeSomeProp(e.target.value, "Username", null, 40)
                  }
                  required={true}
                />
              </div>

              {/* Industry Sector */}
              <div className="grid w-fit items-center gap-1.5">
                <Label htmlFor="industry">Sector Industrial</Label>
                <Input
                  id="industry"
                  className="w-fit px-4 py-2"
                  type="text"
                  value={formData?.CompanyPerfil.IndustrySector}
                  placeholder="Cambiar sector industrial"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChangeSomeProp(
                      e.target.value,
                      "CompanyPerfil",
                      "IndustrySector",
                      40
                    )
                  }
                  required={true}
                />
              </div>

              {/* Phone Number */}
              <div className="grid w-fit max-w-sm items-center gap-1.5">
                <Label htmlFor="phoneNumber">Número de teléfono</Label>
                <Input
                  id="phoneNumber"
                  className="w-fit px-4 py-2"
                  type="text"
                  value={formData?.CompanyPerfil.PhoneNumber || ""}
                  placeholder="Cambiar número de teléfono"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChangeSomeProp(
                      e.target.value,
                      "CompanyPerfil",
                      "PhoneNumber",
                      9
                    )
                  }
                />
              </div>

              {/* Address */}
              <div className="grid w-fit max-w-sm items-center gap-1.5">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  className="w-fit px-4 py-2"
                  type="text"
                  value={formData?.CompanyPerfil.Address || ""}
                  placeholder="Cambiar dirección"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChangeSomeProp(
                      e.target.value,
                      "CompanyPerfil",
                      "Address",
                      40
                    )
                  }
                />
              </div>

              {/* Info Corta */}
              <div className="grid w-fit max-w-sm items-center gap-1.5">
                <Label htmlFor="infoCorta">Información Corta</Label>
                <Input
                  id="infoCorta"
                  className="w-fit px-4 py-2"
                  type="text"
                  value={formData?.CompanyPerfil.InfoCorta}
                  placeholder="Cambiar información corta"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChangeSomeProp(
                      e.target.value,
                      "CompanyPerfil",
                      "InfoCorta",
                      40
                    )
                  }
                  required={true}
                />
              </div>

              {/* Info Larga */}
              <div className="grid w-fit max-w-sm items-center gap-1.5">
                <Label htmlFor="infoLarga">Información Larga</Label>
                <textarea
                  id="infoLarga"
                  className="w-fit px-4 py-2 border-[1px] rounded-[5px] border-gray-300"
                  value={formData?.CompanyPerfil.InfoLarga}
                  placeholder="Cambiar información larga"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    onChangeSomeProp(
                      e.target.value,
                      "CompanyPerfil",
                      "InfoLarga",
                      160
                    )
                  }
                  required={true}
                />
              </div>
            </form>
            <Button
              className="bg-sky-600 rounded-[12px] max-w-[120px] w-full mb-2"
              onClick={() => onClickSaveChanges()}
            >
              Guardar cambios
            </Button>
          </div>
        </ModalStructure>
      )}
    </div>
  );
};
