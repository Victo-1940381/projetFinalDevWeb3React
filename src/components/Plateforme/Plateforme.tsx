import { useContext, useEffect, useState } from "react";
import type { JeuxVideo } from "../../model/jeuxvideo";
import { LoginContext } from "../../context/loginContext";
import { useNavigate } from "react-router-dom";
import  { Grid, Typography, Button, TextField } from "@mui/material";
import axios from "axios";
import { FormattedMessage } from "react-intl";


function Plateforme() {
    const [plateforme,setPlateforme] = useState("");
    const [listejeux,setListejeux] = useState<JeuxVideo[]>([]);
    const [texte,setTexte] = useState("Aucun jeux");
    const {isLoggedIn,token} = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(()=>{
    if(!isLoggedIn){
        navigate('/login');
    } 
   },[isLoggedIn]);
   async function chercherparplatforme(platforme:string){
    axios.get(`https://jeuxvideoapi-d4a9b0azcfgpd7h9.canadacentral-01.azurewebsites.net/api/jeuxvideo/plateforme/${platforme}`,{
            headers:{
                Authorization: `Bearer ${token}`,
            }}).then((response)=>{

                setTexte("Liste des jeux vidéo");
                setListejeux(response.data.jeuxvideos);
            })
            .catch(()=>{
                setTexte("Aucun jeux");
                setListejeux([]);
            })
   }
   
   return (
    
        <Grid container  justifyContent="center" alignItems="center" flexDirection="column" sx={{backgroundColor:"white",width:"100vw", textAlign:"center",height:"100vh"}}>
            <Grid size={12} >
                  <TextField  label={<FormattedMessage id="platforme.textfield.label"/>} value={plateforme} variant="outlined" onChange={(e)=>{setPlateforme(e.target.value)}}/>
                    <Button onClick={()=>{chercherparplatforme(plateforme)}} variant="contained">
                        <FormattedMessage id="platforme.button.recherche"/>
                        </Button>
                </Grid>

                <Grid size={12}>
                   <Typography variant="h1"  sx={{color:"black"}}>
                    {texte}
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
export default Plateforme;