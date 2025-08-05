using System.Threading.Tasks;
using Domain.Entities;
using Domain.Models.user;
using Repository.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using Repository;
using Repository.Data;
using System.Linq.Expressions;
namespace Repository.Repositories
{
    public class ClientRepository : GenericRepository<Client> , IClientRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<GenericRepository<Client>> _logger;

        public ClientRepository(ApplicationDbContext dbContext ,ILogger<GenericRepository<Client>> logger) : base(dbContext,logger)
        {
            _context = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<User?> GetUserByName(string userName)
        {
            try
            {
                var res = await _context.Users
                    .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                    .FirstOrDefaultAsync(u => u.UserName == userName);

                return res;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting user by name {userName}");
                return null;
            }

        }
        public async Task<Client?> GetClientUserById(string id)
        {
            try
            {
                var res = await _context.Clients
                    .FirstOrDefaultAsync(c => c.UserId == id && c.IsDeleted == false);
                return res;
            }
            catch (Exception ex) 
            { 
                return null;
            }
        }
        public async Task<Client?> GetClientByEmail(string email)
        {
            try
            {
                var res = await _context.Clients
                    .FirstOrDefaultAsync(c => c.Email == email && !c.IsDeleted);
                return res;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

              public async Task<Client?> GetByIdAsync(int id, bool includeRelated = true)
        {
            try
            {
                if (includeRelated)
                {
                    return await _context.Clients
                        .Include(c => c.User)
                        .FirstOrDefaultAsync(c => c.ClientId == id && !c.IsDeleted);
                }

                return await _context.Clients
                    .FirstOrDefaultAsync(c => c.ClientId == id && !c.IsDeleted);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting client by ID {id}");
                return null;
            }
        }

        public async Task<Client?> GetByEmailAsync(string email, bool includeRelated = true)
        {
            try
            {
                var query = _context.Clients
                    .Where(c => c.Email == email && !c.IsDeleted);

                if (includeRelated)
                {
                    query = query.Include(c => c.User); // Charge la relation User
                }

                return await query.FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting client by email {email}");
                return null;
            }
        }

        public async Task<Client?> GetByNameAsync(string name, bool includeRelated = true)
        {
            try
            {
                var query = _context.Clients
                    .Where(c => c.ClientNom == name && !c.IsDeleted);

                if (includeRelated)
                {
                    query = query.Include(c => c.User); // Charge la relation User
                }

                return await query.FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting client by name {name}");
                return null;
            }
        }

        public async Task<IEnumerable<Client>> GetAllAsync(Expression<Func<Client, bool>>? predicate = null)
        {
            return await base.GetListAsync(predicate, include: q => q.Include(c => c.User));
        }

        public async Task<Client> AddClientAsync(Client client)
        {
            try
            {
                if (client == null)
                    throw new ArgumentNullException(nameof(client));

                await _context.Clients.AddAsync(client);
                await _context.SaveChangesAsync();
                return client;
            }
            catch (DbUpdateException ex) when (ex.InnerException?.Message.Contains("UQ__Client__A7A650D3") == true)
            {
                _logger.LogError(ex, "Email already exists.");
                throw new InvalidOperationException("Un client avec cet email existe déjà.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de l'ajout du client");
                throw;
            }
        }

    }
}
