import React, { useEffect, useState } from "react";
import axios from "axios";
import OperateurNavbar from "./navbar";
import GestionProduit from "./GestionProduit";


const OperateurDashboard = () => {
  const [operateur, setOperateur] = useState(null);
  const operateurId = operateur ? (operateur.id || operateur._id) : null;

  useEffect(() => {
    axios
      .get("/api/Operateur/me", { withCredentials: true })
      .then(response => setOperateur(response.data))
      .catch(() => setOperateur(null));
  }, []);

  if (!operateur) return <div>Chargement du compte opérateur...</div>;

  return (
    <div>
      <OperateurNavbar />
      <div style={{ padding: "20px" }}>
        
      </div>
    </div>
  );
};

export default OperateurDashboard;