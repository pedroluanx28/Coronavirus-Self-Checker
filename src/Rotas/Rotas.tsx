import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Atendimento from '../pages/Atendimento'

export default function Rotas() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/atendimento' element={<Atendimento />}/>
        </Routes>
    </BrowserRouter>
  )
}
