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

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddScoped<DbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());


builder.Services.AddIdentity<User, Role>(options =>
{

    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 6;
    
  
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
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
        });
});


builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddScoped<IRegionRepository, RegionRepository>();
builder.Services.AddScoped<IRegionService, RegionService>();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>(); 
builder.Services.AddScoped<ISocieteService, SocieteService>();
builder.Services.AddScoped<ISocieteRepository, SocieteRepository>();
builder.Services.AddScoped<IVilleService, VilleService>();
builder.Services.AddScoped<IVilleRepository, VilleRepository>();
builder.Services.AddScoped<IGenericRepository<Domain.Entities.Ville>, VilleRepository>();
builder.Services.AddLogging();
builder.Services.AddScoped<Service.IServices.ISocieteService, Service.Services.SocieteService>();

builder.Services.AddScoped<ISiteService, SiteService>();
builder.Services.AddScoped<Repository.IRepositories.ISiteRepository, Repository.Repositories.SiteRepository>();
builder.Services.AddScoped<IZoneService, ZoneService>();
builder.Services.AddScoped<IZoneRepository, ZoneRepository>();
builder.Services.AddScoped<IAlleeRepository, AlleeRepository>();
builder.Services.AddScoped<IAlleeService, AlleeService>();
builder.Services.AddScoped<IRangeeRepository, RangeeRepository>();
builder.Services.AddScoped<IRangeeService, RangeeService>();
builder.Services.AddScoped<IEtageRepository, EtageRepository>();
builder.Services.AddScoped<IEtageService, EtageService>();
builder.Services.AddScoped<IOperateurAuthService, OperateurAuthService>();
builder.Services.AddScoped<IOperateurRepository, OperateurRepository>();


builder.Services.AddScoped<IOperateurService, OperateurService>();
builder.Services.AddScoped<IEquipeService, EquipeService>();
builder.Services.AddScoped<IEquipeRepository, EquipeRepository>();
builder.Services.AddScoped<IEquipeOperateurService, EquipeOperateurService>();
builder.Services.AddScoped<IEquipeOperateurRepository, EquipeOperateurRepository>();
builder.Services.AddScoped<IInventaireService, InventaireService>();
builder.Services.AddScoped<IInventaireRepository, InventaireRepository>();
builder.Services.AddScoped<ICodebarreProduitRepository, CodebarreProduitRepository>();
builder.Services.AddScoped<ICodebarreProduitService, CodebarreProduitService>();
builder.Services.AddScoped<ISocieteService, SocieteService>();
builder.Services.AddScoped<IProduitService, ProduitService>();
builder.Services.AddScoped<IProduitRepository, ProduitRepository>();
builder.Services.AddScoped<IFournisseurService, FournisseurService>();
builder.Services.AddScoped<IFournisseurRepository, FournisseurRepository>();
builder.Services.AddScoped<IStatutRepository, StatutRepository>();
builder.Services.AddScoped<IStatutService, StatutService>();
builder.Services.AddScoped<ITypeInventaireRepository, TypeInventaireRepository>();
builder.Services.AddScoped<ITypeInventaireService, TypeInventaireService>();
builder.Services.AddScoped<IGestionProduitService, GestionProduitService>();
builder.Services.AddScoped<IGestionProduitRepository, GestionProduitRepository>();
builder.Services.AddScoped<IResultatInventaireService, ResultatInventaireService>();
builder.Services.AddScoped<IResultatInventaireRepository, Repository.Repositories.ResultatInventaireRepository>();
builder.Services.AddScoped<IGestionInventaireService, GestionInventaireService>();
builder.Services.AddScoped<IGestionInventaireRepository, GestionInventaireRepository>();
builder.Services.AddScoped<IPredictionService, PredictionService>();



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseCors("AllowFrontend");
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllers();
app.MapFallbackToFile("index.html");

var scope = app.Services.CreateScope();
var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
StatutSeeder.SeedStatut(dbContext);

app.Run();
