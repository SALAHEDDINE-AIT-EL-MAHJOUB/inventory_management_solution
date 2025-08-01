using Microsoft.AspNetCore.Identity;
using Domain.Models.user;
using Microsoft.AspNetCore.Mvc;
using Repository.Data;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Service.IServices;
using Service.Services;
using Repository.IRepositories;
using Repository.Repositories;
using Microsoft.AspNetCore.Authentication.Cookies;
using Web.Middleware; // Ajouter cette ligne

var builder = WebApplication.CreateBuilder(args);

// Ajoute cette ligne AVANT AddIdentity :
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ...puis AddIdentity...
builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    // Configure password requirements
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 3;
    options.Password.RequiredUniqueChars = 0;
    
    // Configuration utilisateur
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Authentification/Login";
    options.AccessDeniedPath = "/Authentification/Login";
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
    };
    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = 403;
        return Task.CompletedTask;
    };
});

builder.Services.AddAuthorization();
builder.Services.AddControllers() // ← Pour les API sans Razor Views
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000") // adapte l'URL à ton frontend
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials(); // <-- important
        });
});

// Ajout des services métiers (à adapter selon vos namespaces)
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>(); 
builder.Services.AddLogging();

var app = builder.Build();

// Exception handler et HSTS
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseCors("AllowFrontend");

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseUserTypeRedirect(); // Maintenant cette ligne fonctionnera
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();