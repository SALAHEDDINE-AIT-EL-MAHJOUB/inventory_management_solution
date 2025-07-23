namespace Domain.Entities
{
    public class EquipeOperateur
    {
 public int EquipeOperateurId { get; set; }

   
    public int? EquipeOperateurEquipeId { get; set; }
        public int? EquipeOperateurOperateurId { get; set; }

    public virtual Equipe? EquipeOperateurEquipe { get; set; }

    public virtual Operateur? EquipeOperateurOperateur { get; set; }


    }
}