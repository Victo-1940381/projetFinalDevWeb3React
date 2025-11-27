
import LoginProvider from '../../context/loginContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from '../Menu'
import Test from '../Test'
import Login from '../Login'

function App() {

  return (
    <>
    <LoginProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Menu/>}>
          <Route index element={<Test/>} />
        </Route>
        <Route path='/login' element={<Login/>} />
      </Routes>
      </BrowserRouter>
    </LoginProvider>
    </>
  )
}

export default App
