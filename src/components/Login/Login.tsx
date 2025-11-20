import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/loginContext";
import { useNavigate } from 'react-router-dom';
import  Box  from "@mui/material/Box";
import { FormControl, Input, InputLabel, TextField } from "@mui/material";
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

    return(
        <Box display="flex" justifyContent="center">
           <FormControl variant="standard">
            <InputLabel htmlFor="email">
            Email
            </InputLabel>
            <TextField id="email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
           </FormControl>
           <FormControl variant="standard">
            <InputLabel htmlFor="pass">
            password
            </InputLabel>
            <TextField id="pass" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
           </FormControl>
        </Box> 
    )
}
export default Login;