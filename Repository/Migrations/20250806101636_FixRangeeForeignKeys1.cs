using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class FixRangeeForeignKeys1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AlleeNom",
                table: "Rangee",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SocieteNom",
                table: "Rangee",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZoneNom",
                table: "Rangee",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AlleeNom",
                table: "Rangee");

            migrationBuilder.DropColumn(
                name: "SocieteNom",
                table: "Rangee");

            migrationBuilder.DropColumn(
                name: "ZoneNom",
                table: "Rangee");
        }
    }
}
