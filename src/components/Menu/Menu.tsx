import { useContext, useEffect } from "react";
import { LoginContext } from "../../context/loginContext";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar } from "@mui/material";

interface NavItem{
    label: string;
    path: string;
}

const navItems: NavItem[] = [
    {label:"test",path:'/test'}
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
            {navItems.map((item)=>{
              return(
                <button
                key={item.label}
                onClick={()=>{
                    navigate(item.path);
                }}
                >
                    {item.label}
                </button>
              )
            })}
        </Box>
        <Box>
            <Button
                onClick={()=>logout()}
        >
            déconnection
        </Button>
        </Box>
        </Toolbar>
    </AppBar>
    </>
)
}

export default Menu;