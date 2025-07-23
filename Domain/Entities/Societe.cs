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
        public string ClientId { get; set; }
        public string Nom { get; set; }
        
         public int? SocieteClientId { get; set; }
       public Client SocietéClient { get; set; } // Client name
        public string Email { get; set; }
     public bool IsDeleted { get; set; }
     public virtual ICollection<Site>? Sites { get; set; }

   
    public virtual Ville? SocietéVille { get; set; }
}
       
}