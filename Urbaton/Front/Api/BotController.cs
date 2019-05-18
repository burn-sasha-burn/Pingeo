using System.Collections.Generic;
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
using UrbaBot;

namespace Front.Api
{
    public class BotController : ApiController
    {
        private readonly ITelegramBot _telegramBot;

        public BotController(ITelegramBot telegramBot)
        {
            _telegramBot = telegramBot;
            //_telegramBot.GetClient().OnMessage += BotOnMessageReceived;
            //_telegramBot.GetClient().OnCallbackQuery += BotOnCallbackQueryReceived;
        }

        [HttpPost]
        [Route(BotSettings.HookResponse)]
        public HttpResponseMessage Post([FromBody] Update update)
        {
            if (update.Message.Text.ToUpper().Contains("/START"))
            {
                //Start(update.Message.Chat.Id);
            }

            if (update.Message.Text.ToUpper().Contains("/CREATE"))
            {
                //Create(update);
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        private void Start(long chatId)
        {
            var rkm = new ReplyKeyboardMarkup();

            rkm.Keyboard =
                new KeyboardButton[][]
                {
                    new KeyboardButton[]
                    {
                        new KeyboardButton("Создать инцидент"),
                        new KeyboardButton("Посмотреть инцидент")
                    },
                };

            InlineKeyboardButton createButton = new InlineKeyboardButton
            {
                Text = "Создать инцидент",
                CallbackData = "/create"
            };

            InlineKeyboardButton showButton = new InlineKeyboardButton
            {
                Text = "Просмотреть инцидент",
                CallbackData = "/show"
            };

            List<InlineKeyboardButton> rowBottons = new List<InlineKeyboardButton>();
            rowBottons.Add(createButton);
            rowBottons.Add(showButton);

            InlineKeyboardMarkup ikm = new InlineKeyboardMarkup(rowBottons);

            _telegramBot.GetClient().SendTextMessageAsync(chatId, "Как дела в городе?", replyMarkup: ikm);
        }

        private void Create(Update update)
        {
            _telegramBot.GetClient().SendTextMessageAsync(update.Message.Chat.Id, "Опять трабл в городе, а где?");
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
