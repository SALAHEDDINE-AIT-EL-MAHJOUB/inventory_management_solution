using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Admin
    {
        public int AdminId { get; set; }
        public string AdminName { get; set; }
        public string Email { get; set; }
        public bool IsSuperAdmin { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsDeleted { get; set; } = false;

        public string? UserId { get; set; }
        public virtual User? User { get; set; }
    }
}
