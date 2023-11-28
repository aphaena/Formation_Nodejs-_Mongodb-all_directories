const express = require('express'); // Import du module Express
const router = express.Router(); // Création d'un routeur Express

const auth = require('../middleware/auth'); // Import du middleware d'authentification
const multer = require('../middleware/multer-config'); // Import du middleware de gestion des fichiers

const stuffCtrl = require('../controllers/stuff'); // Import des contrôleurs pour les objets Thing

//router.post('/', auth, multer, stuffCtrl.createThing);
router.post('/',   multer, stuffCtrl.createThing); // Route pour la création d'un nouvel objet Thing
router.put('/:id',   multer, stuffCtrl.modifyThing); // Route pour la modification d'un objet Thing existant

router.delete('/:id',   stuffCtrl.deleteThing); // Route pour la suppression d'un objet Thing existant
router.get('/:id',  stuffCtrl.getOneThing ); // Route pour récupérer un objet Thing spécifique
router.get('/',   stuffCtrl.getAllThings); // Route pour récupérer tous les objets Thing

module.exports = router; // Export du routeur pour utilisation dans l'application principale
