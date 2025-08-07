using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class UpdateEtageTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "Etage_RangéeId",
                table: "Etage");

            migrationBuilder.DropForeignKey(
                name: "FK_Etage_Allee_AlleeId",
                table: "Etage");

            migrationBuilder.AlterColumn<int>(
                name: "Etage_RangéeId",
                table: "Etage",
                type: "int",
                nullable: true,
                comment: "Référence à l'identifiant de la rangée dans laquelle l'étage est situé. C'est une clé étrangère.",
                oldClrType: typeof(int),
                oldType: "int",
                oldComment: "Référence à l'identifiant de la rangée dans laquelle l'étage est situé. C'est une clé étrangère.");

            migrationBuilder.AlterColumn<int>(
                name: "AlleeId",
                table: "Etage",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "SiteId",
                table: "Etage",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SocieteId",
                table: "Etage",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ZoneId",
                table: "Etage",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Etage_SiteId",
                table: "Etage",
                column: "SiteId");

            migrationBuilder.CreateIndex(
                name: "IX_Etage_SocieteId",
                table: "Etage",
                column: "SocieteId");

            migrationBuilder.CreateIndex(
                name: "IX_Etage_ZoneId",
                table: "Etage",
                column: "ZoneId");

            migrationBuilder.AddForeignKey(
                name: "Etage_RangéeId",
                table: "Etage",
                column: "Etage_RangéeId",
                principalTable: "Rangee",
                principalColumn: "Rangée_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Etage_Allee_AlleeId",
                table: "Etage",
                column: "AlleeId",
                principalTable: "Allee",
                principalColumn: "Allee_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Etage_Site_SiteId",
                table: "Etage",
                column: "SiteId",
                principalTable: "Site",
                principalColumn: "Site_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Etage_Societé_SocieteId",
                table: "Etage",
                column: "SocieteId",
                principalTable: "Societé",
                principalColumn: "Societé_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Etage_Zone_ZoneId",
                table: "Etage",
                column: "ZoneId",
                principalTable: "Zone",
                principalColumn: "Zone_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "Etage_RangéeId",
                table: "Etage");

            migrationBuilder.DropForeignKey(
                name: "FK_Etage_Allee_AlleeId",
                table: "Etage");

            migrationBuilder.DropForeignKey(
                name: "FK_Etage_Site_SiteId",
                table: "Etage");

            migrationBuilder.DropForeignKey(
                name: "FK_Etage_Societé_SocieteId",
                table: "Etage");

            migrationBuilder.DropForeignKey(
                name: "FK_Etage_Zone_ZoneId",
                table: "Etage");

            migrationBuilder.DropIndex(
                name: "IX_Etage_SiteId",
                table: "Etage");

            migrationBuilder.DropIndex(
                name: "IX_Etage_SocieteId",
                table: "Etage");

            migrationBuilder.DropIndex(
                name: "IX_Etage_ZoneId",
                table: "Etage");

            migrationBuilder.DropColumn(
                name: "SiteId",
                table: "Etage");

            migrationBuilder.DropColumn(
                name: "SocieteId",
                table: "Etage");

            migrationBuilder.DropColumn(
                name: "ZoneId",
                table: "Etage");

            migrationBuilder.AlterColumn<int>(
                name: "Etage_RangéeId",
                table: "Etage",
                type: "int",
                nullable: false,
                defaultValue: 0,
                comment: "Référence à l'identifiant de la rangée dans laquelle l'étage est situé. C'est une clé étrangère.",
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true,
                oldComment: "Référence à l'identifiant de la rangée dans laquelle l'étage est situé. C'est une clé étrangère.");

            migrationBuilder.AlterColumn<int>(
                name: "AlleeId",
                table: "Etage",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "Etage_RangéeId",
                table: "Etage",
                column: "Etage_RangéeId",
                principalTable: "Rangee",
                principalColumn: "Rangée_Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Etage_Allee_AlleeId",
                table: "Etage",
                column: "AlleeId",
                principalTable: "Allee",
                principalColumn: "Allee_Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
