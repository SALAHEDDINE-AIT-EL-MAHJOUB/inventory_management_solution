using Microsoft.AspNetCore.Identity;
using System.Linq; 

namespace Domain.Entities
{


public class User :  IdentityUser<string>
{
        // Masque la propriété héritée si besoin
        public new string PasswordHash { get; set; }

   
   public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

    public ICollection<Client>? Clients { get; set; }
    public ICollection<Operateur>? Operateurs { get; set; }
    public ICollection<Admin>? Admins { get; set; }   

    
    public IList<string> GetRoleNames() =>
        UserRoles != null && UserRoles.Count != 0
            ? UserRoles.Select(ur => ur.Role.Name!).ToList()
            : new List<string>();
}

}