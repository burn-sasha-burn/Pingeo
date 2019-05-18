namespace UrbaBot
{
    public static class BotSettings
    {
        public const string HookResponse = "api/bot/update";

        private const string NgrokUrl = "https://33e373f0.ngrok.io";
        private const string PinGeoUrl = "https://pingeo.ru";

        public static string DomainUrl
        {
            get
            {
#if DEBUG
                return NgrokUrl;
#else
                return PinGeoUrl;
#endif
            }
        }

        public const string Key = "831389064:AAHVl6qclWON86MgAO2Ck99g6AFtSqgJMN4";
    }
}