import React, { useEffect, useState } from "react";
import axios from "axios";
import OperateurNavbar from "./navbar";

const Profil = () => {
  const [operateur, setOperateur] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/Operateur/me", { withCredentials: true })
      .then((res) => {
        setOperateur(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <OperateurNavbar />
        <div style={{ padding: "40px", textAlign: "center" }}>Chargement du profil...</div>
      </>
    );
  }

  if (!operateur) {
    return (
      <>
        <OperateurNavbar />
        <div style={{ padding: "40px", textAlign: "center", color: "#c0392b" }}>
          Impossible de charger le profil opérateur.
        </div>
      </>
    );
  }

  return (
    <div style={{ background: "#f4f8fb", minHeight: "100vh" }}>
      <OperateurNavbar />
      <div
        style={{
          maxWidth: "500px",
          margin: "40px auto",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(44,62,80,0.08)",
          padding: "32px",
        }}
      >
        <h2 style={{ color: "#2c3e50", marginBottom: "24px" }}>Profil Opérateur</h2>
        <p><strong>Nom :</strong> {operateur.nom}</p>
        <p><strong>Email :</strong> {operateur.email}</p>
        {/* Ajoute d'autres champs si besoin */}
      </div>
    </div>
  );
};

export default Profil;