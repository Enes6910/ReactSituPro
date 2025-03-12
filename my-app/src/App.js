import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./Login"; // Assurez-vous que Login.js existe

function Home() {
  return <h1>Bienvenue sur la page d'accueil</h1>;
}

function GestionProduits() {
  const [produits, setProduits] = useState([]);
  const [nomproduits, setNomproduits] = useState("");
  const [prix, setPrix] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = () => {
    fetch("http://localhost:5000/data")
      .then((response) => response.json())
      .then((data) => setProduits(data))
      .catch((error) => console.error("Erreur:", error));
  };

  const ajouterProduit = (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/data/${editId}`
      : "http://localhost:5000/data";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nomproduits, prix }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Réponse du serveur:", data);
        fetchProduits();
        setNomproduits("");
        setPrix("");
        setEditId(null);
      })
      .catch((error) => console.error("Erreur:", error));
  };

  const supprimerProduit = (id) => {
    fetch(`http://localhost:5000/data/${id}`, { method: "DELETE" })
      .then(() => fetchProduits())
      .catch((error) => console.error("Erreur:", error));
  };

  const modifierProduit = (produit) => {
    setNomproduits(produit.nomproduits);
    setPrix(produit.prix);
    setEditId(produit.idproduits);
  };

  return (
    <div className="App">
      <h1>Liste des produits</h1>
      <form onSubmit={ajouterProduit} className="form-container">
        <input
          type="text"
          placeholder="Nom du produit"
          value={nomproduits}
          onChange={(e) => setNomproduits(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          required
        />
        <button type="submit">{editId ? "Modifier" : "Ajouter"}</button>
      </form>
      <div className="produits-container">
        {produits.length > 0 ? (
          produits.map((produit) => (
            <div key={produit.idproduits} className="produit-card fade-in">
              <p>
                <strong>{produit.nomproduits}</strong> - {produit.prix} €
              </p>
              <div className="btn-group">
                <button className="edit-btn" onClick={() => modifierProduit(produit)}>Modifier</button>
                <button className="delete-btn" onClick={() => supprimerProduit(produit.idproduits)}>Supprimer</button>
              </div>
            </div>
          ))
        ) : (
          <p className="fade-in">Aucun produit trouvé</p>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/login">Connexion</Link></li>
          <li><Link to="/produits">Gestion des Produits</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/produits" element={<GestionProduits />} />
      </Routes>
    </Router>
  );
}

export default App;
