namespace UrbaBot
{
    public static class BotSettings
    {
        public const string HookResponse = "api/bot/update";
        public const string Ngrok = "https://33e373f0.ngrok.io";

        public static string Url { get; set; } = "https://pingeo.ru/{0}";
        public static string Name { get; set; } = "Urbot";
        public static string Key { get; set; } = "";
    }
}