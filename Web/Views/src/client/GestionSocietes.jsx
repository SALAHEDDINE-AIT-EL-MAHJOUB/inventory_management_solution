import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "/api/client-societes";

export default function GestionSocietes() {
  const [societes, setSocietes] = useState([]);
  const [client, setClient] = useState(null);
  const [villes, setVilles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    rs: "",
    if: "",
    adresse: "",
    telephone: "",
    villeId: "", // <-- corrigez ici (remplacez ville par villeId)
    clientId: "",
    nom: "",
    email: ""
  });
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState("");
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchClientConnecte();
    fetchVilles();
    fetchSocietes(); // Ajoutez ceci pour charger la liste au démarrage
  }, []);

  const fetchClientConnecte = async () => {
    try {
      const res = await fetch('/api/profil/me');
      const data = await res.json();
      console.log(data); // Ajoute ceci pour voir la structure
      setClient(data.client);
      setForm((prev) => ({
        ...prev,
        clientId: data.client?.clientId ? String(data.client.clientId) : "",
        nom: data.client?.clientNom || "",
        email: data.client?.email || ""
      }));
    } catch (e) {
      setClient(null);
    }
  };

  // Utilise le controller Ville pour récupérer les villes
  const fetchVilles = async () => {
    const res = await fetch("/api/ville");
    const data = await res.json();
    setVilles(data);
  };

  // Ajoutez cette fonction :
  const fetchSocietes = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setSocietes(data);
      // Si la page courante n'a plus de résultats, revenir à la page 1
      if ((currentPage - 1) * itemsPerPage >= data.length && currentPage > 1) {
        setCurrentPage(1);
      }
    } catch (e) {
      setSocietes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.clientId || !form.villeId || !form.nom || !form.adresse) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    setCreating(true);
    try {
      const payload = {
        ClientId: parseInt(form.clientId, 10),
        VilleId: parseInt(form.villeId, 10),
        Nom: form.nom,
        Adresse: form.adresse,
        RS: form.rs,
        IF: form.if,
        Telephone: form.telephone,
        Email: form.email
      };
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, payload);
        setSuccess("Société modifiée avec succès !");
      } else {
        await axios.post(API_URL, payload);
        setSuccess("Société créée avec succès !");
      }
      setForm({
        rs: "",
        if: "",
        adresse: "",
        telephone: "",
        villeId: "",
        clientId: form.clientId,
        nom: form.nom,
        email: form.email
      });
      setEditId(null);
      fetchSocietes();
    } catch (err) {
      setError(
        err.response?.data?.toString() ||
          "Erreur lors de la création ou modification de la société"
      );
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const msg = await res.text();
        alert("Erreur lors de la suppression : " + msg);
        return;
      }
      fetchSocietes();
    } catch (e) {
      alert("Erreur réseau lors de la suppression");
    }
  };

  const handleEdit = (societe) => {
    setEditId(societe.id);
    setForm({
      rs: societe.raisonSociale || "",
      if: societe.if || "",
      adresse: societe.adresse || "",
      telephone: societe.telephone || "",
      villeId: societe.villeId ? String(societe.villeId) : "",
      clientId: societe.clientId ? String(societe.clientId) : "",
      nom: societe.nom || "",
      email: societe.email || ""
    });
    setShowForm(true); // Affiche le formulaire lors de la modification
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ ...form, rs: "", if: "", adresse: "", telephone: "", villeId: "" });
    setShowForm(false);
  };

  const totalPages = Math.ceil(societes.length / itemsPerPage);

  const paginatedSocietes = societes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div>
      <h2>Gestion des Sociétés</h2>
      <button
        style={{
          marginBottom: "20px",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer"
        }}
        onClick={() => setShowForm((v) => !v)}
      >
        {showForm ? "Fermer le formulaire" : "Ajouter une société"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} style={{
          marginBottom: "30px",
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0 2px 8px #0001"
        }}>
          <input name="rs" placeholder="Raison Sociale" value={form.rs} onChange={handleChange} required style={{marginRight:8,marginBottom:8}} />
          <input name="if" placeholder="Identifiant Fiscal" value={form.if} onChange={handleChange} style={{marginRight:8,marginBottom:8}} />
          <input name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange} style={{marginRight:8,marginBottom:8}} />
          <input name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} style={{marginRight:8,marginBottom:8}} />
          <select name="villeId" value={form.villeId || ""} onChange={handleChange} required style={{marginRight:8,marginBottom:8}}>
            <option value="">Choisir une ville</option>
            {villes.map(v => (
              <option key={v.id} value={v.id}>{v.nom}</option>
            ))}
          </select>
          <input
            type="text"
            value={client ? client.clientNom || "" : ""}
            disabled
            placeholder="Client"
            style={{ background: "#eee", marginRight:8,marginBottom:8 }}
          />
          <input type="hidden" name="clientId" value={form.clientId || ""} />
          <input
            name="nom"
            placeholder="Nom"
            value={form.nom}
            onChange={handleChange}
            required
            style={{marginRight:8,marginBottom:8}}
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{marginRight:8,marginBottom:8}}
          />
          <button type="submit" disabled={creating} style={{
            background: "#388e3c",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            marginRight: 8
          }}>
            {creating ? "Création..." : (editId ? "Modifier la société" : "Créer la société")}
          </button>
          {(editId || showForm) && (
            <button type="button" onClick={handleCancel} style={{
              background: "#b71c1c",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px"
            }}>
              Annuler
            </button>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </form>
      )}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div style={{overflowX:"auto"}}>
        <table style={{
          borderCollapse: "collapse",
          width: "100%",
          background: "#fff",
          boxShadow: "0 2px 8px #0001"
        }}>
          <thead style={{background:"#1976d2",color:"#fff"}}>
            <tr>
              <th style={{padding:10}}>ID</th>
              <th style={{padding:10}}>Raison Sociale</th>
              <th style={{padding:10}}>IF</th>
              <th style={{padding:10}}>Adresse</th>
              <th style={{padding:10}}>Téléphone</th>
              <th style={{padding:10}}>Ville</th>
              <th style={{padding:10}}>ClientId</th>
              <th style={{padding:10}}>Nom</th>
              <th style={{padding:10}}>Email</th>
              <th style={{padding:10}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSocietes.map((s, idx) => (
              <tr key={s.id} style={{background: idx%2 ? "#f5f5f5" : "#fff"}}>
                <td style={{padding:8}}>{s.id}</td>
                <td style={{padding:8}}>{s.raisonSociale}</td>
                <td style={{padding:8}}>{s.if}</td>
                <td style={{padding:8}}>{s.adresse}</td>
                <td style={{padding:8}}>{s.telephone}</td>
                <td style={{padding:8}}>{s.ville}</td>
                <td style={{padding:8}}>{s.clientId}</td>
                <td style={{padding:8}}>{s.nom}</td>
                <td style={{padding:8}}>{s.email}</td>
                <td style={{padding:8, display: "flex", gap: 8}}>
                  <span
                    className="material-icons"
                    title="Supprimer"
                    style={{
                      color: "#b71c1c",
                      cursor: "pointer",
                      fontSize: 22
                    }}
                    onClick={() => handleDelete(s.id)}
                  >
                    delete
                  </span>
                  <span
                    className="material-icons"
                    title="Modifier"
                    style={{
                      color: "#1976d2",
                      cursor: "pointer",
                      fontSize: 22
                    }}
                    onClick={() => handleEdit(s)}
                  >
                    edit
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      {totalPages > 1 && (
        <div style={{marginTop:16, display:"flex", justifyContent:"center", gap:8}}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{padding:"6px 12px", borderRadius:4, border:"1px solid #1976d2", background:"#fff", color:"#1976d2", cursor: currentPage === 1 ? "not-allowed" : "pointer"}}
          >
            Précédent
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              style={{
                padding:"6px 12px",
                borderRadius:4,
                border:"1px solid #1976d2",
                background: currentPage === i + 1 ? "#1976d2" : "#fff",
                color: currentPage === i + 1 ? "#fff" : "#1976d2",
                fontWeight: currentPage === i + 1 ? "bold" : "normal",
                cursor: "pointer"
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{padding:"6px 12px", borderRadius:4, border:"1px solid #1976d2", background:"#fff", color:"#1976d2", cursor: currentPage === totalPages ? "not-allowed" : "pointer"}}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}