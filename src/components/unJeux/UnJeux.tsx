import { useContext, useEffect, useState } from "react";
import type { JeuxVideo } from "../../model/jeuxvideo";
import { LoginContext } from "../../context/loginContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { FormattedDate, FormattedMessage } from "react-intl";

function UnJeux (){
    const [jeux,setJeux] = useState<JeuxVideo>();
    const {isLoggedIn,token} = useContext(LoginContext);
    const navigate = useNavigate();
    const { id } = useParams();
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
                    <FormattedMessage id="unjeux.jeuxnull.texte" defaultMessage="aucun jeux"/>
             </Typography>
        )
    }
    else{
        const dateapi: Date = new Date(jeux.dateSortieinitial);
    
   return(
    <>
    <Box sx={{ flexGrow: 1,backgroundColor:"white",width:'100%',height:'100%'}}>
 
       <Grid container   justifyContent="top" paddingTop={10} >       
        <Button onClick={()=>{navigate(-1)}} sx={{backgroundColor:"red", color:"white"}}>
                    <FormattedMessage id="unjeux.buttonretour.texte"/>
                </Button>
            <Grid size={12} alignItems="center" justifyContent="center"  sx={{textAlign:"center"}}>
                   <Typography variant="h1"  sx={{color:"black"}}>
                   <FormattedMessage id="unjeux.titre"/>
                   </Typography>
            </Grid>
         
                <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                   <Typography variant="h4"  sx={{color:"black"}}>
                    <FormattedMessage id="unjeux.nom"/>
                   </Typography>
                </Grid>
                <Grid size={6} alignItems="center" justifyContent="center"  sx={{textAlign:"left",border:"2px solid black"}} >
                   <Typography variant="h4"  sx={{color:"black"}}>
                    {jeux.nom}
                   </Typography>
                  
                </Grid>
                 <Grid size={6} alignItems="center" justifyContent="center"  sx={{textAlign:"right",border:"2px solid black"}}  >
                   <Typography variant="h4"  sx={{color:"black"}}>
                    <FormattedMessage id="unjeux.platforme"/>
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
                            <FormattedMessage id="unjeux.date"/>
                        </Typography>
                   </Grid>
                   <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"left",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            <FormattedDate value={dateapi} 
                            year='numeric' 
                            month='long'
                            day='numeric' />
                        </Typography>
                   </Grid>
                   <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                           <FormattedMessage id="unjeux.nbcopie"/>
                        </Typography>
                   </Grid>
                   <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"left",border:"2px solid black"}}>
                            <Typography variant="h4" sx={{color:"black"}}>
                                {jeux.nombreCopieVendu.toString()}
                            </Typography>
                   </Grid>
                   <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                           <FormattedMessage id="unjeux.prix"/>
                        </Typography>
                   </Grid>
                   <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"left",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            {jeux.prix.toString()} $
                        </Typography>
                   </Grid>
                   <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                    <Typography variant="h4" sx={{color:"black"}}>
                        <FormattedMessage id="unjeux.dev"/>
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
                            <FormattedMessage id="unjeux.editeur"/>
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
                           <FormattedMessage id="unjeux.genre"/>
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
                           <FormattedMessage id="unjeux.esrb"/>
                        </Typography>
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"left",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            {jeux.ESRB}
                        </Typography>
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                           <FormattedMessage id="unjeux.modejeu"/>
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
                            <FormattedMessage  id="unjeux.duree"/>
                        </Typography>
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"left",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            <FormattedMessage id="unjeux.duree.resultat" values={{dureeJeux:jeux.dureeJeux.toString()}}/>
                        </Typography>
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            <FormattedMessage id="unjeux.dispo.texte"/> 
                        </Typography>
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"left",border:"2px solid black"}}>
                        
                          <Typography variant="h4" sx={{color:"black"}}>
                            {jeux.disponible? <FormattedMessage id="unjeux.dispo.vrai"/>:<FormattedMessage id="unjeux.dispo.faux" />}
                        </Typography>  
                        
                        
                    
                    </Grid>
                    <Grid size={6} alignItems="center" justifyContent="center" sx={{textAlign:"right",border:"2px solid black"}}>
                        <Typography variant="h4" sx={{color:"black"}}>
                            <FormattedMessage id="unjeux.meta"/>
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