using Domain.Models;
using StockPilot.Domain.Constants;
using System;
using System.Collections.Generic;



namespace Domain.Entities
{
    public class Inventaire
    {

               public int InventaireId { get; set; }

                public string? InventaireLibelle { get; set; }

      
        public int? InventaireTypeInventaireId { get; set; }

        public bool EstDoubleComptage => InventaireTypeInventaireId == (int)TypeInventaireIds.DoubleAvecArbitrage;

        public DateTime? InventaireDate { get; set; }

       
        public int? InventaireStatutId { get; set; }

               public bool? InventaireIsTotal { get; set; }

     
        public int? InventaireSiteId { get; set; }

        public virtual ICollection<Equipe> Equipes { get; set; } = new List<Equipe>();

        public virtual Site? InventaireSite { get; set; }

      public virtual Statut? InventaireStatut { get; set; }
        public virtual TypeInventaire? InventaireTypeInventaire { get; set; }

        public virtual ICollection<OperationInventaire> OperationInventaires { get; set; } = new List<OperationInventaire>();

        public virtual ICollection<ResultatInventaire> ResultatInventaires { get; set; } = new List<ResultatInventaire>();

        public string? MotDePasse { get; set; }

    }
}