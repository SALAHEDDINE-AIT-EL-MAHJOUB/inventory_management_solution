using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class UpdateProduitTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RangeeId",
                table: "Produits",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ZoneId",
                table: "Produits",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SocieteId",
                table: "Produits",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AlleeId",
                table: "Produits",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SiteId",
                table: "Produits",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EtageId",
                table: "Produits",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Produits_RangeeId",
                table: "Produits",
                column: "RangeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Produits_ZoneId",
                table: "Produits",
                column: "ZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_Produits_SocieteId",
                table: "Produits",
                column: "SocieteId");

            migrationBuilder.CreateIndex(
                name: "IX_Produits_AlleeId",
                table: "Produits",
                column: "AlleeId");

            migrationBuilder.CreateIndex(
                name: "IX_Produits_SiteId",
                table: "Produits",
                column: "SiteId");

            migrationBuilder.CreateIndex(
                name: "IX_Produits_EtageId",
                table: "Produits",
                column: "EtageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Produits_Rangee_RangeeId",
                table: "Produits",
                column: "RangeeId",
                principalTable: "Rangee",
                principalColumn: "Rangée_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Produits_Zone_ZoneId",
                table: "Produits",
                column: "ZoneId",
                principalTable: "Zone",
                principalColumn: "Zone_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Produits_Societé_SocieteId",
                table: "Produits",
                column: "SocieteId",
                principalTable: "Societé",
                principalColumn: "Societé_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Produits_Allee_AlleeId",
                table: "Produits",
                column: "AlleeId",
                principalTable: "Allee",
                principalColumn: "Allee_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Produits_Site_SiteId",
                table: "Produits",
                column: "SiteId",
                principalTable: "Site",
                principalColumn: "Site_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Produits_Etage_EtageId",
                table: "Produits",
                column: "EtageId",
                principalTable: "Etage",
                principalColumn: "Etage_Id");
        }
    }
}