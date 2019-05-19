using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Types.ReplyMarkups;
using UrbaBase.Documents;

namespace UrbaBot
{
    public static partial class Commands
    {
        public const string Start = "/start";
        public const string Create = "/create";
        public const string Show = "/show";
        public const string My = "/my";
        public const string Achieve = "/achieve";
        public const string About = "/about";
        public const string Event = "/event";
        public const string DonateCommand = "/donate";
        public const string SponsorCommand = "/sponsor";

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

        public static async Task CreateDescription(this ITelegramBotClient client, long chatId)
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

        public static async Task CreateDay(this ITelegramBotClient client, long chatId)
        {
            var dateTime = DateTime.Today;

            var inlineKeyboard = new InlineKeyboardMarkup(new[]
            {
                new[]
                {
                    InlineKeyboardButton.WithCallbackData(dateTime.AddDays(1).Day.ToString(), "/day:1"),
                    InlineKeyboardButton.WithCallbackData(dateTime.AddDays(2).Day.ToString(), "/day:2"),
                    InlineKeyboardButton.WithCallbackData(dateTime.AddDays(3).Day.ToString(), "/day:3"),
                    InlineKeyboardButton.WithCallbackData(dateTime.AddDays(4).Day.ToString(), "/day:4")
                }
            });

            await client.SendTextMessageAsync(chatId, "Как дела в городе?", replyMarkup: inlineKeyboard);
        }

        public static async Task ShowMy(this ITelegramBotClient client, IEnumerable<IncidentDocument> incidents, long chatId)
        {
            
            List<InlineKeyboardButton> incidentButtonsList = new List<InlineKeyboardButton>();

            foreach (var i in incidents)
            {
                InlineKeyboardButton inlineKeyboardButton = InlineKeyboardButton.WithCallbackData(i.DateTime.ToShortDateString(), $"/problem {i.Id}");
                incidentButtonsList.Add(inlineKeyboardButton);
            }

            InlineKeyboardMarkup inlineKeyboardMarkup = new InlineKeyboardMarkup(incidentButtonsList);

            await client.SendTextMessageAsync(chatId, "Как дела в городе?", replyMarkup: inlineKeyboardMarkup);
        }
    }
}