﻿using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface IVilleRepository : IGenericRepository<Ville>
    {
       public Task<List<Ville>> GetByIds(List<int?> ids);
    }
}
