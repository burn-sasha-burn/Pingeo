using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;
using Telegram.Bot.Args;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;
using Telegram.Bot.Types.ReplyMarkups;
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
            //_telegramBot.GetClient().OnMessage += BotOnMessageReceived;
            //_telegramBot.GetClient().OnCallbackQuery += BotOnCallbackQueryReceived;
        }

        [HttpPost]
        [Route(BotSettings.HookResponse)]
        public async Task<IHttpActionResult> Post([FromBody] Update update)
        {
            var photos = update.Message.Photo;
            if (photos != null && photos.Any())
            {
                var fileId = photos[photos.Length - 1].FileId;
                var bytes = await _telegramBot.DownloadFile(fileId);
                await _filesRepo.Save(fileId, bytes);
            }

            await MessageHandlers.ReceiveText(_telegramBot.Client, update.Message);

            return Ok();
        }

        //private async void BotOnMessageReceived(object sender, MessageEventArgs messageEventArgs)
        //{
        //    if (messageEventArgs.Message.Text.ToUpper().Contains("/START"))
        //    {
        //        Start(messageEventArgs.Message.Chat.Id);
        //    }
        //}

        //private async void BotOnCallbackQueryReceived(object sender, CallbackQueryEventArgs callbackQueryEventArgs)
        //{
        //    if (callbackQueryEventArgs.CallbackQuery.Data.Equals("/create"))
        //    {

        //    }
        //    else if (callbackQueryEventArgs.CallbackQuery.Data.Equals("ingredients"))
        //    {

        //    }
        //}
    }
}
