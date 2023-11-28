
<template>
    <div>
      <button @click="deleteThing">Supprimer</button>
      <button @click="$router.go(-1)">Retour</button>
    </div>
  </template>

<script>
import axios from 'axios';

export default {
  name: 'DeleteThing',
  props: ['id'],
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
  },
};
</script>