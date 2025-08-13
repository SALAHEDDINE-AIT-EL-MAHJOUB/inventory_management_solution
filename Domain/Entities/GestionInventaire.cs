namespace Domain.Entities
{
    public class GestionInventaire
    {
        public int Id { get; set; }
        public int InventaireId { get; set; }
        public int ProduitId { get; set; }
        public int QuantiteInventaire { get; set; }
        public int? QuantiteInventairedouble { get; set; }
        public int? operateurdoubleinventaireId { get; set; }
        public bool Statut { get; set; }


        public string? CodeBarreProduit { get; set; } // Ajout du code-barres

        // Navigation properties
        public virtual Inventaire? Inventaire { get; set; }
        public virtual Produit? Produit { get; set; }
        public virtual ICollection<OperationInventaire> OperationInventaires { get; set; } = new List<OperationInventaire>();
    }
}

