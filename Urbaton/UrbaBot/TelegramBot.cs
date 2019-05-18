using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using Telegram.Bot;

namespace UrbaBot
{
    public class TelegramBot
    {
        private static TelegramBotClient botClient;
        private static List<Command> commandsList;

        public static IReadOnlyList<Command> Commands => commandsList.AsReadOnly();

        public TelegramBotClient GetBotClientAsync()
        {
            if (botClient != null)
            {
                return botClient;
            }

            commandsList = new List<Command>();
            commandsList.Add(new StartCommand());
            //TODO: Add more commands


            var client = new HttpClient(new HttpClientHandler
            {
                Proxy = new WebProxy
                {
                    Address = new Uri("http://95.85.25.124:4444"),
                    Credentials = new NetworkCredential(string.Empty, string.Empty)
                },
                UseProxy = true
            });

            botClient = new TelegramBotClient(BotSettings.Key, client);
            botClient.SetWebhookAsync($"{BotSettings.Ngrok}/{BotSettings.HookResponse}").GetAwaiter().GetResult();
            return botClient;
        }
    }
}