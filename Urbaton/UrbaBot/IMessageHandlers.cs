using System.Threading.Tasks;
using Telegram.Bot.Types;

namespace UrbaBot
{
    public interface IMessageHandlers
    {
        Task ReceiveText(Message message, CallbackQuery callbackQuery = null);
    }
}