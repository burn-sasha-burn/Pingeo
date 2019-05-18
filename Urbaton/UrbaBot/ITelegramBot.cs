using System.Threading.Tasks;

namespace UrbaBot
{
    public interface ITelegramBot
    {
        Task SetupWebhookAsync();
    }
}