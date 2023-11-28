const express = require('express'); // Import du module Express
const router = express.Router(); // Création d'un routeur Express
const userCtrl = require('../controllers/user'); // Import des contrôleurs pour les utilisateurs

router.post('/signup', userCtrl.signup); // Route pour l'inscription d'un nouvel utilisateur
router.post('/login', userCtrl.login); // Route pour la connexion d'un utilisateur existant

module.exports = router; // Export du routeur pour utilisation dans l'application principale
