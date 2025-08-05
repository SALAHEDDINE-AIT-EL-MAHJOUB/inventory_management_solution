using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Models;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        [Authorize]
        [HttpGet("protected")]
        public IActionResult Protected()
        {
            return Ok(new { message = "Zone protégée accessible." });
        }

        [HttpGet("error")]
        public IActionResult Error()
        {
            return Problem("Une erreur est survenue.");
        }

        [HttpGet("/")]
        public IActionResult Index()
        {
            return Ok(new { message = "Bienvenue sur l'API !" });
        }
    }
}
