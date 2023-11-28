const Thing = require('../models/Thing'); // Import du modèle Thing
const fs = require('fs'); // Import du module fs pour gérer les fichiers

// Fonction pour créer un nouvel objet Thing
exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing); // Récupération des données de l'objet
  delete thingObject._id; // Suppression de l'ID généré par le frontend
  delete thingObject._userId; // Suppression de l'ID utilisateur généré par le frontend
  const thing = new Thing({ // Création d'un nouvel objet Thing avec les données reçues
    ...thingObject,
   // userId: req.auth.userId, // Ajout de l'ID utilisateur authentifié
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Génération de l'URL de l'image
  });
  
  thing.save() // Sauvegarde de l'objet dans la base de données
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})}) // En cas de succès, renvoi d'un message de confirmation
    .catch(error => { res.status(400).json( { error })}) // En cas d'erreur, renvoi de l'erreur
};

// Fonction pour modifier un objet Thing existant
exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ? { // Si une nouvelle image est envoyée
    ...JSON.parse(req.body.thing), // Récupération des données de l'objet
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Génération de la nouvelle URL de l'image
  } : { ...JSON.parse(req.body.thing) }; // Sinon, récupération des données sans modification de l'image

  Thing.updateOne({ _id: req.params.id}, { ...thingObject, _id: req.params.id}) // Mise à jour de l'objet dans la base de données
    .then(() => res.status(200).json({message : 'Objet modifié!'})) // En cas de succès, renvoi d'un message de confirmation
    .catch(error => res.status(401).json({ error })); // En cas d'erreur, renvoi de l'erreur
};


// Fonction pour supprimer un objet Thing existant
exports.deleteThing = (req, res, next) => {
  console.log("deleteThing");
  Thing.findOne({ _id: req.params.id}) // Recherche de l'objet dans la base de données
    .then(thing => {
      // if (thing.userId != req.auth.userId) { // Vérification que l'utilisateur authentifié est bien le propriétaire de l'objet
      //   res.status(401).json({message: 'Not authorized'}); // Si ce n'est pas le cas, renvoi d'un message d'erreur
      // } else {
        const filename = thing.imageUrl.split('/images/')[1]; // Récupération du nom du fichier image à supprimer
        console.log('thing.imageUrl:' + thing.imageUrl);
        fs.unlink(`images/${filename}`, () => { // Suppression du fichier image sur le serveur
          Thing.deleteOne({_id: req.params.id}) // Suppression de l'objet dans la base de données
            .then(() => { res.status(200).json({message: 'Objet supprimé !'})}) // En cas de succès, renvoi d'un message de confirmation
            .catch(error => res.status(401).json({ error })); // En cas d'erreur, renvoi de l'erreur
        });
      //}
    })
    .catch( error => {
      res.status(500).json({ error }); // En cas d'erreur lors de la recherche de l'objet dans la base de données, renvoi de l'erreur
    });
};

// Fonction pour récupérer un objet Thing spécifique
exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }) // Recherche de l'objet dans la base de données
    .then(thing => res.status(200).json(thing)) // En cas de succès, renvoi des données de l'objet
    .catch(error => res.status(404).json({ error })); // En cas d'erreur, renvoi de l'erreur
};

// Fonction pour récupérer tous les objets Thing
exports.getAllThings = (req, res, next) => { 
  Thing.find() // Recherche de tous les objets dans la base de données
    .then(things => res.status(200).json(things) ) // En cas de succès, renvoi des données des objets
    .catch(error => res.status(400).json({ error })); // En cas d'erreur, renvoi de l'erreur
};
