import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, RadialBarChart, RadialBar, CartesianGrid, XAxis, YAxis
} from "recharts";
import OperateurNavbar from "./navbar";

const DashboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  </svg>
);

const InventoryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
  </svg>
);

const ProductIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A3,3 0 0,1 15,5V7H22V9H15V19A3,3 0 0,1 12,22A3,3 0 0,1 9,19V9H2V7H9V5A3,3 0 0,1 12,2M11,8V18H13V8H11Z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

const DoubleCheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
  </svg>
);

const Dashboard = () => {
  const [operateur, setOperateur] = useState(null);
  const [stats, setStats] = useState({
    totalProduits: 0,
    produitsInventories: 0,
    doubleInventaire: 0,
    progression: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch operator info
        const operateurRes = await axios.get("/api/operateur/me");
        setOperateur(operateurRes.data);

        // Fetch dashboard stats
        const id = operateurRes.data.id || operateurRes.data._id || operateurRes.data.operateurId;
        const [produitsRes, doubleRes] = await Promise.all([
          axios.get(`/api/operateur/${id}/produits-inventaire`).catch(() => ({ data: [] })),
          axios.get(`/api/operateur/${id}/double-inventaire`).catch(() => ({ data: [] }))
        ]);

        const produits = produitsRes.data || [];
        const doubleProduits = doubleRes.data || [];
        const totalProduits = produits.length;
        const produitsInventories = produits.filter(p => 
          p.quantiteInventaire !== null && p.quantiteInventaire !== undefined
        ).length;
        const progression = totalProduits > 0 ? Math.round((produitsInventories / totalProduits) * 100) : 0;

        setStats({
          totalProduits,
          produitsInventories,
          doubleInventaire: doubleProduits.length,
          progression
        });
      } catch (error) {
        console.error("Erreur lors du chargement du dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <OperateurNavbar />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #8d6e63',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p>Chargement du dashboard...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <OperateurNavbar />
      <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: '#8d6e63', marginBottom: '0.5rem' }}>
            <DashboardIcon /> Tableau de bord - {operateur?.nom || "Opérateur"}
          </h1>
          <p style={{ color: '#666', margin: 0 }}>Vue d'ensemble de votre activité d'inventaire</p>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <ProductIcon />
              <h3 style={{ margin: 0, color: '#8d6e63' }}>Total Produits</h3>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
              {stats.totalProduits}
            </div>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Produits assignés</p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <CheckIcon />
              <h3 style={{ margin: 0, color: '#4caf50' }}>Inventoriés</h3>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
              {stats.produitsInventories}
            </div>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
              {stats.progression}% complété
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <DoubleCheckIcon />
              <h3 style={{ margin: 0, color: '#ff9800' }}>Double Inventaire</h3>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
              {stats.doubleInventaire}
            </div>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Vérifications</p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <InventoryIcon />
              <h3 style={{ margin: 0, color: '#2196f3' }}>Progression</h3>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
              {stats.progression}%
            </div>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Taux de completion</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#8d6e63' }}>Progression de l'inventaire</h3>
          <div style={{
            width: '100%',
            height: '20px',
            backgroundColor: '#e0e0e0',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${stats.progression}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #4caf50, #8bc34a)',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
            {stats.produitsInventories} sur {stats.totalProduits} produits inventoriés
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;