using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class Ville
    {
        public int Id { get; set; }
        public string Nom { get; set; } = string.Empty;

        [Required]
        public int RegionId { get; set; }
        public Region? Region { get; set; } // Propriété de navigation
        public virtual ICollection<Site>? Sites { get; set; }
      
        public virtual ICollection<Societe>? Societés { get; set; }
    }
}
