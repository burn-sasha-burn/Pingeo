using System.Threading.Tasks;
using Telegram.Bot;

namespace UrbaBot
{
    public interface ITelegramBot
    {
        Task SetupWebhookAsync();
        TelegramBotClient GetClient();
    }
}