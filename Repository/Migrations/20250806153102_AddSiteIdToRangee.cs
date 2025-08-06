using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class AddSiteIdToRangee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Allee_SiteId",
                table: "Allee");

            migrationBuilder.DropColumn(
                name: "SocieteNom",
                table: "Rangee");

            migrationBuilder.DropColumn(
                name: "ZoneNom",
                table: "Rangee");

            migrationBuilder.AddColumn<int>(
                name: "SiteId",
                table: "Rangee",
                type: "int",
                nullable: true);

           

           
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}
