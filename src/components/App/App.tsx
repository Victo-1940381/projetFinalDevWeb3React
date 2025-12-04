
import LoginProvider from '../../context/loginContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from '../Menu'
import Login from '../Login'
import ListeJeux from '../listeJeux'
import UnJeux from '../unJeux'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import FormulaireAjout from '../FormulaireAjout'
function App() {

  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <LoginProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Menu/>}>
            <Route index element={<ListeJeux/>} />
            <Route path='/UnJeux/:id' element={<UnJeux/>} />
            <Route path='/ajout' element={<FormulaireAjout/>}/>
        </Route>
        <Route path='/login' element={<Login/>} />
        
      </Routes>
      </BrowserRouter>
    </LoginProvider>
    </LocalizationProvider>
    </>
  )
}

export default App
