namespace Service.Dtos.Operateur
{
    public class OperateurCreateDto
    {
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Cin { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string Password { get; set; }
        public int SiteId { get; set; }
    }
}