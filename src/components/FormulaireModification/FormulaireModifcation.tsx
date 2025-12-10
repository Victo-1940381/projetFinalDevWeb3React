import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/loginContext";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, FormControlLabel,Grid, TextField, Typography, Checkbox, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

function FormulaireModification(){
const {isLoggedIn,token} = useContext(LoginContext);
const { id } = useParams();
const [messageErreur,setMessageErreur] = useState("");
const [popupErreur,setPopupErreur] = useState(false);
const [nom, setNom] = useState("");
const [datesortie,setDateSortie] = useState<Dayjs>(dayjs);
const [nombrecopie,setNombreCopie] = useState(0);
const [prix,setPrix] = useState(0.0);
const [listeDev,setListeDev] = useState<string[]>([]);
const [dev,setDev] = useState("");
const [listeEditeur,setListeediteur] = useState<string[]>([]);
const [editeur,setEditeur]= useState("");
const [listeplatforme, setListePlatforme] = useState<string[]>([]);
const [platforme,setPlatforme] = useState("");
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
    }else{
        axios.get(`https://jeuxvideoapi-d4a9b0azcfgpd7h9.canadacentral-01.azurewebsites.net/api/jeuxvideo/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        .then((response)=> {
            setNom(response.data.jeuxvideo.nom);
            setListePlatforme(response.data.jeuxvideo.plateforme);
            setDateSortie(dayjs(response.data.jeuxvideo.dateSortieinitial));
            setNombreCopie(response.data.jeuxvideo.nombreCopieVendu);
            setPrix(response.data.jeuxvideo.prix);
            setListeDev(response.data.jeuxvideo.developpeur);
            setListeediteur(response.data.jeuxvideo.editeur);
            setListeGenre(response.data.jeuxvideo.genre),
            setESRB(response.data.jeuxvideo.ESRB);
            setListeModeJeu(response.data.jeuxvideo.modeDeJeu);
            setDureeJeux(response.data.jeuxvideo.dureeJeux);
            setDisponible(response.data.jeuxvideo.disponible);
            setMetacritic(response.data.jeuxvideo.Metacritic);
            setDev(assemberString(response.data.jeuxvideo.developpeur));
            setEditeur(assemberString(response.data.jeuxvideo.editeur));
            setGenre(assemberString(response.data.jeuxvideo.genre));
            setPlatforme(assemberString(response.data.jeuxvideo.plateforme));
            setmodeDeJeu(assemberString(response.data.jeuxvideo.modeDeJeu));

        });
    }
},[isLoggedIn]);
function separerString(texteaseparer:string):string[]{
    return(texteaseparer.split(","));
}
function assemberString(arrayaassembler:string[]):string{
    let string = "";
    for(let i = 0;i<arrayaassembler.length;i++){
        string += arrayaassembler[i]
        if (i != arrayaassembler.length-1){
            string += ",";
        }
    }
    return string;
    
}
async function ModifJeu(id:string,nom:string,listePlateforme:string[],datesortie:Date,nombreCopieVendu:number,prix:number,devloppeur:string[],editeur:string[],genre:string[],ESRB:string|null,modejeu:string[],dureeJeux:number,disponible:boolean,metacritic:number|null){
    axios.put('https://jeuxvideoapi-d4a9b0azcfgpd7h9.canadacentral-01.azurewebsites.net/api/jeuxvideo/modifier',{
        "jeuxvideo":{
            "id": id,
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
        }
    },{
        headers:{
                Authorization: `Bearer ${token}`,
            }
    }).then(()=>{
        navigate("/");
    }).catch((error)=>{
        console.log(error)
        setMessageErreur(error.response.data.message);
        setPopupErreur(true);
    })};
    if(id == undefined){
        return(
            <Box sx={{flexGrow:1,backgroundColor:"white",width:'100%',height:'100%'}}>
                 <Grid container justifyContent="center" paddingTop={10} flexDirection="column" spacing={5} sx={{backgroundColor:"white",minHeight:'100vh',minWidth:'100vw',textAlign:"center"}}>
                    <Grid size={12}>
                        <Typography variant="h1" sx={{color:"black"}}>
                            erreur en allant cherché le jeu
                        </Typography>
                    </Grid>
                 </Grid>
            </Box>
        )
    }
    else{
       return(
        
    <Box sx={{ flexGrow: 1,backgroundColor:"white",width:'100%',height:'100%'}}>
        <Grid container justifyContent="center" paddingTop={10} flexDirection="column" spacing={5} sx={{backgroundColor:"white",minHeight:'100vh',minWidth:'100vw',textAlign:"center"}}>
             <Grid size={12} >
                   <Typography variant="h1"  sx={{color:"black"}}>
                    Modifier un jeux vidéo
                   </Typography>
                </Grid>
        <Grid size={12} justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}
        >
            <TextField id="nom" required={true}  label="nom du jeux" value={nom} variant="outlined" onChange={(e) => setNom(e.target.value)}/>
           </Grid>
           <Grid size={12}justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
                    <TextField id="listePlateforme" required={true}  label="la liste des plateforme(mettre une virgule entre chaque plateforme)" multiline={true} value={platforme} variant="outlined" sx={{width:'50%'}} onChange={(e) => {setPlatforme(e.target.value),setListePlatforme(separerString(e.target.value))}}/>
                </Grid>
           <Grid size={12}justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
           
            <DatePicker label="date de sortie"  value={datesortie} onChange={(e) =>{if (e != null){setDateSortie(e)}}} format="YYYY-MM-DD"/>
          
           </Grid>
           <Grid size={12}justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
                    <TextField id="nombreCopieVendu" required={true}  label="le nombre de copie vendu"   type="number" slotProps={{htmlInput:{min:0}}} value={nombrecopie} variant="outlined" onChange={(e) =>setNombreCopie(parseInt(e.target.value))}/>
                </Grid>
                 <Grid size={12}justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
                    <TextField id="prix" required={true}  label="le prix du jeu"  type="number" slotProps={{htmlInput:{min:0}}} value={prix} variant="outlined" onChange={(e) =>setPrix(parseFloat(e.target.value))}/>
                </Grid>
            <Grid size={12}justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
                    <TextField id="listeDev" required={true} label="la liste des devloppeur(mettre une virgule entre chaque developpeur)" multiline={true} value={dev} variant="outlined" sx={{width:'50%'}} onChange={(e) => {setDev(e.target.value),setListeDev(separerString(e.target.value))}}/>
                </Grid>
                 <Grid size={12}justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
                    <TextField id="listeEditeur" required={true}  label="la liste des editeur(mettre une virgule entre chaque editeur)" multiline={true} value={editeur} variant="outlined" sx={{width:'50%'}} onChange={(e) => {setEditeur(e.target.value),setListeediteur(separerString(e.target.value))}}/>
                </Grid>
                   <Grid size={12}justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
                    <TextField id="listeGenre" required={true}  label="la liste des genres(mettre une virgule entre chaque genre)" multiline={true} value={genre} variant="outlined" sx={{width:'50%'}} onChange={(e) => {setGenre(e.target.value),setListeGenre(separerString(e.target.value))}}/>
                </Grid>
                <Grid size={12} justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}
        >
            <TextField id="ESRB"  label="la note ESRB du jeu" value={ESRB} variant="outlined" onChange={(e) => setESRB(e.target.value)}/>
           </Grid>
                 <Grid size={12}justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
                    <TextField id="listeModeJeu" required={true}  label="la liste des mode de jeu du jeu(mettre une virgule entre chaque mode)" multiline={true} value={modeDeJeu} variant="outlined" sx={{width:'50%'}} onChange={(e) => {setmodeDeJeu(e.target.value),setListeModeJeu(separerString(e.target.value))}}/>
                </Grid>

                    <Grid size={12}justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
                    <TextField id="dureeDuJeu" required={true}  label="la duree du jeu en heure"   type="number" slotProps={{htmlInput:{min:0}}} value={dureeJeux} variant="outlined" onChange={(e) =>setDureeJeux(parseFloat(e.target.value))}/>
                </Grid>
          
                <Grid size={12}justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
                    <TextField id="noteMetacritic"  label="la note metacritic du jeu"   type="number" slotProps={{htmlInput:{min:0, max:100}}} value={Metacritic} variant="outlined" sx={{width:175}} onChange={(e) =>setMetacritic(parseInt(e.target.value))}/>
                </Grid>

                <Grid size={12} justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
                    
                        <FormControlLabel required={true} control={<Checkbox checked={disponible} onChange={(e)=>{setDisponible(e.target.checked)}} />} sx={{color:"black"}} label="disponible"/>
                    
                </Grid>
                <Grid size={12} justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
                    <Button onClick={() =>{ModifJeu(id,nom,listeplatforme,datesortie.toDate(),nombrecopie,prix,listeDev,listeEditeur,listeGenre,ESRB,listeModeJeu,dureeJeux,disponible,Metacritic)}} variant="contained">Modifier</Button>
                </Grid>
                   <Dialog open={popupErreur} onClose={() =>{setPopupErreur(false)}}>
                    <DialogTitle id="titre-popup">
                        {"Erreur en modifiant le jeu"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="texte-popup">
                            {messageErreur}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() =>{setPopupErreur(false)}} autoFocus>Ok</Button>
                    </DialogActions>
                </Dialog>
           </Grid>
       
       </Box>
        
    )  
    }
   
}
export default FormulaireModification