using Domain.Models;
using Domain.Constants;
namespace Domain.Entities
{
    public class GestionProduit 
    {
        public int Id { get; set; }
        public int ProduitId { get; set; }
        public string? ProduitNom { get; set; }
        public string? CodeBarreproduit { get; set; }


        

        public int? GestionProduitQuantiteId { get; set; }
        public int? ResultatInventaireId { get; set; }
        
  //code barre
       public int? CodeBarreAlleeId { get; set; }
public int? CodeBarreZoneId { get; set; }
public int? CodeBarreRangeeId { get; set; }
public int? CodeBarreEtageId { get; set; }
       public int? ProduitEtageId { get; set; }
        public string QuantiteEnStock { get; set; }
        public virtual CodeBarreEtage CodeBarreEtage { get; set; }

                  public virtual CodeBarreRangee CodeBarreRangee { get; set; }
        public virtual CodeBarreCommercial? CodebarreCommercial { get; set; }
        public virtual CodeBarreAllee CodeBarreAllee { get; set; }
        public virtual CodeBarreZone CodeBarreZone { get; set; }
        public virtual Etage? ProduitEtage { get; set; }
        public virtual Produit GestionProduitProduit { get; set; }
              public virtual Quantite? Quantite { get; set; }
        public virtual ICollection<ResultatInventaire>? ResultatInventaires { get; set; }
    }
}