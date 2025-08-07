namespace Domain.Entities
{
    public class Allee
    {
        public int AlleeId { get; set; }
        public string? AlleeNom { get; set; }

        // Foreign keys
        public int? AlleeZoneId { get; set; }
        public int? SocieteId { get; set; }
        public int? SiteId { get; set; }

        // Denormalized names for display/search
        public string? ZoneNom { get; set; }
        public string? SocieteNom { get; set; }
        public string? SiteNom { get; set; }

        // Navigation properties
        public virtual Zone? AlleeZone { get; set; }
        public virtual Societe? Societe { get; set; }
        public virtual Site? Site { get; set; }
        public virtual ICollection<CodeBarreAllee>? CodeBarreAllees { get; set; }
        public virtual ICollection<Rangee> Rangees { get; set; } = new List<Rangee>();
 public virtual ICollection<CodeBarreAllee>? CodeBarreAllee { get; set; }
         public virtual ICollection<Etage>? Etages { get; set; } = new List<Etage>();
        public bool IsDeleted { get; set; }
    }
}
