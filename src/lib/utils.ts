import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseURL() {
  return process.env.NEXT_PUBLIC_BASE_URL || "";
}

export const changeUploadImage = async (file: File|null) => {
  if (file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "parcial_proyecto"); // Configura el preset que necesitas

    const presetUrl = "https://api.cloudinary.com/v1_1/dzli6ozmk/image/upload"; 

    try {
      const response = await axios.post(presetUrl, data);
      console.log("Url imagen:", response.data.secure_url);  
      return response.data.secure_url; 
    } catch (error) {
      console.error("Error uploading image", error);
      return null; 
    }
  } else {
    return "error"; 
  }
};

export function sendGitHubOAuth() {
  const client_id = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

  if (!client_id) {
      return;
  }
  window.open(`https://github.com/login/oauth/authorize?client_id=${client_id}&scope=read:user&redirect_uri=${window.location.origin}/integrations/github/callback`, '_blank');
}
