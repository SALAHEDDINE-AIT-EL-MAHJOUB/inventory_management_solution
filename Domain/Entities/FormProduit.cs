namespace Domain.Entities
{
    public class FormProduit
    {
        public int Id { get; set; }
        public int ProduitId { get; set; }
        public virtual Produit Produit { get; set; }
        public int Quantite { get; set; }

        public string CodeBarre { get; set; }
        public virtual ICollection<ResultatInventaire>? ResultatInventaires { get; set; }
    }
}