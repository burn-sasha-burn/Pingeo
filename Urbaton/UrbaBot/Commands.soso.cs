using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Types.ReplyMarkups;

namespace UrbaBot
{
    public static partial class Commands
    {
        public static async Task AboutService(this ITelegramBotClient client, long chatId)
        {
            var inlineKeyboard = new InlineKeyboardMarkup(new[]
            {
                new[]
                {
                    InlineKeyboardButton.WithCallbackData("Как стать спонсором", "/sponsor"),
                    InlineKeyboardButton.WithCallbackData("На винишко разработчикам", "/donate"),
                    InlineKeyboardButton.WithCallbackData("Меню", "/start")
                }
            });

            var text = "Pingeo - решим городские проблемы вместе. Сообщай об инцидентах, собирай людей и делай город лучше. Разработано на Хакатоне Урбатон 18 - 19 мая 2019 г.";
            await client.SendTextMessageAsync(chatId, text, replyMarkup: inlineKeyboard);
        }

        public static async Task Donate(this ITelegramBotClient client, long chatId)
        {
            var inlineKeyboard = new InlineKeyboardMarkup(new[]
            {
                new[]
                {
                    InlineKeyboardButton.WithCallbackData("Меню", "/start")
                }
            });

            var text = "Проект не смог бы состояться без участия неравнодушных людей и некоторого количества не очень крепких напитков. Хочешь развитие этой темы - ты знаешь, что делать!";
            await client.SendTextMessageAsync(chatId, text, replyMarkup: inlineKeyboard);
        }

        public static async Task Sponsor(this ITelegramBotClient client, long chatId)
        {
            var inlineKeyboard = new InlineKeyboardMarkup(new[]
            {
                new[]
                {
                    InlineKeyboardButton.WithCallbackData("Меню", "/start")
                }
            });

            var text = "Не знаешь, где ещё твоя компания может проявить социальную ответственность? Тогда тебе точно сюда! Поддержи активных граждан своего города морально и материально. А ещё не забудь и о своих сотрудниках ;)";
            await client.SendTextMessageAsync(chatId, text, replyMarkup: inlineKeyboard);
        }

    }
}
