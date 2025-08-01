using System;

namespace Domain.Entities
{
    public class Alerte
    {
        public int AlerteId { get; set; }

        public string Message { get; set; } = string.Empty;

        public int? EquipeId { get; set; }
        public virtual Equipe? Equipe { get; set; }

        public DateTime DateAlerte { get; set; } = DateTime.UtcNow;

        public bool EstTraitee { get; set; } = false;

       
    }
}