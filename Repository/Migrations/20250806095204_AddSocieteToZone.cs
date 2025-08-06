using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class AddSocieteToZone : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Zone_SocieteId",
                table: "Zone",
                type: "int",
                nullable: true,
                comment: "Référence à l'identifiant de la société à laquelle appartient la zone.");

            migrationBuilder.AddColumn<string>(
                name: "Zone_SocieteNom",
                table: "Zone",
                type: "varchar(100)",
                unicode: false,
                maxLength: 100,
                nullable: true,
                comment: "Nom de la société liée à la zone.");

            migrationBuilder.CreateIndex(
                name: "IX_Zone_Zone_SocieteId",
                table: "Zone",
                column: "Zone_SocieteId");

            migrationBuilder.AddForeignKey(
                name: "Zone_SocieteId",
                table: "Zone",
                column: "Zone_SocieteId",
                principalTable: "Societé",
                principalColumn: "Societé_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "Zone_SocieteId",
                table: "Zone");

            migrationBuilder.DropIndex(
                name: "IX_Zone_Zone_SocieteId",
                table: "Zone");

            migrationBuilder.DropColumn(
                name: "Zone_SocieteId",
                table: "Zone");

            migrationBuilder.DropColumn(
                name: "Zone_SocieteNom",
                table: "Zone");
        }
    }
}
