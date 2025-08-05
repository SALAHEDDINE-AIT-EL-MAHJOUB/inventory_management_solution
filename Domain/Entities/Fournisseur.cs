namespace Domain.Entities
{
    public class Fournisseur
    {
        public int FournisseurId { get; set; }
        public string Nom { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
           public bool IsDeleted { get; set; }
    }
}