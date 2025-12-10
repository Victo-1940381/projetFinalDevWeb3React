import { useContext, useEffect, useState } from "react";
import type { JeuxVideo } from "../../model/jeuxvideo";
import { LoginContext } from "../../context/loginContext";
import { useNavigate } from "react-router-dom";
import  { Grid, Typography, Button, TextField } from "@mui/material";
import axios from "axios";
import { FormattedMessage } from "react-intl";


function Genre () {
    const [genre,setGenre] = useState("");
    const [listejeux,setListejeux] = useState<JeuxVideo[]>([]);
    const [texte,setTexte] = useState("Aucun jeux");
    const {isLoggedIn,token} = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(()=>{
    if(!isLoggedIn){
        navigate('/login');
    } 
   },[isLoggedIn]);
   async function chercherpargenre(genre:string){
    axios.get(`https://jeuxvideoapi-d4a9b0azcfgpd7h9.canadacentral-01.azurewebsites.net/api/jeuxvideo/genre/${genre}`,{
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
                  <TextField  label={<FormattedMessage id="genre.textfield.label"/>} value={genre} variant="outlined" onChange={(e)=>{setGenre(e.target.value)}}/>
                    <Button onClick={()=>{chercherpargenre(genre)}} variant="contained">
                        <FormattedMessage id="genre.button.recherche"/>
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
export default Genre;