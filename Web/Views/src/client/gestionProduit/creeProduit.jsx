import React, { useEffect, useState } from "react";
import axios from "axios";
import "./creeProduit.css"; // N'oublie pas d'importer le fichier CSS
import ListProduit from "./listProduit";

export default function CreeProduit() {
  const [societes, setSocietes] = useState([]);
  const [sites, setSites] = useState([]);
  const [zones, setZones] = useState([]);
  const [allees, setAllees] = useState([]);
  const [rangees, setRangees] = useState([]);
  const [etages, setEtages] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [form, setForm] = useState({
    Nom: "",
    Prix: "",
    Quantite: "", // Ajout de la quantité
    CodeBarre: "",
    SocieteId: "",
    SiteId: "",
    ZoneId: "",
    AlleeId: "",
    RangeeId: "",
    EtageId: "",
    FournisseurId: ""
  });
  const [message, setMessage] = useState("");

  // Charger les sociétés au montage
  useEffect(() => {
    axios.get("/api/Produit/societes").then(res => setSocietes(res.data));
  }, []);

  // Charger les sites selon la société
  useEffect(() => {
    if (form.SocieteId)
      axios.get(`/api/Produit/sites/${form.SocieteId}`).then(res => setSites(res.data));
    else setSites([]);
    setForm(f => ({ ...f, SiteId: "", ZoneId: "", AlleeId: "", RangeeId: "", EtageId: "" }));
    setZones([]); setAllees([]); setRangees([]); setEtages([]);
  }, [form.SocieteId]);

  // Charger les zones selon le site
  useEffect(() => {
    if (form.SiteId)
      axios.get(`/api/Produit/zones/${form.SiteId}`).then(res => setZones(res.data));
    else setZones([]);
    setForm(f => ({ ...f, ZoneId: "", AlleeId: "", RangeeId: "", EtageId: "" }));
    setAllees([]); setRangees([]); setEtages([]);
  }, [form.SiteId]);

  // Charger les allées selon la zone
  useEffect(() => {
    if (form.ZoneId)
      axios.get(`/api/Produit/allees/${form.ZoneId}`).then(res => setAllees(res.data));
    else setAllees([]);
    setForm(f => ({ ...f, AlleeId: "", RangeeId: "", EtageId: "" }));
    setRangees([]); setEtages([]);
  }, [form.ZoneId]);

  // Charger les rangées selon l'allée
  useEffect(() => {
    if (form.AlleeId)
      axios.get(`/api/Produit/rangees/${form.AlleeId}`).then(res => setRangees(res.data));
    else setRangees([]);
    setForm(f => ({ ...f, RangeeId: "", EtageId: "" }));
    setEtages([]);
  }, [form.AlleeId]);

  // Charger les étages selon la rangée
  useEffect(() => {
    if (form.RangeeId)
      axios.get(`/api/Produit/etages/${form.RangeeId}`).then(res => setEtages(res.data));
    else setEtages([]);
    setForm(f => ({ ...f, EtageId: "" }));
  }, [form.RangeeId]);

  // Charger les fournisseurs au montage
  useEffect(() => {
    axios.get("/api/Fournisseur").then(res => setFournisseurs(res.data));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    // Validation simple côté client
    if (
      !form.Nom ||
      !form.Prix ||
      !form.Quantite || // Validation de la quantité
      !form.SocieteId ||
      !form.SiteId ||
      !form.ZoneId ||
      !form.AlleeId ||
      !form.RangeeId ||
      !form.EtageId ||
      !form.FournisseurId
    ) {
      setMessage("Tous les champs sont obligatoires.");
      return;
    }
    try {
      await axios.post("/api/Produit", {
        ...form,
        Prix: Number(form.Prix),
        Quantite: Number(form.Quantite), // Conversion quantité
        SocieteId: Number(form.SocieteId),
        SiteId: Number(form.SiteId),
        ZoneId: Number(form.ZoneId),
        AlleeId: Number(form.AlleeId),
        RangeeId: Number(form.RangeeId),
        EtageId: Number(form.EtageId),
        FournisseurId: Number(form.FournisseurId)
      });
      setMessage("Produit créé avec succès !");
      setForm({
        Nom: "",
        Prix: "",
        Quantite: "",
        CodeBarre: "",
        SocieteId: "",
        SiteId: "",
        ZoneId: "",
        AlleeId: "",
        RangeeId: "",
        EtageId: "",
        FournisseurId: ""
      });
    } catch (err) {
      setMessage(
        err.response?.data || "Erreur lors de la création du produit."
      );
    }
  };

  return (
    <div className="cree-produit-container">
      <form onSubmit={handleSubmit} className="cree-produit-form">
        <div className="cree-produit-header">
          <h2>Créer un produit</h2>
        </div>
        {message && <div className="cree-produit-message">{message}</div>}
        <div>
          <label>Nom :</label>
          <input name="Nom" value={form.Nom} onChange={handleChange} required />
        </div>
        <div>
          <label>Prix :</label>
          <input
            name="Prix"
            type="number"
            min="0"
            step="0.01"
            value={form.Prix}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantité :</label>
          <input
            name="Quantite"
            type="number"
            min="0"
            value={form.Quantite}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Code Barre :</label>
          <input name="CodeBarre" value={form.CodeBarre} onChange={handleChange} />
        </div>
        <div>
          <label>Société :</label>
          <select name="SocieteId" value={form.SocieteId} onChange={handleChange} required>
            <option value="">Sélectionner</option>
            {societes.map(s => <option key={s.id || s.Id} value={s.id || s.Id}>{s.nom || s.Nom}</option>)}
          </select>
        </div>
        <div>
          <label>Site :</label>
          <select name="SiteId" value={form.SiteId} onChange={handleChange} required>
            <option value="">Sélectionner</option>
            {sites.map(s => <option key={s.id || s.Id} value={s.id || s.Id}>{s.siteNom || s.SiteNom}</option>)}
          </select>
        </div>
        <div>
          <label>Zone :</label>
          <select name="ZoneId" value={form.ZoneId} onChange={handleChange} required>
            <option value="">Sélectionner</option>
            {zones.map(z => <option key={z.zoneId || z.ZoneId} value={z.zoneId || z.ZoneId}>{z.zoneNom || z.ZoneNom}</option>)}
          </select>
        </div>
        <div>
          <label>Allée :</label>
          <select name="AlleeId" value={form.AlleeId} onChange={handleChange} required>
            <option value="">Sélectionner</option>
            {allees.map(a => <option key={a.alleeId || a.AlleeId} value={a.alleeId || a.AlleeId}>{a.alleeNom || a.AlleeNom}</option>)}
          </select>
        </div>
        <div>
          <label>Rangée :</label>
          <select name="RangeeId" value={form.RangeeId} onChange={handleChange} required>
            <option value="">Sélectionner</option>
            {rangees.map(r => <option key={r.rangeeId || r.RangeeId} value={r.rangeeId || r.RangeeId}>{r.rangeeNom || r.RangeeNom}</option>)}
          </select>
        </div>
        <div>
          <label>Étage :</label>
          <select name="EtageId" value={form.EtageId} onChange={handleChange} required>
            <option value="">Sélectionner</option>
            {etages.map(e => <option key={e.id || e.Id} value={e.id || e.Id}>{e.nom || e.Nom}</option>)}
          </select>
        </div>
        <div>
          <label>Fournisseur :</label>
          <select name="FournisseurId" value={form.FournisseurId} onChange={handleChange} required>
            <option value="">Sélectionner</option>
            {fournisseurs.map(f => (
              <option key={f.fournisseurId || f.FournisseurId} value={f.fournisseurId || f.FournisseurId}>
                {f.nom || f.Nom}
              </option>
            ))}
          </select>
        </div>
        <div className="cree-produit-footer">
          <button type="submit" className="cree-produit-btn">
            Créer
          </button>
        </div>
      </form>
    </div>
  );
 
}