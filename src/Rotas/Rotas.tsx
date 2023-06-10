import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Atendimento from '../pages/Atendimento'

export default function Rotas() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/Coronavirus-Self-Checker' element={<Home />}/>
            <Route path='/atendimento/:id' element={<Atendimento />}/>
        </Routes>
    </BrowserRouter>
  )
}
