namespace Domain.Entities
{
    public class Etage
    {
        public int Id { get; set; }
        public string Nom { get; set; }

        // Ajout de la clé étrangère vers Rangee
        public virtual Rangee? EtageRangee { get; set; }
        public int? ZoneId { get; set; }
        public int? SocieteId { get; set; }
        public int? SiteId { get; set; }
        public int? RangeeId { get; set; }
        public int? AlleeId { get; set; }
        public int? CodeBarreetageId { get; set; }
        public virtual CodeBarreEtage? CodeBarreetage { get; set; }
        public virtual ICollection<CodeBarreEtage> CodeBarreEtages { get; set; } = new List<CodeBarreEtage>();

        public virtual Zone? Zone { get; set; }
        public virtual Societe? Societe { get; set; }
        public virtual Allee? Allee { get; set; }
        public bool IsDeleted { get; set; } = false;
        public virtual Site? Site { get; set; }
        public virtual ICollection<Produit> Produits { get; set; } = new List<Produit>();
    }
}
