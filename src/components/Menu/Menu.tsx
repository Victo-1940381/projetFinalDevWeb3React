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
    {label:<FormattedMessage id="menu.label.tous"/>,path:'/'},
    {label:<FormattedMessage id="menu.label.genre"/>,path:'/genre'},
    {label:<FormattedMessage id="menu.label.platforme"/>,path:'/plateforme'},
    {label:<FormattedMessage id="menu.label.ajout"/>,path:'/ajout'}
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