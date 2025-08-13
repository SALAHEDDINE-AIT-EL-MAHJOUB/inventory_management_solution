import React, { useEffect, useState } from "react";

export default function ResultaOperateur() {
    const [resultats, setResultats] = useState([]);
    const [produits, setProduits] = useState([]);
    const [equipes, setEquipes] = useState([]);
    const [form, setForm] = useState({ gestionProduitId: "", equipeId: "", operateurId: "" });
    const [loading, setLoading] = useState(false);

    // Charger tous les résultats, produits et équipes
    useEffect(() => {
        fetch("/api/ResultatInventaire")
            .then(res => res.json())
            .then(setResultats);

        fetch("/api/Produit")
            .then(res => res.json())
            .then(setProduits);

        fetch("/api/Equipe")
            .then(res => res.json())
            .then(setEquipes);
    }, []);

    // Gérer la saisie du formulaire
    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Assigner un produit
    const handleAssign = async e => {
        e.preventDefault();
        setLoading(true);
        const body = {
            gestionProduitId: form.gestionProduitId ? parseInt(form.gestionProduitId) : null,
            equipeId: form.equipeId ? parseInt(form.equipeId) : null,
            operateurId: form.operateurId ? parseInt(form.operateurId) : null
        };
        const res = await fetch("/api/ResultatInventaire/assign", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (res.ok) {
            const newResultat = await res.json();
            setResultats([...resultats, newResultat]);
            setForm({ gestionProduitId: "", equipeId: "", operateurId: "" });
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Résultats d'inventaire opérateur</h2>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produit</th>
                        <th>Equipe</th>
                        <th>Opérateur</th>
                        <th>Quantité scannée</th>
                        <th>Date comptage</th>
                    </tr>
                </thead>
                <tbody>
                    {resultats.map(r => (
                        <tr key={r.resultatInventaireId}>
                            <td>{r.resultatInventaireId}</td>
                            <td>{r.gestionProduitProduitId}</td>
                            <td>{r.resultatInventaireEquipeId ?? "-"}</td>
                            <td>{r.resultatInventaireOperateurId ?? "-"}</td>
                            <td>{r.quantiteScannee ?? "-"}</td>
                            <td>{r.dateComptage ? new Date(r.dateComptage).toLocaleString() : "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Assigner un produit</h3>
            <form onSubmit={handleAssign}>
                <select
                    name="gestionProduitId"
                    value={form.gestionProduitId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Choisir un produit</option>
                    {produits.map((p, idx) => (
                        <option key={p.produitId ?? idx} value={p.produitId}>
                            {p.nom}
                        </option>
                    ))}
                </select>
                <select
                    name="equipeId"
                    value={form.equipeId}
                    onChange={handleChange}
                >
                    <option value="">Choisir une équipe (optionnel)</option>
                    {equipes.map(e => (
                        <option key={e.equipeId} value={e.equipeId}>
                            {e.nom}
                        </option>
                    ))}
                </select>
                <input
                    name="operateurId"
                    placeholder="ID Opérateur (optionnel)"
                    value={form.operateurId}
                    onChange={handleChange}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Assignation..." : "Assigner"}
                </button>
            </form>
        </div>
    );
}