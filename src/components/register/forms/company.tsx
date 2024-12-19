import { Spinner } from "@/commons/spinner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CompanyForm = () => {
    const router = useRouter();
    const [page, setPage] = useState<number>(1);
    const [msg, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
      
    const [data, setData] = useState({
        company: "",
        ruc: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        address_2: "",
        type: ""
    });

    const login = () => {
        router.push("/login");
    }

    const handleContinue = (event: any) => {
        event.preventDefault();
        setPage(2);
    }

    const handlePrevious = (event: any) => {
        event.preventDefault();
        setPage(1);
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);

        const res = await fetch("/api/register-company", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          })
      
          const { success, message } = await res.json();
          if (success) {
            router.push("/login");
            setLoading(false);
          } else {
            alert(message)
            setLoading(false);
          }
    }

    const handleChange = (event: any) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    return (
        <div className="w-96 flex items-center justify-center bg-[#F7F5ED] p-12 rounded-2xl">
            {page == 1 ?
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-3xl mt-4">
                            Sign Up
                        </h1>
                        <h3 className="text-sm font-normal p-2">
                            Información Principal
                        </h3>
                    </div>
                    <form className="flex flex-col gap-2" onSubmit={handleContinue}>
                        <input placeholder="Empresa" name="company" className="text-sm p-3 px-5 rounded-lg"
                            value={data.company} onChange={handleChange}></input>
                        <input placeholder="# de RUC" name="ruc" className="text-sm p-3 px-5 rounded-lg"
                            value={data.ruc} onChange={handleChange}></input>
                        <input placeholder="Email" name="email" type="email" className="text-sm p-3 px-5 rounded-lg"
                            value={data.email} onChange={handleChange}></input>
                        <input placeholder="Contraseña" name="password" className="text-sm p-3 px-5 rounded-lg" type="password"
                            value={data.password} onChange={handleChange}></input>
                        <Button className="w-full mt-3" disabled={!data.company || !data.ruc || !data.email || !data.password} type="submit">Continuar</Button>
                    </form>
                    <button className="mx-auto w-fit text-sm hover:underline" onClick={login}>Login</button>
                </div>
                :
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-3xl mt-4">
                            Sign Up
                        </h1>
                        <h3 className="text-sm font-normal p-2">
                            Informacion Adicional
                        </h3>
                    </div>
                    <form className="flex flex-col gap-2">
                        <input placeholder="Teléfono de Contacto" name="phone" type="tel" className="text-sm p-3 px-5 rounded-lg"
                            value={data.phone} onChange={handleChange}></input>
                        <input placeholder="Dirección" name="address" className="text-sm p-3 px-5 rounded-lg"
                            value={data.address} onChange={handleChange}></input>
                        <input placeholder="Dirección 2" name="address_2" className="text-sm p-3 px-5 rounded-lg"
                            value={data.address_2} onChange={handleChange}></input>
                        <input placeholder="Tipo de Empresa" name="type" className="text-sm p-3 px-5 rounded-lg"
                            value={data.type} onChange={handleChange}></input>
                    </form>
                    {msg ? <p className="text-sm justify-center">{msg}</p> : ""}
                    {loading ? <Spinner /> : <Button className="w-full" onClick={handleSubmit}>Registrar Compañía</Button>}
                    <div className="flex mx-auto w-fit text-sm gap-5">
                        <button className="hover:underline" onClick={handlePrevious}>Volver</button>
                        <button className="hover:underline" onClick={login}>Login</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default CompanyForm;
