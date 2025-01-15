import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/data')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Erreur:', error));
  }, []);

  return (
    <div className="App">
    <h1>Liste des utilisateurs</h1>
    <ul>
      {users.length > 0 ? (
        users.map((user) => (
          <li key={user.idusers}> {/* Assurez-vous que chaque utilisateur a une clé unique */}
            {user.username} - {user.age} {/* Remplacez par les propriétés que vous avez dans la table */}
          </li>
        ))
      ) : (
        <li>Aucun utilisateur trouvé</li>
      )}
    </ul>
  </div>
);
}

export default App;
