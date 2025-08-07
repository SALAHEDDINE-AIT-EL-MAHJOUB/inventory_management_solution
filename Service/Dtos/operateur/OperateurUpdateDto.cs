namespace Service.Dtos.Operateur
{
    public class OperateurUpdateDto
    {
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public int SiteId { get; set; }
        public bool EstActif { get; set; }
    }
}
