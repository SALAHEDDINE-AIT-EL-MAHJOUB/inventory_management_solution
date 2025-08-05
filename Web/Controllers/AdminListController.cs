using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using System.Threading.Tasks;
using System.Linq;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminListController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminListController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        // GET: api/AdminList
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var admins = await _adminService.GetAllAsync();
            // On retourne seulement les infos utiles
            var result = admins.Select(a => new
            {
                id = a.AdminId,
                adminName = a.AdminName,
                email = a.Email
            });
            return Ok(result);
        }
    }
}