import React, { useEffect, useState } from "react";

const API_URL = "/api/rangee";

function Rangee() {
  const [rangees, setRangees] = useState([]);
  const [form, setForm] = useState({ rangeeId: 0, alleeId: "", etageId: "", rangeeNom: "" });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchRangees();
  }, []);

  const fetchRangees = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setRangees(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await fetch(`${API_URL}/${form.rangeeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({ rangeeId: 0, alleeId: "", etageId: "", rangeeNom: "" });
    setEditing(false);
    fetchRangees();
  };

  const handleEdit = (rangee) => {
    setForm(rangee);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchRangees();
  };

  return (
    <div>
      <h2>Gestion des Rangées</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="alleeId"
          placeholder="Allee ID"
          value={form.alleeId}
          onChange={handleChange}
          required
        />
        <input
          name="etageId"
          placeholder="Etage ID"
          value={form.etageId}
          onChange={handleChange}
        />
        <input
          name="rangeeNom"
          placeholder="Nom de la rangée"
          value={form.rangeeNom}
          onChange={handleChange}
          required
        />
        <button type="submit">{editing ? "Modifier" : "Ajouter"}</button>
        {editing && <button onClick={() => { setEditing(false); setForm({ rangeeId: 0, alleeId: "", etageId: "", rangeeNom: "" }); }}>Annuler</button>}
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Allee ID</th>
            <th>Etage ID</th>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rangees.map((r) => (
            <tr key={r.rangeeId}>
              <td>{r.rangeeId}</td>
              <td>{r.alleeId}</td>
              <td>{r.etageId}</td>
              <td>{r.rangeeNom}</td>
              <td>
                <button onClick={() => handleEdit(r)}>Modifier</button>
                <button onClick={() => handleDelete(r.rangeeId)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default Rangee;