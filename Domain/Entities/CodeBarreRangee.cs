


namespace Domain.Entities;

public partial class CodeBarreRangee
{

    public int CodeBarreRangéeId { get; set; }

   public int CodeBarreRackId { get; set; }
    public int? CodeBarreRangéeRangéeId { get; set; }

    public string Code { get; set; }


    public virtual Rangee? CodeBarreRangéeRangée { get; set; }
}
