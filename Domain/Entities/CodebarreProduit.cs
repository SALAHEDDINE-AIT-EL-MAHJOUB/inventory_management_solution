namespace Domain.Entities
{
    public class CodebarreProduit
    {
        public int Id { get; set; }
       public string? Code { get; set; }

      
        public int ProduitId { get; set; }
        public virtual Produit Produit { get; set; }
    }
}