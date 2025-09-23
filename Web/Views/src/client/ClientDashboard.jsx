import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./profile";
import GestionSocietes from "./GestionSocietes";
import Ville from "./ville";
import RegionVille from "./RegionVille";
import Site from "./site";
import "./ClientDashboard.css";
import Zone from "../emplacement/zone";
import Navbar from "./Navbar";
import Region from "./Region";
import Allee from "../emplacement/allee";
import Rangee from "../emplacement/Rangee";
import Etage from "../emplacement/etage";
import RegisterOperateur from "./gestionOperateur/registerOperateur";
import ListeOperateurs from "./gestionOperateur/ListeOperateurs";
import CreeEquipe from "./gestionEquipe/creeEquipe"; 
import EquipeManager from "./gestionEquipe/EquipeManager";
import Produit from "./gestionProduit/creeProduit";
import NavbarProduit from "./gestionProduit/navbarProduit";
import CreeProduit from "./gestionProduit/creeProduit";
import Fournisseur from "./gestionProduit/fournisseur";
import ListProduit from "./gestionProduit/listProduit"; 
import ResultaOperateur from "./gestionOperateur/resultaOperateur";
import CreeInventaire from "./inventaire/creeInventaire";
import GestionInventaireTableau from "./inventaire/gestioninventaire";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import logo from "../../public/logo.png"; 
import PredictionStock from "./gestionProduit/predictionStock";
import PredictiondeStock from "./gestionProduit/PrédictiondeStock";
const ClientDashboard = ({ onLogout }) => {
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState(() => {
    const info = localStorage.getItem("clientInfo");
    return info ? JSON.parse(info).client : {};
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [emplacementTab, setEmplacementTab] = useState("societes"); 
  const [produitTab, setProduitTab] = useState("creeProduit"); 
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    societes: 0,
    sites: 0,
    villes: 0,
    operateurs: 0,
    produits: 0,
    inventaires: 0,
  });
  const [inventaireStatutData, setInventaireStatutData] = useState({});
  const [inventaireTypeData, setInventaireTypeData] = useState({});
  const [ruptureData, setRuptureData] = useState({}); 
  const [stockBarData, setStockBarData] = useState({});
  const [ruptureListData, setRuptureListData] = useState({});

  useEffect(() => {
    loadClientData();
    loadStats();
    loadInventaireStatuts();
    loadInventaireTypes();
    loadRuptureData(); 
    loadStockBarData(); 
    loadRuptureListData(); 
  }, []);

  const loadClientData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("/api/Profil/me");
      
      if (response.data && (response.data.clientNom || response.data.ClientNom)) {
        setProfile(response.data);
      }
      
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      setError("Erreur lors du chargement des données");
      const savedClientInfo = localStorage.getItem("clientInfo");
      if (savedClientInfo) {
        const parsedData = JSON.parse(savedClientInfo);
        if (parsedData.Client) {
          setProfile(parsedData.Client);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const res = await axios.get("/api/stats");
      setStats(res.data);
    } catch (e) {
      setStats({
        societes: 0,
        sites: 0,
        villes: 0,
        operateurs: 0,
        produits: 0,
        inventaires: 0,
      });
    }
  };

  const loadInventaireStatuts = async () => {
    try {
      const res = await axios.get("/api/inventaire/statut-counts");
      const counts = res.data;
      setInventaireStatutData({
        labels: Object.keys(counts),
        datasets: [
          {
            data: Object.values(counts),
            backgroundColor: [
              "#1976d2", "#43a047", "#ffa726", "#e53935", "#8e24aa", "#00838f", "#bdbdbd"
            ],
          },
        ],
      });
    } catch (e) {
      setInventaireStatutData({});
    }
  };

  const loadInventaireTypes = async () => {
    try {
      const res = await axios.get("/api/inventaire/type-counts");
      const counts = res.data;
      setInventaireTypeData({
        labels: Object.keys(counts),
        datasets: [
          {
            data: Object.values(counts),
            backgroundColor: [
              "#1976d2",
              "#43a047",
              "#ffa726",
              "#e53935",
              "#8e24aa",
              "#00838f",
              "#bdbdbd",
            ],
          },
        ],
      });
    } catch (e) {
      setInventaireTypeData({});
    }
  };

  const loadRuptureData = async () => {
    try {
      const res = await axios.get("/api/Produit/rupture-count");
      const counts = res.data;
      setRuptureData({
        labels: ["Rupture", "Stock faible (<10)", "En stock (≥10)"],
        datasets: [
          {
            data: [
              counts.Rupture ?? 0,
              counts.Faible ?? 0,
              counts.EnStock ?? 0
            ],
            backgroundColor: ["#e53935", "#ffa726", "#43a047"],
          },
        ],
      });
    } catch (e) {
      setRuptureData({});
    }
  };

  const loadStockBarData = async () => {
    try {
      const res = await axios.get("/api/Produit/stock-bar");
      const produits = res.data;
      setStockBarData({
        labels: produits.map(p => p.nom || p.Nom),
        datasets: [
          {
            label: "Quantité en stock",
            data: produits.map(p => p.quantite ?? p.Quantite),
            backgroundColor: "#1976d2",
          },
        ],
      });
    } catch (e) {
      setStockBarData({});
    }
  };

  const loadRuptureListData = async () => {
    try {
      const res = await axios.get("/api/Produit/rupture-list");
      setRuptureListData({
        labels: res.data.map(p => p.nom || p.Nom),
        datasets: [{
          data: res.data.map(p => p.quantite ?? p.Quantite ?? 0),
          backgroundColor: [
            "#e53935", "#ffa726", "#43a047", "#8e24aa", "#00838f", "#bdbdbd"
          ],
        }]
      });
    } catch (e) {
      setRuptureListData({});
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/ClientAuth/logout");
      localStorage.removeItem("clientInfo");
      if (onLogout) onLogout();
      window.location.href = "/login"; 
      
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      localStorage.removeItem("clientInfo");
      if (onLogout) onLogout();
      window.location.href = "/login"; 
    }
  };

  const renderDashboard = () => (
    <div className="dashboard-content">
      <PredictiondeStock />
    </div>
  );

  const renderProfile = () => <Profile profile={profile} setProfile={setProfile} />;

  const renderSocietes = () => (
    <GestionSocietes clientId={profile.clientId} />
  );

  const renderVilles = () => (
    <Ville clientId={profile.clientId} />
  );

  const handleAddVille = async (newVille) => {
    try {
      await axios.post("/api/regionville/villes", {
        Nom: newVille.nom,
        RegionId: parseInt(newVille.regionId, 10),
      });
      loadClientData();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la ville:", error);
      setError("Erreur lors de l'ajout de la ville");
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="client-dashboard">
      {/* Navbar horizontale fixe */}
      <header className="dashboard-topbar">
        <div className="topbar-content">
          <div 
            className="topbar-brand" 
            onClick={() => setActiveTab("profile")}
            style={{ cursor: "pointer" }}
          >
            <img src={logo} alt="Logo" className="navbar-logo" />
            <span className="topbar-title">StockPilot</span>
          </div>
          <div className="topbar-user">
            <div 
              className="user-info"
              onClick={() => setActiveTab("profile")}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-user-circle"></i>
              <span className="user-name">
                {profile.clientNom || profile.ClientNom || "Utilisateur"}
              </span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <i className="fas fa-sign-out-alt"></i>
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        {/* Sidebar verticale fixe */}
        <nav className="dashboard-sidebar">
          <ul className="nav-menu">
            {[
              { key: "dashboard", label: "Tableau de bord", icon: "fas fa-tachometer-alt" },
             
              { key: "emplacement", label: "Emplacement", icon: "fas fa-map-marker-alt" },
              { key: "operateur", label: "Ajouter Opérateur", icon: "fas fa-user-plus" },
              { key: "equipe", label: "Équipe", icon: "fas fa-users" },
              { key: "produit", label: "Gestion de Produit", icon: "fas fa-shopping-cart" },
              { key: "inventaire", label: "Inventaire", icon: "fas fa-boxes" },
              { key: "gestion-inventaire", label: "Gestion Inventaire", icon: "fas fa-warehouse" },
            ].map(page => (
              <li key={page.key} className={activeTab === page.key ? "active" : ""}>
                <button onClick={() => setActiveTab(page.key)}>
                  <i className={page.icon}></i>
                  <span>{page.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="dashboard-main">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "profile" && renderProfile()}
          {activeTab === "societes" && renderSocietes()}
          {activeTab === "operateur" && <RegisterOperateur />}
          {activeTab === "equipe" && <EquipeManager />}
          {activeTab === "produit" && (
            <>
              <NavbarProduit active={produitTab} onNavigate={setProduitTab} />
              {produitTab === "creeProduit" && <CreeProduit />}
              {produitTab === "listeProduit" && <ListProduit />}
              {produitTab === "fournisseur" && <Fournisseur />}
              {produitTab === "predictionStock" && <PredictionStock showTable={false} />}
            </>
          )}
          {activeTab === "inventaire" && <CreeInventaire />}
          {activeTab === "emplacement" && (
            <>
              <Navbar active={emplacementTab} onNavigate={setEmplacementTab} />
              {emplacementTab === "villes" && <Ville />}
              {emplacementTab === "societes" && renderSocietes()}
              {emplacementTab === "regions" && <Region />}
              {emplacementTab === "sites" && <Site />}
              {emplacementTab === "zones" && <Zone />}
              {emplacementTab === "allees" && <Allee />}
              {emplacementTab === "rangees" && <Rangee />}
              {emplacementTab === "etages" && <Etage />}
            </>
          )}
          {activeTab === "resultat-operateur" && <ResultaOperateur />}
          {activeTab === "gestion-inventaire" && (
            <GestionInventaireTableau />
          )}
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;