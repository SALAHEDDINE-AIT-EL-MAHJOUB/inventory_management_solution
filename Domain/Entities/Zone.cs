using System;
using System.Collections.Generic;


namespace Domain.Entities
{
    public class Zone
    {
        public int ZoneId { get; set; }
        public string ZoneNom { get; set; }
        public bool? IsDeleted { get; set; }
        public int? ZoneSiteId { get; set; }
        public int? SocieteId { get; set; } 
        public string? SocieteNom { get; set; } 

        public virtual Site? ZoneSite { get; set; }
        public virtual Societe? Societe { get; set; } 
 public virtual ICollection<Etage>? Etages { get; set; } = new List<Etage>();
        public virtual ICollection<Allee>? Allee { get; set; }
        public virtual ICollection<Rangee> Rangees { get; set; } = new List<Rangee>();
        public virtual ICollection<CodeBarreZone>? CodeBarreZones { get; set; }
        public virtual ICollection<OperationInventaire>? OperationInventaires { get; set; }
    }
}