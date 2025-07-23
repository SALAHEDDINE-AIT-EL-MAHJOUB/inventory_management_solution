namespace Domain.Entities
{public partial class CodeBarreRack
{
    
    public int CodeBarreRackId { get; set; }

    public int? CodeBarreRackRackId { get; set; }

    public string? Code { get; set; }

    public virtual Rack? CodeBarreRackRack { get; set; }
}
}