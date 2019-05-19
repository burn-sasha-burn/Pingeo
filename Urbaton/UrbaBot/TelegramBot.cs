using System.IO;
using System.Net;
using System.Threading.Tasks;
using Telegram.Bot;

namespace UrbaBot
{
    public class TelegramBot : ITelegramBot
    {
        public TelegramBotClient Client { get; }

        public TelegramBot()
        {
            Client = new TelegramBotClient(BotSettings.Key, new WebProxy("95.85.25.124:4444"));
        }

        public Task SetupWebhookAsync()
        {
            return Client.SetWebhookAsync($"{BotSettings.DomainUrl}/{BotSettings.HookResponse}");
        }

        public async Task<byte[]> DownloadFile(string fileId)
        {
            var file = await Client.GetFileAsync(fileId);
            using (var stream = new MemoryStream())
            {
                await Client.DownloadFileAsync(file.FilePath, stream);
                return stream.GetBuffer();
            }
        }

        public TelegramBotClient GetClient()
        {
            return Client;
        }
    }
}