import React from "react";
import "./navbarProduit.css";

const NavbarProduit = ({ active, onNavigate }) => (
  <nav className="navbar-produit">
   
    <button
      className={`navbar-produit-btn${
        active === "listeProduit" ? " active" : ""
      }`}
      onClick={() => onNavigate("listeProduit")}
    >
      Liste des produits
    </button>
    <button
      className={`navbar-produit-btn${
        active === "creeProduit" ? " active" : ""
      }`}
      onClick={() => onNavigate("creeProduit")}
    >
      Créer Produit
    </button>
    
    <button
      className={`navbar-produit-btn${
        active === "fournisseur" ? " active" : ""
      }`}
      onClick={() => onNavigate("fournisseur")}
    >
      Fournisseurs
    </button>

   
  </nav>
);

export default NavbarProduit;