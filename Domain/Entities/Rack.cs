namespace Domain.Entities
{
    public partial class Rack
{
    
    public int RackId { get; set; }

    public string? RackNom { get; set; }

  
    public int? RackAlleeId { get; set; }
    public bool? IsDeleted { get; set; }

    public virtual ICollection<CodeBarreRack>? CodeBarreRacks { get; set; }

    public virtual Allee? RackAllee { get; set; }

    public virtual ICollection<Rangee>? Rangées { get; set; } 
}
}