import React, { useState, useEffect } from "react";
import AdminListView from "../admin/AdminListView";
import AdminRegisterView from "../admin/AdminRegisterView";
import Login from "../admin/Login";
import PrimarySearchAppBar from "../admin/Navbar/navbar";
import UpdateProfile from "../admin/updateprofile";
import ClientProfile from "../admin/client/ClientProfile";
import CreateClientForm from "../admin/client/CreateClientForm";
import AdminDashboard from "../admin/AdminDashboard";

export default function AdminMainView() {
  const [page, setPage] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const adminUserId = "1"; // Remplace par l'ID utilisateur admin réel

  useEffect(() => {
    // Vérifie la connexion côté serveur
    fetch("/api/admin/me", { credentials: "include" })
      .then((res) => setIsLoggedIn(res.ok))
      .catch(() => setIsLoggedIn(false));
  }, []);

  if (isLoggedIn === null) return <div>Chargement...</div>;
 if (!isLoggedIn) {
  return <Login onLoginSuccess={() => setIsLoggedIn(true)} onRedirect={() => {}} />;
}

  return (
    <>
      <PrimarySearchAppBar onSelectPage={setPage} />
      <div
        style={{
          paddingLeft: 260,
          background: "#eaeef6",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            margin: "0 24px 0 0",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            padding: "32px 40px",
            minHeight: "calc(100vh - 120px)",
          }}
        >
          {page === "dashboard" && <AdminDashboard />}
          {page === "list" && <AdminListView />}
          {page === "register" && <AdminRegisterView />}
          {page === "updateprofile" && <UpdateProfile onSelectPage={setPage} />}
          {page === "client" && <ClientProfile />}
          {page === "createclient" && (
            <CreateClientForm
              adminUserId={adminUserId}
              onClientCreated={() => setPage("list")}
            />
          )}
        </div>
      </div>
    </>
  );
}