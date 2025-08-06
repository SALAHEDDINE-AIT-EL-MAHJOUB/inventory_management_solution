namespace Domain.Entities
{
    public class Etage
    {
        public int Id { get; set; }
        public string Nom { get; set; }

        // Ajout de la clé étrangère vers Rangee
        public int RangeeId { get; set; }
        public virtual Rangee? EtageRangee { get; set; }

        public int AlleeId { get; set; }
        public int? CodeBarreetageId { get; set; }
        public virtual CodeBarreEtage? CodeBarreetage { get; set; }
        public virtual ICollection<CodeBarreEtage> CodeBarreEtages { get; set; } = new List<CodeBarreEtage>();

        public bool IsDeleted { get; set; } = false;

        public virtual Allee? EtageAllee { get; set; }
        public virtual ICollection<Produit> Produits { get; set; } = new List<Produit>();
    }
}
