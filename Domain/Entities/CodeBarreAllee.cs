namespace Domain.Entities
{
    public partial class CodeBarreAllee
{
   
    public int CodeBarreAlleeId { get; set; }
    public int CodeBarreZoneId { get; set; }
    public int? CodeBarreAlleeAlleeId { get; set; }

    public string Code { get; set; }
public virtual CodeBarreZone? CodeBarreZone { get; set; }
    public virtual Allee? CodeBarreAlleeAllee { get; set; }
}

}