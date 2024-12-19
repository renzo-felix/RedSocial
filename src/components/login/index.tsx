"use client";
import { AppLogo } from "@/commons/logo";
import { Spinner } from "@/commons/spinner";
import { Button } from "@/components/ui/button";
import { set } from "@/store/user";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const register = () => {
    router.push("/register");
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: event.target.email.value,
        password: event.target.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const { success, message, type, data } = await res.json();
    if (success) {
      if (type === "student") {
        dispatch(set({
          id: data.id,
          name: data.Name,
          surname: data.LastName,
          email: data.email,
          isAdmin: false,
          type: type,
          slug: `${data.Name.toLowerCase()}-${data.LastName.toLowerCase()}`,
          profileImageUrl: data.UserProfile.imageURL || '',
        }));
      } else if (type === "company") {
        dispatch(set({
          id: data.id,
          name: data.Username,
          surname: '',
          email: data.email,
          isAdmin: false,
          type: type,
          slug: '',
          profileImageUrl: data.CompanyProfile.imageURL || '',
        }));
      }
      router.push("/home");
      setLoading(false);
    } else {
      alert(message)
      setLoading(false);
    }
  }

  return (
    <div className="min-w-96 flex items-center justify-center bg-[#F7F5ED] p-12 rounded-2xl">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col items-center">
          <AppLogo />
          <h1 className="font-bold text-3xl mt-4">
            Login
          </h1>
          <h3 className="text-sm font-normal p-2">
            Ingresa tu información.
          </h3>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input placeholder="Email" name="email" className="text-sm p-3 px-5 rounded-lg"></input>
          <input placeholder="Contraseña" name="password" className="text-sm p-3 px-5 rounded-lg" type="password"></input>
          {loading ? <Spinner /> : <Button className="w-full mt-4" type="submit">Login</Button>}
        </form>
        <button className="mx-auto w-fit text-sm hover:underline" onClick={register}>Registrarse</button>
      </div>
    </div>
  );
};

export default Login;
