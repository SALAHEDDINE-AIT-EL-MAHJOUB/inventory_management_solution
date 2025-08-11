import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './Home/Home';
import AdminRegisterPage from './login/admin';
import UpdateProfile from './admin/updateprofile';
import ClientApp from './client/ClientApp';
import ClientDashboard from './client/ClientDashboard';
import AdminDashboard from './admin/AdminDashboard';
import LoginPage from './login/LoginPage';
import OperateurDashboard from './operateur/operateurDashbord'; // Ajoutez cette ligne

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/updateprofile" element={<UpdateProfile />} />
        <Route path="/admin-register" element={<AdminRegisterPage />} />
        <Route path="/client" element={<ClientApp />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/operateur/dashboard" element={<OperateurDashboard />} /> {/* Ajoutez cette ligne */}
      </Routes>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Link to="/admin-register" style={{ margin: '0 10px' }}>login</Link>
        
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);