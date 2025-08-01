namespace Domain.Entities
{
    public class CodeBarreEtage
    {
        public int CodeBarreEtageId { get; set; }
        public string Code { get; set; }
        public int? CodeBarreRangeeId { get; set; }
        public int? CodeBarreEtageEtageId { get; set; }
        public int Etage { get; set; }
        public virtual Etage? CodeBarreEtageEtage { get; set; }
        public virtual CodeBarreRangee? CodeBarreRangee { get; set; }
    }
}