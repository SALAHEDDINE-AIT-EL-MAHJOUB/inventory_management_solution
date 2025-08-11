using System.Linq;
using Domain.Entities;

namespace Repository.Data
{
    public static class StatutSeeder
    {
        public static void SeedStatut(ApplicationDbContext context)
        {
            if (!context.Statut.Any())
            {
                context.Statut.AddRange(
                    new Statut { StatutNom = "NonCommence", StatutLibelle = "Non commencé" },
                    new Statut { StatutNom = "EnCoursComptage1", StatutLibelle = "En cours comptage 1" },
                    new Statut { StatutNom = "TerminéComptage1", StatutLibelle = "Terminé comptage 1" },
                    new Statut { StatutNom = "EnCoursComptage2", StatutLibelle = "En cours comptage 2" },
                    new Statut { StatutNom = "TerminéComptage2", StatutLibelle = "Terminé comptage 2" },
                    new Statut { StatutNom = "EnCoursArbitrage", StatutLibelle = "En cours arbitrage" },
                    new Statut { StatutNom = "TerminéArbitrage", StatutLibelle = "Terminé arbitrage" }
                );
                context.SaveChanges();
            }
        }
    }
}