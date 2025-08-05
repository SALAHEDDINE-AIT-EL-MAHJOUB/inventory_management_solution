using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Repository.Data
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            // Use your connection string from appsettings.json
            optionsBuilder.UseSqlServer(
                "Server=DESKTOP-SUDV7B1\\SQLEXPRESS01;Database=StockPilot;Trusted_Connection=True;MultipleActiveResultSets=true"
            );
            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}