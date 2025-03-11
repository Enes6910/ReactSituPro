const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mysql = require('mysql2');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json()); // 🚨 Permet de lire le JSON des requêtes POST

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
  const query = 'SELECT * FROM produits'; // Assurez-vous que la table 'produits' existe

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

// ✅ Ajouter un produit
app.post("/data", (req, res) => {
  const { nomproduits, prix } = req.body;
  if (!nomproduits || !prix) {
    return res.status(400).send({ message: "Champs manquants" });
  }
  db.query(
    "INSERT INTO produits (nomproduits, prix) VALUES (?, ?)",
    [nomproduits, prix],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Erreur serveur" });
        return;
      }
      res.send({ message: "Produit ajouté avec succès", id: result.insertId });
    }
  );
});

// ✅ Modifier un produit
app.put("/data/:id", (req, res) => {
  const { nomproduits, prix } = req.body;
  const { id } = req.params;
  db.query(
    "UPDATE produits SET nomproduits = ?, prix = ? WHERE idproduits = ?",
    [nomproduits, prix, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Erreur serveur" });
        return;
      }
      res.send({ message: "Produit modifié avec succès" });
    }
  );
});

// ✅ Supprimer un produit
app.delete("/data/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM produits WHERE idproduits = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Erreur serveur" });
      return;
    }
    res.send({ message: "Produit supprimé avec succès" });
  });
});


// Lancer le serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
