<script>
import Menu from './components/Menu.vue'
import router from './router';

export default {
  name: 'App',
  components: {
    Menu, // Enregistrement du composant Login           
  },
  router,
};
</script>

<template>
  <div id="app_">
  <header>
     
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />   
      <div id="menu">
      <Menu />
    </div> 
   
  </header>
             
  <main>           
      <div class="wrapper">   
        <router-view />  
      </div>   
  </main>
</div>
</template>

<style scoped>
main {
  margin-top: 125px; /* Ajouter une marge en haut de l'élément main */
}

/* Définition du style pour l'élément header */
header {
  line-height: 1.5; /* Hauteur de ligne de 1.5 */
}

/* Définition du style pour l'élément avec la classe logo */
.logo {
  display: block; /* Affichage en bloc */
  margin: 0 auto 2rem; /* Marge automatique à gauche et à droite, et marge de 2rem en bas */
}

/* Définition des styles pour les écrans d'au moins 1900px de largeur */
@media (min-width: 1900px) {
  header {
   
  }

  .logo {
    margin: 0 2rem 0 0; /* Marge de 2rem à droite */
  }

  /* Définition du style pour l'élément avec la classe wrapper dans l'élément header */
  header .wrapper {
    position: fixed; /* Fixer la position de l'élément */
    top: 0; /* Positionner l'élément en haut de l'écran */
    left: center; /* Positionner l'élément à gauche de l'écran */
    width: 100%; /* Largeur de l'élément définie à 100% */
  }
  
  main .wrapper {
    display: flex; /* Affichage en flexbox */
    place-items: flex-start; /* Alignement des éléments au début */
    flex-wrap: wrap; /* Enroulement des éléments sur plusieurs lignes si nécessaire */
    width: 100%; /* Largeur de l'élément définie à 100% */
  }
}
</style>
