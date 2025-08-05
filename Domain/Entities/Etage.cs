namespace Domain.Entities
{
    public class Etage
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public int RangeeId { get; set; }
        public int? CodeBarreetageId { get; set; }
        public virtual CodeBarreEtage? CodeBarreetage { get; set; }
        public virtual ICollection<CodeBarreEtage> CodeBarreEtages { get; set; } = new List<CodeBarreEtage>();

  public bool IsDeleted { get; set; } = false;
    public virtual Rangee? EtageRangee { get; set; }

    public virtual ICollection<Produit> Produits { get; set; } = new List<Produit>();
    }
}
