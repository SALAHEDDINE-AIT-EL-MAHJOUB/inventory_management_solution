
import React, { useEffect, useState } from "react";
import axios from "axios";

const ListeOperateurs = () => {
  const [operateurs, setOperateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("/api/Operateur")
      .then(res => setOperateurs(res.data))
      .catch(() => setError("Erreur lors du chargement des opérateurs"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>Liste des opérateurs</h3>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>CIN</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Site</th>
          </tr>
        </thead>
        <tbody>
          {operateurs.map(op => (
            <tr key={op.id}>
              <td>{op.nom}</td>
              <td>{op.prenom}</td>
              <td>{op.cin}</td>
              <td>{op.email}</td>
              <td>{op.telephone}</td>
              <td>{op.siteId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeOperateurs;