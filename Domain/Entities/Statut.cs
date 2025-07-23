using System;
using System.Collections.Generic;

namespace Domain.Entities
{

    public partial class Statut
    {
        /// <summary>
        /// Identifiant unique pour chaque statut.
        /// </summary>
        public int StatutId { get; set; }

        /// <summary>
        /// Nom du statut
        /// </summary>
        public string? StatutNom { get; set; }

        public string? StatutLibelle { get; set; }


        public virtual ICollection<Inventaire> Inventaires { get; set; } = new List<Inventaire>();
    }
}
