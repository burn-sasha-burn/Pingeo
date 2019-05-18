namespace UrbaBot
{
    public static class BotSettings
    {
        public const string HookResponse = "api/bot/update";

        private const string NgrokUrl = "https://4828e2d5.ngrok.io";
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

        public const string Key = "788292459:AAEPtMAiX4TKbgpBQZMQS_9mArnv_8N2k2w";
    }
}