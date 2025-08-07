import React, { useState, useEffect } from "react";

const CreeEquipe = () => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [siteId, setSiteId] = useState("");
  const [sites, setSites] = useState([]);
  const [operateurs, setOperateurs] = useState([]);
  const [selectedOperateurs, setSelectedOperateurs] = useState([]);
  const [message, setMessage] = useState("");

  // Charger la liste des sites au chargement
  useEffect(() => {
    fetch("/api/Site")
      .then((res) => res.json())
      .then(setSites)
      .catch(() => setSites([]));
  }, []);

  // Charger les opérateurs du site sélectionné
  useEffect(() => {
    if (siteId) {
      fetch(`/api/Operateur?siteId=${siteId}`)
        .then((res) => res.json())
        .then(setOperateurs)
        .catch(() => setOperateurs([]));
    } else {
      setOperateurs([]);
    }
    setSelectedOperateurs([]);
  }, [siteId]);

  const handleOperateurChange = (id) => {
    setSelectedOperateurs((prev) =>
      prev.includes(id)
        ? prev.filter((oid) => oid !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!siteId || selectedOperateurs.length === 0) {
      setMessage("Veuillez choisir un site et au moins un opérateur.");
      return;
    }
    const equipe = {
      nom,
      description,
      siteId,
      operateurIds: selectedOperateurs,
    };
    try {
      const response = await fetch("/api/Equipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(equipe),
      });
      if (response.ok) {
        setMessage("Équipe créée avec succès !");
        setNom("");
        setDescription("");
        setSiteId("");
        setOperateurs([]);
        setSelectedOperateurs([]);
      } else {
        setMessage("Erreur lors de la création.");
      }
    } catch {
      setMessage("Erreur réseau.");
    }
  };

  return (
    <div>
      <h2>Créer une équipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description :</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Site :</label>
          <select
            value={siteId}
            onChange={(e) => setSiteId(e.target.value)}
            required
          >
            <option value="">-- Choisir un site --</option>
            {sites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.siteNom}
              </option>
            ))}
          </select>
        </div>
        {operateurs.length > 0 && (
          <div>
            <label>Opérateurs disponibles :</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {operateurs.map((op) => (
                <label key={op.id}>
                  <input
                    type="checkbox"
                    checked={selectedOperateurs.includes(op.id)}
                    onChange={() => handleOperateurChange(op.id)}
                  />
                  {op.nom} {op.prenom}
                </label>
              ))}
            </div>
          </div>
        )}
        <button type="submit">Créer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreeEquipe;