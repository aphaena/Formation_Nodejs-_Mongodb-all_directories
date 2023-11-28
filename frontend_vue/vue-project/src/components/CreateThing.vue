<template>
  <form @submit.prevent="submitForm">
    <input v-model="title" type="text" placeholder="Title" />
    <input v-model="description" type="text" placeholder="Description" />
    <input v-model="price" type="number" placeholder="Price" />
    <input type="file" @change="onFileChange" />
    <button type="submit">Create</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateThing',
  data() {
    return {
      title: '',
      description: '',
      price: '',
      imageUrl: null,
      errorMessage: '',
    };
  },
  methods: {
    onFileChange(e) {
      this.imageUrl = e.target.files[0];
    },
    submitForm() {
      // Réinitialiser le message d'erreur
      this.errorMessage = '';

      // Valider les données du formulaire
      if (!this.title || !this.description || !this.price) {
        this.errorMessage = 'Veuillez remplir tous les champs';
        return;
      }
      if (isNaN(this.price)) {
        this.errorMessage = 'Veuillez saisir un prix valide';
        return;
      }

      // Envoyer les données au serveur
      const formData = new FormData();
      formData.append('thing', JSON.stringify({
        title: this.title,
        description: this.description,
        price: this.price,
      }));
      if (this.imageUrl) {
        formData.append('image', this.imageUrl);
      }

      axios
        .post('/api/stuff', formData)
        .then(() => {
          // Handle successful creation
          this.$router.push({ name: 'AllProducts' });

          // Réinitialiser le formulaire
          this.title = '';
          this.description = '';
          this.price = '';
          this.imageUrl = null;
        })
        .catch((error) => {
          // Handle error
          this.errorMessage = 'Une erreur est survenue lors de la création de l objet';
        });
    },
  },
};
</script>
