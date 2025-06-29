import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Menu from './components/Menu';
import Home from './pages/Home';
import VinculoTreino from './pages/treino/VinculoTreino';
import VinculoUsuario from './pages/treino/VinculoUsuario'

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/vincular" element={<VinculoTreino />} />
        <Route path="/vincularUsuario" element={<VinculoUsuario />} />
      </Routes>
    </>
  );
}

export default App;