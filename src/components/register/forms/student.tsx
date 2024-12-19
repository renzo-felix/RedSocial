import { Spinner } from "@/commons/spinner";
import { Button } from "@/components/ui/button";
import { sendGitHubOAuth } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaUnlink } from "react-icons/fa";

const StudentForm = () => {
    const router = useRouter();
    const [page, setPage] = useState<number>(1);
    const [msg, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const careers = [
        "Administración de Empresas",
        "Administración Hotelera y Turismo",
        "Antropología",
        "Arquitectura",
        "Biología",
        "Ciencias de Datos",
        "Ciencias de la Computación",
        "Ciencias de la Comunicación",
        "Ciencias Políticas",
        "Contabilidad",
        "Derecho",
        "Economía",
        "Educación",
        "Enfermería",
        "Filosofía",
        "Física",
        "Ingeniería Ambiental",
        "Ingeniería Civil",
        "Ingeniería de Sistemas",
        "Ingeniería de Software",
        "Ingeniería Electrónica",
        "Ingeniería Industrial",
        "Ingeniería Mecánica",
        "Ingeniería Química",
        "Marketing",
        "Medicina",
        "Nutrición",
        "Odontología",
        "Psicología",
        "Relaciones Internacionales",
        "Sociología",
        "Veterinaria"
    ]
    const [githubUsername, setGithubUsername] = useState<string>("");
    const [data, setData] = useState({
        name: "",
        last_name: "",
        email: "",
        password: "",
        university: "",
        career: "",
        ciclo: 1,
        githubUsername: ""
    });

    useEffect(() => {
        const storedUsername = localStorage.getItem("register_github_username") || "";
        setGithubUsername(storedUsername);
        setData({
            ...data,
            githubUsername: storedUsername,
        });

        const handleStorageChange = () => {
            const updatedUsername = localStorage.getItem("register_github_username") || "";
            setGithubUsername(updatedUsername);
            setData({
                ...data,
                githubUsername: updatedUsername,
            });
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const resetGithubUsername = () => {
        localStorage.removeItem("register_github_username");
        setGithubUsername('');
        setData({
            ...data,
            githubUsername: '',
        });
    }

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

        const res = await fetch("/api/register-student", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const { success, message } = await res.json();
        if (success) {
            localStorage.removeItem("register_github_username");
            router.push("/login");
            setLoading(false);
        } else {
            alert(message)
            localStorage.removeItem("register_github_username");
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
                        <input placeholder="Nombres" name="name" className="text-sm p-3 px-5 rounded-lg"
                            value={data.name} onChange={handleChange}></input>
                        <input placeholder="Apellidos" name="last_name" className="text-sm p-3 px-5 rounded-lg"
                            value={data.last_name} onChange={handleChange}></input>
                        <input placeholder="Email" name="email" className="text-sm p-3 px-5 rounded-lg" type="email"
                            value={data.email} onChange={handleChange}></input>
                        <input placeholder="Contraseña" name="password" className="text-sm p-3 px-5 rounded-lg" type="password"
                            value={data.password} onChange={handleChange}></input>
                        <Button className="w-full mt-3" disabled={!data.name || !data.last_name || !data.email || !data.password} type="submit">Continuar</Button>
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
                        <input placeholder="Universidad" name="university" className="text-sm p-3 px-5 rounded-lg"
                            value={data.university} onChange={handleChange}></input>
                        <span className="flex flex-row gap-2 justify-between">
                            <select name="career" className="text-sm p-3 px-5 rounded-lg w-full overflow-hidden"
                                value={data.career || ""} onChange={handleChange}>
                                <option value="" disabled>Selecciona una carrera</option>
                                {careers.map((career, index) => (
                                    <option key={index} value={career}>{career}</option>
                                ))}
                            </select>
                            <input placeholder="Ciclo" name="ciclo" type="number" min={1} max={10} className="text-sm p-3 px-5 rounded-lg"
                                value={data.ciclo} onChange={handleChange}></input>
                        </span>
                    </form>
                    <div className="flex flex-col gap-2 mt-8">
                        <div className="flex flex-row gap-2">
                            <button className="flex flex-row justify-between text-sm font-bold p-2 px-5 rounded-lg w-full bg-white border text-[#B1B1B1] items-center hover:text-[#6e6e6e]" onClick={() => sendGitHubOAuth()} disabled={githubUsername != ''}>
                                {githubUsername != '' ? 'Vinculado: ' + githubUsername : 'Vincular con GitHub'}
                                <FaGithub className="w-[25px] h-[25px]" />
                            </button >
                            {githubUsername != '' && 
                            <button className="flex flex-row w-12 text-sm font-bold p-2 border rounded-lg bg-white text-[#B1B1B1] items-center hover:text-[#6e6e6e]" onClick={resetGithubUsername}>
                                <span className="flex mx-auto items-center">
                                    <FaUnlink className="w-[12px] h-[12px]" />
                                </span>
                            </button>}
                        </div>
                        <button className="flex flex-row justify-between text-sm font-bold p-2 px-5 rounded-lg w-full bg-white border text-[#B1B1B1] items-center" disabled={true}>
                            Vincular con LinkedIn
                            <FaLinkedin className="w-[25px] h-[25px]" />
                        </button>
                    </div>
                    {msg ? <p className="text-sm justify-center">{msg}</p> : ""}
                    {loading ? <Spinner /> : <Button className="w-full" onClick={handleSubmit}>Registrarse</Button>}
                    <div className="flex mx-auto w-fit text-sm gap-5">
                        <button className="hover:underline" onClick={handlePrevious}>Volver</button>
                        <button className="hover:underline" onClick={login}>Login</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default StudentForm;
