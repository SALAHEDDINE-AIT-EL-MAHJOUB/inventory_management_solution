namespace Domain.Entities
{
    public partial class CodeBarreCommercial
    {
        public int CommercialId { get; set; }
        public string Code { get; set; }
        public int? ProduitId { get; set; }
              
                public virtual Produit? Produit { get; set; }
    }


}