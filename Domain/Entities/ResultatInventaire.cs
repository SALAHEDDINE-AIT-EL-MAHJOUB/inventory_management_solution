namespace Domain.Entities
{
    public class ResultatInventaire
    {
       
        public int GestionProduitProduitId { get; set; }
        public virtual GestionProduit GestionProduit { get; set; } 
        public int ResultatInventaireId { get; set; }

       
        public int? ResultatInventaireGestionProduitId { get; set; }
        public int? ResultatInventaireEquipeId { get; set; }
 public int? ResultatInventaireInventaireId { get; set; }
        public int? ResultatInventaireOperateurId { get; set; }

        public int? StockArbitre { get; set; }

        public int? QuantiteScannee { get; set; } // 👈 quantité observée par l'opérateur

        public virtual Equipe? ResultatInventaireEquipe { get; set; }

        public virtual GestionProduit? ResultatInventaireGestionProduit { get; set; }

        public virtual Inventaire? ResultatInventaireInventaire { get; set; }

        public virtual Operateur? ResultatInventaireOperateur { get; set; }

        public DateTime DateComptage { get; set; }
        public int ÉtapeComptage { get; set; } // 1, 2 ou 3 (arbitrage)

    }
}
