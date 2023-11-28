<template>
  <div id="app">
    <button v-if="!loggedIn" @click="showSignup = true">S'inscrire</button>
    <button v-if="!loggedIn" @click="showSignup = false">Se connecter</button>
    <form v-if="!loggedIn && showSignup" @submit.prevent="signup">
      <h2>Inscription</h2>
      <input type="email" v-model="signupEmail" placeholder="Email">
      <input type="password" v-model="signupPassword" placeholder="Mot de passe">
      <button type="submit">S'inscrire</button>
    </form>
    <form v-if="!loggedIn && !showSignup" @submit.prevent="login">
      <h2>Connexion</h2>
      <input type="email" v-model="loginEmail" placeholder="Email">
      <input type="password" v-model="loginPassword" placeholder="Mot de passe">
      <button type="submit">Se connecter</button>
    </form>
    <div v-if="loggedIn">
        <p v-if="user">Connecté en tant que {{ user.loginEmail }}</p>
        <button v-if="user" @click="logout">Se déconnecter ({{ user.loginEmail }})</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'User',
  data() {
    return {
      loggedIn: false,
      user: null,
      signupEmail: '',
      signupPassword: '',
      loginEmail: '',
      loginPassword: '',
      showSignup: false
    }
  },
  methods: {
    signup() {
      // Envoi des données d'inscription au serveur backend 
      // http://localhost:3000/
      axios.post('/api/auth/signup', {
        email: this.signupEmail,
        password: this.signupPassword
      })
        .then(response => {
          // Gestion de la réponse en cas de succès
          // ...
        })
        .catch(error => {
          // Gestion de l'erreur en cas d'échec
          // ...
        });
    },
    login() {
      // Envoi des données de connexion au serveur backend
      // http://localhost:3000/
       axios.post('/api/auth/login', {
        email: this.loginEmail,
        password: this.loginPassword
      })
        .then(response => {
          // Gestion de la réponse en cas de succès
          this.loggedIn = true;
          this.user = response.data.user;       
          console.log("user: "+ this.user);
        })
        .catch(error => {
          // Gestion de l'erreur en cas d'échec
          // ...
        });
    },
    logout() {
      // Code pour gérer la déconnexion de l'utilisateur
      // ...
      this.loggedIn = false;
      this.user = null;
    }
  }
}
</script>
