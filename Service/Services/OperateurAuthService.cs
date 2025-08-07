using Service.Dtos.Operateur;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Service.IServices;
using Repository.IRepositories;
public class OperateurAuthService : IOperateurAuthService
{
    private readonly UserManager<User> _userManager;
    private readonly IOperateurRepository _operateurRepository;

    public OperateurAuthService(UserManager<User> userManager, IOperateurRepository operateurRepository)
    {
        _userManager = userManager;
        _operateurRepository = operateurRepository;
    }

    public async Task<(bool Success, IEnumerable<string>? Errors)> RegisterAsync(OperateurCreateDto dto)
    {
        var user = new User
        {
            Id = Guid.NewGuid().ToString(),
            UserName = dto.Email,
            Email = dto.Email,
            PhoneNumber = dto.Telephone,
             IsOperateur = true
        };

        var result = await _userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded)
            return (false, result.Errors.Select(e => e.Description));

        var operateur = new Operateur
        {
            Nom = dto.Nom,
            Prenom = dto.Prenom,
            Cin = dto.Cin,
            Email = dto.Email,
            Telephone = dto.Telephone,
            SiteId = dto.SiteId,
            UserId = user.Id
        };

        try
        {
            await _operateurRepository.AddAsync(operateur);
            return (operateur.Id > 0, null);
        }
        catch (Exception ex)
        {
            await _userManager.DeleteAsync(user);
            // Ajoute le message d'exception pour le debug
            return (false, new[] { "Erreur lors de l'ajout de l'opérateur : " + ex.ToString() });
        }
    }

    public async Task<string?> LoginAsync(OperateurLoginDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null) return null;

        var valid = await _userManager.CheckPasswordAsync(user, dto.Password);
        if (!valid) return null;

        // Generate JWT or session token here as needed
        return user.Id;
    }
}