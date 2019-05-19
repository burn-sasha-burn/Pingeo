using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using UrbaBase.Repositories;

namespace Front.Api
{
    [Route("api/files")]
    public class FilesController : ApiController
    {
        private readonly IFilesRepo _filesRepo;

        public FilesController(IFilesRepo filesRepo)
        {
            _filesRepo = filesRepo;
        }

        [HttpGet]
        public async Task<HttpResponseMessage> GetImage([FromUri] string fileId)
        {
            var file = await _filesRepo.Get(fileId);

            var response = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(file)
            };

            response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpg");
            response.Content.Headers.ContentLength = file.Length;

            return response;
        }
    }
}
