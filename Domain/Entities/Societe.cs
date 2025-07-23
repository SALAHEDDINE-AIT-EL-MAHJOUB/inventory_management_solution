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
        public string CodePostal { get; set; }
        public string Pays { get; set; }
        public string Fax { get; set; }
        public string Slogan { get; set; }
        public string Logo { get; set; } // URL ou chemin vers le logo
    public Client SocietéClient { get; set; } // Client name
        public string Email { get; set; }
     public bool IsDeleted { get; set; }
     
       }
}