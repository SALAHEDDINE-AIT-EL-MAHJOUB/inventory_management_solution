import React from "react";
import "./navbarProduit.css";

const NavbarProduit = ({ active, onNavigate }) => (
  <nav className="navbar-produit">
    <div className="navbar-brand">
      <svg className="navbar-logo" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M7 18c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h3l2-2h3c1.1 0 2 .9 2 2v2h-2V6h-2.17l-2 2H7v8h10v-2h2v2c0 1.1-.9 2-2 2H7zm12-7h-8v2h8v-2z"/>
      </svg>
      <span className="navbar-title">Gestion Produits</span>
    </div>

    <div className="navbar-actions">
      <button
        className={`navbar-produit-btn${active === "listeProduit" ? " active" : ""}`}
        onClick={() => onNavigate("listeProduit")}
      >
        <span className="btn-icon" aria-hidden>📦</span>
        Liste des produits
      </button>
      <button
        className={`navbar-produit-btn${active === "creeProduit" ? " active" : ""}`}
        onClick={() => onNavigate("creeProduit")}
      >
        <span className="btn-icon" aria-hidden>➕</span>
        Créer Produit
      </button>
      <button
        className={`navbar-produit-btn${active === "fournisseur" ? " active" : ""}`}
        onClick={() => onNavigate("fournisseur")}
      >
        <span className="btn-icon" aria-hidden>🏷️</span>
        Fournisseurs
      </button>
    </div>
  </nav>
);

export default NavbarProduit;