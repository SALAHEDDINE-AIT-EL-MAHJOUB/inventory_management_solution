namespace Domain.Entities
{
    public partial class OperationInventaire
{
    /// <summary>
    /// Identifiant unique pour chaque opération d&apos;inventaire. 
    /// </summary>
    public int OperationInventaireId { get; set; }

    /// <summary>
    /// Référence à l&apos;identifiant de la zone dans laquelle l&apos;opération d&apos;inventaire est réalisée. C&apos;est une clé étrangère qui fait référence à la table Zone.
    /// </summary>
    public int? OperationInventaireZoneId { get; set; }

    /// <summary>
    /// Référence à l&apos;identifiant de l&apos;inventaire auquel cette opération appartient. C&apos;est une clé étrangère qui fait référence à la table Inventaire.
    /// </summary>
    public int? OperationInventaireInventaireId { get; set; }
    public StatutZoneInventaire OperationInventaireStatut { get; set; }


    public virtual Inventaire? OperationInventaireInventaire { get; set; }

    public virtual Zone? OperationInventaireZone { get; set; }
}

}