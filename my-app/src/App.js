import React, { useEffect, useState } from 'react';

function App() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/data')
      .then((response) => response.json())
      .then((data) => setProduits(data))
      .catch((error) => console.error('Erreur:', error));
  }, []);

  return (
    <div className="App">
    <h1>Liste des produits</h1>
    <ul>
      {produits.length > 0 ? (
        produits.map((produits) => (
          <li key={produits.idproduits}> {/* Assurez-vous que chaque utilisateur a une clé unique */}
            {produits.nomproduits} - {produits.prix} $ {/* Remplacez par les propriétés que vous avez dans la table */}
          </li>
        ))
      ) : (
        <li>Aucuns produits trouvés</li>
      )}
    </ul>
  </div>
);
}

export default App;
