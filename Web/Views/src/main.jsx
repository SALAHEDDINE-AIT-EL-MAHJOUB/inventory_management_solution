import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

import Home from './Home/Home';
import AdminRegisterPage from './login/admin';
import UpdateProfile from './admin/updateprofile';
import ClientApp from './client/ClientApp';
import ClientDashboard from './client/ClientDashboard';
import AdminDashboard from './admin/AdminDashboard';
import LoginPage from './login/LoginPage';
import OperateurDashboard from './operateur/operateurDashbord';
import GestionProduit from './operateur/GestionProduit';
import ResultaOperateur from './client/gestionOperateur/resultaOperateur'; 
import GestionInventaireTableau from './client/inventaire/gestioninventaire';
import CreeInventaire from './client/inventaire/creeInventaire';
import Profil from './operateur/profil'; // Correction du chemin d'import
import DoubleInventaire from './operateur/doubleinventaire'; // Ajout de l'import
import Dashboard from "./operateur/Dashboard";

function App() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/updateprofile" element={<UpdateProfile />} />
        <Route path="/admin-register" element={<AdminRegisterPage />} />
        <Route path="/client" element={<ClientApp />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/operateur/dashboard" element={<Dashboard />} />
        <Route path="/operateur/produits" element={<GestionProduit />} />
        <Route path="/operateur/profil" element={<Profil />} />
        <Route path="/operateur/resultats" element={<ResultaOperateur />} />
        <Route path="/gestioninventaire" element={<GestionInventaireTableau />} />
        <Route path="/creeinventaire" element={<CreeInventaire />} />
        <Route path="/operateur/doubleinventaire" element={<DoubleInventaire />} />
        {/* <Route path="/operateur/inventaires" element={<Inventaires />} /> */}
      </Routes>
      {/* Affiche le lien login uniquement sur la page d'accueil */}
      {location.pathname === "/" && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Link to="/login" style={{ margin: '0 10px' }}>login</Link>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);