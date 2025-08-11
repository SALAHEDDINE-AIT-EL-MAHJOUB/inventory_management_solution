using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class TypeInventaire
    {
        [Column("TypeInventaire_Id")]
        public int TypeInventaireId { get; set; }

        [Column("TypeInventaire_libelle")]
        public string TypeInventaireLibelle { get; set; } = string.Empty;

        public virtual ICollection<Inventaire> Inventaires { get; set; } = new List<Inventaire>();
    }
}