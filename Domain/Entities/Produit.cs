namespace Domain.Entities
{
    public class Produit
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public int Quantite { get; set; }
        public decimal Prix { get; set; }
    public string? CodeBarre { get; set; } 
        public int FournisseurId { get; set; }
        public int? FormProduitsId { get; set; }
        public int? CodebarreProduitId { get; set; }

        public virtual ICollection<GestionProduit> GestionProduit { get; set; }
        public virtual Fournisseur Fournisseur { get; set; }
        public ICollection<CodebarreProduit> CodebarreProduits { get; set; } = new List<CodebarreProduit>();
        public bool IsDeleted { get; set; } = false;
        // Clés étrangères
        public int ? RangeeId { get; set; }
        public int? ZoneId { get; set; }
        public int? SocieteId { get; set; }
        public int? AlleeId { get; set; }
        public int? SiteId { get; set; }
        public int? EtageId { get; set; }
        // Propriétés de navigation
        public virtual Zone? Zone { get; set; }
        public virtual Societe? Societe { get; set; }
        public virtual Allee? Allee { get; set; }
        public virtual Site? Site { get; set; }
        public virtual Etage? Etage { get; set; }
        public virtual Rangee? Rangee { get; set; }
    }
}
    