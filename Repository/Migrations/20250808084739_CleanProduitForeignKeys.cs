using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class CleanProduitForeignKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1. Supprimer la FK sur RangeeId si elle existe
            migrationBuilder.DropForeignKey(
                name: "FK_Produits_Rangee_RangeeId",
                table: "Produits");

            // 2. Supprimer l’index sur RangeeId si il existe
            migrationBuilder.DropIndex(
                name: "IX_Produits_RangeeId",
                table: "Produits");

            // 3. Supprimer la colonne RangeeId
            migrationBuilder.DropColumn(
                name: "RangeeId",
                table: "Produits");

            // 4. Renommer la colonne Produit_RangeeId en RangeeId
            migrationBuilder.RenameColumn(
                name: "Produit_RangeeId",
                table: "Produits",
                newName: "RangeeId");

            // 5. Renommer l’index associé
            migrationBuilder.RenameIndex(
                name: "IX_Produits_Produit_RangeeId",
                table: "Produits",
                newName: "IX_Produits_RangeeId");

            // 6. Modifier la colonne si besoin
            migrationBuilder.AlterColumn<int>(
                name: "RangeeId",
                table: "Produits",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            // 7. Ajouter la colonne CodeBarre
            // migrationBuilder.AddColumn<string>(
            //     name: "CodeBarre",
            //     table: "Produits",
            //     type: "nvarchar(max)",
            //     nullable: true);

            // 8. Recréer la FK sur RangeeId
            migrationBuilder.AddForeignKey(
                name: "FK_Produits_Rangee_RangeeId",
                table: "Produits",
                column: "RangeeId",
                principalTable: "Rangee",
                principalColumn: "Rangée_Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produits_Rangee_RangeeId",
                table: "Produits");

            migrationBuilder.DropColumn(
                name: "CodeBarre",
                table: "Produits");

            migrationBuilder.RenameColumn(
                name: "RangeeId",
                table: "Produits",
                newName: "Produit_RangeeId");

            migrationBuilder.RenameIndex(
                name: "IX_Produits_RangeeId",
                table: "Produits",
                newName: "IX_Produits_Produit_RangeeId");

            migrationBuilder.AlterColumn<int>(
                name: "Produit_RangeeId",
                table: "Produits",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Produits_Rangee_Produit_RangeeId",
                table: "Produits",
                column: "Produit_RangeeId",
                principalTable: "Rangee",
                principalColumn: "Rangée_Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
