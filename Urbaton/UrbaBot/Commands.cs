using System;
using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Types.ReplyMarkups;

namespace UrbaBot
{
    public static class Commands
    {
        public const string Start = "/start";
        public const string Create = "/create";
        public const string Show = "/show";
        public const string My = "/my";
        public const string Achieve = "/achieve";
        public const string About = "/about";
        public const string Event = "/event";
        public const string Date = "/date";
        public const string Time = "/time";
        public const string Problem = "/problem";
        public const string Subscribe = "/subscribe";
        public const string Report = "/report";

        public static async Task CreateMsg(this ITelegramBotClient client, long chatId, string text)
        {
            await client.SendTextMessageAsync(chatId, text);
        }

        public static async Task HandleStart(this ITelegramBotClient client, long chatId)
        {
            var inlineKeyboard = new InlineKeyboardMarkup(new[]
            {
                new[]
                {
                    InlineKeyboardButton.WithCallbackData("Сообщить об инциденте", Create),
                    InlineKeyboardButton.WithCallbackData("Карта инцидентов", Show),
                    InlineKeyboardButton.WithCallbackData("Мои инциденты", My),
                    InlineKeyboardButton.WithCallbackData("Мои достижения", Achieve),
                    InlineKeyboardButton.WithCallbackData("О сервисе", About)
                }
            });

            await client.SendTextMessageAsync(chatId, "Как дела в городе?", replyMarkup: inlineKeyboard);
        }

        public static async Task CreatePhoto(this ITelegramBotClient client, long chatId)
        {
            await client.SendTextMessageAsync(chatId, "Добавьте фотографию");
        }

        public static async Task CreateLocation(this ITelegramBotClient client, long chatId)
        {
            var requestReplyKeyboard = new ReplyKeyboardMarkup(new[] {KeyboardButton.WithRequestLocation("Сообщить мое местоположение")});
            await client.SendTextMessageAsync(chatId, "Отметьте местоположение", replyMarkup: requestReplyKeyboard);
        }

        public static async Task CreateText(this ITelegramBotClient client, long chatId)
        {
            await client.SendTextMessageAsync(chatId, "Введите описание");
        }

        public static async Task CreateEvent(this ITelegramBotClient client, long chatId, Guid incidentId)
        {
            var inlineKeyboard = new InlineKeyboardMarkup(new[]
            {
                new[]
                {
                    InlineKeyboardButton.WithCallbackData("Создать мероприятие", $"{Event}:{incidentId}")
                }
            });

            await client.SendTextMessageAsync(chatId, string.Empty, replyMarkup: inlineKeyboard);
        }

        public static async Task CreateDate(this ITelegramBotClient client, long chatId)
        {
            var dateTime = DateTime.Today;

            var inlineKeyboard = new InlineKeyboardMarkup(new[]
            {
                new[]
                {
                    InlineKeyboardButton.WithCallbackData(dateTime.AddDays(1).Day.ToString(), "/date:1"),
                    InlineKeyboardButton.WithCallbackData(dateTime.AddDays(2).Day.ToString(), "/date:2"),
                    InlineKeyboardButton.WithCallbackData(dateTime.AddDays(3).Day.ToString(), "/date:3"),
                    InlineKeyboardButton.WithCallbackData(dateTime.AddDays(4).Day.ToString(), "/date:4")
                }
            });

            await client.SendTextMessageAsync(chatId, "Выбирите дату", replyMarkup: inlineKeyboard);
        }

        public static async Task CreateTime(this ITelegramBotClient client, long chatId)
        {
            var inlineKeyboard = new InlineKeyboardMarkup(new[]
            {
                new[]
                {
                    InlineKeyboardButton.WithCallbackData("09:00", "/time:09"),
                    InlineKeyboardButton.WithCallbackData("12:00", "/time:12"),
                    InlineKeyboardButton.WithCallbackData("15:00", "/time:15"),
                    InlineKeyboardButton.WithCallbackData("18:00", "/time:18")
                }
            });

            await client.SendTextMessageAsync(chatId, "Выбирите время", replyMarkup: inlineKeyboard);
        }

        public static async Task CreateIncidentDescription(this ITelegramBotClient client, long chatId, string incidentId)
        {
            var inlineKeyboard = new InlineKeyboardMarkup(new[]
            {
                new[]
                {
                    InlineKeyboardButton.WithCallbackData("Пойти на мероприятие", $"{Subscribe}:{incidentId}"),
                    InlineKeyboardButton.WithCallbackData("Отправить отчёт", $"{Report}:{incidentId}")
                }
            });

            await client.SendTextMessageAsync(chatId, string.Empty, replyMarkup: inlineKeyboard);
        }
    }
}