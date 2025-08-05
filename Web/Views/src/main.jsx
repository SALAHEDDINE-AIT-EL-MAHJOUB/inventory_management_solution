import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './Home/Home';
import AdminRegisterPage from './login/admin';
import UpdateProfile from './admin/updateprofile';
import ClientApp from './client/ClientApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/updateprofile" element={<UpdateProfile />} />
        <Route path="/admin-register" element={<AdminRegisterPage />} />
        <Route path="/client" element={<ClientApp />} />
      </Routes>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Link to="/admin-register" style={{ margin: '0 10px' }}>Inscription Admin</Link>
        <Link to="/client" style={{ margin: '0 10px' }}>Espace Client</Link>
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);