namespace Domain.Entities
{
    public class Client
    {
        public int ClientId { get; set; }
        public string Email { get; set; }
        public bool IsDeleted { get; set; }
        public string UserId { get; set; }
        public string ClientNom { get; set; }
        public User User { get; set; }
    }
}