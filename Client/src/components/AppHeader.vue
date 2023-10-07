<!-- AppHeader.vue -->
<template>
  <div class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-2">
      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold text-purple-900">
          <a href="/">
            <img src="../assets/logo-curseek.png" alt="logo curseek" width="220">
          </a>
        </div>
        <nav class="space-x-4">
          <router-link to="/" class="hover:bg-purple-200 px-3 py-1 rounded transition">Home</router-link>
          <router-link to="/cursos" class="hover:bg-purple-200 px-3 py-1 rounded transition">Cursos</router-link>
          <router-link to="/usuarios" class="hover:bg-purple-200 px-3 py-1 rounded transition">Login</router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

  
  <script>
  export default {
    name: "AppHeader"
  };
  </script>