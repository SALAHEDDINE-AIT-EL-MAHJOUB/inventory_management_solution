namespace Domain.Entities
{
    public class Region
    {
        public int Id { get; set; }
        public string? Name { get; set; }
          

    public virtual ICollection<Ville> Villes { get; set; } = new List<Ville>();
    }
}
