<template>
    <div>
      <h1>Menu</h1>
      
        <a href="#" class="butmenu">Accueil </a>
        <a href="#" class="butmenu"> À propos </a>
        <a href="#" @click="showLogin = !showLogin" class="butmenu">Se connecter</a>
        <router-link to="/" class="butmenu">View All Products</router-link>
        <router-link to="/create" class="butmenu">Create Product</router-link>
      
      <!-- Utilisation du composant Login avec une directive v-if -->
      <user v-if="showLogin"></user>
     
    </div>
  </template>
  
  <script>
  import User from './User.vue'; // Import du composant Login

  export default {
    name: 'Menu',
    components: {
      User, // Enregistrement du composant Login

      
    },
    data() {
      return {
        showLogin: false // Propriété pour contrôler l'affichage du formulaire de connexion
      }
    }
  }
  </script>

<style>


  
</style>