namespace Domain.Entities
{
    public class Operateur
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string cin { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public bool EstActif { get; set; } = true;
        public int SiteId { get; set; }
        public Site Site { get; set; } // Navigation property to Site
        public virtual ICollection<CodeBarreOperateur>? CodeBarreOperateurs { get; set; }
        public string? UserId { get; set; }
        public virtual ICollection<EquipeOperateur>? EquipeOperateurs { get; set; }
        public virtual Site? OperateurSite { get; set; }
        public virtual ICollection<ResultatInventaire>? ResultatInventaires { get; set; }
        public virtual User? User { get; set; } 
    }
}