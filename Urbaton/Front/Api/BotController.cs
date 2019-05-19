using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Telegram.Bot.Types;
using UrbaBot;

namespace Front.Api
{
    public class BotController : ApiController
    {
        private readonly IMessageHandlers _messageHandlers;

        public BotController(IMessageHandlers messageHandlers)
        {
            _messageHandlers = messageHandlers;
        }

        [HttpPost]
        [Route(BotSettings.HookResponse)]
        public async Task<HttpResponseMessage> Post([FromBody] Update update)
        {
            await _messageHandlers.ReceiveText(update.Message);

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
