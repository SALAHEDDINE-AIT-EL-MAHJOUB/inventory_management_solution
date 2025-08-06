import React, { useEffect, useState } from "react";
import axios from "axios";

const Ville = () => {
  const [villes, setVilles] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newVille, setNewVille] = useState({ nom: "", regionId: "" });
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [villesRes, regionsRes] = await Promise.all([
          axios.get("/api/ville"),
          axios.get("/api/regionville/regions"),
        ]);
        setVilles(villesRes.data);
        setRegions(regionsRes.data);
      } catch (err) {
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setNewVille({ ...newVille, [e.target.name]: e.target.value });
  };

  const handleCreateVille = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError("");
    try {
      await axios.post("/api/ville", {
        Nom: newVille.nom,
        RegionId: parseInt(newVille.regionId, 10),
      });
      setNewVille({ nom: "", regionId: "" });
      const villesRes = await axios.get("/api/ville");
      setVilles(villesRes.data);
    } catch (err) {
      setError("Erreur lors de la création de la ville");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette ville ?")) return;
    setDeletingId(id);
    setError("");
    try {
      await axios.delete(`/api/ville/${id}`);
      setVilles(villes.filter((v) => v.id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression de la ville");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading)
    return <div style={{ padding: 30 }}>Chargement des villes...</div>;
  if (error)
    return <div style={{ color: "red", padding: 30 }}>{error}</div>;

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 12px #eee",
        padding: 30,
      }}
    >
      <h2 style={{ color: "#1976d2", marginBottom: 20 }}>Liste des villes</h2>
      {villes.length === 0 ? (
        <div style={{ marginBottom: 20 }}>Aucune ville trouvée.</div>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: 30,
          }}
        >
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th
                style={{
                  padding: 10,
                  border: "1px solid #eee",
                  textAlign: "left",
                }}
              >
                Nom
              </th>
              <th
                style={{
                  padding: 10,
                  border: "1px solid #eee",
                  textAlign: "left",
                }}
              >
                Région
              </th>
              <th
                style={{
                  padding: 10,
                  border: "1px solid #eee",
                  textAlign: "center",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {villes.map((ville) => (
              <tr key={ville.id}>
                <td
                  style={{
                    padding: 10,
                    border: "1px solid #eee",
                  }}
                >
                  {ville.nom ?? ville.Nom ?? "Nom inconnu"}
                </td>
                <td
                  style={{
                    padding: 10,
                    border: "1px solid #eee",
                  }}
                >
                  {ville.region?.name || ville.Region?.name || "Non défini"}
                </td>
                <td
                  style={{
                    padding: 10,
                    border: "1px solid #eee",
                    textAlign: "center",
                  }}
                >
                  <button
                    onClick={() => handleDelete(ville.id)}
                    disabled={deletingId === ville.id}
                    style={{
                      background: "#e53935",
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      padding: "6px 14px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {deletingId === ville.id ? "Suppression..." : "Supprimer"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3 style={{ color: "#1976d2", marginBottom: 10 }}>Ajouter une ville</h3>
      <form
        onSubmit={handleCreateVille}
        style={{
          background: "#f9f9f9",
          borderRadius: 8,
          padding: 20,
          border: "1px solid #eee",
        }}
      >
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: "block", marginBottom: 6 }}>
            Nom:
            <input
              type="text"
              name="nom"
              value={newVille.nom}
              onChange={handleChange}
              required
              style={{
                marginLeft: 10,
                padding: 7,
                borderRadius: 4,
                border: "1px solid #ccc",
                width: "70%",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: "block", marginBottom: 6 }}>
            Région:
            <select
              name="regionId"
              value={newVille.regionId}
              onChange={handleChange}
              required
              style={{
                marginLeft: 10,
                padding: 7,
                borderRadius: 4,
                border: "1px solid #ccc",
                width: "75%",
              }}
            >
              <option value="">Sélectionnez une région</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name ?? region.Name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="submit"
          disabled={creating}
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "10px 22px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {creating ? "Création en cours..." : "Créer la ville"}
        </button>
      </form>
    </div>
  );
};

export default Ville;