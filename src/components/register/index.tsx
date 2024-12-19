import { AppLogo } from "@/commons/logo";
import { Spinner } from "@/commons/spinner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const login = () => {
        router.push("/login");
    }

    const studentForm = () => {
        router.push("/register/student");
    }

    const companyForm = () => {
        router.push("/register/company");
    }

    return (
        <div className="min-w-96 flex items-center justify-center bg-[#F7F5ED] p-12 rounded-2xl">
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col items-center">
                    <AppLogo />
                    <h1 className="font-bold text-3xl mt-4">
                        Sign Up
                    </h1>
                    <h3 className="text-sm font-normal p-2">
                        Selecciona una opcion.
                    </h3>
                </div>
                <div className="flex flex-col gap-2">
                    <Button className="w-full" onClick={studentForm}>Estudiante</Button>
                    <Button className="w-full" onClick={companyForm}>Empresa</Button>
                </div>
                <button className="mx-auto w-fit text-sm hover:underline" onClick={login}>Login</button>
            </div>
        </div>
    );
};

export default Register;
