import React, { useEffect, useState } from "react";
import axios from "axios";

const Ville = () => {
  const [villes, setVilles] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newVille, setNewVille] = useState({ nom: "", regionId: "" });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [villesRes, regionsRes] = await Promise.all([
          axios.get("/api/regionville/villes"),
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
      // Recharge la liste
      const villesRes = await axios.get("/api/regionville/villes");
      setVilles(villesRes.data);
    } catch (err) {
      setError("Erreur lors de la création de la ville");
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <div>Chargement des villes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>Liste des villes</h3>
      {villes.length === 0 ? (
        <div>Aucune ville trouvée.</div>
      ) : (
        <ul>
          {villes.map((ville) => (
            <li key={ville.id}>
              {ville.nom ?? ville.Nom ?? "Nom inconnu"}{" "}
              {ville.region?.name || ville.Region?.name ? (
                <span>
                  (
                  {ville.region?.name || ville.Region?.name}
                  )
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
      <h3>Ajouter une ville</h3>
      <form onSubmit={handleCreateVille}>
        <div>
          <label>
            Nom:
            <input
              type="text"
              name="nom"
              value={newVille.nom}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Région:
            <select
              name="regionId"
              value={newVille.regionId}
              onChange={handleChange}
              required
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
        <button type="submit" disabled={creating}>
          {creating ? "Création en cours..." : "Créer la ville"}
        </button>
      </form>
    </div>
  );
};

export default Ville;