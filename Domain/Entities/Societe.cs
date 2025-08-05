using System.Text.Json.Serialization;

namespace Domain.Entities
{
    public class Societe
    {
        public int Id { get; set; }
        public string RS { get; set; } //reson sociale
        public string IF { get; set; } // Identifiant Fiscal
        public string Adresse { get; set; }
        public string Telephone { get; set; }
        public string Ville { get; set; }
        public int ClientId { get; set; } // Doit être int si la clé primaire de Client est int
        public string Nom { get; set; }
         public int? VilleId { get; set; }
         public int? SocieteClientId { get; set; }
       public virtual Client SocietéClient { get; set; } // Client name
        public string Email { get; set; }
     public bool IsDeleted { get; set; }
     [JsonIgnore]
     public virtual ICollection<Site> Sites { get; set; }

   
    public virtual Ville? SocietéVille { get; set; }
}
       
}