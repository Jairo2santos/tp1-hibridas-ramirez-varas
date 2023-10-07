<template>
    <div class="login-form-container">
      <form class="login-form" @submit.prevent="login">
        <h2>Iniciar Sesión</h2>
        <div class="form-group">
          <label for="username">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Nombre de Usuario"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Contraseña"
            required
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async login() {
        // Agregar la lógica de inicio de sesión con MongoDB aquí
        // Puedes usar axios o vue-resource para hacer una solicitud al servidor de Node.js y MongoDB para verificar las credenciales del usuario.
        // Por ejemplo:
        // const response = await this.$http.post('/api/login', { username: this.username, password: this.password });
        // if (response.data.success) {
        //   // Usuario autenticado, redirigir a la página principal
        //   this.$router.push('/dashboard');
        // } else {
        //   // Error de inicio de sesión, mostrar mensaje de error
        //   alert('Inicio de sesión fallido. Por favor, verifique sus credenciales.');
        // }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }
  
  .login-form {
    width: 300px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #0c7175;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #005658;
  }
  </style>
  