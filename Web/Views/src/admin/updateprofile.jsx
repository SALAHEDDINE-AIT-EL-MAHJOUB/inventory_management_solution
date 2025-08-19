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

  const handleChange = e => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = e => {
    setNewPassword(e.target.value);
  };

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
        background: "#f5f7fa",
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
        <Card sx={{
          minWidth: 400,
          maxWidth: 500,
          width: "100%",
          boxShadow: 6,
          borderRadius: 4,
          mb: 3,
          background: "#fff",
          border: "1px solid #e3eaf3"
        }}>
          <CardHeader
            avatar={
              <Box
                sx={{
                  background: "#1976d2",
                  borderRadius: "50%",
                  width: 56,
                  height: 56,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.10)",
                  mr: 2
                }}
              >
                <i className="fas fa-user-shield" style={{ color: "#fff", fontSize: 28 }}></i>
              </Box>
            }
            title={
              <span style={{
                color: "#1976d2",
                fontWeight: 700,
                fontSize: "1.2rem",
                letterSpacing: "0.5px"
              }}>
                Mon profil
              </span>
            }
          />
          <CardContent>
            <Typography variant="subtitle1" sx={{ color: "#1976d2" }}>
              <i className="fas fa-user" style={{ color: "#42a5f5", marginRight: 8 }}></i>
              <b>Nom :</b> {admin.adminName}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#1976d2" }}>
              <i className="fas fa-envelope" style={{ color: "#42a5f5", marginRight: 8 }}></i>
              <b>Email :</b> {admin.email}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#1976d2" }}>
              <i className="fas fa-user-tag" style={{ color: "#42a5f5", marginRight: 8 }}></i>
              <b>Nom d'utilisateur :</b> {admin.userName}
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                color: "#fff",
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(25, 118, 210, 0.10)",
                '&:hover': {
                  background: "linear-gradient(135deg, #1565c0 0%, #1976d2 100%)"
                }
              }}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Annuler" : "Modifier"}
            </Button>
          </CardContent>
        </Card>

        {/* Formulaire de modification */}
        {editMode && (
          <Card sx={{
            minWidth: 400,
            maxWidth: 500,
            width: "100%",
            boxShadow: 6,
            borderRadius: 4,
            background: "#fff",
            border: "1px solid #e3eaf3"
          }}>
            <CardHeader
              avatar={
                <Box
                  sx={{
                    background: "#1976d2",
                    borderRadius: "50%",
                    width: 56,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.10)",
                    mr: 2
                  }}
                >
                  <i className="fas fa-user-edit" style={{ color: "#fff", fontSize: 26 }}></i>
                </Box>
              }
              title={
                <span style={{
                  color: "#1976d2",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  letterSpacing: "0.5px"
                }}>
                  Modifier mon profil
                </span>
              }
            />
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  label={
                    <span>
                      <i className="fas fa-user" style={{ color: "#42a5f5", marginRight: 8 }}></i>
                      Nom
                    </span>
                  }
                  name="adminName"
                  value={admin.adminName}
                  onChange={handleChange}
                  required
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: { color: "#1976d2", background: "#f5f7fa", borderRadius: 8 }
                  }}
                />
                <TextField
                  label={
                    <span>
                      <i className="fas fa-user-tag" style={{ color: "#42a5f5", marginRight: 8 }}></i>
                      Nom d'utilisateur
                    </span>
                  }
                  name="userName"
                  value={admin.userName}
                  onChange={e => setAdmin({ ...admin, userName: e.target.value })}
                  required
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: { color: "#1976d2", background: "#f5f7fa", borderRadius: 8 }
                  }}
                />
                <TextField
                  label={
                    <span>
                      <i className="fas fa-envelope" style={{ color: "#42a5f5", marginRight: 8 }}></i>
                      Email
                    </span>
                  }
                  name="email"
                  type="email"
                  value={admin.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: { color: "#1976d2", background: "#f5f7fa", borderRadius: 8 }
                  }}
                />
                <TextField
                  label={
                    <span>
                      <i className="fas fa-lock" style={{ color: "#42a5f5", marginRight: 8 }}></i>
                      Nouveau mot de passe
                    </span>
                  }
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  fullWidth
                  margin="normal"
                  helperText="Laisser vide pour ne pas changer"
                  disabled
                  InputProps={{
                    style: { color: "#1976d2", background: "#f5f7fa", borderRadius: 8 }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    width: "100%",
                    background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                    color: "#fff",
                    fontWeight: 700,
                    borderRadius: 2,
                    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.10)",
                    '&:hover': {
                      background: "linear-gradient(135deg, #1565c0 0%, #1976d2 100%)"
                    }
                  }}
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