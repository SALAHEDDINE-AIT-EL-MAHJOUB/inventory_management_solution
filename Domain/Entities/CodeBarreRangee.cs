


namespace Domain.Entities;

public partial class CodeBarreRangee
{
    /// <summary>
    /// Identifiant unique pour chaque association entre un code-barres et une rangée.
    /// </summary>
    public int CodeBarreRangéeId { get; set; }

    /// <summary>
    /// Référence à l&apos;identifiant de la rangée avec ce code-barres est situé. C&apos;est une clé étrangère.
    /// </summary>
    public int? CodeBarreRangéeRangéeId { get; set; }

    public string? Code { get; set; }


    public virtual Rangee? CodeBarreRangéeRangée { get; set; }
}
