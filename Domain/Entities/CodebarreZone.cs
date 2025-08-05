namespace Domain.Entities

{
    public class CodeBarreZone
    {
        public int ZoneId { get; set; }

    
        public string? ZoneNom { get; set; }

         public int? ZoneSiteId { get; set; }
         public bool? IsDeleted { get; set; }

          public virtual ICollection<Allee>? Allees { get; set; }

        public string Code { get; set; } = null!;
        public virtual ICollection<CodeBarreZone>? CodeBarreZones { get; set; }

    public virtual ICollection<OperationInventaire>? OperationInventaires { get; set; }
   public virtual Zone? CodeBarreZoneZone { get; set; }

    public virtual Site? ZoneSite { get; set; }
       
       
       
       
        }

}
    
