import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './Home/Home';
import AdminRegisterPage from './login/admin';
import UpdateProfile from './admin/updateprofile';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/updateprofile" element={<UpdateProfile />} />
        <Route path="/admin-register" element={<AdminRegisterPage />} />
      </Routes>
      <Link to="/admin-register">Inscription Admin</Link>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);