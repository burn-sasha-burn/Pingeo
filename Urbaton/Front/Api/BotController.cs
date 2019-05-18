using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;
using Telegram.Bot.Types;
using UrbaBot;

namespace Front.Api
{
    public class BotController : ApiController
    {
        private readonly ITelegramBot _telegramBot;

        public BotController(ITelegramBot telegramBot)
        {
            _telegramBot = telegramBot;
        }

        [HttpPost]
        [Route(BotSettings.HookResponse)]
        public async Task<OkResult> Post([FromBody] Update update)
        {
//            if (update == null) return Ok();

//            var commands = Bot.Commands;
//            var message = update.Message;
//            var botClient = await Bot.GetBotClientAsync();

//            foreach (var command in commands)
//            {
//                if (command.Contains(message))
//                {
//                    await command.Execute(message, botClient);
//                    break;
//                }
//            }
            return Ok();
        }
    }
}
