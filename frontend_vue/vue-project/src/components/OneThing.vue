// OneThing.vue

<template>
  <div v-if="thing">
    <!-- <button @click="$router.go(-1)">Retour</button> -->
    <a href="#" @click="goBack" class="button">Retour</a>
    
    <h1>{{ thing.title }}</h1>
    <img :src="thing.imageUrl" :alt="thing.title" class="image"/>
    <p>{{ thing.description }}</p>
    <router-link :to="{ name: 'modify', params: { id: thing._id } }" class="button">Modifier</router-link>
    <router-link :to="{ name: 'delete', params: { id: thing._id } }" class="button">Supprimer</router-link>
    <!-- <button @click="deleteThing">Supprimer</button>
    <button @click="modifyingThing">Modifier</button> -->
  </div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'OneThing',
  props: ['id'],
  data() {
    return {
      thing: null,
    };
  },
  
  watch: {
    // Watch the `id` prop for changes
    id(newId) {
      // Fetch new data when the `id` prop changes
      this.fetchData(newId);
    },
  },
  mounted() {
    // Fetch data when the component is mounted
    this.fetchData(this.id);
  },
  methods: {
    deleteThing() {
      // Envoi d'une requête DELETE à l'API backend pour supprimer l'objet Thing spécifié
      axios
        .delete(`/api/stuff/${this.id}`)
        .then(() => {
          // Redirection de l'utilisateur vers la page d'accueil après la suppression
          this.$router.push({ name: 'AllProducts' });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    modifyingThing() {
      this.$router.push({ name: 'modify', params: { id: this.thing._id } });
    },
   fetchData(id) {
      // Récupération de l'objet Thing spécifié depuis l'API backend
      axios
        .get(`/api/stuff/${id}`)
        .then((response) => {
          this.thing = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    goBack(event) {
      event.preventDefault();
      this.$router.go(-1);
    },
    
  },
};
</script>

<style>
.image {
  max-width: 600px;
}

.button {
  display: inline-block;
  padding: 0.5em 1em;
  margin-right: 10px;
  border: none;
  border-radius: 0.25em;
  background-color: #007bff;
  color: white;
  text-decoration: none;
}

.button:hover {
  background-color: #0069d9;
}
</style>