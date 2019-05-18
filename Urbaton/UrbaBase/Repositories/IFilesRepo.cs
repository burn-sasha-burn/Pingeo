using System.Threading.Tasks;

namespace UrbaBase.Repositories
{
    public interface IFilesRepo
    {
        Task Save(string fileId, byte[] file);
        Task<byte[]> Get(string fileId);
    }
}