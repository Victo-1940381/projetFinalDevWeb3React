import axios from "axios";
import { useContext, useEffect, useState } from "react";
import type { JeuxVideo } from "../../model/jeuxvideo";
import { Button, Container, Grid, Typography } from "@mui/material";
import { LoginContext } from "../../context/loginContext";
import { useNavigate } from "react-router-dom";

function ListeJeux() {
    const [listejeux,setListejeux] = useState<JeuxVideo[]>([]);
    const {isLoggedIn,token} = useContext(LoginContext);
    //const listeVide: JeuxVideo[] =  [];
    const navigate = useNavigate();
   useEffect(()=>{
    if(!isLoggedIn){
        navigate('/login');
    } else{
        axios.get('https://jeuxvideoapi-d4a9b0azcfgpd7h9.canadacentral-01.azurewebsites.net/api/jeuxvideo/liste',{
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        .then((response)=> setListejeux(response.data.jeuxvideos));
    }
   },[isLoggedIn]);

   return (
    
        <Grid container  justifyContent="center" alignItems="center" flexDirection="column" sx={{backgroundColor:"white",width:"100vw", textAlign:"center",height:"100vh"}}>
            <Grid size={12}>
                   <Typography variant="h1"  sx={{color:"black"}}>
                    Liste des Jeux vidéo
                   </Typography>
                </Grid>
            {listejeux.map(jeux => (
                <Grid size={12} justifyItems="center" alignContent="center" sx={{ border:'1px solid black'}}>
                    <Button   onClick={()=>{navigate(`/UnJeux/${jeux._id}`)}}>
                        {jeux.nom}
                    </Button>

                </Grid>
            ))}
            
        </Grid>

        
   )
}
export default ListeJeux;