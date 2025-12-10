import React, { useContext, useEffect } from "react";
import { LoginContext } from "../../context/loginContext";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import  { FormattedMessage } from "react-intl";

interface NavItem{
    label: React.ReactNode
    path: string;
}

const navItems: NavItem[] = [
    {label:"tous",path:'/'},
    {label:"recherché par genre",path:'/genre'},
    {label:"recherché par platforme",path:'/plateforme'},
    {label:"ajouter un jeux",path:'/ajout'}
]
function Menu(){
const {isLoggedIn, logout} = useContext(LoginContext);

const navigate = useNavigate();
useEffect(() =>{
    if (!isLoggedIn) {
        navigate('/login');
    }
}, [isLoggedIn]);
return(
    <>
    <AppBar position="fixed" elevation={4}>
        <Toolbar sx={{justifyContent:'space-around'}}>
            <Box sx={{display:{xs: 'none', md:'flex'}, gap:1}}>
            {navItems.map((item,i)=>{
              return(
                <button
                key={i}
                onClick={()=>{
                    navigate(item.path);
                }}
                >
                    {item.label}
                </button>
              )
            })}
        </Box>
        <Box sx={{display:'flex',justifyContent:'flex-end'}}>
        <Button
        sx={{backgroundColor:"red", color:"white"}}
                onClick={()=>logout()}
        >
            <FormattedMessage id="menu.button.connection"/>
        </Button>
        </Box>
        </Toolbar>
    </AppBar>
    <Outlet/>
    </>
)
}

export default Menu;