using System.Threading.Tasks;
using Telegram.Bot;

namespace UrbaBot
{
    public interface ITelegramBot
    {
        Task SetupWebhookAsync();
        Task<byte[]> DownloadFile(string fileId);
        TelegramBotClient GetClient();
    }
}