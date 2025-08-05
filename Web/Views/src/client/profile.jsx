import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ clientNom: "", phone: "", adress: "", email: "" });
  const [message, setMessage] = useState("");

  // Fonction pour charger le profil depuis le localStorage
  const loadProfile = (cb) => {
    const savedClientInfo = localStorage.getItem("clientInfo");
    if (savedClientInfo) {
      try {
        const parsed = JSON.parse(savedClientInfo);
        const clientData = parsed.Client || parsed.client;
        if (clientData) {
          setProfile(normalizeClient(clientData));
          setForm(normalizeClient(clientData));
          setLoading(false);
          if (cb) cb();
          return;
        }
      } catch (e) {
        // JSON mal formé
      }
    }
    // Si pas de données, on met à jour l'état pour afficher "inconnu"
    setProfile({});
    setForm({ clientNom: "", phone: "", adress: "", email: "" });
    setLoading(false);
    if (cb) cb();
  };

  // Convertit les propriétés de l'API en camelCase pour le front
  function normalizeClient(apiClient) {
    if (!apiClient) return {};
    return {
      clientNom: apiClient.ClientNom || apiClient.clientNom || "",
      phone: apiClient.Phone || apiClient.phone || "",
      adress: apiClient.Adress || apiClient.adress || "",
      email: apiClient.Email || apiClient.email || "",
    };
  }

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setForm({
      clientNom: profile.clientNom || "",
      phone: profile.phone || "",
      adress: profile.adress || "",
      email: profile.email || "",
    });
    setMessage("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    try {
      const updateData = {
        Email: form.email,
        ClientNom: form.clientNom,
        Phone: form.phone,
        Adress: form.adress,
      };
      const res = await axios.put("/api/Profil/update", updateData);
      if (res.data && res.data.Client) {
        // Mise à jour du localStorage
        const savedClientInfo = localStorage.getItem("clientInfo");
        let parsed = {};
        if (savedClientInfo) {
          parsed = JSON.parse(savedClientInfo);
        }
        parsed.Client = res.data.Client;
        localStorage.setItem("clientInfo", JSON.stringify(parsed));
        window.dispatchEvent(new Event("clientInfoUpdated"));

        // Déconnexion : suppression du token et des infos client
        localStorage.removeItem("token"); // adapte le nom si besoin
        localStorage.removeItem("clientInfo");

        setMessage("Profil mis à jour ! Déconnexion puis reconnexion en cours...");
        setIsEditing(false);
        setLoading(false);

        // Reconnexion automatique (exemple : suppose que tu as un endpoint /api/login)
        // Utilise les nouvelles infos du formulaire
        setTimeout(async () => {
          try {
            const loginRes = await axios.post("/api/login", {
              email: form.email,
              // Ajoute le mot de passe si nécessaire
              // password: form.password
            });
            if (loginRes.data && loginRes.data.token) {
              localStorage.setItem("token", loginRes.data.token);
              // Recharge le profil ou recharge la page
              window.location.reload();
            } else {
              setMessage("Reconnexion impossible. Veuillez vous reconnecter manuellement.");
            }
          } catch (e) {
            setMessage("Erreur lors de la reconnexion. Veuillez vous reconnecter.");
          }
        }, 1500);

        return;
      }
    } catch (err) {
      setMessage("Erreur lors de la mise à jour");
    }
    setLoading(false);
  };

  if (loading) return <div className="profile-loading">Chargement du profil...</div>;

  // Avatar: première lettre du nom ou "?"
  const avatarLetter = isEditing
    ? (form.clientNom ? form.clientNom.charAt(0).toUpperCase() : "?")
    : (profile.clientNom ? profile.clientNom.charAt(0).toUpperCase() : "?");

  return (
    <div className="profile-container">
      <div className="profile-avatar">
        <span>{avatarLetter}</span>
      </div>
      <div className="profile-main-info">
        <div className="profile-name">
          {isEditing
            ? form.clientNom || "Nom inconnu"
            : profile.clientNom || "Nom inconnu"}
        </div>
        <div className="profile-email">
          {isEditing
            ? form.email || "Email inconnu"
            : profile.email || "Email inconnu"}
        </div>
      </div>
      {!isEditing ? (
        <div className="profile-actions" style={{ justifyContent: "center" }}>
          <button className="btn btn-primary" type="button" onClick={handleEdit}>
            Modifier
          </button>
        </div>
      ) : (
        <div className="profile-content">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="info-group">
              <label>Nom du client:</label>
              <input
                type="text"
                name="clientNom"
                value={form.clientNom}
                onChange={handleChange}
                className="profile-input"
                required
              />
            </div>
            <div className="info-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="profile-input"
                required
              />
            </div>
            <div className="info-group">
              <label>Téléphone:</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="profile-input"
              />
            </div>
            <div className="info-group">
              <label>Adresse:</label>
              <input
                type="text"
                name="adress"
                value={form.adress}
                onChange={handleChange}
                className="profile-input"
              />
            </div>
            <div className="profile-actions">
              <button className="btn btn-success" type="submit" disabled={loading}>
                Enregistrer
              </button>
              <button className="btn btn-secondary" type="button" onClick={handleCancel}>
                Annuler
              </button>
            </div>
          </form>
          {message && <div className="profile-message">{message}</div>}
        </div>
      )}
    </div>
  );
};

export default Profile;