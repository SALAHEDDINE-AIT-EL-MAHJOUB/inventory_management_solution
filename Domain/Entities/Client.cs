namespace Domain.Entities
{
    public class Client
    {
        public int ClientId { get; set; } 
        public string Email { get; set; }
        public bool IsDeleted { get; set; }
        public string Adress { get; set; }
        public string Phone { get; set; }
        public string ClientNom { get; set; }
        public string? UserId { get; set; }

        public virtual User? User { get; set; }
        public DateTime ClientDateCreation { get; set; }
        public DateTime? ClientDateInactif { get; set; }
        public bool IsActive { get; set; } = false;
        public virtual ICollection<Societe> Societés { get; set; }
    }
}