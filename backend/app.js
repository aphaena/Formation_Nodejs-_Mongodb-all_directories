/**
 * Ce code ajoute un middleware pour gérer les en-têtes CORS 
 * (Cross-Origin Resource Sharing) dans les réponses envoyées par l’application Express. 
 * Le middleware définit plusieurs en-têtes pour autoriser l’accès 
 * à la ressource depuis n’importe quelle origine et autoriser certaines méthodes 
 * HTTP et certains en-têtes dans les requêtes.
 */

// Importation du module Express
const express = require('express');

// Création d'une application Express
const app = express();
const bodyParser = require('body-parser') // Import du module body-parser pour gérer les données des requêtes
const mongoose = require('mongoose'); // Import du module mongoose pour gérer la base de données

const stuffRoutes = require('./routes/stuff'); // Import des routes pour les objets Thing
const userRoutes = require('./routes/user'); // Import des routes pour les utilisateurs

const path = require('path'); // Import du module path pour gérer les chemins de fichiers

// Ajout d'un middleware pour gérer les en-têtes CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  // Autorisation de toutes les origines à accéder à la ressource
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Autorisation de certains en-têtes dans les requêtes
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Autorisation de certaines méthodes HTTP dans les requêtes
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  // Appel de la fonction next pour passer au middleware suivant
  next();
});

app.use(bodyParser.json()); // Utilisation du module body-parser pour gérer les données des requêtes

app.use('/api/stuff', stuffRoutes); // Utilisation des routes pour les objets Thing
app.use('/api/auth', userRoutes); // Utilisation des routes pour les utilisateurs

app.use('/images', express.static(path.join(__dirname, 'images'))); // Utilisation du module path pour servir les fichiers statiques

// Connexion à la base de données MongoDB avec le module mongoose
mongoose.connect('mongodb+srv://xavier:Xtazman888666@ocrnodejsmongodb.57qdjex.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !')) // En cas de succès, affichage d'un message de confirmation
  .catch(() => console.log('Connexion à MongoDB échouée !')); // En cas d'erreur, affichage d'un message d'erreur

module.exports = app; // Export de l'application Express pour utilisation dans le serveur principal
