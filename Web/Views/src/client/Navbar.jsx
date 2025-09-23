import React from "react";

const navStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  margin: "40px 0",
  gap: "0px",
  flexWrap: "nowrap", // Changé de "wrap" à "nowrap"
  overflowX: "auto", // Ajout du scroll horizontal si nécessaire
  paddingBottom: "10px" // Espace pour la scrollbar
};

const itemStyle = (active) => ({
  background: active
    ? "linear-gradient(90deg, #1e90ff 0%, #00e0ff 100%)"
    : "#232b36",
  color: active ? "#fff" : "#4fd1c5",
  borderRadius: "30px",
  padding: "14px 38px",
  fontWeight: "bold",
  fontSize: 18,
  border: "none",
  outline: "none",
  cursor: "pointer",
  boxShadow: active ? "0 4px 24px #00e0ff55" : "none",
  opacity: 1,
  margin: "0 8px",
  transition: "all 0.2s",
  position: "relative",
  letterSpacing: 1,
  display: "flex",
  alignItems: "center",
  gap: "8px",
  whiteSpace: "nowrap", // Empêche le texte de se casser
  flexShrink: 0 // Empêche les boutons de rétrécir
});

const arrowStyle = {
  color: "#4fd1c5",
  fontSize: 28,
  margin: "0 2px",
  opacity: 0.7,
  fontWeight: "bold",
  flexShrink: 0 // Empêche les flèches de rétrécir
};

const pages = [
  { key: "regions", label: "Régions", icon: "fas fa-globe-americas" },
  { key: "villes", label: "Villes", icon: "fas fa-city" },
  { key: "societes", label: "Sociétés", icon: "fas fa-building" },
  { key: "sites", label: "Sites", icon: "fas fa-map-marker-alt" },
  { key: "zones", label: "Zones", icon: "fas fa-industry" },
  { key: "allees", label: "Allées", icon: "fas fa-road" },
  { key: "rangees", label: "Rangées", icon: "fas fa-grip-lines" },
  { key: "etages", label: "Étages", icon: "fas fa-layer-group" },
];

export default function Navbar({ active, onNavigate }) {
  return (
    <nav style={navStyle}>
      {pages.map((page, idx) => (
        <React.Fragment key={page.key}>
          <button
            style={itemStyle(active === page.key)}
            onClick={() => onNavigate(page.key)}
          >
            <i className={page.icon}></i>
            {page.label}
          </button>
          {idx < pages.length - 1 && <span style={arrowStyle}>&rarr;</span>}
        </React.Fragment>
      ))}
      <style>
        {`
          /* Personnalisation de la scrollbar horizontale */
          nav::-webkit-scrollbar {
            height: 8px;
          }
          
          nav::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }
          
          nav::-webkit-scrollbar-thumb {
            background: #4fd1c5;
            border-radius: 4px;
          }
          
          nav::-webkit-scrollbar-thumb:hover {
            background: #1e90ff;
          }

          @media (max-width: 700px) {
            nav button {
              font-size: 14px !important;
              padding: 10px 20px !important;
            }
            nav span {
              font-size: 20px !important;
              margin: 0 4px !important;
            }
          }
        `}
      </style>
    </nav>
  );
}