using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface ITypeInventaireRepository
    {
        Task AjouterTypeInventaireAsync(string libelle);
        List<TypeInventaire> ObtenirTous();
    }
}