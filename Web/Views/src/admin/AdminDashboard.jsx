import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "./Navbar/navbar";
import AdminListView from "./AdminListView";
import AdminRegisterView from "./AdminRegisterView";
import ClientProfile from "./client/ClientProfile";
import CreateClientForm from "./client/CreateClientForm";
import UpdateProfile from "./updateprofile";

const stats = [
  { label: "Utilisateurs", value: 12, color: "#1976d2", icon: "fas fa-users" },
  { label: "Clients", value: 8, color: "#43a047", icon: "fas fa-user-friends" },
  { label: "Admins", value: 4, color: "#fbc02d", icon: "fas fa-user-shield" },
  { label: "Opérateurs", value: 3, color: "#e53935", icon: "fas fa-user-cog" },
];

const cardStyle = {
  flex: "1 1 200px",
  margin: "10px",
  padding: "24px",
  borderRadius: "16px",
  background: "#fff",
  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: 180,
};

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [currentPage, setCurrentPage] = useState("dashboard");

  useEffect(() => {
    const adminInfo = localStorage.getItem("adminInfo");
    if (adminInfo) {
      setAdmin(JSON.parse(adminInfo));
    }
  }, []);

  const handleSelectPage = (page) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <>
            <div
              style={{
                background: "#1976d2",
                color: "#fff",
                padding: "32px 0 24px 40px",
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                boxShadow: "0 4px 24px rgba(25, 118, 210, 0.10)",
                marginLeft: 260,
              }}
            >
              <h1 style={{ margin: 0, fontWeight: 700, fontSize: "2.2rem", letterSpacing: 1 }}>
                Tableau de bord Administrateur
              </h1>
              {admin && (
                <p style={{ margin: "8px 0 0 0", fontSize: "1.1rem" }}>
                  Bienvenue, <strong>{admin.userName || admin.email}</strong> !
                </p>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: -40,
                padding: "0 40px",
                marginLeft: 260,
              }}
            >
              {stats.map((s, i) => (
                <div key={i} style={{ ...cardStyle, borderTop: `4px solid ${s.color}` }}>
                  <i className={s.icon} style={{ fontSize: 32, color: s.color, marginBottom: 12 }}></i>
                  <div style={{ fontSize: 28, fontWeight: 700 }}>{s.value}</div>
                  <div style={{ color: "#888", fontSize: 16, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </>
        );
      case "list":
        return (
          <div style={{ marginLeft: 260, padding: 40 }}>
            <AdminListView />
          </div>
        );
      case "register":
        return (
          <div style={{ marginLeft: 260, padding: 40 }}>
            <AdminRegisterView />
          </div>
        );
      case "client":
        return (
          <div style={{ marginLeft: 260, padding: 40 }}>
            <ClientProfile />
          </div>
        );
      case "createclient":
        return (
          <div style={{ marginLeft: 260, padding: 40 }}>
            <CreateClientForm />
          </div>
        );
      case "updateprofile":
        return (
          <div style={{ marginLeft: 260, padding: 40 }}>
            <UpdateProfile />
          </div>
        );
      default:
        return (
          <div style={{ marginLeft: 260, padding: 40 }}>
            <h2>Page non trouvée</h2>
          </div>
        );
    }
  };

  return (
    <div style={{ background: "#f4f6fa", minHeight: "100vh", padding: 0 }}>
      <PrimarySearchAppBar onSelectPage={handleSelectPage} />
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;