import axios from "axios";
import { useEffect, useState } from "react";
import type { JeuxVideo } from "../../model/jeuxvideo";
import { FetchjeuxVideo } from "../../service/jeuxvideoservice";
import { Container, Grid } from "@mui/material";

function ListeJeux() {
    const [listejeux,setListejeux] = useState<JeuxVideo[]>([]);
   useEffect(()=>{
    FetchjeuxVideo()
    .then(jeuxfetch => {
        setListejeux(jeuxfetch);
    })
    .catch(error => {
        console.error("echec de la mise a jour de l'état", error);
    })
   
   },[]);

   return (
    <Container sx={{mt:4}}>
        <Grid container spacing={4}>
            {listejeux.map(jeux => (
                <Grid >
                    {jeux.nom}
                </Grid>
            ))}
            
        </Grid>
    </Container>
        
   )
}
export default ListeJeux;