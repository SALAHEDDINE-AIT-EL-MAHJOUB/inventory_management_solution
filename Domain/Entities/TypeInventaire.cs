namespace Domain.Entities
{
    public class TypeInventaire
    {
        public int TypeInventaireId { get; set; }
        public string TypeInventaireNom { get; set; } = string.Empty;

        public virtual ICollection<Inventaire> Inventaires { get; set; } = new List<Inventaire>();
    }
}