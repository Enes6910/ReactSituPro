const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mysql = require('mysql2');

// Créer la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',     // L'adresse du serveur MariaDB
  user: 'root',          // L'utilisateur de la base de données
  password: 'Enes2510SW!!', // Le mot de passe de l'utilisateur
  database: 'situationpro'  // Le nom de la base de données
});

// Vérifier la connexion
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connexion à la base de données réussie !');
});

// Utilise CORS pour autoriser les requêtes depuis localhost:5000
app.use(cors());

// Route de base pour éviter l'erreur "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur Express !');
});

// Exemple de route pour récupérer des données
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM users'; // Assurez-vous que la table 'users' existe

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête:', err);
      res.status(500).json({ message: 'Erreur interne du serveur' });
      return;
    }

    if (results.length > 0) {
      res.json(results); // Renvoie les résultats sous forme de JSON
    } else {
      res.json({ message: 'Aucun utilisateur trouvé' });
    }
  });
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
