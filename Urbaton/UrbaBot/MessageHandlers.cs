using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;
using Telegram.Bot.Types.ReplyMarkups;

namespace UrbaBot
{
    public static class MessageHandlers
    {
        public static async Task ReceiveText(ITelegramBotClient client, Message message)
        {

            switch (message.Text.Split(' ').First())
            {
                case "/start":
                    await client.SendChatActionAsync(message.Chat.Id, ChatAction.Typing);
                    await Task.Delay(500); // simulate longer running task

                    await Commands.Start(client, message.Chat.Id);
                    break;

                case "/create":
                    await Commands.CreateLocation(client, message.Chat.Id);
                    break;

                default:
                    const string usage = @"
                    Usage:
                    /start   - Начать общение
                    /create - Создать индицент
                    /show    - Посмотреть индиценты";

                    await client.SendTextMessageAsync(message.Chat.Id, usage, replyMarkup: new ReplyKeyboardRemove());
                    break;
            }
        }

    }
}
