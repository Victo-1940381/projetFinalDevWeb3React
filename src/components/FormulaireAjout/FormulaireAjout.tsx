import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/loginContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Input, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";


function FormulaireAjout(){
const {isLoggedIn,token} = useContext(LoginContext);
const [nom, setNom] = useState("");
const [datesortie,setDateSortie] = useState<Dayjs | null>(dayjs);
const [nombrecopie,setNombreCopie] = useState(0);
const [prix,setPrix] = useState(0.0);
const [listeDev,setListeDev] = useState<String[]>([]);
const [dev,setDev] = useState("");
const [listeEditeur,setListeediteur] = useState<String[]>([]);
const [listeGenre,setListeGenre] = useState<String[]>([]);
const [ESRB,setESRB] =useState<String|null|undefined>(null);
const [listeModeJeu,setListeModeJeu] = useState<String[]>([]);
const [dureeJeux,setDureeJeux] = useState(0);
const [disponible,setDisponible] = useState(false);
const [Metacritic,setMetacritic] = useState<Number|null|undefined>(null);
const navigate = useNavigate();
useEffect(()=>{
    if(!isLoggedIn){
        navigate('/login');
    } 
},[isLoggedIn]);
function separerString(texteaseparer:String):String[]{
    return(texteaseparer.split(","));
}
    return(
        <>
    <Box sx={{ flexGrow: 1,backgroundColor:"white",width:'100%',height:'100%'}}>
        <Grid container justifyContent="center"  flexDirection="column" spacing={5} sx={{backgroundColor:"white",minHeight:'100vh',minWidth:'100vw',textAlign:"center"}}>
             <Grid size={12} >
                   <Typography variant="h1"  sx={{color:"black"}}>
                    Ajouter un jeux vidéo
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
           
            <DatePicker label="date de sortie"  value={datesortie} onChange={(e) => setDateSortie(e)} format="YYYY-MM-DD"/>
          
           </Grid>
           <Grid size={12}justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
                    <TextField id="nombrecopie" required={true}  label="le nombre de copie vendu" type="number" min value={nom} variant="outlined" onChange={(e) =>setNombreCopie(e.target.value)}
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
                    <TextField id="liste" required={true}  label="la liste des devloppeur(mettre une virgule entre chaque developpeur)" multiline={true} value={dev} variant="outlined" sx={{width:'50%'}} onChange={(e) => {setDev(e.target.value),setListeDev(separerString(e.target.value))}}/>
                </Grid>
           <Grid size={12}justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
            <Button 
                variant="contained"
                >
                    se connecter
                </Button>
           </Grid>
       </Grid> 
       </Box>
        </>
    )
}
export default FormulaireAjout