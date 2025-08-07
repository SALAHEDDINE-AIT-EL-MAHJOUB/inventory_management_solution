using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Domain.Authentication;
using Domain.Entities;
using Microsoft.AspNetCore.Identity; 
using Domain.Models.user;
namespace Repository.Data
{
    public partial class ApplicationDbContext : IdentityDbContext<User, IdentityRole, string, 
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
       
        public DbSet<Rangee> Rangees { get; set; }
        public DbSet<Etage> Etages { get; set; }
        public DbSet<Produit> Produits { get; set; }
        public DbSet<GestionProduit> GestionProduit { get; set; }
        public DbSet<ResultatInventaire> ResultatInventaires { get; set; }
        public DbSet<Inventaire> Inventaires { get; set; }
        public DbSet<Equipe> Equipes { get; set; }
        public DbSet<EquipeOperateur> EquipeOperateurs { get; set; }
        public DbSet<CodeBarreAllee> CodeBarreAllees { get; set; }
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
       public DbSet<Fournisseur> Fournisseurs { get; set; }
        public DbSet<CodeBarreCommercial> CodeBarreCommercials { get; set; }

       public DbSet<CodebarreProduit> CodebarreProduits { get; set; }





                

       protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            // Configuration de l'entité Admin
            modelBuilder.Entity<Admin>(entity =>
            {
                entity.HasKey(a => a.AdminId);
                entity.Property(a => a.AdminName).IsRequired().HasMaxLength(100);
                entity.Property(a => a.Email).IsRequired().HasMaxLength(256);
                entity.Property(a => a.UserId)
                      .HasColumnName("Admin_AspNetUsersId")
                      .IsRequired(false); // Si un admin peut exister sans user
                entity.HasOne(a => a.User)
                      .WithMany(u => u.Admins)
                      .HasForeignKey(a => a.UserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Allee>(entity =>
            {
                entity.HasKey(e => e.AlleeId).HasName("PK__Allee__58D55A03052B8413");

                entity.ToTable("Allee");

                entity.Property(e => e.AlleeId)
                    .HasComment("Identifiant unique pour chaque Allee.")
                    .HasColumnName("Allee_Id");
                entity.Property(e => e.AlleeNom)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("Nom de l'Allee")
                    .HasColumnName("Allee_Nom");
                entity.Property(e => e.AlleeZoneId)
                    .HasComment("Référence à l'identifiant de la zone à laquelle l'Allee appartient. C'est une clé étrangère.")
                    .HasColumnName("Allee_ZoneId");

                entity.HasOne(d => d.AlleeZone).WithMany(p => p.Allee)
                    .HasForeignKey(d => d.AlleeZoneId)
                    .HasConstraintName("Allee_ZoneId");
 entity.Property(e => e.ZoneNom).HasColumnName("zoneNom");
                entity.Property(e => e.SocieteNom).HasColumnName("societeNom")
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasComment("Nom de la société liée à l'allée.");
                entity.Property(e => e.SiteNom).HasColumnName("siteNom");
            });

            // Configuration de l'entité Client
            modelBuilder.Entity<Client>(entity =>
            {
                entity.HasKey(e => e.ClientId).HasName("PK__Client__BF554B6CE4B28D07");

                entity.ToTable("Client");

                entity.HasIndex(e => e.Email, "UQ__Client__A7A650D3FAE098F8").IsUnique();

                entity.Property(e => e.ClientId)
                    .HasComment("Identifiant unique pour chaque client")
                    .HasColumnName("client_Id");
                entity.Property(e => e.Adress)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("Adresse physique du client")
                    .HasColumnName("client_Adress");
                entity.Property(e => e.ClientDateCreation)
                    .HasComment("Date de création du client dans le système")
                    .HasColumnName("client_DateCreation");
                entity.Property(e => e.ClientDateInactif)
                    .HasComment("Date à partir de laquelle le client est devenu inactif")
                    .HasColumnName("client_DateInactif");
                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasComment("Adresse e-mail du client")
                    .HasColumnName("client_Email");
                entity.Property(e => e.IsActive)
                    .HasDefaultValue(true)
                    .HasComment("Indique si le client est actif (1 = actif, 0 = inactif)")
                    .HasColumnName("client_IsActive");
                entity.Property(e => e.ClientNom)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("Nom du client")
                    .HasColumnName("client_Nom");
                entity.Property(e => e.Phone)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasComment("Numéro de téléphone du client")
                    .HasColumnName("client_Telephone");
                entity.Property(e => e.UserId)
                    .HasColumnName("Client_AspNetUsersId")
                    .IsRequired(false);
                entity.HasOne(c => c.User)
                    .WithMany(u => u.Clients)
                    .HasForeignKey(c => c.UserId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.Entity<CodeBarreAllee>(entity =>
            {
                entity.HasKey(e => e.CodeBarreAlleeId).HasName("PK__CodeBarr__3A7C90A2A4168A7F");

                entity.ToTable("CodeBarreAllee");

                entity.Property(e => e.CodeBarreAlleeId)
                    .HasComment("Identifiant unique pour chaque association entre un code-barres et une Allee.")
                    .HasColumnName("CodeBarreAllee_Id");
                entity.Property(e => e.CodeBarreAlleeAlleeId)
                    .HasComment("Référence à l'identifiant de l'Allee avec ce code-barres est situé. C'est une clé étrangère.")
                    .HasColumnName("CodeBarreAllee_AlleeId");

                entity.HasOne(d => d.CodeBarreAlleeAllee).WithMany(p => p.CodeBarreAllee)
                    .HasForeignKey(d => d.CodeBarreAlleeAlleeId)
                    .HasConstraintName("CodeBarreAllee_AlleeId");

                modelBuilder.Entity<CodeBarreAllee>()
                     .HasIndex(c => c.Code)
                     .IsUnique();

            });

            modelBuilder.Entity<CodeBarreEtage>(entity =>
            {
                entity.HasKey(e => e.CodeBarreEtageId).HasName("PK__CodeBarr__EC532EC1B8307F25");

                entity.ToTable("CodeBarreEtage");

                entity.Property(e => e.CodeBarreEtageId)
                    .HasComment("Identifiant unique pour chaque association entre un code-barres et un étage.")
                    .HasColumnName("CodeBarreEtage_Id");
                entity.Property(e => e.CodeBarreEtageEtageId)
                    .HasComment("Référence à l'identifiant de l'étage avec ce code-barres est situé. C'est une clé étrangère.")
                    .HasColumnName("CodeBarreEtage_EtageId");

                entity.HasOne(d => d.CodeBarreEtageEtage).WithMany(p => p.CodeBarreEtages)
                    .HasForeignKey(d => d.CodeBarreEtageEtageId)
                    .HasConstraintName("CodeBarreEtage_EtageId");
                 entity.Property(e => e.Code)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("CodeBarreEtage_Code");
                modelBuilder.Entity<CodeBarreEtage>()
                    .HasIndex(c => c.Code)
                    .IsUnique();
            });

            modelBuilder.Entity<CodeBarreOperateur>(entity =>
            {
                entity.HasKey(e => e.CodeBarreOperateurId).HasName("PK__CodeBarr__9C140E7C2F7FFFC2");

                entity.ToTable("CodeBarreOperateur");

                entity.Property(e => e.CodeBarreOperateurId)
                    .HasComment("Identifiant unique pour chaque association entre un opérateur et un code-barres.")
                    .HasColumnName("CodeBarreOperateur_Id");
                entity.Property(e => e.CodeBarreOperateurOperateurId)
                    .HasComment("Référence à l'identifiant de l'opérateur, lié à la table Operateur.")
                    .HasColumnName("CodeBarreOperateur_OperateurId");

                entity.HasOne(d => d.CodeBarreOperateurOperateur).WithMany(p => p.CodeBarreOperateurs)
                    .HasForeignKey(d => d.CodeBarreOperateurOperateurId)
                    .HasConstraintName("CodeBarreOperateur_OperateurId");

                entity.Property(e => e.Code)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("CodeBarreOperateur_Code");

                modelBuilder.Entity<CodeBarreOperateur>()
                   .HasIndex(c => c.Code)
                   .IsUnique();
            });



            modelBuilder.Entity<CodeBarreRangee>(entity =>
            {
                entity.HasKey(e => e.CodeBarreRangéeId).HasName("PK__CodeBarr__47535DFE57D2BBF1");

                entity.ToTable("CodeBarreRangée");

                entity.Property(e => e.CodeBarreRangéeId)
                    .HasComment("Identifiant unique pour chaque association entre un code-barres et une rangée.")
                    .HasColumnName("CodeBarreRangée_Id");
                entity.Property(e => e.CodeBarreRangéeRangéeId)
                    .HasComment("Référence à l'identifiant de la rangée avec ce code-barres est situé. C'est une clé étrangère.")
                    .HasColumnName("CodeBarreRangée_RangéeId");

                entity.HasOne(d => d.CodeBarreRangéeRangée).WithMany(p => p.CodeBarreRangees)
                    .HasForeignKey(d => d.CodeBarreRangéeRangéeId)
                    .HasConstraintName("CodeBarreRangée_RangéeId");
                entity.Property(e => e.Code)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("CodeBarreRangee_Code");
                modelBuilder.Entity<CodeBarreRangee>()
                    .HasIndex(c => c.Code)
                    .IsUnique();
            });

            modelBuilder.Entity<CodeBarreZone>(entity =>
            {
                entity.HasKey(e => e.ZoneId).HasName("PK__CodeBarr__F046EBC6C1681EC7");

                entity.ToTable("CodeBarreZone");

                entity.Property(e => e.ZoneId)
                    .HasComment("Identifiant unique pour chaque association entre un code-barres et une zone.")
                    .HasColumnName("CodeBarreZone_Id");
                entity.Property(e => e.ZoneId)
                    .HasComment("Référence à l'identifiant de la zone avec ce code-barres est situé. C'est une clé étrangère.")
                    .HasColumnName("CodeBarreZone_ZoneId");

                entity.HasOne(d => d.CodeBarreZoneZone)
                    .WithMany(p => p.CodeBarreZones)
                    .HasForeignKey(d => d.ZoneId)
                    .HasConstraintName("CodeBarreZone_ZoneId");
                entity.Property(e => e.Code)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("CodeBarreZone_Code");


                modelBuilder.Entity<CodeBarreZone>()
                    .HasIndex(c => c.Code)
                    .IsUnique();

            });

            modelBuilder.Entity<Equipe>(entity =>
            {
                entity.HasKey(e => e.EquipeId).HasName("PK__Equipe__C93C5DE8C09622F5");

                entity.ToTable("Equipe");

                entity.Property(e => e.EquipeId)
                    .HasComment("Identifiant unique pour chaque équipe.")
                    .HasColumnName("Equipe_Id");
                entity.Property(e => e.EquipeInventaireId)
                    .HasComment("Référence à l'identifiant de l'inventaire associé à cette équipe. C'est une clé étrangère qui fait référence à la table Inventaire.")
                    .HasColumnName("Equipe_InventaireId");

                entity.HasOne(d => d.EquipeInventaire).WithMany(p => p.Equipes)
                    .HasForeignKey(d => d.EquipeInventaireId)
                    .HasConstraintName("Equipe_InventaireId");
            });

            modelBuilder.Entity<EquipeOperateur>(entity =>
            {
                entity.HasKey(e => e.EquipeOperateurId).HasName("PK__EquipeOp__CD3D157BD1E82B84");

                entity.ToTable("EquipeOperateur");

                entity.Property(e => e.EquipeOperateurId)
                    .HasComment("Identifiant unique pour chaque enregistrement dans la relation équipe-opérateur.")
                    .HasColumnName("EquipeOperateur_Id");
                entity.Property(e => e.EquipeOperateurEquipeId)
                    .HasComment("Référence à l'identifiant de l'équipe dans laquelle l'opérateur est affecté. C'est une clé étrangère qui fait référence à la table Equipe.")
                    .HasColumnName("EquipeOperateur_EquipeId");
                entity.Property(e => e.EquipeOperateurOperateurId)
                    .HasComment("Référence à l'identifiant de l'opérateur affecté à l'équipe. C'est une clé étrangère qui fait référence à la table Operateur.")
                    .HasColumnName("EquipeOperateur_OperateurId");

                entity.HasOne(d => d.EquipeOperateurEquipe).WithMany(p => p.EquipeOperateurs)
                    .HasForeignKey(d => d.EquipeOperateurEquipeId)
                    .HasConstraintName("EquipeOperateur_EquipeId");

                entity.HasOne(d => d.EquipeOperateurOperateur).WithMany(p => p.EquipeOperateurs)
                    .HasForeignKey(d => d.EquipeOperateurOperateurId)
                    .HasConstraintName("EquipeOperateur_OperateurId");
            });

            modelBuilder.Entity<Etage>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Etage__0F13A9CBE9AFC812");

                entity.ToTable("Etage");

                entity.Property(e => e.Id)
                    .HasComment("Identifiant unique pour chaque étage")
                    .HasColumnName("Etage_Id");
                entity.Property(e => e.Nom)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("Nom de l'étage")
                    .HasColumnName("Etage_Nom");
                entity.Property(e => e.RangeeId)
                    .HasComment("Référence à l'identifiant de la rangée dans laquelle l'étage est situé. C'est une clé étrangère.")
                    .HasColumnName("Etage_RangéeId");

                entity.HasOne(d => d.EtageRangee).WithMany(p => p.Etages)
                    .HasForeignKey(d => d.RangeeId)
                    .HasConstraintName("Etage_RangéeId");
            });

          

            modelBuilder.Entity<Inventaire>(entity =>
            {
                entity.HasKey(e => e.InventaireId).HasName("PK__Inventai__4645A98DF52C4799");

                entity.ToTable("Inventaire");

                entity.Property(e => e.InventaireId)
                    .HasComment("Identifiant unique pour chaque inventaire.")
                    .HasColumnName("Inventaire_Id");
                entity.Property(e => e.InventaireDate)
                    .HasComment("Date de l'inventaire.")
                    .HasColumnName("Inventaire_Date");
                entity.Property(e => e.InventaireIsTotal)
                    .HasComment("Indicateur qui spécifie si l'inventaire est total (1) ou partiel (0).")
                    .HasColumnName("Inventaire_IsTotal");
                entity.Property(e => e.InventaireLibelle)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("Libellé ou nom de l'inventaire")
                    .HasColumnName("Inventaire_libelle");
                entity.Property(e => e.InventaireSiteId)
                    .HasComment("Référence au site où l'inventaire est effectué, lié à l'identifiant du site dans la table Site.")
                    .HasColumnName("Inventaire_SiteId");
                entity.Property(e => e.InventaireStatutId)
                    .HasComment("Référence au statut de l'inventaire, lié à l'identifiant du statut dans la table Statut.")
                    .HasColumnName("Inventaire_StatutId");
                entity.Property(e => e.InventaireTypeInventaireId)
                    .HasComment("Référence au type d'inventaire, lié à l'identifiant du type dans la table TypeInventaire.")
                    .HasColumnName("Inventaire_TypeInventaireId");

                entity.HasOne(d => d.InventaireSite).WithMany(p => p.Inventaires)
                    .HasForeignKey(d => d.InventaireSiteId)
                    .HasConstraintName("Inventaire_SiteId");

                entity.HasOne(d => d.InventaireStatut).WithMany(p => p.Inventaires)
                    .HasForeignKey(d => d.InventaireStatutId)
                    .HasConstraintName("Inventaire_StatutId");

                entity.HasOne(d => d.InventaireTypeInventaire).WithMany(p => p.Inventaires)
                    .HasForeignKey(d => d.InventaireTypeInventaireId)
                    .HasConstraintName("Inventaire_TypeInventaireId");
            });

            // Configuration de l'entité Operateur
            modelBuilder.Entity<Operateur>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Operateu__DD6FAFB1471872AD");

                entity.ToTable("Operateur");

                entity.Property(e => e.Id)
                    .HasComment("Identifiant unique pour chaque opérateur.")
                    .HasColumnName("Operateur_Id");
                entity.Property(e => e.Cin)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("Numéro de carte d'identité nationale de l'opérateur.")
                    .HasColumnName("Operateur_Cin");
                entity.Property(e => e.Nom)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("Nom de l'opérateur.")
                    .HasColumnName("Operateur_Nom");
                entity.Property(e => e.Prenom)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("Prénom de l'opérateur.")
                    .HasColumnName("Operateur_Prenom");
                entity.Property(e => e.SiteId)
                    .HasComment("Référence à l'identifiant du site où l'opérateur travaille. C'est une clé étrangère qui fait référence à la table Site.")
                    .HasColumnName("Operateur_SiteId");
                entity.HasOne(d => d.Site).WithMany(p => p.Operateurs)
                    .HasForeignKey(d => d.SiteId)
                    .OnDelete(DeleteBehavior.Restrict) 
                    .HasConstraintName("Operateur_SiteId");
                entity.Property(e => e.UserId)
                    .HasColumnName("Operateur_AspNetUsersId")
                    .IsRequired(false);
                entity.HasOne(o => o.User)
                    .WithMany(u => u.Operateurs)
                    .HasForeignKey(o => o.UserId)
                    .OnDelete(DeleteBehavior.SetNull);
            });




            modelBuilder.Entity<OperationInventaire>(entity =>
            {
                entity.HasKey(e => e.OperationInventaireId).HasName("PK__Operatio__18B7EDD044030108");

                entity.ToTable("OperationInventaire");

                entity.Property(e => e.OperationInventaireId)
                    .HasComment("Identifiant unique pour chaque opération d'inventaire. ")
                    .HasColumnName("OperationInventaire_Id");
                entity.Property(e => e.OperationInventaireInventaireId)
                    .HasComment("Référence à l'identifiant de l'inventaire auquel cette opération appartient. C'est une clé étrangère qui fait référence à la table Inventaire.")
                    .HasColumnName("OperationInventaire_InventaireId");
                entity.Property(e => e.OperationInventaireZoneId)
                    .HasComment("Référence à l'identifiant de la zone dans laquelle l'opération d'inventaire est réalisée. C'est une clé étrangère qui fait référence à la table Zone.")
                    .HasColumnName("OperationInventaire_ZoneId");

                entity.HasOne(d => d.OperationInventaireInventaire).WithMany(p => p.OperationInventaires)
                    .HasForeignKey(d => d.OperationInventaireInventaireId)
                    .HasConstraintName("OperationInventaire_InventaireId");

                entity.HasOne(d => d.OperationInventaireZone).WithMany(p => p.OperationInventaires)
                    .HasForeignKey(d => d.OperationInventaireZoneId)
                    .HasConstraintName("OperationInventaire_ZoneId");
            });

              modelBuilder.Entity<Produit>(entity =>
            {
                entity.HasKey(p => p.Id);

                entity.Property(p => p.Nom)
                      .IsRequired()
                      .HasMaxLength(200);

                entity.Property(p => p.Prix)
                      .HasColumnType("decimal(18,2)");

                entity.HasOne(p => p.Fournisseur)
                      .WithMany()
                      .HasForeignKey(p => p.FournisseurId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(p => p.GestionProduit)
                      .WithOne(fp => fp.GestionProduitProduit)
                      .HasForeignKey(fp => fp.ProduitId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(p => p.CodebarreProduits)
                    .WithOne(cb => cb.Produit)
                    .HasForeignKey(cb => cb.ProduitId)
                    .OnDelete(DeleteBehavior.Cascade);


                entity.Property(p => p.IsDeleted)
                      .HasDefaultValue(false);
            });

            modelBuilder.Entity<Rangee>(entity =>
            {
                entity.HasKey(e => e.RangeeId).HasName("PK__Rangee__13CD194487C697CF");

                entity.ToTable("Rangee");

                entity.Property(e => e.RangeeId)
                    .HasComment("Identifiant unique pour chaque rangée")
                    .HasColumnName("Rangée_Id");
                entity.Property(e => e.RangeeNom)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("Nom de la rangée")
                    .HasColumnName("Rangée_Nom");
                entity.Property(e => e.IsDeleted)
                    .HasDefaultValue(false)
                    .HasComment("Indique si la rangée est supprimée (true) ou active (false)")
                    .HasColumnName("Rangée_IsDeleted");
                    
                entity.HasOne(r => r.Zone)
        .WithMany(z => z.Rangees)
        .HasForeignKey(r => r.ZoneId)
        .OnDelete(DeleteBehavior.NoAction)
        .HasConstraintName("FK_Rangee_Zone");

    entity.HasOne(r => r.Societe)
        .WithMany(s => s.Rangees)
        .HasForeignKey(r => r.SocieteId)
        .OnDelete(DeleteBehavior.NoAction)
        .HasConstraintName("FK_Rangee_Societe");
              
            });

            modelBuilder.Entity<Region>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Region__A9EAD4FFE34950BA");

                entity.ToTable("Region");

                entity.Property(e => e.Id)
                    .HasComment("Identifiant unique pour chaque région. C'est la clé primaire.")
                    .HasColumnName("Region_Id");
                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("Nom de la région.")
                    .HasColumnName("Region_Nom");
            });

            modelBuilder.Entity<ResultatInventaire>(entity =>
            {
                entity.HasKey(e => e.ResultatInventaireId).HasName("PK__Resultat__AABC56D849C78C73");

                entity.ToTable("ResultatInventaire");

                entity.Property(e => e.ResultatInventaireId)
                    .HasComment("Identifiant unique pour chaque enregistrement de résultat d'inventaire.")
                    .HasColumnName("ResultatInventaire_Id");
                entity.Property(e => e.ResultatInventaireEquipeId)
                    .HasComment("Référence à l'identifiant de l'équipe responsable de l'inventaire, liée à la table Equipe.")
                    .HasColumnName("ResultatInventaire_EquipeId");
                entity.Property(e => e.ResultatInventaireGestionProduitId)
                    .HasComment("Référence à l'identifiant du produit géré, lié à la table GestionProduit.")
                    .HasColumnName("ResultatInventaire_GestionProduitId");
                entity.Property(e => e.ResultatInventaireInventaireId)
                    .HasComment("Référence à l'identifiant de l'inventaire, liée à la table Inventaire.")
                    .HasColumnName("ResultatInventaire_InventaireId");
                entity.Property(e => e.ResultatInventaireOperateurId)
                    .HasComment("Référence à l'identifiant de l'opérateur qui a participé à l'inventaire, liée à la table Operateur.")
                    .HasColumnName("ResultatInventaire_OperateurId");

                entity.HasOne(d => d.ResultatInventaireEquipe).WithMany(p => p.ResultatInventaires)
                    .HasForeignKey(d => d.ResultatInventaireEquipeId)
                    .HasConstraintName("ResultatInventaire_EquipeId");

                entity.HasOne(d => d.ResultatInventaireGestionProduit).WithMany(p => p.ResultatInventaires)
                    .HasForeignKey(d => d.ResultatInventaireGestionProduitId)
                    .HasConstraintName("ResultatInventaire_GestionProduitId");

                entity.HasOne(d => d.ResultatInventaireInventaire).WithMany(p => p.ResultatInventaires)
                    .HasForeignKey(d => d.ResultatInventaireInventaireId)
                    .HasConstraintName("ResultatInventaire_InventaireId");

                entity.HasOne(d => d.ResultatInventaireOperateur).WithMany(p => p.ResultatInventaires)
                    .HasForeignKey(d => d.ResultatInventaireOperateurId)
                    .HasConstraintName("ResultatInventaire_OperateurId");
            });

            modelBuilder.Entity<Site>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Site__E422232E1CD135AA");

                entity.ToTable("Site");

                entity.HasIndex(e => e.Adress, "UQ__Site__442E7CDE2D3D21D9").IsUnique();

                entity.Property(e => e.Id)
                    .HasComment(" Identifiant unique du site")
                    .HasColumnName("Site_Id");
                entity.Property(e => e.Adress)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasComment("Adresse physique du site")
                    .HasColumnName("Site_Adress");
                entity.Property(e => e.SiteNom)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("Nom du site")
                    .HasColumnName("Site_Nom");
                entity.Property(e => e.SiteTelephone)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Site_Telephone");
                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Site_Email");
                entity.Property(e => e.SiteSocieteId)
                    .HasComment("Identifiant de la société propriétaire du site")
                    .HasColumnName("Site_SocieteId");
                entity.Property(e => e.SiteVilleId)
                    .HasComment("Clé étrangère qui fait référence à Ville_Id dans la table Ville, indiquant la ville où se trouve le site.")
                    .HasColumnName("Site_VilleId");

                entity.HasOne(d => d.Societe).WithMany(s => s.Sites)
                    .HasForeignKey(sc => sc.SiteSocieteId)
                    .HasConstraintName("Site_SocieteId");

                entity.HasOne(sv => sv.SiteVille).WithMany(s => s.Sites)
                    .HasForeignKey(svi => svi.SiteVilleId)
                    .HasConstraintName("Site_VilleId");
            });

