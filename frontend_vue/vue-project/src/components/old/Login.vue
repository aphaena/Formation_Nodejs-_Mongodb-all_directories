<template>
    <form @submit.prevent="login">
      <h2>Connexion</h2>
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Mot de passe">
      <button type="submit">Connexion</button>
    </form>
  </template>
  
  <script>
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login() {
        // Code pour gérer la soumission du formulaire de connexion
        // ...
      }
    }
  }
  </script>
  