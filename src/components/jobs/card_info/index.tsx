import { Spinner } from "@/commons/spinner";
import { Button } from "@/components/ui/button";
import { getCompanieById } from "@/services/companies";
import { job_prev_info } from "@/types/jobsTypes";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { VscVerifiedFilled } from "react-icons/vsc";

export const JobsCard = ({ info }: { info: any }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await getCompanieById(info.CompanyId);
        setCompany(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        alert("Algo salió mal");
      }
    };
    fetchCompany();
  }, []);

  const router = useRouter();
  const basePath = "/jobs";

  if (loading) return <Spinner />;
  else
    return (
      <div className="bg-[#f7f5ed] rounded-xl p-4 pl-6 pr-6 mb-2">
        <div className="flex flex-row w-full">
          <div className=" flex justify-center items-center">
            <img
              src={
                company?.CompanyPerfil.imageURL ||
                "https://www.gighub.ai/assets/images/company.png"
              }
              className="  min-w-[45px] w-full h-[45px] m-0 p-0"
            />
          </div>
          <div className="w-full flex flex-row justify-between">
            <div className=" flex flex-col pl-4 justify-center">
              <div className="text-[22px] flex flex-row items-center">
                <h4>{info.Titulo}</h4>
                &nbsp;
                <VscVerifiedFilled />
              </div>
              <p className="text-[14px]">{company.Username}</p>
            </div>

            <div className="w-fit">
              <p>
                {new Date().toLocaleDateString("es-ES", {
                  timeZone: "America/Lima",
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full bg-[#71717a] h-[1px] mt-4 mb-4"></div>
        <div>
          <p>{info.InfoCorta}</p>
        </div>
        <div className="pt-4 pb-2 flex flex-row ">
          <Button
            className="bg-sky-600 rounded-[12px] max-w-[100px] w-full"
            onClick={() => {
              router.push(`/jobs/${info.id}`);
            }}
          >
            Ver
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="outline"
            className="rounded-[12px] max-w-[100px] w-full"
          >
            Guardar
          </Button>
        </div>
      </div>
    );
};
