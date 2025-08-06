import React from "react";

const navStyle = {
  display: "flex",
  alignItems: "center",
  gap: "32px",
  margin: "30px 0",
  justifyContent: "center"
};

const itemStyle = (active) => ({
  background: "#2d3748",
  color: "#fff",
  borderRadius: "30px",
  padding: "12px 32px",
  fontWeight: "bold",
  fontSize: 18,
  border: "none",
  outline: "none",
  cursor: "pointer",
  boxShadow: active ? "0 2px 8px #1976d2" : "none",
  opacity: active ? 1 : 0.8,
  transition: "all 0.2s"
});

const arrowStyle = {
  color: "#4fd1c5",
  fontSize: 28,
  margin: "0 8px"
};

const pages = [
    { key: "regions", label: "Régions" },
    { key: "villes", label: "Villes" },
  { key: "societes", label: "Sociétés" },
  
   
  { key: "sites", label: "Sites" },
  { key: "zones", label: "Zones" },
  { key: "allees", label: "Allées" },
  { key: "rangees", label: "Rangées" }
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
            {page.label}
          </button>
          {idx < pages.length - 1 && <span style={arrowStyle}>&rarr;</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}