using System.Threading.Tasks;

namespace UrbaBot
{
    public interface ITelegramBot
    {
        Task SetupWebhookAsync();
        Task<byte[]> DownloadFile(string fileId);
    }
}