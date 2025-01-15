const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // ou l'adresse IP de ton serveur
  user: 'root', // ton utilisateur MySQL
  password: '', // ton mot de passe MySQL
  database: 'situationproreact' // la base de données que tu as créée
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err.stack);
    return;
  }
  console.log('Connecté à la base de données avec l\'ID', connection.threadId);
});

module.exports = connection;
