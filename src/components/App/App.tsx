
import LoginProvider from '../../context/loginContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from '../Menu'
import Login from '../Login'
import ListeJeux from '../listeJeux'
import UnJeux from '../unJeux'
function App() {

  return (
    <>
    <LoginProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Menu/>}>
            <Route index element={<ListeJeux/>} />
            <Route path='/UnJeux/:id' element={<UnJeux/>} />
        </Route>
        <Route path='/login' element={<Login/>} />
        
      </Routes>
      </BrowserRouter>
    </LoginProvider>
    </>
  )
}

export default App
