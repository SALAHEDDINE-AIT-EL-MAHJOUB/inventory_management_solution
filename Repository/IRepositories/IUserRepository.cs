using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    

    public interface IUserRepository
    {
        Task<User?> GetUserByUserNameAsync(string username);
        Task AddAsync(User user);
        Task UpdateAsync(User user);
    }
}