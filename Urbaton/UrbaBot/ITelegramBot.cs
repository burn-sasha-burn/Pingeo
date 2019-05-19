using System.Threading.Tasks;
using Telegram.Bot;

namespace UrbaBot
{
    public interface ITelegramBot
    {
        TelegramBotClient Client { get; }

        Task SetupWebhookAsync();
        Task<byte[]> DownloadFile(string fileId);
        TelegramBotClient GetClient();
    }
}