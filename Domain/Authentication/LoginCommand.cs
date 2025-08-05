using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models.user;
namespace Domain.Authentication
{
    public class LoginCommand :IRequest<UserModel>
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public LoginCommand(string userName, string password)
                {
                    UserName = userName;
                    Password = password;
                }
    }
}
