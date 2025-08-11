import React, { useEffect, useState } from "react";

const ListEquipe = ({ onAddEquipe, onEditEquipe, refresh }) => {
  const [equipes, setEquipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/Equipe")
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors du chargement");
        return res.json();
      })
      .then(data => setEquipes(data))
      .catch(() => setError("Impossible de charger les équipes"))
      .finally(() => setLoading(false));
  }, [refresh]); // refresh pour recharger après création

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette équipe ?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/Equipe/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setEquipes(equipes.filter(eq => eq.equipeId !== id));
    } catch {
      setError("Erreur lors de la suppression");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{
      maxWidth: 700,
      margin: "40px auto",
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 2px 8px #eee",
      padding: 32
    }}>
      <h2 style={{ marginBottom: 24 }}>Liste des équipes</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fafbfc"
        }}>
          <thead>
            <tr style={{ background: "#f0f4fa" }}>
              <th style={{ padding: 12, borderBottom: "2px solid #e0e0e0" }}>ID</th>
              <th style={{ padding: 12, borderBottom: "2px solid #e0e0e0" }}>Nom</th>
              <th style={{ padding: 12, borderBottom: "2px solid #e0e0e0" }}>Description</th>
              <th style={{ padding: 12, borderBottom: "2px solid #e0e0e0" }}>Site</th>
              <th style={{ padding: 12, borderBottom: "2px solid #e0e0e0" }}>Membres</th>
              <th style={{ padding: 12, borderBottom: "2px solid #e0e0e0" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {equipes.map(eq => (
              <tr key={eq.equipeId} style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td style={{ padding: 10 }}>{eq.equipeId}</td>
                <td style={{ padding: 10 }}>{eq.nom}</td>
                <td style={{ padding: 10 }}>{eq.description}</td>
                <td style={{ padding: 10 }}>{eq.siteId}</td>
                <td style={{ padding: 10 }}>
                  {eq.membres && eq.membres.length > 0
                    ? eq.membres.join(", ")
                    : <span style={{ color: "#888" }}>Aucun membre</span>}
                </td>
                <td style={{ padding: 10 }}>
                  <button
                    style={{ marginRight: 8, background: "#fbbf24", color: "#222", border: "none", borderRadius: 4, padding: "6px 12px", cursor: "pointer" }}
                    onClick={() => onEditEquipe(eq)}
                  >
                    Modifier
                  </button>
                  <button
                    style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 4, padding: "6px 12px", cursor: "pointer" }}
                    onClick={() => handleDelete(eq.equipeId)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        style={{
          marginTop: 24,
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          padding: "10px 32px",
          fontWeight: 600,
          fontSize: 16,
          cursor: "pointer"
        }}
        onClick={onAddEquipe}
      >
        Ajouter une équipe
      </button>
    </div>
  );
};

export default ListEquipe;