            modelBuilder.Entity<Societe>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Societé__04358C9F3CFB2E8D");

                entity.ToTable("Societé");

                entity.HasIndex(e => e.Adresse, "UQ__Societé__E5F76C6DFED7C7AE").IsUnique();

                entity.Property(e => e.Id)
                    .HasComment("Identifiant unique de la société")
                    .HasColumnName("Societé_Id");
                entity.Property(e => e.Adresse)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasComment("Adresse de la société")
                    .HasColumnName("Societé_Adress");
                entity.Property(e => e.ClientId)
                    .HasComment("Clé étrangère qui fait référence à client_ID dans la table Client, indiquant le client associé à la société.")
                    .HasColumnName("Societé_ClientId");
                entity.Property(e => e.IF)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("Numéro d'identification fiscale de la société")
                    .HasColumnName("Societé_If");
                entity.Property(e => e.RS)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("Raison sociale ou nom de la société")
                    .HasColumnName("Societé_Rs");
                entity.Property(e => e.Telephone)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasComment("Numéro de téléphone de la société")
                    .HasColumnName("Societé_Telephone");
                entity.Property(e => e.VilleId)
                    .HasComment("Clé étrangère qui fait référence à la table Ville (par exemple, pour stocker l'ID de la ville où se trouve le siège de la société).")
                    .HasColumnName("Societé_VilleId");

