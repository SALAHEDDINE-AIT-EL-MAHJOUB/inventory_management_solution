using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class TypeInventaireService : ITypeInventaireService
    {
        private readonly ITypeInventaireRepository _repository;

        public TypeInventaireService(ITypeInventaireRepository repository)
        {
            _repository = repository;
        }

        public async Task AjouterTypeInventaireAsync(string libelle)
        {
            await _repository.AjouterTypeInventaireAsync(libelle);
        }

        public List<TypeInventaire> ObtenirTous()
        {
            return _repository.ObtenirTous();
        }
    }
}