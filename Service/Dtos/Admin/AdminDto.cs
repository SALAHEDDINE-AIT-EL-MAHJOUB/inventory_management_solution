namespace service.Dtos.Admin
{
    public class AdminDto
    {
        public int Id { get; set; }
        public string AdminName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public List<string> Roles { get; set; } = new();
    }


    public class CreateAdminDto
    {
        public string AdminName { get; set; }
        public string Email { get; set; }
        public bool IsSuperAdmin { get; set; }

        // Ces deux propriétés étaient manquantes :
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
