import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/loginContext";
import { useNavigate } from 'react-router-dom';
import { Button,  Grid, TextField } from "@mui/material";
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erreur, setErreur]= useState('');
    const navigate = useNavigate();
    const {login, isLoggedIn} = useContext(LoginContext);

    async function performLogin(){
        await login(email,password)
            .then((reussi)=>{
                if (reussi){
                    setErreur('');
                
                }
            })
            .catch(() => setErreur('Login incorrect'));
    }
    useEffect(() => {
        if (isLoggedIn){
            navigate('/');
        }
    }, [isLoggedIn]);
    if(erreur){
        console.log(erreur);
    }
    return(
        
        <Grid container alignItems="center" sx={{backgroundColor:"white",minHeight:'100vh',minWidth:'100vw'}}>
        <Grid size={12} justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}
        >
            <TextField id="email"  label="email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
           </Grid>
           <Grid size={12}justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
           
            <TextField id="pass" label="password" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
          
           </Grid>
           <Grid size={12}justifyContent="center"
            alignItems="center"
            sx={{width:'100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
            <Button 
                variant="contained"
                onClick={() => performLogin()}>
                    se connecter
                </Button>
           </Grid>
       </Grid> 
    )
}
export default Login;