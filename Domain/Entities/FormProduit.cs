namespace Domain.Entities
{
    public class FormProduit
    {
    
    public int ProduitId { get; set; }

    public string? CodeBarre { get; set; }

  
    public int? FormProduitProduitId { get; set; }

    public int? FormProduitQuantite { get; set; }

    public virtual Produit? FormProduitProduit { get; set; }

    public virtual ICollection<ResultatInventaire>? ResultatInventaires { get; set; } }
}