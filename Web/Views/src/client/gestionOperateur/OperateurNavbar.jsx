import React from "react";

const OperateurNavbar = ({ activeTab, setActiveTab }) => (
  <div style={{
    display: "flex",
    gap: "18px",
    marginBottom: "32px",
    justifyContent: "flex-start"
  }}>
    <button
      onClick={() => setActiveTab("ajouter")}
      style={{
        background: activeTab === "ajouter" ? "#2d3a4b" : "#49546a",
        color: "#fff",
        border: "none",
        borderRadius: "24px",
        padding: "10px 32px",
        fontWeight: 500,
        fontSize: "1rem",
        boxShadow: activeTab === "ajouter" ? "0 2px 8px rgba(44,62,80,0.08)" : "none",
        outline: "none",
        cursor: "pointer",
        transition: "background 0.2s"
      }}
    >
      Ajouter un opérateur
    </button>
    <button
      onClick={() => setActiveTab("liste")}
      style={{
        background: activeTab === "liste" ? "#2d3a4b" : "#49546a",
        color: "#fff",
        border: "none",
        borderRadius: "24px",
        padding: "10px 32px",
        fontWeight: 500,
        fontSize: "1rem",
        boxShadow: activeTab === "liste" ? "0 2px 8px rgba(44,62,80,0.08)" : "none",
        outline: "none",
        cursor: "pointer",
        transition: "background 0.2s"
      }}
    >
      Liste des opérateurs
    </button>
  </div>
);

export default OperateurNavbar;