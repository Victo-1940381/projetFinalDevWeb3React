import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/loginContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControlLabel,Grid, TextField, Typography, Checkbox, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { FormattedMessage } from "react-intl";

function FormulaireAjout(){
const {isLoggedIn,token} = useContext(LoginContext);
const [messageErreur,setMessageErreur] = useState("");
const [popupErreur,setPopupErreur] = useState(false);
const [nom, setNom] = useState("");
const [listeplatforme, setListePlatforme] = useState<string[]>([]);
const [platforme,setPlatforme] = useState("");
const [datesortie,setDateSortie] = useState<Dayjs>(dayjs);
const [nombrecopie,setNombreCopie] = useState(0);
const [prix,setPrix] = useState(0.0);
const [listeDev,setListeDev] = useState<string[]>([]);
const [dev,setDev] = useState("");
const [listeEditeur,setListeediteur] = useState<string[]>([]);
const [editeur,setEditeur]= useState("");

const [listeGenre,setListeGenre] = useState<string[]>([]);
const [genre,setGenre]= useState("");
const [ESRB,setESRB] =useState<string|null>(null);
const [listeModeJeu,setListeModeJeu] = useState<string[]>([]);
const [modeDeJeu,setmodeDeJeu] = useState("");
const [dureeJeux,setDureeJeux] = useState(0);
const [disponible,setDisponible] = useState(false);
const [Metacritic,setMetacritic] = useState<number|null>(null);
const navigate = useNavigate();
useEffect(()=>{
    if(!isLoggedIn){
        navigate('/login');
    } 
},[isLoggedIn]);

function separerString(texteaseparer:string):string[]{
    return(texteaseparer.split(","));
}
async function AjouterJeu(nom:string,listePlateforme:string[],datesortie:Date,nombreCopieVendu:number,prix:number,devloppeur:string[],editeur:string[],genre:string[],ESRB:string|null,modejeu:string[],dureeJeux:number,disponible:boolean,metacritic:number|null){
    axios.post('https://jeuxvideoapi-d4a9b0azcfgpd7h9.canadacentral-01.azurewebsites.net/api/jeuxvideo/ajouter',{
        "jeuxvideo":{
            "nom": nom,
            "plateforme": listePlateforme,
            "dateSortieinitial": datesortie,
            "nombreCopieVendu": nombreCopieVendu,
            "prix":prix,
            "developpeur":devloppeur,
            "editeur":editeur,
            "genre":genre,
            "ESRB":ESRB,
            "modeDeJeu":modejeu,
            "dureeJeux":dureeJeux,
            "disponible":disponible,
            "Metacritic":metacritic,
        }
    },{
        headers:{
                Authorization: `Bearer ${token}`,
            }
    }).then(()=>{
        navigate("/");
    }).catch((error)=>{
        console.log(error);
        setMessageErreur(error.response.data.message);
        setPopupErreur(true);
    })};

    return(
       <>
   <Box sx={{width: '100vw', 
        minHeight: '100vh', 
       p:0,
        m: 0,
        backgroundColor:"white"}}>
        
       
        <Grid container justifyContent="center" paddingTop={10} flexDirection="column" spacing={5} sx={{textAlign:"center",maxWidth:'100vw'}}>
             <Grid size={12} >
                   <Typography variant="h1"  sx={{color:"black"}}>
                    <FormattedMessage id="formajout.titre"/>
                   </Typography>
                </Grid>
        <Grid size={12} justifyContent="center"
            alignItems="center"
        >
            <TextField id="nom" required={true}  label= {<FormattedMessage id="formajout.label.nom"/>} value={nom} variant="outlined" onChange={(e) => setNom(e.target.value)}/>
           </Grid>
            <Grid size={12}justifyContent="center"
            alignItems="center"
           >
                    <TextField id="listePlateforme" required={true}  label={<FormattedMessage id="formajout.label.platformes"/>} multiline={true} value={platforme} variant="outlined" sx={{width:800}} onChange={(e) => {setPlatforme(e.target.value),setListePlatforme(separerString(e.target.value))}}/>
                </Grid>
           <Grid size={12}justifyContent="center"
            alignItems="center"
            >
           
            <DatePicker label={<FormattedMessage id="formajout.label.date"/>}  value={datesortie} onChange={(e) => {if (e != null){setDateSortie(e)}}} format="YYYY-MM-DD"/>
          
           </Grid>
           <Grid size={12}justifyContent="center"
            alignItems="center"
            >
                    <TextField id="nombreCopieVendu" required={true}  label={<FormattedMessage id="formajout.label.nbcopie"/>}  type="number" slotProps={{htmlInput:{min:0}}} value={nombrecopie} variant="outlined" onChange={(e) =>setNombreCopie(parseInt(e.target.value))}/>
                </Grid>
                 <Grid size={12}justifyContent="center"
            alignItems="center"
            >
                    <TextField id="prix" required={true}  label={<FormattedMessage id="formajout.label.prix"/>}  type="number" slotProps={{htmlInput:{min:0}}} value={prix} variant="outlined" onChange={(e) =>setPrix(parseFloat(e.target.value))}/>
                </Grid>
            <Grid size={12}justifyContent="center"
            alignItems="center"
            >
                    <TextField id="listeDev" required={true} label={<FormattedMessage id="formajout.label.dev"/>} multiline={true} value={dev} variant="outlined" sx={{width:800}} onChange={(e) => {setDev(e.target.value),setListeDev(separerString(e.target.value))}}/>
                </Grid>
                 <Grid size={12}justifyContent="center"
            alignItems="center"
            >
                    <TextField id="listeEditeur" required={true}  label={<FormattedMessage id="formajout.label.editeur"/>} multiline={true} value={editeur} variant="outlined" sx={{width:800}} onChange={(e) => {setEditeur(e.target.value),setListeediteur(separerString(e.target.value))}}/>
                </Grid>
                   <Grid size={12}justifyContent="center"
            alignItems="center"
            >
                    <TextField id="listeGenre" required={true}  label={<FormattedMessage id="formajout.label.genre"/>} multiline={true} value={genre} variant="outlined" sx={{width:800}} onChange={(e) => {setGenre(e.target.value),setListeGenre(separerString(e.target.value))}}/>
                </Grid>
                <Grid size={12} justifyContent="center"
            alignItems="center"
            
        >
            <TextField id="ESRB"  label={<FormattedMessage id="formajout.label.esrb"/>} value={ESRB} variant="outlined" onChange={(e) => setESRB(e.target.value)}/>
           </Grid>
                 <Grid size={12}justifyContent="center"
            alignItems="center"
           >
                    <TextField id="listeModeJeu" required={true}  label={<FormattedMessage id="formajout.label.modejeu"/>} multiline={true} value={modeDeJeu} variant="outlined" sx={{width:800}} onChange={(e) => {setmodeDeJeu(e.target.value),setListeModeJeu(separerString(e.target.value))}}/>
                </Grid>

                    <Grid size={12}justifyContent="center"
            alignItems="center"
            >
                    <TextField id="dureeDuJeu" required={true}  label={<FormattedMessage id="formajout.label.duree"/>}   type="number" slotProps={{htmlInput:{min:0}}} value={dureeJeux} variant="outlined" onChange={(e) =>setDureeJeux(parseFloat(e.target.value))}/>
                </Grid>
          
                <Grid size={12}justifyContent="center"
            alignItems="center"
            >
                    <TextField id="noteMetacritic"  label={<FormattedMessage id="formajout.label.meta"/>}   type="number" slotProps={{htmlInput:{min:0, max:100}}} value={Metacritic} variant="outlined" sx={{width:175}} onChange={(e) =>setMetacritic(parseInt(e.target.value))}/>
                </Grid>

                <Grid size={12} justifyContent="center"
            alignItems="center"
            >
                    
                        <FormControlLabel required={true} control={<Checkbox checked={disponible} onChange={(e)=>{setDisponible(e.target.checked)}} />} sx={{color:"black"}} label={<FormattedMessage id="formajout.label.dispo"/>}/>
                    
                </Grid>
                <Grid size={12} justifyContent="center"
            alignItems="center"
           >
                    <Button onClick={() =>{
                       
                        AjouterJeu(nom,listeplatforme,datesortie.toDate(),nombrecopie,prix,listeDev,listeEditeur,listeGenre,ESRB,listeModeJeu,dureeJeux,disponible,Metacritic);
                  
                        }} variant="contained">{<FormattedMessage id="formajout.button"/>}</Button>
                </Grid>
                <Dialog open={popupErreur} onClose={() =>{setPopupErreur(false)}}>
                    <DialogTitle id="titre-popup">
                        {<FormattedMessage id="formajout.popup.titre"/>}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="texte-popup">
                            {messageErreur}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() =>{setPopupErreur(false)}} autoFocus><FormattedMessage id="formajout.popup.button"/></Button>
                    </DialogActions>
                </Dialog>

           </Grid>
        </Box>
    
        </> 
    )
}
export default FormulaireAjout