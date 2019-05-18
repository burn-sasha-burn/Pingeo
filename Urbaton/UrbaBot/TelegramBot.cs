using System.Net;
using System.Threading.Tasks;
using Telegram.Bot;

namespace UrbaBot
{
    public class TelegramBot : ITelegramBot
    {
        private readonly TelegramBotClient _botClient;

        public TelegramBot()
        {
            _botClient = new TelegramBotClient(BotSettings.Key, new WebProxy("95.85.25.124:4444"));
        }

        public Task SetupWebhookAsync()
        {
            return _botClient.SetWebhookAsync($"{BotSettings.DomainUrl}/{BotSettings.HookResponse}");
        }

        public TelegramBotClient GetClient()
        {
            return _botClient;
        }
    }
}