namespace Domain.Entities
{
    public class Rangee
    {
       public int RangeeId { get; set; }

    
    public string? RangeeNom { get; set; }

   
       public bool IsDeleted { get; set; } = false; // Add this property and initialize to false

    public virtual ICollection<CodeBarreRangee>? CodeBarreRangees { get; set; } 

    public virtual ICollection<Etage>? Etages { get; set; }
 }
}