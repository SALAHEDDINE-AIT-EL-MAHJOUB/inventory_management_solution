using Domain.Models;
using StockPilot.Domain.Constants;
using System;
using System.Collections.Generic;



namespace Domain.Entities
{
    public class Inventaire
    {

        /// <summary>
        /// Identifiant unique pour chaque inventaire.
        /// </summary>
        public int InventaireId { get; set; }

        /// <summary>
        /// Libellé ou nom de l&apos;inventaire
        /// </summary>
        public string? InventaireLibelle { get; set; }

        /// <summary>
        /// Référence au type d&apos;inventaire, lié à l&apos;identifiant du type dans la table TypeInventaire.
        /// </summary>
        public int? InventaireTypeInventaireId { get; set; }

        public bool EstDoubleComptage => InventaireTypeInventaireId == (int)TypeInventaireIds.DoubleAvecArbitrage;

        /// <summary>
        /// Date de l&apos;inventaire.
        /// </summary>
        public DateOnly? InventaireDate { get; set; }

        /// <summary>
        /// Référence au statut de l&apos;inventaire, lié à l&apos;identifiant du statut dans la table Statut.
        /// </summary>
        public int? InventaireStatutId { get; set; }

        /// <summary>
        /// Indicateur qui spécifie si l&apos;inventaire est total (1) ou partiel (0).
        /// </summary>
        public bool? InventaireIsTotal { get; set; }

        /// <summary>
        /// Référence au site où l&apos;inventaire est effectué, lié à l&apos;identifiant du site dans la table Site.
        /// </summary>
        public int? InventaireSiteId { get; set; }

        public virtual ICollection<Equipe> Equipes { get; set; } = new List<Equipe>();

        public virtual Site? InventaireSite { get; set; }

      public virtual Statut? InventaireStatut { get; set; }
        public virtual TypeInventaire? InventaireTypeInventaire { get; set; }

        public virtual ICollection<OperationInventaire> OperationInventaires { get; set; } = new List<OperationInventaire>();

        public virtual ICollection<ResultatInventaire> ResultatInventaires { get; set; } = new List<ResultatInventaire>();


    }
}