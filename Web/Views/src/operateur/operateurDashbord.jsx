import React, { useEffect, useState } from "react";
import axios from "axios";
import OperateurNavbar from "./navbar";
import "./operateurDashboard.css";

const Card = ({ title, value, subtitle, icon }) => (
  <div className="op-card">
    <div className="op-card-header">
      {icon && <div className="op-card-icon">{icon}</div>}
      <div className="op-card-title">{title}</div>
    </div>
    <div className="op-card-value">{value}</div>
    {subtitle && <div className="op-card-sub">{subtitle}</div>}
  </div>
);

const OperateurDashboard = () => {
  const [operateur, setOperateur] = useState(null);
  const [produits, setProduits] = useState([]);
  const [doubleProduits, setDoubleProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/operateur/me").then((res) => setOperateur(res.data)).catch(() => setOperateur(null));
  }, []);

  useEffect(() => {
    if (!operateur) return;
    setLoading(true);
    const id = operateur.id || operateur._id || operateur.operateurId;
    const p1 = axios.get(`/api/operateur/${id}/produits-inventaire`).then((r) => r.data).catch(() => []);
    const p2 = axios.get(`/api/operateur/${id}/double-inventaire`).then((r) => r.data).catch(() => []);
    Promise.all([p1, p2])
      .then(([prodList, doubleList]) => {
        setProduits(prodList || []);
        setDoubleProduits(doubleList || []);
      })
      .finally(() => setLoading(false));
  }, [operateur]);

  const totalProduits = produits.length;
  const produitsInventories = produits.filter((p) => p.quantiteInventaire !== null && p.quantiteInventaire !== undefined).length;
  const totalDouble = doubleProduits.length;
  const progression = totalProduits > 0 ? Math.round((produitsInventories / totalProduits) * 100) : 0;

  if (loading)
    return (
      <>
        <OperateurNavbar />
        <div className="op-loading">
          <div className="op-spinner"></div>
          <p>Chargement dashboard...</p>
        </div>
      </>
    );

  return (
    <>
      <OperateurNavbar />
      <div className="op-dashboard">
        <header className="op-header">
          <h1>Tableau de bord - {operateur?.nom || "Opérateur"}</h1>
          <p className="op-sub">Vue synthétique de votre progression</p>
        </header>

        <section className="op-cards">
          <Card
            title="Total Produits"
            value={totalProduits}
            subtitle="Produits assignés"
            icon="📦"
          />
          <Card
            title="Inventoriés"
            value={produitsInventories}
            subtitle={`${progression}% complété`}
            icon="✅"
          />
          <Card
            title="Double Inventaire"
            value={totalDouble}
            subtitle="Vérifications"
            icon="🔄"
          />
          <Card
            title="Efficacité"
            value={`${progression}%`}
            subtitle="Taux de completion"
            icon="📊"
          />
        </section>

        <section className="op-list-card">
          <h3>
            <span style={{ marginRight: 8 }}>📋</span>
            Produits Récents
          </h3>
          <div className="op-list">
            {produits.slice(0, 8).map((p, index) => (
              <div key={p.gestionInventaireId || p.produitId || index} className="op-list-item">
                <div className="op-list-info">
                  <div className="op-list-name">{p.produitNom || p.produitId || `Produit ${index + 1}`}</div>
                  <div className="op-list-category">{p.categorie || "Non catégorisé"}</div>
                </div>
                <div className="op-list-qty">{p.quantiteInventaire ?? 0}</div>
              </div>
            ))}
            {produits.length === 0 && (
              <div className="op-empty">
                <span style={{ fontSize: "2rem", marginBottom: 8 }}>📭</span>
                <p>Aucun produit trouvé</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default OperateurDashboard;