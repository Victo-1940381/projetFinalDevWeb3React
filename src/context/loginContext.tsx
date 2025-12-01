import axios from "axios";
import { createContext, useState } from 'react';

export type LoginContextType = {
    isLoggedIn: boolean;
    token: string;
    login: (email: string, password:string) => Promise<boolean>
    logout: () => void;
};
export const LoginContext = createContext<LoginContextType>({
    isLoggedIn: false,
    token: '',
    login: () => new Promise<boolean>(() => false),
    logout: () => {},
});

export default function LoginProvider(props:any){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    async function login(email: string, password:string){
        return axios
            .post ('https://jeuxvideoapi-d4a9b0azcfgpd7h9.canadacentral-01.azurewebsites.net/api/generatetoken', {
                "userLogin":{
                email,
                password  
                }
            })
            .then((response)=>{
                const { token } = response.data;
                if (token) {
                    setIsLoggedIn(true);
                    setToken(token);
                    return true;
                } else{
                    console.log("ca marche")
                    setIsLoggedIn(false);
                    setToken('');
                    return false;
                }
            });
    }
    function logout(){
        setToken('');
        setIsLoggedIn(false);
    }
    const values = {isLoggedIn, token, login, logout};
    return(
        <LoginContext.Provider value={values}>
            {props.children}
        </LoginContext.Provider>
    )
}