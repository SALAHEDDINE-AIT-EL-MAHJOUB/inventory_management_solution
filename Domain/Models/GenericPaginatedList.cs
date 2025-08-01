namespace Api.Application.Common.Models
{
    /// <summary>
    /// GenericPaginatedList
    /// </summary>
    public class GenericPaginatedList<TEntity> where TEntity : class
    {
        public IEnumerable<TEntity> Entities { get; set; } = new List<TEntity>();

     
        public int CurrentPage { get; set; }

        public int ItemsPerPage { get; set; }

           public int TotalItems { get; set; }

        public int TotalPages { get; set; }
    }
}