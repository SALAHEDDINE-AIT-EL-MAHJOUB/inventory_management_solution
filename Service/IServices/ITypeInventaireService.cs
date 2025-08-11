using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface ITypeInventaireService
    {
        Task AjouterTypeInventaireAsync(string libelle);
        List<TypeInventaire> ObtenirTous();
    }
}