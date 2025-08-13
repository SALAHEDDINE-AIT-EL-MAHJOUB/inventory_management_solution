using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class AddDoubleInventaireFieldsToGestionInventaire : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.AddColumn<int>(
                name: "QuantiteInventairedouble",
                table: "GestionInventaire",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "operateurdoubleinventaireId",
                table: "GestionInventaire",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropColumn(
                name: "QuantiteInventairedouble",
                table: "GestionInventaire");

            migrationBuilder.DropColumn(
                name: "operateurdoubleinventaireId",
                table: "GestionInventaire");
        }
    }
}
