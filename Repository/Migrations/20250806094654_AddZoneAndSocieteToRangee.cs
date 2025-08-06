using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class AddZoneAndSocieteToRangee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AlleeId",
                table: "Rangee",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SocieteId",
                table: "Rangee",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ZoneId",
                table: "Rangee",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AlleeId",
                table: "Etage",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "societeNom",
                table: "Allee",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "zoneNom",
                table: "Allee",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rangee_AlleeId",
                table: "Rangee",
                column: "AlleeId");

            migrationBuilder.CreateIndex(
                name: "IX_Rangee_SocieteId",
                table: "Rangee",
                column: "SocieteId");

            migrationBuilder.CreateIndex(
                name: "IX_Rangee_ZoneId",
                table: "Rangee",
                column: "ZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_Etage_AlleeId",
                table: "Etage",
                column: "AlleeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Etage_Allee_AlleeId",
                table: "Etage",
                column: "AlleeId",
                principalTable: "Allee",
                principalColumn: "Allee_Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rangee_Allee_AlleeId",
                table: "Rangee",
                column: "AlleeId",
                principalTable: "Allee",
                principalColumn: "Allee_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Rangee_Societe",
                table: "Rangee",
                column: "SocieteId",
                principalTable: "Societé",
                principalColumn: "Societé_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Rangee_Zone",
                table: "Rangee",
                column: "ZoneId",
                principalTable: "Zone",
                principalColumn: "Zone_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Etage_Allee_AlleeId",
                table: "Etage");

            migrationBuilder.DropForeignKey(
                name: "FK_Rangee_Allee_AlleeId",
                table: "Rangee");

            migrationBuilder.DropForeignKey(
                name: "FK_Rangee_Societe",
                table: "Rangee");

            migrationBuilder.DropForeignKey(
                name: "FK_Rangee_Zone",
                table: "Rangee");

            migrationBuilder.DropIndex(
                name: "IX_Rangee_AlleeId",
                table: "Rangee");

            migrationBuilder.DropIndex(
                name: "IX_Rangee_SocieteId",
                table: "Rangee");

            migrationBuilder.DropIndex(
                name: "IX_Rangee_ZoneId",
                table: "Rangee");

            migrationBuilder.DropIndex(
                name: "IX_Etage_AlleeId",
                table: "Etage");

            migrationBuilder.DropColumn(
                name: "AlleeId",
                table: "Rangee");

            migrationBuilder.DropColumn(
                name: "SocieteId",
                table: "Rangee");

            migrationBuilder.DropColumn(
                name: "ZoneId",
                table: "Rangee");

            migrationBuilder.DropColumn(
                name: "AlleeId",
                table: "Etage");

            migrationBuilder.DropColumn(
                name: "societeNom",
                table: "Allee");

            migrationBuilder.DropColumn(
                name: "zoneNom",
                table: "Allee");
        }
    }
}
