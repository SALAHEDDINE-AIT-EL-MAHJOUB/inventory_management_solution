namespace Domain.Entities
{
    public class Ville
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public int RegionId { get; set; }
        public Region Region { get; set; } // Propriété de navigation
        public virtual ICollection<Site>? Sites { get; set; }
         public virtual ICollection<Societe>? Societés { get; set; }

    public virtual Region? VilleRegion { get; set; }


    }
}
