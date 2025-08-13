using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using Service.Dtos.Operateur;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class OperateurService : IOperateurService
    {
        private readonly IOperateurRepository _operateurRepository;

        public OperateurService(IOperateurRepository operateurRepository)
        {
            _operateurRepository = operateurRepository;
        }

        public async Task<IEnumerable<Operateur>> GetAllAsync()
        {
            return await _operateurRepository.GetAllAsync();
        }

        public async Task<Operateur?> GetByIdAsync(int id)
        {
            return await _operateurRepository.GetByIdAsync(id);
        }

        public async Task<Operateur?> GetByUserIdAsync(string userId)
        {
            return await _operateurRepository.GetOperateurByUserId(userId);
        }

        public async Task<List<Operateur>> GetBySiteIdAsync(int siteId)
        {
            return await _operateurRepository.GetOperateurBySiteId(siteId);
        }

        public async Task AddAsync(Operateur entity)
        {
            await _operateurRepository.AddAsync(entity);
        }

        public async Task<Operateur?> CreateAsync(OperateurCreateDto dto)
        {
            var operateur = new Operateur
            {
                Nom = dto.Nom,
                Prenom = dto.Prenom,
                Cin = dto.Cin,
                Email = dto.Email,
                Telephone = dto.Telephone,
                SiteId = dto.SiteId,
            };
            await _operateurRepository.AddAsync(operateur);
            return operateur;
        }

        public async Task<bool> UpdateAsync(int id, OperateurUpdateDto dto)
        {
            var operateur = await _operateurRepository.GetByIdAsync(id);
            if (operateur == null) return false;

            operateur.Nom = dto.Nom;
            operateur.Prenom = dto.Prenom;
            // operateur.Cin = dto.Cin; // Only if Cin exists in OperateurUpdateDto
            operateur.Email = dto.Email;
            operateur.Telephone = dto.Telephone;
            operateur.SiteId = dto.SiteId;

            await _operateurRepository.UpdateAsync(operateur);
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var operateur = await _operateurRepository.GetByIdAsync(id);
            if (operateur == null) return false;

            await _operateurRepository.DeleteAsync(operateur.Id);
            return true;
        }
   
    }
}