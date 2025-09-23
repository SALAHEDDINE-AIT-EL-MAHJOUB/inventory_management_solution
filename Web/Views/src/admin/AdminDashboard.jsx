import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "./Navbar/navbar";
import AdminListView from "./AdminListView";
import AdminRegisterView from "./AdminRegisterView";
import ClientProfile from "./client/ClientProfile";
import CreateClientForm from "./client/CreateClientForm";
import UpdateProfile from "./updateprofile";
import ChartWidgets from "./ChartWidgets";

// Material Icons (JSX) instead of emojis / font-awesome class names
import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BuildIcon from "@mui/icons-material/Build";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InventoryIcon from "@mui/icons-material/Inventory";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

const stats = [
  { label: "Utilisateurs", value: 12, color: "#1976d2", Icon: PeopleIcon },
  { label: "Clients", value: 8, color: "#43a047", Icon: GroupIcon },
  { label: "Admins", value: 4, color: "#fbc02d", Icon: AdminPanelSettingsIcon },
  { label: "Opérateurs", value: 3, color: "#e53935", Icon: BuildIcon },
];

const recentActivities = [
  {
    id: 1,
    title: "Nouveau client ajouté",
    description: "Il y a 2 heures",
    icon: PersonAddIcon,
    color: "#1976d2",
    bgColor: "#e3f2fd"
  },
  {
    id: 2,
    title: "Mise à jour des stocks",
    description: "Il y a 5 heures",
    icon: InventoryIcon,
    color: "#43a047",
    bgColor: "#e8f5e8"
  },
  {
    id: 3,
    title: "Nouvel admin ajouté",
    description: "Il y a 1 jour",
    icon: AdminPanelSettingsOutlinedIcon,
    color: "#fbc02d",
    bgColor: "#fffde7"
  }
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
              {/* En-tête : titre simple */}
              <h2 style={{ color: "#fff", margin: 0, paddingTop: 8 }}>Tableau de bord</h2>
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
              {stats.map((s, i) => {
                const Icon = s.Icon;
                return (
                  <div key={i} style={{ ...cardStyle, borderTop: `4px solid ${s.color}` }}>
                    <Icon style={{ fontSize: 32, color: s.color, marginBottom: 12 }} />
                    <div style={{ fontSize: 28, fontWeight: 700 }}>{s.value}</div>
                    <div style={{ color: "#888", fontSize: 16, marginTop: 4 }}>{s.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Diagrammes légers */}
            <div style={{ marginLeft: 260, padding: "0 40px" }}>
              <ChartWidgets />
            </div>

            {/* Section Activités récentes */}
            <div style={{ marginLeft: 260, padding: "20px 40px 40px 40px" }}>
              <div style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)"
              }}>
                <h3 style={{
                  margin: "0 0 20px 0",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#333"
                }}>
                  Activités récentes
                </h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "16px",
                        borderRadius: "12px",
                        background: "#f8f9fa",
                        border: "1px solid #e9ecef",
                        transition: "all 0.2s ease",
                        cursor: "pointer"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#f1f3f4";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#f8f9fa";
                        e.target.style.transform = "translateY(0)";
                      }}
                      >
                        <div style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          background: activity.bgColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "16px"
                        }}>
                          <Icon style={{ fontSize: 24, color: activity.color }} />
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "#333",
                            marginBottom: "4px"
                          }}>
                            {activity.title}
                          </div>
                          <div style={{
                            fontSize: "14px",
                            color: "#666"
                          }}>
                            {activity.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
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