                entity.HasOne(d => d.SocietéClient).WithMany(p => p.Societés)
                    .HasForeignKey(d => d.ClientId)
                    .HasConstraintName("Societé_ClientId");

                entity.HasOne(d => d.SocietéVille).WithMany(p => p.Societés)
                    .HasForeignKey(d => d.VilleId)
                    .HasConstraintName("Societé_VilleId");
            });

            modelBuilder.Entity<Statut>(entity =>
            {
                entity.HasKey(e => e.StatutId).HasName("PK__Statut__C9A2F59F5987DD15");

                entity.ToTable("Statut");

                entity.Property(e => e.StatutId)
                    .HasComment("Identifiant unique pour chaque statut.")
                    .HasColumnName("Statut_Id");
                entity.Property(e => e.StatutNom)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("Nom du statut")
                    .HasColumnName("Statut_Nom");
            });

            modelBuilder.Entity<TypeInventaire>(entity =>
            {
                entity.HasKey(e => e.TypeInventaireId).HasName("PK__TypeInve__03EB729C10902F8A");

                entity.ToTable("TypeInventaire");

                entity.Property(e => e.TypeInventaireId)
                    .HasComment("Identifiant unique pour chaque type d'inventaire.")
                    .HasColumnName("TypeInventaire_Id");
                entity.Property(e => e.TypeInventaireLibelle)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("Libellé du type d'inventaire (ex: \"Inventaire simple\", \"Inventaire double avec arbitrage\".).")
                    .HasColumnName("TypeInventaire_libelle");
            });

            modelBuilder.Entity<Ville>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Ville__5A0D204B8CEEE4A5");

                entity.ToTable("Ville");

                entity.Property(v => v.Id)
                    .HasComment("Identifiant unique pour chaque ville")
                    .HasColumnName("Ville_Id");
                entity.Property(e => e.Nom)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("Nom de la ville")
                    .HasColumnName("Ville_Nom");
                entity.Property(e => e.RegionId)
                    .HasComment("Référence à l'identifiant de la région à laquelle appartient la ville.")
                    .HasColumnName("Ville_RegionId");

                entity.HasOne(d => d.Region).WithMany(p => p.Villes)
                    .HasForeignKey(d => d.RegionId)
                    .HasConstraintName("Ville_RegionId");
            });

            modelBuilder.Entity<Zone>(entity =>
            {
                entity.HasKey(e => e.ZoneId).HasName("PK__Zone__B4610C9EE22380FB");

                entity.ToTable("Zone");

                entity.Property(e => e.ZoneId)
                    .HasComment("Identifiant unique pour chaque zone.")
                    .HasColumnName("Zone_Id");
                entity.Property(e => e.ZoneNom)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("Nom de la zone.")
                    .HasColumnName("Zone_Nom");
                entity.Property(e => e.ZoneSiteId)
                    .HasComment("Référence à l'identifiant du site auquel appartient la zone. C'est une clé étrangère.")
                    .HasColumnName("Zone_SiteId");

                // Ajout de la colonne SocieteId
                entity.Property(e => e.SocieteId)
                    .HasComment("Référence à l'identifiant de la société à laquelle appartient la zone.")
                    .HasColumnName("Zone_SocieteId");

                // Ajout de la colonne SocieteNom
                entity.Property(e => e.SocieteNom)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasComment("Nom de la société liée à la zone.")
                    .HasColumnName("Zone_SocieteNom");

                // Relation avec Site
                entity.HasOne(d => d.ZoneSite).WithMany(p => p.Zones)
                    .HasForeignKey(d => d.ZoneSiteId)
                    .HasConstraintName("Zone_SiteId");

                // Relation avec Societe
                entity.HasOne(d => d.Societe).WithMany(s => s.Zones)
                    .HasForeignKey(d => d.SocieteId)
                    .OnDelete(DeleteBehavior.NoAction)
                    .HasConstraintName("Zone_SocieteId");
            });

            modelBuilder.Entity<IdentityUserLogin<string>>(entity =>
            {
                entity.HasKey(l => new { l.LoginProvider, l.ProviderKey });
                entity.ToTable("AspNetUserLogins");

            });

            modelBuilder.Entity<IdentityUserRole<string>>(entity =>
            {
                entity.HasKey(r => new { r.UserId, r.RoleId });

            });
            modelBuilder.Entity<IdentityUserRole<string>>().HasNoDiscriminator();

            modelBuilder.Entity<IdentityUserToken<string>>(entity =>
            {
                entity.HasKey(t => new { t.UserId, t.LoginProvider, t.Name });
                entity.ToTable("IdentityUserTokens");


            });
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("AspNetUsers"); // Correct table name in your schema

            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("AspNetRoles"); 

            });

            modelBuilder.Entity<UserRole>(entity =>
            {

                entity.HasOne(ur => ur.User)
        .WithMany(u => u.UserRoles)
        .HasForeignKey(ur => ur.UserId)
        .OnDelete(DeleteBehavior.Cascade);

    entity.HasOne(ur => ur.Role)
        .WithMany(r => r.UserRoles)
        .HasForeignKey(ur => ur.RoleId)
        .OnDelete(DeleteBehavior.Cascade);
    entity.ToTable("AspNetUserRoles");
            });
            modelBuilder.Entity<UserRole>().HasNoDiscriminator();

            modelBuilder.Entity<IdentityUserClaim<string>>(entity =>
            {
                entity.ToTable("AspNetUserClaims");
            });

            modelBuilder.Entity<IdentityRoleClaim<string>>(entity =>
            {
                entity.ToTable("AspNetRoleClaims");
            });

            modelBuilder.Entity<IdentityUserLogin<string>>(entity =>
            {
                entity.ToTable("AspNetUserLogins");
            });

            modelBuilder.Entity<IdentityUserToken<string>>(entity =>
            {
                entity.ToTable("AspNetUserTokens");
            });

            modelBuilder.Entity<Fournisseur>(entity =>
            {
                entity.HasKey(e => e.FournisseurId); // Clé primaire unique
                entity.ToTable("Fournisseur");

                entity.Property(e => e.FournisseurId)
                    .HasColumnName("Fournisseur_Id");

                entity.Property(e => e.Nom)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Fournisseur_Nom");

                entity.Property(e => e.Contact)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Fournisseur_Contact");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Fournisseur_Email");

                entity.Property(e => e.Telephone)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("Fournisseur_Telephone");

                entity.Property(e => e.IsDeleted)
                    .HasColumnName("IsDeleted");
            });

         modelBuilder.Entity<CodebarreProduit>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("CodebarreProduit");

                entity.Property(e => e.Id)
                    .HasColumnName("CodebarreProduit_Id");

                entity.Property(e => e.Code)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("CodebarreProduit_Code");

                entity.HasIndex(e => e.Code)
                    .IsUnique();

                entity.Property(e => e.ProduitId)
                    .HasColumnName("CodebarreProduit_ProduitId");

                entity.HasOne(e => e.Produit)
                    .WithMany(p => p.CodebarreProduits)
                    .HasForeignKey(e => e.ProduitId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_CodebarreProduit_Produit");
            });


  modelBuilder.Entity<GestionProduit>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("GestionProduit");

                entity.Property(e => e.Id)
                    .HasColumnName("GestionProduit_Id");

                entity.Property(e => e.ProduitId)
                    .IsRequired()
                    .HasColumnName("GestionProduit_ProduitId");

                entity.Property(e => e.ProduitNom)
                    .HasMaxLength(200)
                    .HasColumnName("GestionProduit_ProduitNom");

              

                entity.Property(e => e.GestionProduitQuantiteId)
                    .HasColumnName("GestionProduit_QuantiteId");            

               

                entity.Property(e => e.ResultatInventaireId)
                    .HasColumnName("GestionProduit_ResultatInventaireId");

                entity.Property(e => e.CodeBarreAlleeId)
                    .HasColumnName("GestionProduit_CodeBarreAlleeId")
                    .IsRequired(false);

                entity.Property(e => e.CodeBarreZoneId)
                    .HasColumnName("GestionProduit_CodeBarreZoneId")
                    .IsRequired(false);

                entity.Property(e => e.CodeBarreRangeeId)
                    .HasColumnName("GestionProduit_CodeBarreRangeeId")
                    .IsRequired(false);

                entity.Property(e => e.CodeBarreEtageId)
                    .HasColumnName("GestionProduit_CodeBarreEtageId")
                    .IsRequired(false);

                entity.Property(e => e.QuantiteEnStock)
                    .HasColumnName("GestionProduit_Quantite En Stock")
                    .IsRequired();

                // Relations
                entity.HasOne(e => e.CodeBarreEtage)
                    .WithMany()
                    .HasForeignKey(e => e.CodeBarreEtageId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(e => e.CodeBarreRangee)
                    .WithMany()
                    .HasForeignKey(e => e.CodeBarreRangeeId)
                    .OnDelete(DeleteBehavior.SetNull);

               
                    
                entity.HasOne(e => e.CodeBarreAllee)
                    .WithMany()
                    .HasForeignKey(e => e.CodeBarreAlleeId)
                    .OnDelete(DeleteBehavior.SetNull);



                entity.HasOne(e => e.ProduitEtage)
                    .WithMany()
                    .HasForeignKey(e => e.ProduitEtageId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(e => e.GestionProduitProduit)
                    .WithMany(p => p.GestionProduit)
                    .HasForeignKey(e => e.ProduitId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(e => e.ResultatInventaires)
                    .WithOne(r => r.ResultatInventaireGestionProduit)
                    .HasForeignKey(r => r.ResultatInventaireGestionProduitId)
                    .OnDelete(DeleteBehavior.SetNull);
            });
            modelBuilder.Entity<CodeBarreCommercial>(entity =>
            {
                entity.HasKey(e => e.CommercialId);
                entity.ToTable("CodeBarreCommercial");

                entity.Property(e => e.CommercialId)
                    .HasColumnName("CodeBarreCommercial_Id");

                entity.Property(e => e.Code)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("CodeBarreCommercial_Code");

                entity.HasIndex(e => e.Code)
                    .IsUnique();
            });
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
