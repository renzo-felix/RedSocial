import { Button } from "@/components/ui/button";
import { notFound, useRouter } from "next/navigation";
import React from "react";
import { VscVerifiedFilled } from "react-icons/vsc";
import { SlUser } from "react-icons/sl";

interface PersonInfo {
    studentUserId: number;
    Description: string | null;
    Career: string | null;
    Cycle: string | null;
    imageURL: string | null;
    Institute: string;
    Name: string;
    LastName: string;
    GitHub?: string | null;
    Linkedin?: string | null;
  }
  


export const FollowerStudenteCard = ({ info }: { info: PersonInfo }) => {
  const router = useRouter();
  const basePath = "/people";
  return (
    <div className="bg-[#f7f5ed] rounded-xl p-4 pl-6 pr-6 mb-2">
      <div className="flex flex-row w-full">
        <div className=" flex justify-center items-center">
            {info.imageURL ? (
                <img
                src={info.imageURL}
                alt="Profile"
                className="min-w-[45px] w-full h-[45px] m-0 p-0"
                />
            ) : (
                <SlUser className="min-w-[45px] w-full h-[45px] m-0 p-0" />
            )}
        </div>
        <div className="w-full flex flex-row justify-between">
          <div className=" flex flex-col pl-4 justify-center">
            <div className="text-[22px] flex flex-row items-center">
              <h4>{info.Name}</h4>
              &nbsp;
              {/* {info.verified && <VscVerifiedFilled />} */}
            </div>
            <p className="text-[16px]">
              {/* <b>{info.count}</b>+ practicas */}
            </p>
          </div>
          <div className="w-fit">
            <h5>{info.Institute}</h5>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#71717a] h-[1px] mt-4 mb-4"></div>
      <div>
        <p>{info.Description}</p>
      </div>
      <div className="pt-4 pb-2 flex flex-row ">
        <Button
          className="bg-sky-600 rounded-[12px] max-w-[100px] w-full"
          onClick={() => {
              // router.push(`${basePath}/${info.Name}`);
              router.push(`${basePath}/${info.studentUserId}`);

          }}
        >
          Ver
        </Button>
        &nbsp;&nbsp;
        {/* <Button
          variant="outline"
          className="rounded-[12px] max-w-[100px] w-full"
        >
          Chat
        </Button> */}
      </div>
    </div>
  );
};
