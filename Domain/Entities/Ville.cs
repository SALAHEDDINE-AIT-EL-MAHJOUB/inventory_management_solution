namespace Domain.Entities
{
    public class Ville
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string RegionId { get; set; }
         public Region Region { get; set; } // Propriété de navigation
    }
}
