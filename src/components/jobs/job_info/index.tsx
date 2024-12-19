"use client";

import { Spinner } from "@/commons/spinner";
import { Button } from "@/components/ui/button";
import {
  getOfferInfo,
  getPracticeById,
  postularOferta,
} from "@/services/practices";
import { RootState } from "@/store/store";
import { UserState } from "@/types/userTypes";
import { Liu_Jian_Mao_Cao } from "next/font/google";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { CiBookmark } from "react-icons/ci";
import { FiClock } from "react-icons/fi";
import { IoIosWarning } from "react-icons/io";
import { TiLocation } from "react-icons/ti";
import { useSelector } from "react-redux";

//google job info hardcodeado
const info = {
  profile_img_url:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
  title: "Practicante de desarrollo de Software",
  company: "Google",
  verified: true,
  time_ago: "12d",
  location: "Surco, Lima, Perú",
  info: "", //formato tip tap
  slug: "google-inc",
  id: "1",
};

export const JobInfo = () => {
  //capturar slug de la ruta

  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const id = params.id;
  const user = useSelector<RootState, UserState>((state) => state.user);
  const [offerInfo, setOfferInfo] = useState<any>(null);

  useEffect(() => {
    const fetchInfo = async (id: any) => {
      try {
        const data = await getPracticeById(id);
        setInfo(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        alert("Algo salió mal");
        setLoading(false);
      }
    };
    fetchInfo(id);

    const fetchOfferInfo = async (id: any) => {
      try {
        const data = await getOfferInfo(id);
        console.log(data[0]);
        setOfferInfo(data[0]);
      } catch (error) {
        console.log(error);
        alert("Algo salió mal");
      }
    };

    fetchOfferInfo(user.id);
  }, []);

  const onClickPostular = () => {
    const load = async () => {
      try {
        await postularOferta(user.id);
      } catch (error) {
        console.log(error);
        alert("Algo salió mal");
      }
    };
    load();
  };

  if (loading) return <Spinner />;
  else
    return (
      <div className="w-full flex flex-col">
        <div className="flex flex-row w-full justify-between bg-cardLight rounded-xl p-2 pl-4 pr-4 h-fit">
          <div className="flex flex-row w-fit">
            <div className=" flex justify-center items-center">
              <img
                src={"https://www.gighub.ai/assets/images/company.png"}
                className="  max-w-[45px] w-full h-[45px] m-0 p-0"
              />
            </div>
            <div className="flex flex-col pl-4">
              <h5>{info.Titulo}</h5>
              <p>{"google"}</p>
            </div>
          </div>
          <div className=" flex justify-center items-center flex-row">
            {/*botones para guardar, postular, y reportar*/}
            {offerInfo?.studentUserId != user.id && (
              <Button
                className="rounded-[12px] max-w-[100px] bg-sky-600"
                onClick={() => {
                  onClickPostular();
                }}
              >
                Postular
              </Button>
            )}
            {offerInfo?.studentUserId == user.id && (
              <span>Ya te postulaste a esta oferta</span>
            )}
            &nbsp;
            <Button variant="ghost" className="rounded-[12px] p-2 ">
              <CiBookmark className="h-[25px] w-[25px]" />
            </Button>
            <Button variant="ghost" className="rounded-[12px] p-2">
              <IoIosWarning className="h-[25px] w-[25px]" />
            </Button>
          </div>
        </div>
        <div className="bg-cardLight rounded-xl mt-2 p-4 pl-6 pr-6">
          <div className="flex flex-row items-center">
            <FiClock className="mr-2" /> <p className="text-[13px]">{"12d"}</p>
          </div>
          <div className="flex flex-row items-center">
            <TiLocation className="mr-2" />{" "}
            <p className="text-[13px]">{"Lima, Perú"}</p>
          </div>

          <h5 className="pt-2 pb-2">Descripción del puesto</h5>
          <p>{info.InfoLarga}</p>
        </div>
      </div>
    );
};
