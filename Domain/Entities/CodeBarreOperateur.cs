namespace Domain.Entities
{
    public class CodeBarreOperateur
    {
     public int CodeBarreOperateurId { get; set; }

   
    public int? CodeBarreOperateurOperateurId { get; set; }
    public string Code { get; set; }

    public virtual Operateur? CodeBarreOperateurOperateur { get; set; }}
}