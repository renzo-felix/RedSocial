"use client";

import { JobsCard } from "./card_info";
import { SearchBar } from "@/commons/searchbar";
import { Spinner } from "@/commons/spinner";
import { getOfferInfo, getPractices } from "@/services/practices";
import { job_prev_info } from "@/types/jobsTypes";
import React, { useEffect, useState } from "react";

export const Jobs = () => {
  const jobs_prev_info = [
    {
      profile_img_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
      title: "Practicante de desarrollo de Software",
      company: "Google",
      verified: true,
      time_ago: "12h",
      preview:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla veniam reprehenderit quidem deserunt error deleniti quasi eos expedita, nemo aperiam repellendus nam ab consectetur iste voluptatum maiores modi magnam perferendis!",
      id: "job-21365",
      slug: "google-inc",
    },
    {
      profile_img_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
      title: "Pasantía Microsoft Latam",
      company: "Microsoft",
      verified: true,
      time_ago: "2d", // Agregado por consistencia, puedes ajustarlo según sea necesario
      preview:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia amet perferendis pariatur aut voluptas illum perspiciatis. Eos laboriosam incidunt aut sit ipsum saepe, tempore, sint dolor recusandae sequi assumenda nemo? Lorem ipsum dolor sit amet consectetur adipisicing elit. Et expedita molestiae optio quam aliquam quasi pariatur quis reiciendis rerum ut odit, voluptatem natus deserunt ducimus autem mayores dignissimos consequuntur velit!",
      id: "job-21366", // Generado por consistencia
      slug: "microsoft",
    },
    {
      profile_img_url:
        "https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png",
      title: "Programador Backend",
      company: "Amazon",
      verified: true,
      time_ago: "10h", // Agregado por consistencia, puedes ajustarlo según sea necesario
      preview:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia amet perferendis pariatur aut voluptas illum perspiciatis. Eos laboriosam incidunt aut sit ipsum saepe, tempore, sint dolor recusandae sequi assumenda nemo? Lorem ipsum dolor sit amet consectetur adipisicing elit. Et expedita molestiae optio quam aliquam quasi pariatur quis reiciendis rerum ut odit, voluptatem natus deserunt ducimus autem mayores dignissimos consequuntur velit!",
      id: "job-21367", // Generado por consistencia
      slug: "amazon-inc",
    },
  ];

  const [loading, setLoading] = useState<boolean>(true);
  const [practices, setPractices] = useState<any>([]);

  useEffect(() => {
    const fetchPractices = async () => {
      try {
        const data = await getPractices();
        setPractices(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        alert("Algo salió mal");
      }
    };
    fetchPractices();
  }, []);

  return (
    <div className=" w-full rounded-xl">
      <SearchBar page={"empresas"} />
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-2">
          {practices.map((practice: any, i: number) => {
            return <JobsCard info={practice} key={i} />;
          })}
        </div>
      )}
    </div>
  );
};
