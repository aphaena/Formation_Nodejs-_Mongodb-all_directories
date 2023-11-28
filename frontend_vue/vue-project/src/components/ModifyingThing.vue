<template>
    <form @submit.prevent="submitForm">
      <input v-model="title" type="text" placeholder="Title" />
      <input v-model="description" type="text" placeholder="Description" />
      <input v-model="price" type="number" placeholder="Price" />
      
      <input type="file" @change="onFileChange" />
      <button type="submit">Update</button>
    </form>
    <img :src="imageUrl" alt="Image" class="image" /> <!-- Ajouter cette ligne -->
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ModifyingThing',
    props: ['id'],
    data() {
      return {
        title: '',
        description: '',
        price: '',
        imageUrl: null,
      };
    },
    methods: {
      onFileChange(e) {
        this.imageUrl = e.target.files[0];
      },
      submitForm() {
        const thingObject = {
          title: this.title,
          description: this.description,
          price: this.price,
        };
        const formData = new FormData();
        formData.append('thing', JSON.stringify(thingObject));
        if (this.imageUrl && this.imageUrl instanceof File) { //  condition pour ne pas envoyer l'image si aucune nouvelle image n'a été sélectionnée
          formData.append('image', this.imageUrl);
      }
  
        axios
          .put(`/api/stuff/${this.id}`, formData)
          .then(() => {
            // Handle successful update
            this.$router.push({ name: 'AllProducts' });
          })
          .catch((error) => {
            // Handle error
          });
      },
      
    },
    mounted() {
        axios
          .get(`/api/stuff/${this.id}`)
          .then((response) => {
            this.title = response.data.title;
            this.description = response.data.description;
            this.price = response.data.price;
            this.imageUrl = response.data.imageUrl; 
          })
          .catch((error) => {
            // Handle error
          });
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