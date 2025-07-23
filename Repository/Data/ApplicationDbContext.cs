using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Domain.Authentication;
using Domain.Entities;
using Microsoft.AspNetCore.Identity; 
namespace Repository.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, Role, string, 
        IdentityUserClaim<string>, UserRole, IdentityUserLogin<string>, 
        IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Ajoute un DbSet pour chaque entité
        public DbSet<Client> Clients { get; set; }
        public DbSet<Operateur> Operateurs { get; set; }
        public DbSet<Site> Sites { get; set; }
        public DbSet<Societe> Societes { get; set; }
        public DbSet<Zone> Zones { get; set; }
        public DbSet<Allee> Allees { get; set; }
        public DbSet<Rack> Racks { get; set; }
        public DbSet<Rangee> Rangees { get; set; }
        public DbSet<Etage> Etages { get; set; }
        public DbSet<Produit> Produits { get; set; }
        public DbSet<FormProduit> FormProduits { get; set; }
        public DbSet<ResultatInventaire> ResultatInventaires { get; set; }
        public DbSet<Inventaire> Inventaires { get; set; }
        public DbSet<Equipe> Equipes { get; set; }
        public DbSet<EquipeOperateur> EquipeOperateurs { get; set; }
        public DbSet<CodeBarreAllee> CodeBarreAllees { get; set; }
        public DbSet<CodeBarreRack> CodeBarreRacks { get; set; }
        public DbSet<CodeBarreRangee> CodeBarreRangees { get; set; }
        public DbSet<CodeBarreEtage> CodeBarreEtages { get; set; }
        public DbSet<CodeBarreOperateur> CodeBarreOperateurs { get; set; }
        public DbSet<CodeBarreZone> CodeBarreZones { get; set; }
        public DbSet<HistoriqueComptage> HistoriqueComptages { get; set; }
        public DbSet<Statut> Statuts { get; set; }
        public DbSet<TypeInventaire> TypeInventaires { get; set; }
        public DbSet<OperationInventaire> OperationInventaires { get; set; }
        public DbSet<Ville> Villes { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<Admin> Admins { get; set; }
       
    }
}
