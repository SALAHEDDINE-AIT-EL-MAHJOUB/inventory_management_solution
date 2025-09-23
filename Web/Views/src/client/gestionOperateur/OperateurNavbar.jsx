import React from "react";

const AddUserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
  </svg>
);

const OperateurNavbar = ({ activeTab, setActiveTab }) => (
  <>
    <style>{`
      .operateur-navbar {
        display: flex;
        gap: 18px;
        margin-bottom: 32px;
        justify-content: flex-start;
        flex-wrap: wrap;
      }
      
      .operateur-nav-btn {
        background: linear-gradient(135deg, #49546a 0%, #3d4a5c 100%);
        color: #fff;
        border: none;
        border-radius: 25px;
        padding: 12px 28px;
        font-weight: 600;
        font-size: 0.95rem;
        outline: none;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(73, 84, 106, 0.2);
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .operateur-nav-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
      }
      
      .operateur-nav-btn:hover::before {
        left: 100%;
      }
      
      .operateur-nav-btn.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
        transform: translateY(-2px);
      }
      
      .operateur-nav-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(73, 84, 106, 0.3);
      }
      
      .operateur-nav-btn.active:hover {
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
      }
    `}</style>
    
    <div className="operateur-navbar">
      <button
        onClick={() => setActiveTab("ajouter")}
        className={`operateur-nav-btn ${activeTab === "ajouter" ? "active" : ""}`}
      >
        <AddUserIcon />
        Ajouter un opérateur
      </button>
      <button
        onClick={() => setActiveTab("liste")}
        className={`operateur-nav-btn ${activeTab === "liste" ? "active" : ""}`}
      >
        <ListIcon />
        Liste des opérateurs
      </button>
    </div>
  </>
);

export default OperateurNavbar;