namespace StockPilot.Api.Application.Admins.Dtos
{
    public class UpdateAdminDto
    {
        public int Id { get; set; }
        public string AdminName { get; set; }
        public string Email { get; set; }
        public bool IsSuperAdmin { get; set; }
    }
}
