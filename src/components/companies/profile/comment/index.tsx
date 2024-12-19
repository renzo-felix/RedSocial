import { Button } from "@/components/ui/button";
import React from "react";
import { FaStar } from "react-icons/fa";

interface user_comment_info {
  profile_img_url: string;
  name: string;
  time_ago: string;
  xp: number;
  role: string;
  details: string;
}

export const UserComment = ({ info }: { info: user_comment_info }) => {
  return (
    <div className="w-full rounded-xl bg-[#f7f5ed] p-4 pr-6 pl-6 flex flex-col mt-2">
      <div className="flex flex-row w-full">
        <div className="flex">
          <img
            className="min-w-[60px] w-full h-[60px]"
            src={info.profile_img_url}
          />
        </div>
        <div className="flex flex-row w-full justify-between pl-2">
          <div className="flex flex-col ">
            <div className="flex flex-row items-center justify-center">
              <h5>{info.name}</h5>
              <FaStar className="ml-1 mr-1" />
              <p className="pt-1 pl-4">{info.time_ago}</p>
            </div>
            <p>
              <b>{info.xp}+ prácticas</b>
            </p>
          </div>
          <div>
            <p>{info.role}</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#71717a] h-[1px] mt-4 mb-4"></div>
      <div>{info.details}</div>
      <Button
        variant="outline"
        className="rounded-[12px] max-w-[100px] w-full mt-4"
      >
        Ver Más
      </Button>
    </div>
  );
};
