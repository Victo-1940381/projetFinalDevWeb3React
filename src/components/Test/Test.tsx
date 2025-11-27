import { Box, Typography } from "@mui/material";

function Test (){
    return(
        <>
        <Box
      sx={{
        // 100% de la hauteur de la fenêtre (viewport height)
        height: '100vh', 
        // 100% de la largeur de la fenêtre (viewport width)
        width: '100vw', 
        
        // Active le modèle flexbox
        display: 'flex', 
        // Centre les éléments horizontalement (sur l'axe principal)
        justifyContent: 'center', 
        // Centre les éléments verticalement (sur l'axe secondaire)
        alignItems: 'center', 
        // Optionnel: définit la direction de la flexbox (par défaut c'est 'row')
        flexDirection: 'column', 
      }}
    >
      {/* Typography est le composant texte de MUI */}
      <Typography variant="h1" component="div">
        Hello World
      </Typography>
    </Box>
        </>
    )
}
export default Test;