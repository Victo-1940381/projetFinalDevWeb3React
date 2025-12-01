
import LoginProvider from '../../context/loginContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from '../Menu'
import Login from '../Login'
import ListeJeux from '../listeJeux'
function App() {

  return (
    <>
    <LoginProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Menu/>}>
            <Route path='/liste' element={<ListeJeux/>} />
        </Route>
        <Route path='/login' element={<Login/>} />
      </Routes>
      </BrowserRouter>
    </LoginProvider>
    </>
  )
}

export default App
