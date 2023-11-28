import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Cursos from './views/Cursos';
import Login from './views/Login';
import CursosCategory from './views/CursosCategory';
import EditarTitulo from "./views/EditarTitulo";
import DetalleCurso from "./views/DetalleCurso";
import Profile from  "./views/Profile";
import Signup from  "./views/signup";
import AppHeader from './components/AppHeader'; // Importa el componente AppHeader

function App() {
  return (
    <Router>
      <AppHeader /> {/* Agrega el componente AppHeader fuera de las rutas para que se muestre en todas las vistas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categoria/:categoria" element={<CursosCategory />} />
        <Route path="/editar-titulo/:courseId" element={<EditarTitulo />} />
        <Route path="/curso/:id" element={<DetalleCurso />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        {/* Asegúrate de definir el resto de las rutas necesarias aquí */}
      </Routes>
    </Router>
  );
}

export default App;
