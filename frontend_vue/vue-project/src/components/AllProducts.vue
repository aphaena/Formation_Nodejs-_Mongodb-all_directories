<!-- AllProducts.vue -->
<template>
    <div id="AllProducts">
      <h2>Objets à vendre:</h2>
      <div class="gallery">
        <div class="gallery-item" v-for="item in items" :key="item._id">
          <img :src="item.imageUrl" :alt="item.title" />
          <div>{{ item.title }}</div>
          <div>{{ item.description }}</div>
          <div>{{ item.price }}</div>
          <router-link :to="{ name: 'OneThing', params: { id: item._id } }">
            View Details
          </router-link>
        </div>
      </div>
    </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AllProducts',
    data() {
      return {
        items: [],
      };
    },
    mounted() {
      // Récupération des objets à vendre depuis l'API backend http://localhost:3000/
      axios
        .get('/api/stuff')
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  };
  </script>
  
  <style>
    .gallery {
      display: flex;
      flex-wrap:wrap;
    }
    .gallery-item {
      width: calc(100% - 10px); /* Définir une largeur initiale pour les grands écrans */
      margin: 5px;
      text-align: center;
    }
    .gallery-item img {
      width: 60%;
      height: auto;
    }

  </style>