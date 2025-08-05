import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "../admin/Navbar/navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const UpdateProfile = ({ onSelectPage }) => {
  const [admin, setAdmin] = useState({ adminName: "", email: "", userName: "" });
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  // Charger le profil actuel
  useEffect(() => {
    fetch("/api/admin/me", {
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur de chargement du profil");
        return res.json();
      })
      .then(data => {
        setAdmin({
          adminName: data.adminName || "",
          email: data.email || "",
          userName: data.user?.userName || ""
        });
        setLoading(false);
      })
      .catch(() => {
        setMessage("Impossible de charger le profil.");
        setLoading(false);
      });
  }, []);

  // Gérer la modification des champs
  const handleChange = e => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = e => {
    setNewPassword(e.target.value);
  };

  // Soumettre la modification
  const handleSubmit = e => {
    e.preventDefault();
    setMessage("");
    fetch("/api/admin/me", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adminName: admin.adminName,
        email: admin.email,
        user: { userName: admin.userName }
      })
    })
      .then(res => {
        if (res.ok) {
          setMessage("Profil mis à jour !");
          setEditMode(false);
        }
        else throw new Error();
      })
      .catch(() => setMessage("Erreur lors de la mise à jour."));
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div
      style={{
        paddingLeft: 0,
        background: "#eaeef6",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <PrimarySearchAppBar onSelectPage={onSelectPage} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "calc(100vh - 80px)",
          pt: 8,
        }}
      >
        {/* Profil affiché */}
        <Card sx={{ minWidth: 400, maxWidth: 500, width: "100%", boxShadow: 6, borderRadius: 4, mb: 3 }}>
          <CardHeader title="Mon profil" />
          <CardContent>
            <Typography variant="subtitle1"><b>Nom :</b> {admin.adminName}</Typography>
             <Typography variant="subtitle1"><b>Email :</b> {admin.email}</Typography>
             <Typography variant="subtitle1"><b>Nom d'utilisateur :</b> {admin.userName}</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Annuler" : "Modifier"}
            </Button>
          </CardContent>
        </Card>

        {/* Formulaire de modification */}
        {editMode && (
          <Card sx={{ minWidth: 400, maxWidth: 500, width: "100%", boxShadow: 6, borderRadius: 4 }}>
            <CardHeader title="Modifier mon profil" />
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Nom"
                  name="adminName"
                  value={admin.adminName}
                  onChange={handleChange}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Nom d'utilisateur"
                  name="userName"
                  value={admin.userName}
                  onChange={e => setAdmin({ ...admin, userName: e.target.value })}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={admin.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Nouveau mot de passe"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  fullWidth
                  margin="normal"
                  helperText="Laisser vide pour ne pas changer"
                  disabled
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, width: "100%" }}
                >
                  Enregistrer
                </Button>
              </form>
              {message && (
                <Box mt={2} color={message.includes("Erreur") ? "error.main" : "success.main"}>
                  {message}
                </Box>
              )}
            </CardContent>
          </Card>
        )}
        {!editMode && message && (
          <Box mt={2} color={message.includes("Erreur") ? "error.main" : "success.main"}>
            {message}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default UpdateProfile;