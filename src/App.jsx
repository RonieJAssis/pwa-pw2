import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import Menu from './componentes/Menu'
import Home from './componentes/Home'
import Login from './componentes/Login'
import Empresas from './componentes/empresas/Empresas'
import Jogos from './componentes/jogos/Jogos'
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'

function App() {
  return (
    <Router>
        <Menu/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/empresas" element={<Empresas/>}/> 
          <Route exact path="/jogos" element={<Jogos/>}/>
          <Route exact path="/login" element={<Login/>}/> 
        </Routes>
    </Router>
  );
}

export default App;