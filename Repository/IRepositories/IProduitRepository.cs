using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.IRepositories
{
    public interface IProduitRepository :IGenericRepository<Produit>
    {
        public Task<List<Produit>> GetByEtageId(int id);
        Task<List<Produit>> GetAllProduitsAsync();

        Task<List<Produit>> GetProduitsByClientIdAsync(int clientId);
        Task<List<Produit>> GetProduitsParSite(int siteId);


    }
}
