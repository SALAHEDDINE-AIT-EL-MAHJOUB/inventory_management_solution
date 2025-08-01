namespace Domain.Entities
{
    public class CodebarreProduit
    {
        public int Id { get; set; }
       public string Code { get; set; }

      
        public int ProduitId { get; set; }
        public  Produit Produit { get; set; }
    }
}