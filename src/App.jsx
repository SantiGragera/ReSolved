import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainGastos from './MainGastos/MainGastos'
import NavBar from './NavBar/NavBar'
import Ingresos from './Ingresos/Ingresos'

function App() {

  return (
    <BrowserRouter>
      <>
        <NavBar />
        <Routes>
          <Route path='/' element={<MainGastos/>} />
          <Route path='/ingresos' element={<Ingresos/>} />
        </Routes>
      </>
    </BrowserRouter>

  )
}

export default App
