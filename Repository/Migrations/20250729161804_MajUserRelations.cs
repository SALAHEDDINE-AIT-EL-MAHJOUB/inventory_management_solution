using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class MajUserRelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Admins_AspNetUsers_UserId",
                table: "Admins");

            migrationBuilder.DropForeignKey(
                name: "FK_Operateur_AspNetUsers_Operateur_AspNetUsersId",
                table: "Operateur");

            migrationBuilder.DropColumn(
                name: "MotDePasse",
                table: "Operateur");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Admins",
                newName: "Admin_AspNetUsersId");

            migrationBuilder.RenameIndex(
                name: "IX_Admins_UserId",
                table: "Admins",
                newName: "IX_Admins_Admin_AspNetUsersId");

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Admin_AspNetUsersId",
                table: "Admins",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_Admins_AspNetUsers_Admin_AspNetUsersId",
                table: "Admins",
                column: "Admin_AspNetUsersId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Operateur_AspNetUsers_Operateur_AspNetUsersId",
                table: "Operateur",
                column: "Operateur_AspNetUsersId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Admins_AspNetUsers_Admin_AspNetUsersId",
                table: "Admins");

            migrationBuilder.DropForeignKey(
                name: "FK_Operateur_AspNetUsers_Operateur_AspNetUsersId",
                table: "Operateur");

            migrationBuilder.RenameColumn(
                name: "Admin_AspNetUsersId",
                table: "Admins",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Admins_Admin_AspNetUsersId",
                table: "Admins",
                newName: "IX_Admins_UserId");

            migrationBuilder.AddColumn<string>(
                name: "MotDePasse",
                table: "Operateur",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Admins",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Admins_AspNetUsers_UserId",
                table: "Admins",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Operateur_AspNetUsers_Operateur_AspNetUsersId",
                table: "Operateur",
                column: "Operateur_AspNetUsersId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
