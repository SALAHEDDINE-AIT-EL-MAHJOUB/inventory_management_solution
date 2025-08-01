public class LoginDto
{
    public string Username { get; set; }
    public string Password { get; set; }
}

// filepath: d:\stage\Web\Domain\Models\SignupDto.cs
public class SignupDto
{
    public string AdminName { get; set; }
    public string Email { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public bool IsSuperAdmin { get; set; }
}

// filepath: d:\stage\Web\Domain\Models\ChangePasswordDto.cs
public class ChangePasswordDto
{
    public string NewPassword { get; set; }
}