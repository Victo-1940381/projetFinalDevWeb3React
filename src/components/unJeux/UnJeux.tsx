import { useContext, useEffect, useState } from "react";
import type { JeuxVideo } from "../../model/jeuxvideo";
import { LoginContext } from "../../context/loginContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";

function UnJeux (){
    const [jeux,setJeux] = useState<JeuxVideo>();
    const {isLoggedIn,token} = useContext(LoginContext);
    const navigate = useNavigate();
    const { id } = useParams();
    //console.log(token);
    useEffect(()=>{
    if(!isLoggedIn){
        navigate('/login');
    } else{
        axios.get(`https://jeuxvideoapi-d4a9b0azcfgpd7h9.canadacentral-01.azurewebsites.net/api/jeuxvideo/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        .then((response)=> setJeux(response.data.jeuxvideo));
    }
   },[isLoggedIn]);

    if(jeux ==null){
        return(
            <Typography variant="h1"  sx={{color:"black"}}>
                    Aucun Jeux
             </Typography>
        )
    }
    else{
        const dateapi: Date = new Date(jeux.dateSortieinitial);
       const dateformater = dateapi.toLocaleDateString('fr-CA',{
        year:'numeric',
        month:'long',
        day:'numeric',
       });
   return(
    <>
    <Box sx={{ flexGrow: 1,backgroundColor:"white",width:'100%',height:'100%'}}>
       <Grid container   justifyContent="top" paddingTop={10} >
            <Grid size={12} alignItems="center" justifyContent="center"  sx={{textAlign:"center"}}>
                   <Typography variant="h1"  sx={{color:"black"}}>
                   Information du jeu
                   </Typography>
            </Grid>
                <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                   <Typography variant="h4"  sx={{color:"black"}}>
                    nom du jeux:
                   </Typography>
                </Grid>
                <Grid size={6} alignItems="center" justifyContent="center"  sx={{textAlign:"left",border:"2px solid black"}} >
                   <Typography variant="h4"  sx={{color:"black"}}>
                    {jeux.nom}
                   </Typography>
                  
                </Grid>
                 <Grid size={6} alignItems="center" justifyContent="center"  sx={{textAlign:"right",border:"2px solid black"}}  >
                   <Typography variant="h4"  sx={{color:"black"}}>
                    platformes:
                   </Typography>
                   </Grid>
                   <Grid size={6} alignItems="center" justifyContent="center"  sx={{textAlign:"left",border:"2px solid black"}}  >
                   <List>
                    {jeux.plateforme.map((plateform,index)=>(
                        <ListItem key={index} sx={{color:"black"}}>
                            <ListItemText disableTypography primary={<Typography variant="h5"  sx={{color:"black"}}>- {plateform}</Typography>}/>
                        </ListItem>
                    ))}
                   </List>
                   </Grid>
                   <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            Date de sortie initial: 
                        </Typography>
                   </Grid>
                   <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"left",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            {dateformater}
                        </Typography>
                   </Grid>
                   <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            nombre de copie vendu:
                        </Typography>
                   </Grid>
                   <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"left",border:"2px solid black"}}>
                            <Typography variant="h4" sx={{color:"black"}}>
                                {jeux.nombreCopieVendu.toString()}
                            </Typography>
                   </Grid>
                   <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            prix:
                        </Typography>
                   </Grid>
                   <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"left",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            {jeux.prix.toString()} $
                        </Typography>
                   </Grid>
                   <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                    <Typography variant="h4" sx={{color:"black"}}>
                        developpeurs: 
                    </Typography>
                   </Grid>
                   <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"left",border:"2px solid black"}}>
                        <List>
                    {jeux.developpeur.map((developpeur,index)=>(
                        <ListItem key={index} sx={{color:"black"}}>
                            <ListItemText disableTypography primary={<Typography variant="h5"  sx={{color:"black"}}>- {developpeur}</Typography>}/>
                        </ListItem>
                    ))}
                   </List>
                   </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            editeurs:
                        </Typography>
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"left",border:"2px solid black"}}>
                         <List>
                    {jeux.editeur.map((editeur,index)=>(
                        <ListItem key={index} sx={{color:"black"}}>
                            <ListItemText disableTypography primary={<Typography variant="h5"  sx={{color:"black"}}>- {editeur}</Typography>}/>
                        </ListItem>
                    ))}
                   </List>
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                           genres:
                        </Typography>
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"left",border:"2px solid black"}}>
                        <List>
                    {jeux.genre.map((genre,index)=>(
                        <ListItem key={index} sx={{color:"black"}}>
                            <ListItemText disableTypography primary={<Typography variant="h5"  sx={{color:"black"}}>- {genre}</Typography>}/>
                        </ListItem>
                    ))}
                   </List>
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            Évaluation ESRB:
                        </Typography>
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"left",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            {jeux.ESRB}
                        </Typography>
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            mode de jeux disponible:
                        </Typography>
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"left",border:"2px solid black"}}>
                        <List>
                    {jeux.modeDeJeu.map((modejeu,index)=>(
                        <ListItem key={index} sx={{color:"black"}}>
                            <ListItemText disableTypography primary={<Typography variant="h5"  sx={{color:"black"}}>- {modejeu}</Typography>}/>
                        </ListItem>
                    ))}
                   </List>
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            durée du jeux: 
                        </Typography>
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"left",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            {jeux.dureeJeux.toString()} heures
                        </Typography>
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            le jeux est disponible: 
                        </Typography>
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"left",border:"2px solid black"}}>
                        
                          <Typography variant="h4" sx={{color:"black"}}>
                            {jeux.disponible? 'Vrai':'Faux'}
                        </Typography>  
                        
                        
                    
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            note métacritic:
                        </Typography>
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"left",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            {jeux.Metacritic?.toString()}
                        </Typography>
                    </Grid>

        </Grid>
        </Box>
    </>
    )
    }
  
   

}
export default UnJeux;