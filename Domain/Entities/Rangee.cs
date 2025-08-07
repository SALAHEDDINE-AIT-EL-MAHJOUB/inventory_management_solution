namespace Domain.Entities
{
    public class Rangee
    {
        public int RangeeId { get; set; }
        public string? RangeeNom { get; set; }

        // Clés étrangères
        public int? ZoneId { get; set; }
        public int? SocieteId { get; set; }
        public int? AlleeId { get; set; }
public int? SiteId { get; set; }
         public string? AlleeNom { get; set; }
        // Propriétés de navigation
      public virtual Zone? Zone { get; set; }
        public virtual Societe? Societe { get; set; }
        public virtual Allee? Allee { get; set; }
        public bool IsDeleted { get; set; } = false;
public virtual Site? Site { get; set; }

        public virtual ICollection<CodeBarreRangee>? CodeBarreRangees { get; set; }
      public virtual ICollection<Etage>? Etages { get; set; } = new List<Etage>();
    }
}