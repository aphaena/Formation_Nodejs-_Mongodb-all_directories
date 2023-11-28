const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken'); // Import du module jwt pour gérer les tokens d'authentification

// Fonction pour l'inscription d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10) // Hashage du mot de passe avec un salt de 10
    .then(hash => {
      const user = new User({ // Création d'un nouvel utilisateur avec les données reçues
        email: req.body.email,
        password: hash // Utilisation du mot de passe hashé
      });
      user.save() // Sauvegarde de l'utilisateur dans la base de données
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) // En cas de succès, renvoi d'un message de confirmation
        .catch(error => res.status(400).json({ error })); // En cas d'erreur, renvoi de l'erreur
    })
    .catch(error => res.status(500).json({ error })); // En cas d'erreur lors du hashage du mot de passe, renvoi de l'erreur
};

// Fonction pour la connexion d'un utilisateur existant
exports.login = (req, res, next) => {  
  User.findOne({ email: req.body.email }) // Recherche de l'utilisateur dans la base de données
    .then(user => {
      if (!user) { // Si l'utilisateur n'est pas trouvé
        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'}); // Renvoi d'un message d'erreur
      }
      bcrypt.compare(req.body.password, user.password) // Comparaison du mot de passe envoyé avec celui enregistré dans la base de données
        .then(valid => {
          if (!valid) { // Si la comparaison échoue
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' }); // Renvoi d'un message d'erreur
          }
          res.status(200).json({ // Si la comparaison réussit
            userId: user._id, // Renvoi de l'ID utilisateur
            token: jwt.sign( // Génération et renvoi d'un token d'authentification
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error })); // En cas d'erreur lors de la comparaison des mots de passe, renvoi de l'erreur
    })
    .catch(error => res.status(500).json({ error })); // En cas d'erreur lors de la recherche de l'utilisateur dans la base de données, renvoi de l'erreur
};
