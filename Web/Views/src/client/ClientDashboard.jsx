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

import { FaTachometerAlt, FaUser, FaShoppingCart, FaBuilding, FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";

const ClientDashboard = ({ clientInfo, onLogout }) => {
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState(clientInfo?.Client || {});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [emplacementTab, setEmplacementTab] = useState("societes"); // Ajout pour la sous-navbar
  const [error, setError] = useState("");

  useEffect(() => {
    loadClientData();
  }, []);

  const loadClientData = async () => {
    setLoading(true);
    setError("");
    try {
      // Charger le profil client à jour - utiliser le nouveau endpoint
      const response = await axios.get("/api/Profil/me");
      // Correction ici : utiliser directement response.data
      if (response.data && (response.data.clientNom || response.data.ClientNom)) {
        setProfile(response.data);
      }
      
      // Charger les commandes (à implémenter selon votre logique)
      // const ordersResponse = await axios.get("/api/Client/orders");
      // setOrders(ordersResponse.data);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      setError("Erreur lors du chargement des données");
      // En cas d'erreur, utiliser les données du localStorage
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

  const handleLogout = async () => {
    try {
      await axios.post("/api/ClientAuth/logout");
      localStorage.removeItem("clientInfo");
      if (onLogout) onLogout();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      // Déconnexion locale même en cas d'erreur
      localStorage.removeItem("clientInfo");
      if (onLogout) onLogout();
    }
  };

  const renderDashboard = () => (
    <div className="dashboard-content">
      <h3>Tableau de bord</h3>
      {error && <div className="error-message">{error}</div>}
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h4>Mes Commandes</h4>
          <div className="card-value">{orders.length}</div>
          <p>Commandes totales</p>
        </div>
        <div className="dashboard-card">
          <h4>Statut du Compte</h4>
          <div className={`card-value ${profile.IsActive ? 'active' : 'inactive'}`}>
            {profile.IsActive ? 'Actif' : 'Inactif'}
          </div>
          <p>Statut actuel</p>
        </div>
        <div className="dashboard-card">
          <h4>Profil</h4>
          <div className="card-value">✓</div>
          <p>Profil complet</p>
        </div>
      </div>
      
      
    </div>
  );

  const renderProfile = () => <Profile profile={profile} setProfile={setProfile} />;

  const renderOrders = () => (
    <div className="orders-content">
      <h3>Mes Commandes</h3>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>Aucune commande pour le moment</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-item">
              <div className="order-info">
                <h4>Commande #{order.id}</h4>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p>Statut: {order.status}</p>
              </div>
              <div className="order-total">
                {order.total}€
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

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
      // Recharger les données après ajout
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
      {/* Navbar horizontale */}
      <header className="dashboard-topbar">
        <div className="topbar-content">
          <span className="topbar-title">{""}</span>
          <div className="topbar-user">
            <FaUserCircle
              size={24}
              style={{ marginRight: 6, cursor: "pointer" }}
              onClick={() => setActiveTab("profile")}
            />
            <button onClick={handleLogout} className="logout-btn">
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        {/* Sidebar verticale */}
        <nav className="dashboard-sidebar">
          <ul className="nav-menu">
            {[
              { key: "dashboard", label: "Tableau de bord", icon: <FaTachometerAlt /> },
              { key: "orders", label: "Commandes", icon: <FaShoppingCart /> },
              { key: "societes", label: "Sociétés", icon: <FaBuilding /> },
              { key: "emplacement", label: "Emplacement", icon: <FaMapMarkerAlt /> }
            ].map(page => (
              <li key={page.key} className={activeTab === page.key ? "active" : ""}>
                <button onClick={() => setActiveTab(page.key)}>
                  {page.icon}
                  {page.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="dashboard-main">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "profile" && renderProfile()}
          {activeTab === "orders" && renderOrders()}
          {activeTab === "societes" && renderSocietes()}

          {/* Affichage de la navbar d'emplacement et des composants associés */}
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
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;