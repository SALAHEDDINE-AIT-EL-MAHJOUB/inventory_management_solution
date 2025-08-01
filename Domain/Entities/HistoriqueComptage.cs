using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class HistoriqueComptage
    {
        public int Id { get; set; }
        public int ResultatInventaireId { get; set; }
        public ResultatInventaire Resultat { get; set; }

        public DateTime Horodatage { get; set; }
        public int QuantitéComptée { get; set; }
        public bool EstAnnulé { get; set; }
        public string? MotifModification { get; set; }
        public string? CommentaireOperateur { get; set; }
    }

}
