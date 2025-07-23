namespace Domain.Entities
{
    public class Site
    {
        public int Id { get; set; }
        public string SiteNom { get; set; }
        public string Adresse { get; set; }
         public bool IsDeleted { get; set; }
        public long SocieteId { get; set; }
        public Societe Societe { get; set; } // Navigation property to Societe
    }
}
