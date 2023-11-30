import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/home';
import Cursos from './views/cursos';
import Login from './views/Login';
import CursosCategory from './views/cursosCategory';
import EditarTitulo from "./views/EditarTitulo";
import DetalleCurso from "./views/DetalleCurso";
import Profile from  "./views/Profile";
import Signup from  "./views/signup";
import AppHeader from './components/AppHeader';
import Footer from './components/Footer';
import BlogList from './views/BlogList'; // Importa tu componente BlogList
import BlogDetail from './views/BlogDetail'
import CreateBlog from './views/createBlog'

function App() {
  return (
    <Router>
      <AppHeader /> {/* Agrega el componente AppHeader fuera de las rutas para que se muestre en todas las vistas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/createBlog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categoria/:categoria" element={<CursosCategory />} />
        <Route path="/editar-titulo/:courseId" element={<EditarTitulo />} />
        <Route path="/curso/:id" element={<DetalleCurso />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        {/* Asegúrate de definir el resto de las rutas necesarias aquí */}
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
