"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const GitHubCallbackPage = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchGitHubUser = async () => {
      try {
        const code = searchParams.get("code");
        if (!code) {
          console.error("GitHub OAuth code not found.");
          return;
        }

        const tokenRes = await fetch(`/api/github/callback?code=${code}`);
        const tokenData = await tokenRes.json();

        if (!tokenRes.ok || !tokenData.token) {
          console.error("Failed to retrieve access token:", tokenData.message);
          router.push("/");
          return;
        }

        const token = tokenData.token;

        const userRes = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userRes.ok) {
          console.error("Failed to fetch user data:", userRes.statusText);
          router.push("/");
          return;
        }

        const userData = await userRes.json();
        const username = userData.login;

        localStorage.setItem("register_github_username", username);
        setLoading(false);
      } catch (error) {
        console.error("Error during GitHub OAuth:", error);
      }
    };

    fetchGitHubUser();
  }, []);

  return (
    loading ? (
      <div className="p-5">
        <h1>Conectando con GitHub...</h1>
        <p>Por favor, espere mientras se procesa la consulta.</p>
      </div>
    ) : 
    <div className="p-5">
        <h1>Conexión con GitHub realizada</h1>
        <p>Ya puede cerrar esta página.</p>
      </div>
  );
};

export default GitHubCallbackPage;
