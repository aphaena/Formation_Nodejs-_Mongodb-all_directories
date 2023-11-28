const jwt = require('jsonwebtoken'); // Importation du package jsonwebtoken
 
module.exports = (req, res, next) => { // Exportation d'une fonction middleware
 try {
    const token = req.headers.authorization.split(' ')[1]; // Récupération du token d'authentification de la requête
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Vérification du token avec la clé secrète
    const userId = decodedToken.userId; // Récupération de l'ID utilisateur du token décodé
    req.auth = { // Ajout de l'ID utilisateur à la requête
    userId: userId
 };
 next(); // Passage au middleware suivant
 } catch(error) { // En cas d'erreur (token invalide ou absent)
    res.status(401).json({ error }); // Envoi d'une réponse avec un statut 401 (non autorisé)
 }
};