// Importation du module HTTP de Node.js
const http = require('http');
// Importation de l'application Express à partir du fichier app.js
const app = require('./app');

// Fonction pour normaliser le port d'écoute du serveur
const normalizePort = val => {
  // Conversion de la valeur en nombre entier
  const port = parseInt(val, 10);

  // Si la valeur n'est pas un nombre, on la retourne telle quelle
  if (isNaN(port)) {
    return val;
  }
  // Si la valeur est un nombre positif, on la retourne
  if (port >= 0) {
    return port;
  }
  // Sinon, on retourne false
  return false;
};
// Récupération et normalisation du port d'écoute du serveur
const port = normalizePort(process.env.PORT || '3000');
// Configuration du port d'écoute de l'application Express
app.set('port', port);

// Fonction pour gérer les erreurs lors du démarrage du serveur
const errorHandler = error => {
  // Si l'erreur ne concerne pas l'écoute du serveur, on la relance
  if (error.syscall !== 'listen') {
    throw error;
  }
  // Récupération de l'adresse du serveur
  const address = server.address();
  // Détermination de la chaîne à afficher en fonction du type d'adresse
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  // Gestion des différents codes d'erreur
  switch (error.code) {
    case 'EACCES':
      // Le port nécessite des privilèges élevés
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // Le port est déjà utilisé
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      // Autres erreurs : on relance l'erreur
      throw error;
  }
};

// Création d'un serveur HTTP en utilisant l'application Express
const server = http.createServer(app);

// Ajout d'un gestionnaire d'événements pour les erreurs du serveur
server.on('error', errorHandler);
// Ajout d'un gestionnaire d'événements pour le démarrage du serveur
server.on('listening', () => {
  // Récupération de l'adresse du serveur
  const address = server.address();
  // Détermination de la chaîne à afficher en fonction du type d'adresse
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  // Affichage d'un message indiquant que le serveur écoute les connexions entrantes
  console.log('Listening on ' + bind);
});

// Démarrage du serveur HTTP et écoute des connexions entrantes sur le port spécifié
server.listen(port);
