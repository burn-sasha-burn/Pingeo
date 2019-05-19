using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Args;
using Telegram.Bot.Types.Enums;
using Telegram.Bot.Types.InlineQueryResults;
using Telegram.Bot.Types.ReplyMarkups;
using UrbaBot;

namespace UrbaBotService
{
    public static class Program
    {
        private static readonly TelegramBotClient Bot = new TelegramBot().GetClient();

        public static void Main(string[] args)
        {
            var me = Bot.GetMeAsync().Result;
            Console.Title = me.Username;

            Bot.OnMessage += BotOnMessageReceived;
            Bot.OnMessageEdited += BotOnMessageReceived;
            Bot.OnCallbackQuery += BotOnCallbackQueryReceived;
            Bot.OnInlineQuery += BotOnInlineQueryReceived;
            Bot.OnInlineResultChosen += BotOnChosenInlineResultReceived;
            Bot.OnReceiveError += BotOnReceiveError;
            Bot.StartReceiving(Array.Empty<UpdateType>());
            Console.WriteLine($"Start listening for @{me.Username}");
            Console.ReadLine();
            Bot.StopReceiving();
        }

        private static async void BotOnMessageReceived(object sender, MessageEventArgs messageEventArgs)
        {
            var message = messageEventArgs.Message;
            if (message == null || message.Type != MessageType.Text) return;

            switch (message.Text.Split(' ').First())
            {
                case "/start":
                    await Bot.SendChatActionAsync(message.Chat.Id, ChatAction.Typing);
                    await Task.Delay(500); // simulate longer running task

                    var inlineKeyboard = new InlineKeyboardMarkup(new[]
                    {
                        new [] // first row
                        {
                            InlineKeyboardButton.WithCallbackData("Создать", "/create"),
                            InlineKeyboardButton.WithCallbackData("Посмотреть", "/show"),
                        }
                    });

                    await Bot.SendTextMessageAsync(message.Chat.Id, "Что новенького в городе?", replyMarkup: inlineKeyboard);
                    break;

                case "/create":
                    CreateLocation(message.Chat.Id);
                    break;

                default:
                    const string usage = @"
                    Usage:
                    /start   - Начать общение
                    /create - Создать индицент
                    /show    - Посмотреть индиценты";

                    await Bot.SendTextMessageAsync(message.Chat.Id, usage, replyMarkup: new ReplyKeyboardRemove());
                    break;
            }
        }

        private static async void BotOnCallbackQueryReceived(object sender, CallbackQueryEventArgs callbackQueryEventArgs)
        {
            var callbackQuery = callbackQueryEventArgs.CallbackQuery;
            if (callbackQuery == null) return;

            switch (callbackQuery.Data.Split(' ').First())
            {
                // request location or contact
                case "/create":
                    CreateLocation(callbackQuery.Message.Chat.Id);
                    break;
            }

            //await Bot.AnswerCallbackQueryAsync(
            //    callbackQuery.Id,
            //    $"Received {callbackQuery.Data}");

            //await Bot.SendTextMessageAsync(
            //    callbackQuery.Message.Chat.Id,
            //    $"Received {callbackQuery.Data}");
        }

        private static async void CreateLocation(long chatId)
        {
            var RequestReplyKeyboard = new ReplyKeyboardMarkup(new[] { KeyboardButton.WithRequestLocation("Сообщить мое местоположение") });
            await Bot.SendTextMessageAsync(chatId, "А это где расположено?", replyMarkup: RequestReplyKeyboard);
        }

        private static async void BotOnInlineQueryReceived(object sender, InlineQueryEventArgs inlineQueryEventArgs)
        {
            Console.WriteLine($"Received inline query from: {inlineQueryEventArgs.InlineQuery.From.Id}");
            await Bot.AnswerInlineQueryAsync(inlineQueryEventArgs.InlineQuery.Id, null, isPersonal: true, cacheTime: 0);
        }

        private static void BotOnChosenInlineResultReceived(object sender, ChosenInlineResultEventArgs chosenInlineResultEventArgs)
        {
            Console.WriteLine($"Received inline result: {chosenInlineResultEventArgs.ChosenInlineResult.ResultId}");
        }

        private static void BotOnReceiveError(object sender, ReceiveErrorEventArgs receiveErrorEventArgs)
        {
            Console.WriteLine("Received error: {0} — {1}",
                receiveErrorEventArgs.ApiRequestException.ErrorCode,
                receiveErrorEventArgs.ApiRequestException.Message);
        }
    }
}