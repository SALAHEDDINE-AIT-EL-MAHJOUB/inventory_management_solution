import React, { useEffect, useState } from "react";

const CreeEquipe = ({ equipe, onCreated, onCancel }) => {
  const [sites, setSites] = useState([]);
  const [operateurs, setOperateurs] = useState([]);
  const [selectedSite, setSelectedSite] = useState(equipe ? equipe.siteId : "");
  const [selectedOperateurs, setSelectedOperateurs] = useState(equipe ? equipe.membres || [] : []);
  const [nom, setNom] = useState(equipe ? equipe.nom : "");
  const [description, setDescription] = useState(equipe ? equipe.description : "");
  const [message, setMessage] = useState("");

  // Charger les sites au montage
  useEffect(() => {
    fetch("/api/site")
      .then((res) => res.json())
      .then(setSites)
      .catch(() => setSites([]));
  }, []);

  // Charger les opérateurs quand un site est sélectionné
  useEffect(() => {
    if (selectedSite) {
      fetch(`/api/Operateur?siteId=${selectedSite}`)
        .then((res) => res.json())
        .then(setOperateurs)
        .catch(() => setOperateurs([]));
    } else {
      setOperateurs([]);
      setSelectedOperateurs([]);
    }
  }, [selectedSite]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!nom || !selectedSite || selectedOperateurs.length === 0) {
      setMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    const dto = {
      nom,
      description,
      siteId: parseInt(selectedSite),
      operateurIds: selectedOperateurs.map(Number),
    };

    let res;
    if (equipe && equipe.equipeId) {
      // Mode modification
      res = await fetch(`/api/Equipe/${equipe.equipeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });
    } else {
      // Mode création
      res = await fetch("/api/Equipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });
    }

    if (res.ok) {
      setMessage(equipe ? "Équipe modifiée avec succès !" : "Équipe créée avec succès !");
      setNom("");
      setDescription("");
      setSelectedSite("");
      setSelectedOperateurs([]);
      if (onCreated) onCreated();
    } else {
      const err = await res.text();
      setMessage("Erreur: " + err);
    }
  };

  return (
    <div style={{
      maxWidth: 500,
      margin: "40px auto",
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 2px 8px #eee",
      padding: 32
    }}>
      <h2>Créer une équipe</h2>
      {message && (
        <div style={{ color: message.startsWith("Erreur") ? "red" : "green", marginBottom: 16 }}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom de l'équipe *</label>
          <input value={nom} onChange={e => setNom(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <input value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Site *</label>
          <select value={selectedSite} onChange={e => setSelectedSite(e.target.value)} required>
            <option value="">-- Sélectionner un site --</option>
            {sites.map(site => (
              <option key={site.id} value={site.id}>{site.siteNom}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Opérateurs *</label>
          <select
            multiple
            value={selectedOperateurs}
            onChange={e =>
              setSelectedOperateurs(Array.from(e.target.selectedOptions, o => o.value))
            }
            required
            size={Math.max(3, operateurs.length)}
          >
            {operateurs.map(op => (
              <option key={op.id} value={String(op.id)}>
                {op.nom} {op.prenom}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
          <button type="submit" style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "10px 32px",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer"
          }}>
            {equipe ? "Modifier" : "Créer"}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} style={{
              background: "#eee",
              color: "#333",
              border: "none",
              borderRadius: 4,
              padding: "10px 32px",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer"
            }}>Annuler</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreeEquipe;