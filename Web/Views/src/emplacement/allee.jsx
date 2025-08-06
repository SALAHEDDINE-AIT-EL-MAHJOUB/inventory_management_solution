import React, { useState, useEffect } from "react";
import axios from "axios";

const AlleeForm = () => {
  const [zones, setZones] = useState([]);
  const [selectedZoneId, setSelectedZoneId] = useState("");
  const [alleeNom, setAlleeNom] = useState("");
  const [message, setMessage] = useState("");
  const [loadingZones, setLoadingZones] = useState(true);
  const [allees, setAllees] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios
      .get("/api/Zone")
      .then((res) => setZones(res.data))
      .finally(() => setLoadingZones(false));
  }, []);

  const fetchAllees = async () => {
    const res = await axios.get("/api/Allee");
    setAllees(res.data);
  };

  useEffect(() => {
    fetchAllees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post("/api/Allee", {
        alleeNom,
        alleeZoneId: selectedZoneId,
      });
      setAlleeNom("");
      setSelectedZoneId("");
      setMessage("Allée ajoutée !");
      fetchAllees();
      setShowForm(false);
    } catch {
      setMessage("Erreur lors de la création de l'allée.");
    }
  };

  const handleDelete = async (alleeId) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette allée ?")) return;
    try {
      await axios.delete(`/api/Allee/${alleeId}`);
      setMessage("Allée supprimée !");
      fetchAllees();
    } catch {
      setMessage("Erreur lors de la suppression.");
    }
  };

  // Réinitialise le message à l'ouverture du formulaire
  const handleShowForm = () => {
    setShowForm((prev) => !prev);
    setMessage("");
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
      }}
    >
      <button
        onClick={handleShowForm}
        style={{
          background: "#2980d9",
          color: "#fff",
          border: "none",
          padding: "10px 24px",
          borderRadius: 4,
          fontSize: 16,
          cursor: "pointer",
          marginBottom: 24,
        }}
      >
        {showForm ? "Fermer le formulaire" : "Créer une allée"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#f8f9fa",
            padding: 24,
            borderRadius: 8,
            boxShadow: "0 2px 8px #0001",
            marginBottom: 32,
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="alleeNom"
              style={{
                display: "block",
                marginBottom: 6,
                fontWeight: 500,
              }}
            >
              Nom de l'allée :
            </label>
            <input
              id="alleeNom"
              type="text"
              value={alleeNom}
              onChange={(e) => {
                setAlleeNom(e.target.value);
                setMessage("");
              }}
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ccc",
                fontSize: 16,
              }}
              required
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="zoneSelect"
              style={{
                display: "block",
                marginBottom: 6,
                fontWeight: 500,
              }}
            >
              Zone :
            </label>
            {loadingZones ? (
              <span>Chargement des zones...</span>
            ) : (
              <select
                id="zoneSelect"
                value={selectedZoneId}
                onChange={(e) => {
                  setSelectedZoneId(e.target.value);
                  setMessage("");
                }}
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 4,
                  border: "1px solid #ccc",
                  fontSize: 16,
                }}
                required
              >
                <option value="">Sélectionnez une zone</option>
                {zones.map((zone) => (
                  <option key={zone.zoneId} value={zone.zoneId}>
                    {zone.zoneNom}
                  </option>
                ))}
              </select>
            )}
          </div>
          <button
            type="submit"
            disabled={loadingZones}
            style={{
              background: "#2980d9",
              color: "#fff",
              border: "none",
              padding: "10px 24px",
              borderRadius: 4,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Créer
          </button>
          {message && (
            <p
              style={{
                marginTop: 16,
                color:
                  message.includes("ajoutée") || message.includes("supprimée")
                    ? "green"
                    : "red",
              }}
            >
              {message}
            </p>
          )}
        </form>
      )}

      {allees.length > 0 && (
        <div>
          <h3 style={{ color: "#2c3e50" }}>Liste des allées</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#fff",
            }}
          >
            <thead>
              <tr style={{ background: "#e9ecef" }}>
                <th style={{ padding: 10, border: "1px solid #ddd" }}>ID</th>
                <th style={{ padding: 10, border: "1px solid #ddd" }}>Nom</th>
                <th style={{ padding: 10, border: "1px solid #ddd" }}>Zone ID</th>
                <th style={{ padding: 10, border: "1px solid #ddd" }}>Nom de la zone</th>
                <th style={{ padding: 10, border: "1px solid #ddd" }}>Nom du site</th>
                <th style={{ padding: 10, border: "1px solid #ddd" }}>Nom société</th>
                <th style={{ padding: 10, border: "1px solid #ddd" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allees.map((allee) => (
                <tr key={allee.alleeId}>
                  <td style={{ padding: 10, border: "1px solid #eee" }}>
                    {allee.alleeId}
                  </td>
                  <td style={{ padding: 10, border: "1px solid #eee" }}>
                    {allee.alleeNom}
                  </td>
                  <td style={{ padding: 10, border: "1px solid #eee" }}>
                    {allee.alleeZoneId}
                  </td>
                  <td style={{ padding: 10, border: "1px solid #eee" }}>
                    {allee.zoneNom ||
                      (allee.alleeZone ? allee.alleeZone.zoneNom : "—")}
                  </td>
                  <td style={{ padding: 10, border: "1px solid #eee" }}>
                    {allee.siteNom ||
                      (allee.alleeZone &&
                      allee.alleeZone.zoneSite
                        ? allee.alleeZone.zoneSite.siteNom
                        : "—")}
                  </td>
                  <td style={{ padding: 10, border: "1px solid #eee" }}>
                    {allee.societeNom ||
                      (allee.alleeZone &&
                      allee.alleeZone.zoneSite &&
                      allee.alleeZone.zoneSite.societe
                        ? allee.alleeZone.zoneSite.societe.nom
                        : "—")}
                  </td>
                  <td style={{ padding: 10, border: "1px solid #eee" }}>
                    <button
                      style={{
                        background: "#e74c3c",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "6px 12px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(allee.alleeId)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AlleeForm;