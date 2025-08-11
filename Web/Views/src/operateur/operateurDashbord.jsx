import React, { useEffect, useState } from "react";
import axios from "axios";

const OperateurDashboard = () => {
  const [operateur, setOperateur] = useState(null);

  useEffect(() => {
    axios
      .get("/api/Operateur/me", { withCredentials: true })
      .then(response => setOperateur(response.data))
      .catch(() => setOperateur(null));
  }, []);

  if (!operateur) return <div>Chargement du compte opérateur...</div>;

  return (
    <div>
      <h2>Compte de l'opérateur</h2>
      <p><strong>Nom:</strong> {operateur.nom}</p>
      <p><strong>Email:</strong> {operateur.email}</p>
      {/* Ajoutez d'autres champs selon votre modèle */}
    </div>
  );
};

export default OperateurDashboard;