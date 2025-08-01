using System.Security.Claims;

namespace Web.Middleware
{
    public class UserTypeRedirectMiddleware
    {
        private readonly RequestDelegate _next;

        public UserTypeRedirectMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Si l'utilisateur est authentifié et accède à la racine
            if (context.User.Identity.IsAuthenticated && context.Request.Path == "/")
            {
                var userType = context.User.FindFirstValue("UserType");
                
                switch (userType)
                {
                    case "Admin":
                        context.Response.Redirect("/admin/dashboard");
                        return;
                    case "Client":
                        context.Response.Redirect("/client/dashboard");
                        return;
                }
            }

            await _next(context);
        }
    }

    public static class UserTypeRedirectMiddlewareExtensions
    {
        public static IApplicationBuilder UseUserTypeRedirect(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<UserTypeRedirectMiddleware>();
        }
    }
}