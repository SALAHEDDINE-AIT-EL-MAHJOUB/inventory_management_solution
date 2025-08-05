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
        public virtual Site? ZoneSite { get; set; }
        public virtual ICollection<Allee>? Allee { get; set; }

        // Add these navigation properties:
        public virtual ICollection<CodeBarreZone>? CodeBarreZones { get; set; }
        public virtual ICollection<OperationInventaire>? OperationInventaires { get; set; }
    }
}