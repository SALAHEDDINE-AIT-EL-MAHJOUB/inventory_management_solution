using Domain.Entities;
using Repository.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repository.Data;

namespace Repository.Repositories
{ 


public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(User user)
    {
        _context.Set<User>().Add(user);
        await _context.SaveChangesAsync();
    }

    public async Task<User?> GetUserByUserNameAsync(string username)
    {
        return await _context.Set<User>().FirstOrDefaultAsync(u => u.UserName == username);
    }

    public async Task UpdateAsync(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }
}

}