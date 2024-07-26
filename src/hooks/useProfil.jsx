import { useEffect, useState } from "react";
import { profilApi } from "../api/profilApi";

export const useProfil = (id) => {
  const [profil, setProfil] = useState(null);

  useEffect(() => {
    const GetProfil = async () => {
      try {
        const response = await profilApi.getProfilById(id);
        setProfil(response);
      } catch (err) {
        console.error(err);
      }
    };

    GetProfil();
  }, [id]);

  return profil;
};


