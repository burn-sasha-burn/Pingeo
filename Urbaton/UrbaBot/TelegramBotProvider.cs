namespace UrbaBot
{
    public class TelegramBotProvider : ITelegramBotProvider
    {
        public TelegramBot Provide()
        {
            return new TelegramBot();
        }
    }
}
