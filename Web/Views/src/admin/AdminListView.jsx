import React, { useEffect, useState } from "react";

export default function AdminListView() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/AdminList")
      .then(async (res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement.");
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch {
          throw new Error("Réponse serveur invalide.");
        }
      })
      .then(setAdmins)
      .catch(() => setError("Impossible de charger la liste."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2>Liste des administrateurs</h2>
      <ul>
        {admins.map((admin) => (
          <li key={admin.id}>
            {admin.adminName} ({admin.email})
          </li>
        ))}
      </ul>
    </div>
  );
}