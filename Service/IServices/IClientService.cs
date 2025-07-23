using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IClientService
    {
        // Profil
        Task ModifierProfilAsync(Client client);

        // Inventaires
        Task<IEnumerable<Inventaire>> ConsulterInventairesAsync(int clientId);
        Task ConfigurerInventaireAsync(int clientId, Inventaire inventaire);
        Task AffecterEquipeAsync(int inventaireId, int equipeId);
        Task AffecterZonesAsync(int inventaireId, List<int> zoneIds);

        // Sociétés
        Task<IEnumerable<Societe>> ConsulterSocietesAsync(int clientId);
        Task AjouterSocieteAsync(Societe societe);
        Task ModifierSocieteAsync(Societe societe);
        Task SupprimerSocieteAsync(int societeId);

        // Emplacements
        Task<IEnumerable<Site>> ConsulterSitesAsync(int clientId);
        Task<IEnumerable<Zone>> ConsulterZonesAsync(int siteId);
        Task<IEnumerable<Rack>> ConsulterRacksAsync(int zoneId);
        Task<IEnumerable<Allee>> ConsulterAlleesAsync(int rackId);
        Task<IEnumerable<Etage>> ConsulterEtagesAsync(int rackId);
        Task<IEnumerable<Rangee>> ConsulterRangeesAsync(int rackId);

        // Produits
        Task<IEnumerable<Produit>> ConsulterProduitsAsync(int clientId);
        Task AjouterProduitAsync(Produit produit);
        Task ModifierProduitAsync(Produit produit);
        Task SupprimerProduitAsync(int produitId);

        // Opérateurs
        Task<IEnumerable<Operateur>> ConsulterOperateursAsync(int clientId);
        Task CreerOperateurAsync(Operateur operateur);
        Task ModifierOperateurAsync(Operateur operateur);
        Task SupprimerOperateurAsync(int operateurId);

        // Équipes
        Task<IEnumerable<Equipe>> ConsulterEquipesAsync(int clientId);
        Task CreerEquipeAsync(Equipe equipe);
        Task ModifierEquipeAsync(Equipe equipe);
        Task SupprimerEquipeAsync(int equipeId);
        Task AffecterOperateurAsync(int equipeId, int operateurId);
    }
}