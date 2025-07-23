namespace Domain.Entities
{
    public class Produit
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public decimal Prix { get; set; }
        public int? ProduitEtageId { get; set; }
        public int? QuantiteEnStock { get; set; }
        public virtual CodeBarreEtage CodeBarreEtage { get; set; }
        public virtual Etage? ProduitEtage { get; set; }
 public virtual ICollection<FormProduit> FormProduits { get; set; } = new List<FormProduit>();

    }
}
    