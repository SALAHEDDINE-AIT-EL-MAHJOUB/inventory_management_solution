using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleAr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                });

            migrationBuilder.CreateTable(
                name: "Fournisseur",
                columns: table => new
                {
                    Fournisseur_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fournisseur_Nom = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Fournisseur_Contact = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Fournisseur_Email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Fournisseur_Telephone = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fournisseur", x => x.Fournisseur_Id);
                });

            migrationBuilder.CreateTable(
                name: "IdentityUserRole<string>",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IdentityUserRole<string>", x => new { x.UserId, x.RoleId });
                });

            migrationBuilder.CreateTable(
                name: "Rangee",
                columns: table => new
                {
                    Rangée_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque rangée")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rangée_Nom = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true, comment: "Nom de la rangée"),
                    Rangée_IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false, comment: "Indique si la rangée est supprimée (true) ou active (false)")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Rangee__13CD194487C697CF", x => x.Rangée_Id);
                });

            migrationBuilder.CreateTable(
                name: "Region",
                columns: table => new
                {
                    Region_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque région. C'est la clé primaire.")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Region_Nom = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true, comment: "Nom de la région.")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Region__A9EAD4FFE34950BA", x => x.Region_Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Statut",
                columns: table => new
                {
                    Statut_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque statut.")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Statut_Nom = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true, comment: "Nom du statut"),
                    StatutLibelle = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Statut__C9A2F59F5987DD15", x => x.Statut_Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeInventaire",
                columns: table => new
                {
                    TypeInventaire_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque type d'inventaire.")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeInventaire_libelle = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false, comment: "Libellé du type d'inventaire (ex: \"Inventaire simple\", \"Inventaire double avec arbitrage\".).")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__TypeInve__03EB729C10902F8A", x => x.TypeInventaire_Id);
                });

            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    AdminId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AdminName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    IsSuperAdmin = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.AdminId);
                    table.ForeignKey(
                        name: "FK_Admins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    client_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque client")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    client_Email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false, comment: "Adresse e-mail du client"),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    client_Adress = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false, comment: "Adresse physique du client"),
                    client_Telephone = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false, comment: "Numéro de téléphone du client"),
                    Client_AspNetUsersId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    client_Nom = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false, comment: "Nom du client"),
                    client_DateCreation = table.Column<DateTime>(type: "datetime2", nullable: false, comment: "Date de création du client dans le système"),
                    client_DateInactif = table.Column<DateTime>(type: "datetime2", nullable: true, comment: "Date à partir de laquelle le client est devenu inactif"),
                    client_IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true, comment: "Indique si le client est actif (1 = actif, 0 = inactif)")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Client__BF554B6CE4B28D07", x => x.client_Id);
                    table.ForeignKey(
                        name: "FK_Client_AspNetUsers_Client_AspNetUsersId",
                        column: x => x.Client_AspNetUsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_IdentityUserRole<string>_UserId_RoleId",
                        columns: x => new { x.UserId, x.RoleId },
                        principalTable: "IdentityUserRole<string>",
                        principalColumns: new[] { "UserId", "RoleId" });
                });

            migrationBuilder.CreateTable(
                name: "CodeBarreRangée",
                columns: table => new
                {
                    CodeBarreRangée_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque association entre un code-barres et une rangée.")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CodeBarreRackId = table.Column<int>(type: "int", nullable: false),
                    CodeBarreRangée_RangéeId = table.Column<int>(type: "int", nullable: true, comment: "Référence à l'identifiant de la rangée avec ce code-barres est situé. C'est une clé étrangère."),
                    CodeBarreRangee_Code = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CodeBarr__47535DFE57D2BBF1", x => x.CodeBarreRangée_Id);
                    table.ForeignKey(
                        name: "CodeBarreRangée_RangéeId",
                        column: x => x.CodeBarreRangée_RangéeId,
                        principalTable: "Rangee",
                        principalColumn: "Rangée_Id");
                });

            migrationBuilder.CreateTable(
                name: "Ville",
                columns: table => new
                {
                    Ville_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque ville")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ville_Nom = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false, comment: "Nom de la ville"),
                    Ville_RegionId = table.Column<int>(type: "int", nullable: false, comment: "Référence à l'identifiant de la région à laquelle appartient la ville.")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Ville__5A0D204B8CEEE4A5", x => x.Ville_Id);
                    table.ForeignKey(
                        name: "Ville_RegionId",
                        column: x => x.Ville_RegionId,
                        principalTable: "Region",
                        principalColumn: "Region_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Societé",
                columns: table => new
                {
                    Societé_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique de la société")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Societé_Rs = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false, comment: "Raison sociale ou nom de la société"),
                    Societé_If = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false, comment: "Numéro d'identification fiscale de la société"),
                    Societé_Adress = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false, comment: "Adresse de la société"),
                    Societé_Telephone = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false, comment: "Numéro de téléphone de la société"),
                    Ville = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Societé_ClientId = table.Column<int>(type: "int", nullable: false, comment: "Clé étrangère qui fait référence à client_ID dans la table Client, indiquant le client associé à la société."),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Societé_VilleId = table.Column<int>(type: "int", nullable: true, comment: "Clé étrangère qui fait référence à la table Ville (par exemple, pour stocker l'ID de la ville où se trouve le siège de la société)."),
                    SocieteClientId = table.Column<int>(type: "int", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Societé__04358C9F3CFB2E8D", x => x.Societé_Id);
                    table.ForeignKey(
                        name: "Societé_ClientId",
                        column: x => x.Societé_ClientId,
                        principalTable: "Client",
                        principalColumn: "client_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "Societé_VilleId",
                        column: x => x.Societé_VilleId,
                        principalTable: "Ville",
                        principalColumn: "Ville_Id");
                });

            migrationBuilder.CreateTable(
                name: "Site",
                columns: table => new
                {
                    Site_Id = table.Column<int>(type: "int", nullable: false, comment: " Identifiant unique du site")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Site_Nom = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false, comment: "Nom du site"),
                    Site_Adress = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false, comment: "Adresse physique du site"),
                    Site_Telephone = table.Column<int>(type: "int", unicode: false, maxLength: 50, nullable: true),
                    Site_Email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    SocieteId = table.Column<long>(type: "bigint", nullable: false),
                    Site_VilleId = table.Column<int>(type: "int", nullable: false, comment: "Clé étrangère qui fait référence à Ville_Id dans la table Ville, indiquant la ville où se trouve le site."),
                    Site_SocieteId = table.Column<int>(type: "int", nullable: true, comment: "Identifiant de la société propriétaire du site")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Site__E422232E1CD135AA", x => x.Site_Id);
                    table.ForeignKey(
                        name: "Site_SocieteId",
                        column: x => x.Site_SocieteId,
                        principalTable: "Societé",
                        principalColumn: "Societé_Id");
                    table.ForeignKey(
                        name: "Site_VilleId",
                        column: x => x.Site_VilleId,
                        principalTable: "Ville",
                        principalColumn: "Ville_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Inventaire",
                columns: table => new
                {
                    Inventaire_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque inventaire.")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Inventaire_libelle = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true, comment: "Libellé ou nom de l'inventaire"),
                    Inventaire_TypeInventaireId = table.Column<int>(type: "int", nullable: true, comment: "Référence au type d'inventaire, lié à l'identifiant du type dans la table TypeInventaire."),
                    Inventaire_Date = table.Column<DateTime>(type: "datetime2", nullable: true, comment: "Date de l'inventaire."),
                    Inventaire_StatutId = table.Column<int>(type: "int", nullable: true, comment: "Référence au statut de l'inventaire, lié à l'identifiant du statut dans la table Statut."),
                    Inventaire_IsTotal = table.Column<bool>(type: "bit", nullable: true, comment: "Indicateur qui spécifie si l'inventaire est total (1) ou partiel (0)."),
                    Inventaire_SiteId = table.Column<int>(type: "int", nullable: true, comment: "Référence au site où l'inventaire est effectué, lié à l'identifiant du site dans la table Site."),
                    MotDePasse = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Inventai__4645A98DF52C4799", x => x.Inventaire_Id);
                    table.ForeignKey(
                        name: "Inventaire_SiteId",
                        column: x => x.Inventaire_SiteId,
                        principalTable: "Site",
                        principalColumn: "Site_Id");
                    table.ForeignKey(
                        name: "Inventaire_StatutId",
                        column: x => x.Inventaire_StatutId,
                        principalTable: "Statut",
                        principalColumn: "Statut_Id");
                    table.ForeignKey(
                        name: "Inventaire_TypeInventaireId",
                        column: x => x.Inventaire_TypeInventaireId,
                        principalTable: "TypeInventaire",
                        principalColumn: "TypeInventaire_Id");
                });

            migrationBuilder.CreateTable(
                name: "Operateur",
                columns: table => new
                {
                    Operateur_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque opérateur.")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Operateur_Nom = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false, comment: "Nom de l'opérateur."),
                    Operateur_Prenom = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false, comment: "Prénom de l'opérateur."),
                    Operateur_Cin = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false, comment: "Numéro de carte d'identité nationale de l'opérateur."),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telephone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MotDePasse = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EstActif = table.Column<bool>(type: "bit", nullable: false),
                    Operateur_SiteId = table.Column<int>(type: "int", nullable: false, comment: "Référence à l'identifiant du site où l'opérateur travaille. C'est une clé étrangère qui fait référence à la table Site."),
                    SiteId1 = table.Column<int>(type: "int", nullable: false),
                    Operateur_AspNetUsersId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Operateu__DD6FAFB1471872AD", x => x.Operateur_Id);
                    table.ForeignKey(
                        name: "FK_Operateur_AspNetUsers_Operateur_AspNetUsersId",
                        column: x => x.Operateur_AspNetUsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Operateur_Site_SiteId1",
                        column: x => x.SiteId1,
                        principalTable: "Site",
                        principalColumn: "Site_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "Operateur_SiteId",
                        column: x => x.Operateur_SiteId,
                        principalTable: "Site",
                        principalColumn: "Site_Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Zone",
                columns: table => new
                {
                    Zone_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque zone.")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Zone_Nom = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true, comment: "Nom de la zone."),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    Zone_SiteId = table.Column<int>(type: "int", nullable: true, comment: "Référence à l'identifiant du site auquel appartient la zone. C'est une clé étrangère.")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Zone__B4610C9EE22380FB", x => x.Zone_Id);
                    table.ForeignKey(
                        name: "Zone_SiteId",
                        column: x => x.Zone_SiteId,
                        principalTable: "Site",
                        principalColumn: "Site_Id");
                });

            migrationBuilder.CreateTable(
                name: "Equipe",
                columns: table => new
                {
                    Equipe_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque équipe.")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EquipeLibelle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Equipe_InventaireId = table.Column<int>(type: "int", nullable: true, comment: "Référence à l'identifiant de l'inventaire associé à cette équipe. C'est une clé étrangère qui fait référence à la table Inventaire."),
                    IsEquipeArbitrage = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Equipe__C93C5DE8C09622F5", x => x.Equipe_Id);
                    table.ForeignKey(
                        name: "Equipe_InventaireId",
                        column: x => x.Equipe_InventaireId,
                        principalTable: "Inventaire",
                        principalColumn: "Inventaire_Id");
                });

            migrationBuilder.CreateTable(
                name: "CodeBarreOperateur",
                columns: table => new
                {
                    CodeBarreOperateur_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque association entre un opérateur et un code-barres.")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CodeBarreOperateur_OperateurId = table.Column<int>(type: "int", nullable: true, comment: "Référence à l'identifiant de l'opérateur, lié à la table Operateur."),
                    CodeBarreOperateur_Code = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    SiteId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CodeBarr__9C140E7C2F7FFFC2", x => x.CodeBarreOperateur_Id);
                    table.ForeignKey(
                        name: "CodeBarreOperateur_OperateurId",
                        column: x => x.CodeBarreOperateur_OperateurId,
                        principalTable: "Operateur",
                        principalColumn: "Operateur_Id");
                    table.ForeignKey(
                        name: "FK_CodeBarreOperateur_Site_SiteId",
                        column: x => x.SiteId,
                        principalTable: "Site",
                        principalColumn: "Site_Id");
                });

            migrationBuilder.CreateTable(
                name: "CodeBarreZone",
                columns: table => new
                {
                    CodeBarreZone_ZoneId = table.Column<int>(type: "int", nullable: false, comment: "Référence à l'identifiant de la zone avec ce code-barres est situé. C'est une clé étrangère."),
                    ZoneNom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ZoneSiteId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    CodeBarreZone_Code = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    CodeBarreZoneZoneId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CodeBarr__F046EBC6C1681EC7", x => x.CodeBarreZone_ZoneId);
                    table.ForeignKey(
                        name: "CodeBarreZone_ZoneId",
                        column: x => x.CodeBarreZone_ZoneId,
                        principalTable: "Zone",
                        principalColumn: "Zone_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CodeBarreZone_CodeBarreZone_CodeBarreZoneZoneId",
                        column: x => x.CodeBarreZoneZoneId,
                        principalTable: "CodeBarreZone",
                        principalColumn: "CodeBarreZone_ZoneId");
                    table.ForeignKey(
                        name: "FK_CodeBarreZone_Site_ZoneSiteId",
                        column: x => x.ZoneSiteId,
                        principalTable: "Site",
                        principalColumn: "Site_Id");
                });

            migrationBuilder.CreateTable(
                name: "EquipeOperateur",
                columns: table => new
                {
                    EquipeOperateur_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque enregistrement dans la relation équipe-opérateur.")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EquipeOperateur_EquipeId = table.Column<int>(type: "int", nullable: true, comment: "Référence à l'identifiant de l'équipe dans laquelle l'opérateur est affecté. C'est une clé étrangère qui fait référence à la table Equipe."),
                    EquipeOperateur_OperateurId = table.Column<int>(type: "int", nullable: true, comment: "Référence à l'identifiant de l'opérateur affecté à l'équipe. C'est une clé étrangère qui fait référence à la table Operateur.")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__EquipeOp__CD3D157BD1E82B84", x => x.EquipeOperateur_Id);
                    table.ForeignKey(
                        name: "EquipeOperateur_EquipeId",
                        column: x => x.EquipeOperateur_EquipeId,
                        principalTable: "Equipe",
                        principalColumn: "Equipe_Id");
                    table.ForeignKey(
                        name: "EquipeOperateur_OperateurId",
                        column: x => x.EquipeOperateur_OperateurId,
                        principalTable: "Operateur",
                        principalColumn: "Operateur_Id");
                });

            migrationBuilder.CreateTable(
                name: "Allee",
                columns: table => new
                {
                    Allee_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque Allee.")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Allee_Nom = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true, comment: "Nom de l'Allee"),
                    Allee_ZoneId = table.Column<int>(type: "int", nullable: true, comment: "Référence à l'identifiant de la zone à laquelle l'Allee appartient. C'est une clé étrangère."),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    CodeBarreZoneZoneId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Allee__58D55A03052B8413", x => x.Allee_Id);
                    table.ForeignKey(
                        name: "Allee_ZoneId",
                        column: x => x.Allee_ZoneId,
                        principalTable: "Zone",
                        principalColumn: "Zone_Id");
                    table.ForeignKey(
                        name: "FK_Allee_CodeBarreZone_CodeBarreZoneZoneId",
                        column: x => x.CodeBarreZoneZoneId,
                        principalTable: "CodeBarreZone",
                        principalColumn: "CodeBarreZone_ZoneId");
                });

            migrationBuilder.CreateTable(
                name: "OperationInventaire",
                columns: table => new
                {
                    OperationInventaire_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque opération d'inventaire. ")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OperationInventaire_ZoneId = table.Column<int>(type: "int", nullable: true, comment: "Référence à l'identifiant de la zone dans laquelle l'opération d'inventaire est réalisée. C'est une clé étrangère qui fait référence à la table Zone."),
                    OperationInventaire_InventaireId = table.Column<int>(type: "int", nullable: true, comment: "Référence à l'identifiant de l'inventaire auquel cette opération appartient. C'est une clé étrangère qui fait référence à la table Inventaire."),
                    OperationInventaireStatut = table.Column<int>(type: "int", nullable: false),
                    CodeBarreZoneZoneId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Operatio__18B7EDD044030108", x => x.OperationInventaire_Id);
                    table.ForeignKey(
                        name: "FK_OperationInventaire_CodeBarreZone_CodeBarreZoneZoneId",
                        column: x => x.CodeBarreZoneZoneId,
                        principalTable: "CodeBarreZone",
                        principalColumn: "CodeBarreZone_ZoneId");
                    table.ForeignKey(
                        name: "OperationInventaire_InventaireId",
                        column: x => x.OperationInventaire_InventaireId,
                        principalTable: "Inventaire",
                        principalColumn: "Inventaire_Id");
                    table.ForeignKey(
                        name: "OperationInventaire_ZoneId",
                        column: x => x.OperationInventaire_ZoneId,
                        principalTable: "Zone",
                        principalColumn: "Zone_Id");
                });

            migrationBuilder.CreateTable(
                name: "CodeBarreAllee",
                columns: table => new
                {
                    CodeBarreAllee_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque association entre un code-barres et une Allee.")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CodeBarreZoneId = table.Column<int>(type: "int", nullable: false),
                    CodeBarreAllee_AlleeId = table.Column<int>(type: "int", nullable: true, comment: "Référence à l'identifiant de l'Allee avec ce code-barres est situé. C'est une clé étrangère."),
                    Code = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CodeBarr__3A7C90A2A4168A7F", x => x.CodeBarreAllee_Id);
                    table.ForeignKey(
                        name: "CodeBarreAllee_AlleeId",
                        column: x => x.CodeBarreAllee_AlleeId,
                        principalTable: "Allee",
                        principalColumn: "Allee_Id");
                    table.ForeignKey(
                        name: "FK_CodeBarreAllee_CodeBarreZone_CodeBarreZoneId",
                        column: x => x.CodeBarreZoneId,
                        principalTable: "CodeBarreZone",
                        principalColumn: "CodeBarreZone_ZoneId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CodeBarreCommercial",
                columns: table => new
                {
                    CodeBarreCommercial_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CodeBarreCommercial_Code = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    ProduitId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CodeBarreCommercial", x => x.CodeBarreCommercial_Id);
                });

            migrationBuilder.CreateTable(
                name: "CodeBarreEtage",
                columns: table => new
                {
                    CodeBarreEtage_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque association entre un code-barres et un étage.")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CodeBarreEtage_Code = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    CodeBarreRangeeId = table.Column<int>(type: "int", nullable: true),
                    CodeBarreEtage_EtageId = table.Column<int>(type: "int", nullable: true, comment: "Référence à l'identifiant de l'étage avec ce code-barres est situé. C'est une clé étrangère."),
                    Etage = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CodeBarr__EC532EC1B8307F25", x => x.CodeBarreEtage_Id);
                    table.ForeignKey(
                        name: "FK_CodeBarreEtage_CodeBarreRangée_CodeBarreRangeeId",
                        column: x => x.CodeBarreRangeeId,
                        principalTable: "CodeBarreRangée",
                        principalColumn: "CodeBarreRangée_Id");
                });

            migrationBuilder.CreateTable(
                name: "Etage",
                columns: table => new
                {
                    Etage_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque étage")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Etage_Nom = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false, comment: "Nom de l'étage"),
                    Etage_RangéeId = table.Column<int>(type: "int", nullable: false, comment: "Référence à l'identifiant de la rangée dans laquelle l'étage est situé. C'est une clé étrangère."),
                    CodeBarreetageId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Etage__0F13A9CBE9AFC812", x => x.Etage_Id);
                    table.ForeignKey(
                        name: "Etage_RangéeId",
                        column: x => x.Etage_RangéeId,
                        principalTable: "Rangee",
                        principalColumn: "Rangée_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Etage_CodeBarreEtage_CodeBarreetageId",
                        column: x => x.CodeBarreetageId,
                        principalTable: "CodeBarreEtage",
                        principalColumn: "CodeBarreEtage_Id");
                });

            migrationBuilder.CreateTable(
                name: "Produits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Prix = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    FournisseurId = table.Column<int>(type: "int", nullable: false),
                    FormProduitsId = table.Column<int>(type: "int", nullable: true),
                    CodebarreProduitId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    EtageId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Produits_Etage_EtageId",
                        column: x => x.EtageId,
                        principalTable: "Etage",
                        principalColumn: "Etage_Id");
                    table.ForeignKey(
                        name: "FK_Produits_Fournisseur_FournisseurId",
                        column: x => x.FournisseurId,
                        principalTable: "Fournisseur",
                        principalColumn: "Fournisseur_Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CodebarreProduit",
                columns: table => new
                {
                    CodebarreProduit_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CodebarreProduit_Code = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    CodebarreProduit_ProduitId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CodebarreProduit", x => x.CodebarreProduit_Id);
                    table.ForeignKey(
                        name: "FK_CodebarreProduit_Produit",
                        column: x => x.CodebarreProduit_ProduitId,
                        principalTable: "Produits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GestionProduit",
                columns: table => new
                {
                    GestionProduit_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GestionProduit_ProduitId = table.Column<int>(type: "int", nullable: false),
                    GestionProduit_ProduitNom = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CodeBarreproduit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GestionProduit_QuantiteId = table.Column<int>(type: "int", nullable: true),
                    GestionProduit_ResultatInventaireId = table.Column<int>(type: "int", nullable: true),
                    GestionProduit_CodeBarreAlleeId = table.Column<int>(type: "int", nullable: true),
                    GestionProduit_CodeBarreZoneId = table.Column<int>(type: "int", nullable: true),
                    GestionProduit_CodeBarreRangeeId = table.Column<int>(type: "int", nullable: true),
                    GestionProduit_CodeBarreEtageId = table.Column<int>(type: "int", nullable: true),
                    ProduitEtageId = table.Column<int>(type: "int", nullable: true),
                    GestionProduit_QuantiteEnStock = table.Column<string>(name: "GestionProduit_Quantite En Stock", type: "nvarchar(max)", nullable: false),
                    CodebarreCommercialCommercialId = table.Column<int>(type: "int", nullable: true),
                    Quantite = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GestionProduit", x => x.GestionProduit_Id);
                    table.ForeignKey(
                        name: "FK_GestionProduit_CodeBarreAllee_GestionProduit_CodeBarreAlleeId",
                        column: x => x.GestionProduit_CodeBarreAlleeId,
                        principalTable: "CodeBarreAllee",
                        principalColumn: "CodeBarreAllee_Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_GestionProduit_CodeBarreCommercial_CodebarreCommercialCommercialId",
                        column: x => x.CodebarreCommercialCommercialId,
                        principalTable: "CodeBarreCommercial",
                        principalColumn: "CodeBarreCommercial_Id");
                    table.ForeignKey(
                        name: "FK_GestionProduit_CodeBarreEtage_GestionProduit_CodeBarreEtageId",
                        column: x => x.GestionProduit_CodeBarreEtageId,
                        principalTable: "CodeBarreEtage",
                        principalColumn: "CodeBarreEtage_Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_GestionProduit_CodeBarreRangée_GestionProduit_CodeBarreRangeeId",
                        column: x => x.GestionProduit_CodeBarreRangeeId,
                        principalTable: "CodeBarreRangée",
                        principalColumn: "CodeBarreRangée_Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_GestionProduit_CodeBarreZone_GestionProduit_CodeBarreZoneId",
                        column: x => x.GestionProduit_CodeBarreZoneId,
                        principalTable: "CodeBarreZone",
                        principalColumn: "CodeBarreZone_ZoneId");
                    table.ForeignKey(
                        name: "FK_GestionProduit_Etage_ProduitEtageId",
                        column: x => x.ProduitEtageId,
                        principalTable: "Etage",
                        principalColumn: "Etage_Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_GestionProduit_Produits_GestionProduit_ProduitId",
                        column: x => x.GestionProduit_ProduitId,
                        principalTable: "Produits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ResultatInventaire",
                columns: table => new
                {
                    ResultatInventaire_Id = table.Column<int>(type: "int", nullable: false, comment: "Identifiant unique pour chaque enregistrement de résultat d'inventaire.")
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GestionProduitProduitId = table.Column<int>(type: "int", nullable: false),
                    ResultatInventaire_GestionProduitId = table.Column<int>(type: "int", nullable: true, comment: "Référence à l'identifiant du produit géré, lié à la table GestionProduit."),
                    ResultatInventaire_EquipeId = table.Column<int>(type: "int", nullable: true, comment: "Référence à l'identifiant de l'équipe responsable de l'inventaire, liée à la table Equipe."),
                    ResultatInventaire_InventaireId = table.Column<int>(type: "int", nullable: true, comment: "Référence à l'identifiant de l'inventaire, liée à la table Inventaire."),
                    ResultatInventaire_OperateurId = table.Column<int>(type: "int", nullable: true, comment: "Référence à l'identifiant de l'opérateur qui a participé à l'inventaire, liée à la table Operateur."),
                    StockArbitre = table.Column<int>(type: "int", nullable: true),
                    QuantiteScannee = table.Column<int>(type: "int", nullable: true),
                    DateComptage = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ÉtapeComptage = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Resultat__AABC56D849C78C73", x => x.ResultatInventaire_Id);
                    table.ForeignKey(
                        name: "ResultatInventaire_EquipeId",
                        column: x => x.ResultatInventaire_EquipeId,
                        principalTable: "Equipe",
                        principalColumn: "Equipe_Id");
                    table.ForeignKey(
                        name: "ResultatInventaire_GestionProduitId",
                        column: x => x.ResultatInventaire_GestionProduitId,
                        principalTable: "GestionProduit",
                        principalColumn: "GestionProduit_Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "ResultatInventaire_InventaireId",
                        column: x => x.ResultatInventaire_InventaireId,
                        principalTable: "Inventaire",
                        principalColumn: "Inventaire_Id");
                    table.ForeignKey(
                        name: "ResultatInventaire_OperateurId",
                        column: x => x.ResultatInventaire_OperateurId,
                        principalTable: "Operateur",
                        principalColumn: "Operateur_Id");
                });

            migrationBuilder.CreateTable(
                name: "HistoriqueComptages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResultatInventaireId = table.Column<int>(type: "int", nullable: false),
                    Horodatage = table.Column<DateTime>(type: "datetime2", nullable: false),
                    QuantitéComptée = table.Column<int>(type: "int", nullable: false),
                    EstAnnulé = table.Column<bool>(type: "bit", nullable: false),
                    MotifModification = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CommentaireOperateur = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistoriqueComptages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HistoriqueComptages_ResultatInventaire_ResultatInventaireId",
                        column: x => x.ResultatInventaireId,
                        principalTable: "ResultatInventaire",
                        principalColumn: "ResultatInventaire_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Admins_UserId",
                table: "Admins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Allee_Allee_ZoneId",
                table: "Allee",
                column: "Allee_ZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_Allee_CodeBarreZoneZoneId",
                table: "Allee",
                column: "CodeBarreZoneZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Client_Client_AspNetUsersId",
                table: "Client",
                column: "Client_AspNetUsersId");

            migrationBuilder.CreateIndex(
                name: "UQ__Client__A7A650D3FAE098F8",
                table: "Client",
                column: "client_Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CodeBarreAllee_Code",
                table: "CodeBarreAllee",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CodeBarreAllee_CodeBarreAllee_AlleeId",
                table: "CodeBarreAllee",
                column: "CodeBarreAllee_AlleeId");

            migrationBuilder.CreateIndex(
                name: "IX_CodeBarreAllee_CodeBarreZoneId",
                table: "CodeBarreAllee",
                column: "CodeBarreZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_CodeBarreCommercial_CodeBarreCommercial_Code",
                table: "CodeBarreCommercial",
                column: "CodeBarreCommercial_Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CodeBarreCommercial_ProduitId",
                table: "CodeBarreCommercial",
                column: "ProduitId");

            migrationBuilder.CreateIndex(
                name: "IX_CodeBarreEtage_CodeBarreEtage_Code",
                table: "CodeBarreEtage",
                column: "CodeBarreEtage_Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CodeBarreEtage_CodeBarreEtage_EtageId",
                table: "CodeBarreEtage",
                column: "CodeBarreEtage_EtageId");

            migrationBuilder.CreateIndex(
                name: "IX_CodeBarreEtage_CodeBarreRangeeId",
                table: "CodeBarreEtage",
                column: "CodeBarreRangeeId");

            migrationBuilder.CreateIndex(
                name: "IX_CodeBarreOperateur_CodeBarreOperateur_Code",
                table: "CodeBarreOperateur",
                column: "CodeBarreOperateur_Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CodeBarreOperateur_CodeBarreOperateur_OperateurId",
                table: "CodeBarreOperateur",
                column: "CodeBarreOperateur_OperateurId");

            migrationBuilder.CreateIndex(
                name: "IX_CodeBarreOperateur_SiteId",
                table: "CodeBarreOperateur",
                column: "SiteId");

            migrationBuilder.CreateIndex(
                name: "IX_CodebarreProduit_CodebarreProduit_Code",
                table: "CodebarreProduit",
                column: "CodebarreProduit_Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CodebarreProduit_CodebarreProduit_ProduitId",
                table: "CodebarreProduit",
                column: "CodebarreProduit_ProduitId");

            migrationBuilder.CreateIndex(
                name: "IX_CodeBarreRangée_CodeBarreRangee_Code",
                table: "CodeBarreRangée",
                column: "CodeBarreRangee_Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CodeBarreRangée_CodeBarreRangée_RangéeId",
                table: "CodeBarreRangée",
                column: "CodeBarreRangée_RangéeId");

            migrationBuilder.CreateIndex(
                name: "IX_CodeBarreZone_CodeBarreZone_Code",
                table: "CodeBarreZone",
                column: "CodeBarreZone_Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CodeBarreZone_CodeBarreZoneZoneId",
                table: "CodeBarreZone",
                column: "CodeBarreZoneZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_CodeBarreZone_ZoneSiteId",
                table: "CodeBarreZone",
                column: "ZoneSiteId");

            migrationBuilder.CreateIndex(
                name: "IX_Equipe_Equipe_InventaireId",
                table: "Equipe",
                column: "Equipe_InventaireId");

            migrationBuilder.CreateIndex(
                name: "IX_EquipeOperateur_EquipeOperateur_EquipeId",
                table: "EquipeOperateur",
                column: "EquipeOperateur_EquipeId");

            migrationBuilder.CreateIndex(
                name: "IX_EquipeOperateur_EquipeOperateur_OperateurId",
                table: "EquipeOperateur",
                column: "EquipeOperateur_OperateurId");

            migrationBuilder.CreateIndex(
                name: "IX_Etage_CodeBarreetageId",
                table: "Etage",
                column: "CodeBarreetageId");

            migrationBuilder.CreateIndex(
                name: "IX_Etage_Etage_RangéeId",
                table: "Etage",
                column: "Etage_RangéeId");

            migrationBuilder.CreateIndex(
                name: "IX_GestionProduit_CodebarreCommercialCommercialId",
                table: "GestionProduit",
                column: "CodebarreCommercialCommercialId");

            migrationBuilder.CreateIndex(
                name: "IX_GestionProduit_GestionProduit_CodeBarreAlleeId",
                table: "GestionProduit",
                column: "GestionProduit_CodeBarreAlleeId");

            migrationBuilder.CreateIndex(
                name: "IX_GestionProduit_GestionProduit_CodeBarreEtageId",
                table: "GestionProduit",
                column: "GestionProduit_CodeBarreEtageId");

            migrationBuilder.CreateIndex(
                name: "IX_GestionProduit_GestionProduit_CodeBarreRangeeId",
                table: "GestionProduit",
                column: "GestionProduit_CodeBarreRangeeId");

            migrationBuilder.CreateIndex(
                name: "IX_GestionProduit_GestionProduit_CodeBarreZoneId",
                table: "GestionProduit",
                column: "GestionProduit_CodeBarreZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_GestionProduit_GestionProduit_ProduitId",
                table: "GestionProduit",
                column: "GestionProduit_ProduitId");

            migrationBuilder.CreateIndex(
                name: "IX_GestionProduit_GestionProduit_ResultatInventaireId",
                table: "GestionProduit",
                column: "GestionProduit_ResultatInventaireId",
                unique: true,
                filter: "[GestionProduit_ResultatInventaireId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_GestionProduit_ProduitEtageId",
                table: "GestionProduit",
                column: "ProduitEtageId");

            migrationBuilder.CreateIndex(
                name: "IX_HistoriqueComptages_ResultatInventaireId",
                table: "HistoriqueComptages",
                column: "ResultatInventaireId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventaire_Inventaire_SiteId",
                table: "Inventaire",
                column: "Inventaire_SiteId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventaire_Inventaire_StatutId",
                table: "Inventaire",
                column: "Inventaire_StatutId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventaire_Inventaire_TypeInventaireId",
                table: "Inventaire",
                column: "Inventaire_TypeInventaireId");

            migrationBuilder.CreateIndex(
                name: "IX_Operateur_Operateur_AspNetUsersId",
                table: "Operateur",
                column: "Operateur_AspNetUsersId");

            migrationBuilder.CreateIndex(
                name: "IX_Operateur_Operateur_SiteId",
                table: "Operateur",
                column: "Operateur_SiteId");

            migrationBuilder.CreateIndex(
                name: "IX_Operateur_SiteId1",
                table: "Operateur",
                column: "SiteId1");

            migrationBuilder.CreateIndex(
                name: "IX_OperationInventaire_CodeBarreZoneZoneId",
                table: "OperationInventaire",
                column: "CodeBarreZoneZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_OperationInventaire_OperationInventaire_InventaireId",
                table: "OperationInventaire",
                column: "OperationInventaire_InventaireId");

            migrationBuilder.CreateIndex(
                name: "IX_OperationInventaire_OperationInventaire_ZoneId",
                table: "OperationInventaire",
                column: "OperationInventaire_ZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_Produits_EtageId",
                table: "Produits",
                column: "EtageId");

            migrationBuilder.CreateIndex(
                name: "IX_Produits_FournisseurId",
                table: "Produits",
                column: "FournisseurId");

            migrationBuilder.CreateIndex(
                name: "IX_ResultatInventaire_ResultatInventaire_EquipeId",
                table: "ResultatInventaire",
                column: "ResultatInventaire_EquipeId");

            migrationBuilder.CreateIndex(
                name: "IX_ResultatInventaire_ResultatInventaire_GestionProduitId",
                table: "ResultatInventaire",
                column: "ResultatInventaire_GestionProduitId");

            migrationBuilder.CreateIndex(
                name: "IX_ResultatInventaire_ResultatInventaire_InventaireId",
                table: "ResultatInventaire",
                column: "ResultatInventaire_InventaireId");

            migrationBuilder.CreateIndex(
                name: "IX_ResultatInventaire_ResultatInventaire_OperateurId",
                table: "ResultatInventaire",
                column: "ResultatInventaire_OperateurId");

            migrationBuilder.CreateIndex(
                name: "IX_Site_Site_SocieteId",
                table: "Site",
                column: "Site_SocieteId");

            migrationBuilder.CreateIndex(
                name: "IX_Site_Site_VilleId",
                table: "Site",
                column: "Site_VilleId");

            migrationBuilder.CreateIndex(
                name: "UQ__Site__442E7CDE2D3D21D9",
                table: "Site",
                column: "Site_Adress",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Societé_Societé_ClientId",
                table: "Societé",
                column: "Societé_ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Societé_Societé_VilleId",
                table: "Societé",
                column: "Societé_VilleId");

            migrationBuilder.CreateIndex(
                name: "UQ__Societé__E5F76C6DFED7C7AE",
                table: "Societé",
                column: "Societé_Adress",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Ville_Ville_RegionId",
                table: "Ville",
                column: "Ville_RegionId");

            migrationBuilder.CreateIndex(
                name: "IX_Zone_Zone_SiteId",
                table: "Zone",
                column: "Zone_SiteId");

            migrationBuilder.AddForeignKey(
                name: "FK_CodeBarreCommercial_Produits_ProduitId",
                table: "CodeBarreCommercial",
                column: "ProduitId",
                principalTable: "Produits",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "CodeBarreEtage_EtageId",
                table: "CodeBarreEtage",
                column: "CodeBarreEtage_EtageId",
                principalTable: "Etage",
                principalColumn: "Etage_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GestionProduit_ResultatInventaire_GestionProduit_ResultatInventaireId",
                table: "GestionProduit",
                column: "GestionProduit_ResultatInventaireId",
                principalTable: "ResultatInventaire",
                principalColumn: "ResultatInventaire_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Client_AspNetUsers_Client_AspNetUsersId",
                table: "Client");

            migrationBuilder.DropForeignKey(
                name: "FK_Operateur_AspNetUsers_Operateur_AspNetUsersId",
                table: "Operateur");

            migrationBuilder.DropForeignKey(
                name: "Allee_ZoneId",
                table: "Allee");

            migrationBuilder.DropForeignKey(
                name: "CodeBarreZone_ZoneId",
                table: "CodeBarreZone");

            migrationBuilder.DropForeignKey(
                name: "FK_Allee_CodeBarreZone_CodeBarreZoneZoneId",
                table: "Allee");

            migrationBuilder.DropForeignKey(
                name: "FK_CodeBarreAllee_CodeBarreZone_CodeBarreZoneId",
                table: "CodeBarreAllee");

            migrationBuilder.DropForeignKey(
                name: "FK_GestionProduit_CodeBarreZone_GestionProduit_CodeBarreZoneId",
                table: "GestionProduit");

            migrationBuilder.DropForeignKey(
                name: "CodeBarreAllee_AlleeId",
                table: "CodeBarreAllee");

            migrationBuilder.DropForeignKey(
                name: "FK_CodeBarreCommercial_Produits_ProduitId",
                table: "CodeBarreCommercial");

            migrationBuilder.DropForeignKey(
                name: "FK_GestionProduit_Produits_GestionProduit_ProduitId",
                table: "GestionProduit");

            migrationBuilder.DropForeignKey(
                name: "CodeBarreEtage_EtageId",
                table: "CodeBarreEtage");

            migrationBuilder.DropForeignKey(
                name: "FK_GestionProduit_Etage_ProduitEtageId",
                table: "GestionProduit");

            migrationBuilder.DropForeignKey(
                name: "FK_CodeBarreEtage_CodeBarreRangée_CodeBarreRangeeId",
                table: "CodeBarreEtage");

            migrationBuilder.DropForeignKey(
                name: "FK_GestionProduit_CodeBarreRangée_GestionProduit_CodeBarreRangeeId",
                table: "GestionProduit");

            migrationBuilder.DropForeignKey(
                name: "ResultatInventaire_OperateurId",
                table: "ResultatInventaire");

            migrationBuilder.DropForeignKey(
                name: "Inventaire_SiteId",
                table: "Inventaire");

            migrationBuilder.DropForeignKey(
                name: "Equipe_InventaireId",
                table: "Equipe");

            migrationBuilder.DropForeignKey(
                name: "ResultatInventaire_InventaireId",
                table: "ResultatInventaire");

            migrationBuilder.DropForeignKey(
                name: "ResultatInventaire_EquipeId",
                table: "ResultatInventaire");

            migrationBuilder.DropForeignKey(
                name: "FK_GestionProduit_CodeBarreEtage_GestionProduit_CodeBarreEtageId",
                table: "GestionProduit");

            migrationBuilder.DropForeignKey(
                name: "FK_GestionProduit_CodeBarreAllee_GestionProduit_CodeBarreAlleeId",
                table: "GestionProduit");

            migrationBuilder.DropForeignKey(
                name: "FK_GestionProduit_CodeBarreCommercial_CodebarreCommercialCommercialId",
                table: "GestionProduit");

            migrationBuilder.DropForeignKey(
                name: "FK_GestionProduit_ResultatInventaire_GestionProduit_ResultatInventaireId",
                table: "GestionProduit");

            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "CodeBarreOperateur");

            migrationBuilder.DropTable(
                name: "CodebarreProduit");

            migrationBuilder.DropTable(
                name: "EquipeOperateur");

            migrationBuilder.DropTable(
                name: "HistoriqueComptages");

            migrationBuilder.DropTable(
                name: "OperationInventaire");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "IdentityUserRole<string>");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Zone");

            migrationBuilder.DropTable(
                name: "CodeBarreZone");

            migrationBuilder.DropTable(
                name: "Allee");

            migrationBuilder.DropTable(
                name: "Produits");

            migrationBuilder.DropTable(
                name: "Fournisseur");

            migrationBuilder.DropTable(
                name: "Etage");

            migrationBuilder.DropTable(
                name: "CodeBarreRangée");

            migrationBuilder.DropTable(
                name: "Rangee");

            migrationBuilder.DropTable(
                name: "Operateur");

            migrationBuilder.DropTable(
                name: "Site");

            migrationBuilder.DropTable(
                name: "Societé");

            migrationBuilder.DropTable(
                name: "Client");

            migrationBuilder.DropTable(
                name: "Ville");

            migrationBuilder.DropTable(
                name: "Region");

            migrationBuilder.DropTable(
                name: "Inventaire");

            migrationBuilder.DropTable(
                name: "Statut");

            migrationBuilder.DropTable(
                name: "TypeInventaire");

            migrationBuilder.DropTable(
                name: "Equipe");

            migrationBuilder.DropTable(
                name: "CodeBarreEtage");

            migrationBuilder.DropTable(
                name: "CodeBarreAllee");

            migrationBuilder.DropTable(
                name: "CodeBarreCommercial");

            migrationBuilder.DropTable(
                name: "ResultatInventaire");

            migrationBuilder.DropTable(
                name: "GestionProduit");
        }
    }
}
