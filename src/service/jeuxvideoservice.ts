import axios from "axios";
import type { JeuxVideo } from "../model/jeuxvideo";
import { useContext } from "react";
import { LoginContext } from "../context/loginContext";


export async function FetchjeuxVideo():Promise<JeuxVideo[]> {
    const {token} = useContext(LoginContext);
    try{
        const response = await axios.get<JeuxVideo[]>('https://jeuxvideoapi-d4a9b0azcfgpd7h9.canadacentral-01.azurewebsites.net/api/jeuxvideo/liste',{
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.error("Erreur lors de la recupération des jeux vidéo:" , error.message);

        } else{
            console.error("Erreur inattendue :", error);
        }
        return [];
    }
}