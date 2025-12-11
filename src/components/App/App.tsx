
import LoginProvider from '../../context/loginContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from '../Menu'
import Login from '../Login'
import ListeJeux from '../listeJeux'
import UnJeux from '../unJeux'
import FormulaireAjout from '../FormulaireAjout'
import FormulaireModification from '../FormulaireModification'
import Genre from '../Genre'
import Plateforme from '../Plateforme'

import LangueProvider from '../../context/langueContext'
function App() {


  return (
    <>
    

    
    <LangueProvider>
    <LoginProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Menu/>}>
            <Route index element={<ListeJeux/>} />
            <Route path='/UnJeux/:id' element={<UnJeux/>} />
            <Route path='/ajout' element={<FormulaireAjout/>}/>
            <Route path='/modif/:id' element={<FormulaireModification/>}/>
            <Route path='/genre' element={<Genre/>}/>
            <Route path='/plateforme' element={<Plateforme/>}/>
        </Route>
        <Route path='/login' element={<Login/>} />
        
      </Routes>
      </BrowserRouter>
    </LoginProvider>
    </LangueProvider>
    </>
  )
}

export default App
