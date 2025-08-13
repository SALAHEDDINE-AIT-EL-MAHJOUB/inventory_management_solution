import React from "react";
import { Link } from "react-router-dom";

const navStyle = {
  background: "#1976d2",
  padding: "12px 24px",
  display: "flex",
  gap: "20px"
};
const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "16px"
};

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <Link to="/gestioninventaire" style={linkStyle}>Tableau Gestion Inventaire</Link>
      <Link to="/creeinventaire" style={linkStyle}>Créer/Affecter Inventaire</Link>
    </nav>
  );
}