using System.Text.Json.Serialization;



namespace Domain.Entities
{
    public class Site
    {
        public int Id { get; set; }
        public string SiteNom { get; set; }
        public string Adress { get; set; }
        public int? SiteTelephone { get; set; }
        public string Email { get; set; }
        public bool IsDeleted { get; set; }
        public long SocieteId { get; set; }

        [JsonIgnore]
       
        public Societe? Societe { get; set; } // Navigation property to Societe

        public int SiteVilleId { get; set; }

        [JsonIgnore]
       
        public Ville? SiteVille { get; set; } // Navigation property to Ville    

        public int? SiteSocieteId { get; set; }
public virtual Allee? Allees { get; set; }
        public virtual ICollection<Rangee>? Rangees { get; set; } = new List<Rangee>();
        
        public virtual ICollection<Inventaire>? Inventaires { get; set; }
        public virtual ICollection<Operateur>? Operateurs { get; set; }
        public virtual ICollection<CodeBarreOperateur>? CodeBarreOperateurs { get; set; }
        public virtual ICollection<Zone>? Zones { get; set; }
    }
}
