<template>
  <div class="p-4 bg-gray-50 min-h-screen">
    <h1 class="text-center">Curseek: Buscador de Cursos</h1>
      <!-- Campo de búsqueda -->
      <div class="max-w-lg mx-auto">
          <form @submit.prevent="search" class="flex items-center border rounded-lg overflow-hidden">
              <input v-model="query" placeholder="Buscar cursos..." class="p-2 flex-grow outline-none"/>
              <button type="submit" class="px-4 bg-blue-600 text-white">Buscar</button>
          </form>
      </div>

      <!-- Resultados -->
      <div class="mt-6">
          <CardCurso v-for="course in courses" :key="course._id" :course="course" />
      </div>
  </div>
</template>

<script>
import CardCurso from '../components/CardCurso.vue';
import axios from 'axios';

export default {
  components: { CardCurso },
  data() {
      return {
          query: '',
          courses: []
      };
  },
  methods: {
      async search() {
          try {
              const response = await axios.get(`http://localhost:3333/cursos/search?q=${this.query}`);
              this.courses = response.data;
          } catch (error) {
              console.error("Error al buscar cursos:", error);
          }
      }
  }
};
</script>
