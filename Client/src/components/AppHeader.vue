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
          <router-link to="/usuarios" class="hover:bg-purple-200 px-3 py-1 rounded transition text-lg font-bold">Login</router-link>
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