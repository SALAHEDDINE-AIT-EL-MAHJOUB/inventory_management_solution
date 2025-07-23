using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;


public class UserRole : IdentityUserRole<string>
{
    
    public User User { get; set; } = default!;

   
    public Role Role { get; set; } = default!;
}
