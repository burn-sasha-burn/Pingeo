using System.Threading.Tasks;
using MongoDB.Driver.GridFS;

namespace UrbaBase.Repositories
{
    public class FilesRepo : IFilesRepo
    {
        private readonly GridFSBucket _gridFs;

        public FilesRepo(GridFSBucket gridFs)
        {
            _gridFs = gridFs;
        }

        public Task Save(string fileId, byte[] file)
        {
            return _gridFs.UploadFromBytesAsync(fileId, file);
        }

        public Task<byte[]> Get(string fileId)
        {
            return _gridFs.DownloadAsBytesByNameAsync(fileId);
        }
    }
}