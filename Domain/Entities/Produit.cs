namespace Domain.Entities
{
    public class Produit
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public decimal Prix { get; set; }

        public int FournisseurId { get; set; }
        public int? FormProduitsId { get; set; }
        public int? CodebarreProduitId { get; set; }

       public virtual ICollection<GestionProduit> GestionProduit { get; set; }        public virtual Fournisseur Fournisseur { get; set; }
        public  ICollection<CodebarreProduit> CodebarreProduits { get; set; } = new List<CodebarreProduit>();
        public bool IsDeleted { get; set; } = false;
        
    }
}
    