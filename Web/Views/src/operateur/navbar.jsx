import React from "react";
import { Link } from "react-router-dom";

const OperateurNavbar = () => (
  <nav style={{
    background: "#2c3e50",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }}>
    <div style={{ color: "#fff", fontWeight: "bold", fontSize: "18px" }}>
      Opérateur
    </div>
    <div>
      <Link to="/operateur/dashboard" style={{ color: "#fff", marginRight: "20px", textDecoration: "none" }}>
        Tableau de bord
      </Link>
      <Link to="/operateur/produits" style={{ color: "#fff", marginRight: "20px", textDecoration: "none" }}>
        Gestion des produits
      </Link>
      <Link to="/operateur/doubleinventaire" style={{ color: "#fff", marginRight: "20px", textDecoration: "none" }}>
        Double inventaire
      </Link>
      <Link to="/operateur/profil" style={{ color: "#fff", marginRight: "20px", textDecoration: "none" }}>
        profil
      </Link>
    </div>
  </nav>
);
export default OperateurNavbar;