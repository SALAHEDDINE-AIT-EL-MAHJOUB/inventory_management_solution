using Microsoft.AspNetCore.Identity;
namespace Domain.Entities;


public class User :  IdentityUser<string>
{

   
    public ICollection<UserRole>? UserRoles { get; set; }

    public ICollection<Client>? Clients { get; set; }
    public ICollection<Operateur>? Operateurs { get; set; }

    
    public IList<string> GetRoleNames() =>
        UserRoles != null && UserRoles.Count != 0
            ? UserRoles.Select(ur => ur.Role.Name!).ToList()
            : new List<string>();
}