using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class FixOperateurSiteRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Operateur_Site_SiteId1",
                table: "Operateur");

            migrationBuilder.DropIndex(
                name: "IX_Operateur_SiteId1",
                table: "Operateur");

            migrationBuilder.DropColumn(
                name: "SiteId1",
                table: "Operateur");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SiteId1",
                table: "Operateur",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Operateur_SiteId1",
                table: "Operateur",
                column: "SiteId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Operateur_Site_SiteId1",
                table: "Operateur",
                column: "SiteId1",
                principalTable: "Site",
                principalColumn: "Site_Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
