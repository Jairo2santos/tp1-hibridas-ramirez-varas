<!-- AppHeader.vue -->
<template>
  <div class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center text-xl font-semibold text-purple-900">
          <a href="/">
            <img src="../assets/logo-curseek.png" alt="logo curseek" width="220">
          </a>
          <router-link to="/cursos" class="ml-4 hover:bg-purple-200 px-3 py-1 rounded transition text-lg">Cursos</router-link>
        </div>
        <nav class="space-x-4">
    <div v-if="loggedInUsername">
      <router-link to="/profile" class="hover:bg-purple-200 px-3 py-1 rounded transition text-lg font-bold">Mi Perfil</router-link>
      <span class="mr-2">{{ loggedInUsername }}</span>
      <button @click="logout" class="hover:bg-red-200 text-red-700 px-3 py-1 rounded transition text-lg font-bold">Desconectar</button>
    </div>
    <router-link v-else to="/login" class="hover:bg-purple-200 px-3 py-1 rounded transition text-lg font-bold">Login</router-link>
  </nav>
      </div>
    </div>
  </div>
</template>

  
<script>
export default {
  name: "AppHeader",
  data() {
    return {
      loggedInUsername: localStorage.getItem('loggedInUsername')
    };
  },
  watch: {
    
    '$route': function() {
      this.loggedInUsername = localStorage.getItem('loggedInUsername');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('loggedInUsername');
      this.loggedInUsername = null;
      this.$router.push('/login');
    }
  }
};
</script>