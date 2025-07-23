
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Repository.IRepositories
{
    public interface IEtageRepository : IGenericRepository<Etage>
    {
        public Task<List<Etage>> GetByRangeeId(int id);
        Task<List<Etage>> GetEtagesByRangeeName(int clientId, string rangeeNom);

        Task<List<Etage>> GetEtagesByClientId(int clientId);

    }
}
