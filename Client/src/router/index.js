import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import cursos from '../views/cursos.vue';
import cursosCategory from '../views/cursosCategory.vue';
import EditarTitulo from "../views/EditarTitulo.vue";
import DetalleCurso from "../views/DetalleCurso.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cursos',
    name: 'Cursos UTN',
    component: cursos
  },
  {
    path: '/categoria/:categoria',
    name: 'cursosCategory',
    component: cursosCategory,
    props: true
  }
  ,
  {
    path: "/editar-titulo/:courseId",
    name: "EditarTitulo",
    component: EditarTitulo,
    props: true
  },
   {
    path: "/curso/:id",
    name: "DetalleCurso",
    component: DetalleCurso,
    props: true
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;