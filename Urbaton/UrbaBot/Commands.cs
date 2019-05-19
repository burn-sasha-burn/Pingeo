using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Types;
using Telegram.Bot.Types.InputFiles;
using Telegram.Bot.Types.ReplyMarkups;
using UrbaBase.Documents;
using UrbaBase.Models;

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
        public const string Date = "/date";
        public const string Time = "/time";
        public const string Problem = "/problem";
        public const string Subscribe = "/subscribe";
        public const string Report = "/report";
        public const string DonateCommand = "/donate";
        public const string SponsorCommand = "/sponsor";

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

        public static async Task CreateDate(this ITelegramBotClient client, long chatId)
        {
            var dateTime = DateTime.Today;

            var inlineKeyboard = new InlineKeyboardMarkup(new[]
            {
                new[]
                {
                    InlineKeyboardButton.WithCallbackData(dateTime.AddDays(1).Day.ToString(), "/date_1"),
                    InlineKeyboardButton.WithCallbackData(dateTime.AddDays(2).Day.ToString(), "/date_2"),
                    InlineKeyboardButton.WithCallbackData(dateTime.AddDays(3).Day.ToString(), "/date_3"),
                    InlineKeyboardButton.WithCallbackData(dateTime.AddDays(4).Day.ToString(), "/date_4")
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
                    InlineKeyboardButton.WithCallbackData("09:00", "/time_09"),
                    InlineKeyboardButton.WithCallbackData("12:00", "/time_12"),
                    InlineKeyboardButton.WithCallbackData("15:00", "/time_15"),
                    InlineKeyboardButton.WithCallbackData("18:00", "/time_18")
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
                    InlineKeyboardButton.WithCallbackData("Создать мероприятие", $"{Event}_{incidentId}"),
                    InlineKeyboardButton.WithCallbackData("Пойти на мероприятие", $"{Subscribe}_{incidentId}"),
                    InlineKeyboardButton.WithCallbackData("Отправить отчёт", $"{Report}_{incidentId}")
                }
            });

            await client.SendTextMessageAsync(chatId, "ИНЦИДЕ́НТ", replyMarkup: inlineKeyboard);
        }

        public static async Task ShowMy(this ITelegramBotClient client, IEnumerable<IncidentDocument> incidents, long chatId)
        {
            List<InlineKeyboardButton> incidentButtonsList = new List<InlineKeyboardButton>();

            foreach (var i in incidents)
            {
                InlineKeyboardButton inlineKeyboardButton = InlineKeyboardButton.WithCallbackData(i.DateTime?.ToShortDateString(), $"{Problem}_{i.Id}");
                incidentButtonsList.Add(inlineKeyboardButton);
            }

            InlineKeyboardMarkup inlineKeyboardMarkup = new InlineKeyboardMarkup(incidentButtonsList);

            await client.SendTextMessageAsync(chatId, "Как дела в городе?", replyMarkup: inlineKeyboardMarkup);
        }

        public static async Task ShowAchieve(this ITelegramBotClient client, IEnumerable<IncidentDocument> incidents, long chatId)
        {
            var incidentDocuments = incidents.ToList();
            if (incidentDocuments.Count() >= 10)
            {
                await client.SendTextMessageAsync(chatId, "Соколиный Глаз - великолепный помощник ЖКХ служб. Он использует разные виды приспособлений, различными эффектами и характеристиками. Он способен вести беспощадную борьбу с мусорной несправедливостью в любимом городе, находя даже малоразмерные мусорные пакеты на дальних расстояниях. Будучи Соколиным глазом, он тренировался ежедневно, не менее двух часов в день, чтобы поддерживать свои навыки.");
            }

            if (incidentDocuments.Count(x => x.Status == StatusDocument.Process) >= 5)
            {
                await client.SendTextMessageAsync(chatId, "Капитан Активист - имеет обширную подготовку для борьбы с беспределом ЖКХ и часто был даже знаком с первыми лицами, отвественными за порядок в городе. Он эксперт по уборке и организации мероприятий по очистке местности, владеет навыками управления различным транспортом для уборки территории. Также имеет много знакомых, благодаря которым способен в кратчайшие сроки собирать большие группы людей для зачистки территории в течение очень непродолжительного времени. Работает на организацию Щ.И.Т. Время от времени он пробует себя в области «мирской» карьеры, включая прикладные искусства, рисование графити, образование (история уборочной техники) и правоприменительную деятельность.");
            }
        }
    }
}