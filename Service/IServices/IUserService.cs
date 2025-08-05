using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IUserService
    {
        Task<User?> AuthenticateAsync(string username, string password);
    }
}