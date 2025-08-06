using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class UpdateAlleeDenormalizedNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AlleeId",
                table: "CodeBarreAllee",
                type: "int",
                nullable: true);


            migrationBuilder.AddColumn<int>(
                name: "SiteId",
                table: "Allee",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SocieteId",
                table: "Allee",
                type: "int",
                nullable: true);

           

           

            migrationBuilder.CreateIndex(
                name: "IX_CodeBarreAllee_AlleeId",
                table: "CodeBarreAllee",
                column: "AlleeId");

            migrationBuilder.CreateIndex(
                name: "IX_Allee_SiteId",
                table: "Allee",
                column: "SiteId");

            migrationBuilder.CreateIndex(
                name: "IX_Allee_SocieteId",
                table: "Allee",
                column: "SocieteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Allee_Site_SiteId",
                table: "Allee",
                column: "SiteId",
                principalTable: "Site",
                principalColumn: "Site_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Allee_Societé_SocieteId",
                table: "Allee",
                column: "SocieteId",
                principalTable: "Societé",
                principalColumn: "Societé_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CodeBarreAllee_Allee_AlleeId",
                table: "CodeBarreAllee",
                column: "AlleeId",
                principalTable: "Allee",
                principalColumn: "Allee_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        { }
    }
}
