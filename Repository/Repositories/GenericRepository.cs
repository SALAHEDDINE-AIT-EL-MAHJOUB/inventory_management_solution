using Api.Application.Common.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Repository.IRepositories;
using Microsoft.Extensions.Logging;

namespace Repository.Repositories
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        protected readonly DbContext _context;
        private readonly ILogger<GenericRepository<TEntity>> _logger;

        public GenericRepository(DbContext context, ILogger<GenericRepository<TEntity>> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task AddAsync(TEntity entity)
        {
            await _context.Set<TEntity>().AddAsync(entity);
            await _context.SaveChangesAsync(); // Cette ligne est indispensable !
        }

        public async Task AddAsync(IEnumerable<TEntity> entities)
        {
            await _context.Set<TEntity>().AddRangeAsync(entities);
        }

        public async Task<TEntity?> GetAsync(
            System.Linq.Expressions.Expression<System.Func<TEntity, bool>>? predicate = null,
            System.Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
            System.Func<IQueryable<TEntity>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<TEntity, object?>>? include = null,
            bool disableTracking = true)
        {
            IQueryable<TEntity> query = _context.Set<TEntity>();
            if (disableTracking)
                query = query.AsNoTracking();
            if (include != null)
                query = include(query);
            if (predicate != null)
                query = query.Where(predicate);
            if (orderBy != null)
                return await orderBy(query).FirstOrDefaultAsync();
            return await query.FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<TEntity>> GetListAsync(
            System.Linq.Expressions.Expression<System.Func<TEntity, bool>>? predicate = null,
            System.Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
            System.Func<IQueryable<TEntity>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<TEntity, object?>>? include = null,
            bool disableTracking = true)
        {
            IQueryable<TEntity> query = _context.Set<TEntity>();
            if (disableTracking)
                query = query.AsNoTracking();
            if (include != null)
                query = include(query);
            if (predicate != null)
                query = query.Where(predicate);
            if (orderBy != null)
                return await orderBy(query).ToListAsync();
            return await query.ToListAsync();
        }

        public void Update(IEnumerable<TEntity> entities)
        {
            _context.Set<TEntity>().UpdateRange(entities);
        }

        public void Update(TEntity entity)
        {
            _context.Set<TEntity>().Update(entity);
        }

        public void Delete(object id)
        {
            var entity = _context.Set<TEntity>().Find(id);
            if (entity != null)
                _context.Set<TEntity>().Remove(entity);
        }

        public void Delete(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
        }

        public void Delete(IEnumerable<TEntity> entities)
        {
            _context.Set<TEntity>().RemoveRange(entities);
        }

        public async Task<int> GetCount(System.Linq.Expressions.Expression<System.Func<TEntity, bool>>? predicate = null)
        {
            if (predicate != null)
                return await _context.Set<TEntity>().CountAsync(predicate);
            return await _context.Set<TEntity>().CountAsync();
        }

        public IQueryable<TEntity> GetAll()
        {
            return _context.Set<TEntity>();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(TEntity entity)
        {
            _context.Set<TEntity>().Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(object id)
        {
            var entity = await _context.Set<TEntity>().FindAsync(id);
            if (entity != null)
            {
                _context.Set<TEntity>().Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
            await _context.SaveChangesAsync();
        }


        public async Task<GenericPaginatedList<TEntity>> GetPaginatedListAsync(
            int currentPage,
            int itemsPerPage,
            Expression<Func<TEntity, bool>>? predicate = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object?>>? include = null,
            bool disableTracking = true)
        {
            IQueryable<TEntity> query = _context.Set<TEntity>();
            if (disableTracking)
                query = query.AsNoTracking();
            if (include != null)
                query = include(query);
            if (predicate != null)
                query = query.Where(predicate);
            if (orderBy != null)
                query = orderBy(query);

            var totalItems = await query.CountAsync();
            var entities = await query.Skip((currentPage - 1) * itemsPerPage).Take(itemsPerPage).ToListAsync();

            return new GenericPaginatedList<TEntity>
            {
                Entities = entities,
                CurrentPage = currentPage,
                ItemsPerPage = itemsPerPage,
                TotalItems = totalItems,
                TotalPages = (int)System.Math.Ceiling((double)totalItems / itemsPerPage)
            };
        }

        public async Task<List<TEntity>> GetAllAsync()
        {
            return await _context.Set<TEntity>().AsNoTracking().ToListAsync();
        }

        public async Task<TEntity?> GetByIdAsync(int id)
        {
            return await _context.Set<TEntity>().FindAsync(id);
        }
    }
}