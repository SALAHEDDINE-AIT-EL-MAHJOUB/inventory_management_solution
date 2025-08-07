import React from "react";

const navStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  margin: "40px 0",
  gap: "0px",
  flexWrap: "wrap"
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
});

const arrowStyle = {
  color: "#4fd1c5",
  fontSize: 28,
  margin: "0 2px",
  opacity: 0.7,
  fontWeight: "bold"
};

const pages = [
  { key: "regions", label: "Régions" },
  { key: "villes", label: "Villes" },
  { key: "societes", label: "Sociétés" },
  { key: "sites", label: "Sites" },
  { key: "zones", label: "Zones" },
  { key: "allees", label: "Allées" },
  { key: "rangees", label: "Rangées" },
  { key: "etages", label: "Étages" }
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
      <style>
        {`
          @media (max-width: 700px) {
            nav {
              flex-direction: column !important;
              gap: 0 !important;
            }
            nav button {
              width: 100%;
              margin: 8px 0 !important;
              font-size: 16px !important;
              padding: 12px 0 !important;
            }
          }
        `}
      </style>
    </nav>
  );
}