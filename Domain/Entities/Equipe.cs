namespace Domain.Entities
{
    public class Equipe
    {
         public int EquipeId { get; set; }

    public string EquipeLibelle { get; set; } = string.Empty; 


    public int? EquipeInventaireId { get; set; }

    public bool IsEquipeArbitrage { get; set; } = false; 

    public virtual Inventaire? EquipeInventaire { get; set; }

    public virtual ICollection<EquipeOperateur> EquipeOperateurs { get; set; } = new List<EquipeOperateur>();

    public virtual ICollection<ResultatInventaire> ResultatInventaires { get; set; } = new List<ResultatInventaire>();
    }
}
