using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Telegram.Bot.Types;
using UrbaBase.Repositories;
using UrbaBot;

namespace Front.Api
{
    public class BotController : ApiController
    {
        private readonly ITelegramBot _telegramBot;
        private readonly IFilesRepo _filesRepo;

        public BotController(ITelegramBot telegramBot,
                             IFilesRepo filesRepo)
        {
            _telegramBot = telegramBot;
            _filesRepo = filesRepo;
        }

        [HttpPost]
        [Route(BotSettings.HookResponse)]
        public async Task<HttpResponseMessage> Post([FromBody] Update update)
        {
            var photos = update.Message.Photo;
            if (photos.Any())
            {
                var fileId = photos[3].FileId;
                var bytes = await _telegramBot.DownloadFile(fileId);
                await _filesRepo.Save(fileId, bytes);
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
