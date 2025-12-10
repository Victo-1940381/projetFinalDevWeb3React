import axios from "axios";
import { useContext, useEffect, useState } from "react";
import type { JeuxVideo } from "../../model/jeuxvideo";
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material";
import { LoginContext } from "../../context/loginContext";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

function ListeJeux() {
    const [listejeux,setListejeux] = useState<JeuxVideo[]>([]);
    const {isLoggedIn,token} = useContext(LoginContext);
    const [popup,setPopup] = useState(false);
    const [popuperreur,setPopupErreur] = useState(false);
    const [erreur,setErreur]= useState("");
    const [jeuxSupprime,setJeuxSupprime] = useState<JeuxVideo>();
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
        .then((response)=> {setListejeux(response.data.jeuxvideos),listejeux.sort((a,b)=>a.nom.localeCompare(b.nom))});

    }
   },[isLoggedIn]);
   async function supprimerJeu(id:string){
    axios.delete(`https://jeuxvideoapi-d4a9b0azcfgpd7h9.canadacentral-01.azurewebsites.net/api/jeuxvideo/supprimer/${id}`,{
        headers:{
                Authorization: `Bearer ${token}`,
            }
        }).catch((error)=>{
            console.log(error);
            setErreur(error.response.data.error);
            setPopupErreur(true);
        }).then(()=>{
            axios.get('https://jeuxvideoapi-d4a9b0azcfgpd7h9.canadacentral-01.azurewebsites.net/api/jeuxvideo/liste',{
            headers:{
                Authorization: `Bearer ${token}`,
            }}).then((reponse)=>{
                setListejeux(reponse.data.jeuxvideos)
                listejeux.sort((a,b)=>a.nom.localeCompare(b.nom))
            })
        })
   }

   return (
    
        <Grid container  justifyContent="center" alignItems="center" flexDirection="column" sx={{backgroundColor:"white",width:"100vw", textAlign:"center",height:"100vh"}}>
            <Grid size={12}>
                   <Typography variant="h1"  sx={{color:"black"}}>
                    <FormattedMessage id="listejeux.titre"/>
                   </Typography>
                </Grid>
            {listejeux.map(jeux => (
                <Grid size={12} justifyItems="center" alignContent="center" sx={{ border:'1px solid black'}}>
                    <Button   onClick={()=>{navigate(`/UnJeux/${jeux._id}`)}}>
                        {jeux.nom}
                    </Button>
                    <ButtonGroup variant="contained">
                        <Button color="success"  onClick={()=>{navigate(`/modif/${jeux._id}`)}}>
                       <FormattedMessage id="listejeux.button.modif"/>
                    </Button>
                    <Button color="error" onClick={()=>{setJeuxSupprime(jeux);if(jeuxSupprime != undefined){setPopup(true)}}}>
                       <FormattedMessage id="listejeux.button.delete"/>
                    </Button>
                    </ButtonGroup>
                      
                </Grid>
            ))}
             <Dialog open={popup} onClose={() =>{setPopup(false)}}>
                    <DialogTitle id="titre-popup">
                        {"supprimer le jeu"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="texte-popup">
                            voulez vous supprimer le jeux {jeuxSupprime?.nom} ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() =>{setPopup(false),supprimerJeu(jeuxSupprime?._id!)}} autoFocus>oui</Button>
                        <Button onClick={() =>{setPopup(false)}}>non</Button>
                    </DialogActions>
                </Dialog>
                 <Dialog open={popuperreur} onClose={() =>{setPopupErreur(false)}}>
                    <DialogTitle id="titre-popup">
                        <FormattedMessage id="listejeux.popupdelete.titre"/>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="texte-popup">
                           {erreur}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() =>{setPopupErreur(false)}} autoFocus><FormattedMessage id="listejeux.popupdelete.button"/></Button>
                    </DialogActions>
                </Dialog>
        </Grid>
               
        
   )
}
export default ListeJeux;