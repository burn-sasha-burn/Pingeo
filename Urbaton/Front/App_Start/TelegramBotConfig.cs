using StructureMap;
using UrbaBot;

namespace Front
{
    public static class TelegramBotConfig
    {
        public static void Configure(Container container)
        {
            var telegramBot = container.GetInstance<ITelegramBot>();
            telegramBot.SetupWebhookAsync().Wait();
        }
    }
}
