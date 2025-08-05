using Microsoft.AspNetCore.Identity;

namespace Domain.Models.user
{
    public class ApplicationUser : IdentityUser
    {
         public string FirstName { get; set; }
        public string LastName { get; set; }
      
        public string Address { get; set; }
    }
}