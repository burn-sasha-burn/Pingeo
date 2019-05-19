using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Types;
using Telegram.Bot.Types.ReplyMarkups;

namespace UrbaBot
{
    public static class Commands
    {
        public static async Task Start(ITelegramBotClient client, long chatId)
        {
            var inlineKeyboard = new InlineKeyboardMarkup(new[]
            {
                new [] // first row
                {
                    InlineKeyboardButton.WithCallbackData("Создать", "/create"),
                    InlineKeyboardButton.WithCallbackData("Посмотреть", "/show"),
                }
            });

            await client.SendTextMessageAsync(chatId, "Как дела в городе?", replyMarkup: inlineKeyboard);
        }

        public static async Task CreateLocation(ITelegramBotClient client, long chatId)
        {
            var RequestReplyKeyboard = new ReplyKeyboardMarkup(new[] { KeyboardButton.WithRequestLocation("Сообщить мое местоположение") });
            await client.SendTextMessageAsync(chatId, "А это где расположено?", replyMarkup: RequestReplyKeyboard);
        }

    }
}
