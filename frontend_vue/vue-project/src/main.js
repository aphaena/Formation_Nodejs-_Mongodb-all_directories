import './assets/main.css';
import router from './router';
import axios from 'axios';

import { createApp } from 'vue';
import App from './App.vue';

axios.interceptors.request.use(
  (config) => {
    // Récupération du token d'authentification depuis le stockage local
    const token = localStorage.getItem('token');
    if (token) {
      // Ajout du token d'authentification aux en-têtes des requêtes
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('Request headers:', config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

createApp(App).use(router).mount('#app');
