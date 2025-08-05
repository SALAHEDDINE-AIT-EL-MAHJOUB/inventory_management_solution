namespace Domain.Entities
{
    public class Allee
    {
        public int AlleeId { get; set; }

        public string? AlleeNom { get; set; }

        public int? AlleeZoneId { get; set; }
    public bool? IsDeleted { get; set; }

    public virtual Zone? AlleeZone { get; set; }

    public virtual ICollection<CodeBarreAllee>? CodeBarreAllee { get; set; }

     
  
 }
    }
