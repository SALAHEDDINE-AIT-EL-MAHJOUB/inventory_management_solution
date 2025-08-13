import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import OperateurNavbar from "./navbar";

const COLORS = ["#27ae60", "#e74c3c"];

const Dashboard = () => {
  const [operateurId, setOperateurId] = useState(null);
  const [stats, setStats] = useState({ realisees: 0, nonRealisees: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/operateur/me")
      .then(res => setOperateurId(res.data.operateurId || res.data.id || res.data.Id))
      .catch(() => setOperateurId(null));
  }, []);

  useEffect(() => {
    if (!operateurId) return;
    setLoading(true);
    axios.get(`/api/operateur/${operateurId}/taches-stats`)
      .then(res => setStats(res.data))
      .finally(() => setLoading(false));
  }, [operateurId]);

  const data = [
    { name: "Tâches réalisées", value: stats.realisees },
    { name: "Tâches non réalisées", value: stats.nonRealisees }
  ];

  return (
    <>
      <OperateurNavbar />
      <div style={{ background: "#f4f7fa", minHeight: "100vh", paddingTop: "40px" }}>
        <h2 style={{ textAlign: "center", color: "#2c3e50" }}>Statistiques des tâches</h2>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "40px" }}>Chargement...</div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <div style={{ width: 350, height: 350, background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(44,62,80,0.08)", padding: 24 }}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {data.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;