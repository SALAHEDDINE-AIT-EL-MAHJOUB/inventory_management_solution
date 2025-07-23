import React from 'react';
import { createRoot } from 'react-dom/client';
import PrimarySearchAppBar from './Navbar/navbar';
import Home from './Home/Home';

function App() {
  return (
    <>
      <PrimarySearchAppBar />
      <Home />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);