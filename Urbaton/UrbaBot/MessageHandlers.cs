using System;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;
using Telegram.Bot.Types.ReplyMarkups;
using UrbaBase.Documents;
using UrbaBase.Models;
using UrbaBase.Repositories;

namespace UrbaBot
{
    public class MessageHandlers : IMessageHandlers
    {
        private readonly ITelegramBot _telegramBot;
        private readonly IFilesRepo _filesRepo;
        private readonly IUserStateRepo _userStateRepo;
        private readonly IIncidentRepo _incidentRepo;

        public MessageHandlers(ITelegramBot telegramBot,
                               IFilesRepo filesRepo,
                               IUserStateRepo userStateRepo,
                               IIncidentRepo incidentRepo)
        {
            _telegramBot = telegramBot;
            _filesRepo = filesRepo;
            _userStateRepo = userStateRepo;
            _incidentRepo = incidentRepo;
        }

        public async Task ReceiveText(Message message)
        {
            var text = message.Text.ToLower();

            if (text.Contains(':'))
            {
                var rule = text.Split(':');
                if (rule.Length == 2 && Guid.TryParse(rule[1], out var id))
                {
                    await HandleWithId(message, rule[0], id);
                }
                else
                {
                    // todo Ничего не понял
                }
            }
            else
            {
                await Handle(message, text);
            }
        }

        private async Task HandleWithId(Message message, string text, Guid id)
        {
            var client = _telegramBot.Client;
            var userState = _userStateRepo.Get(message.From.Id);
            var chatId = message.Chat.Id;

            switch (text)
            {
                case Commands.Event:
                    userState.Command = Commands.Event;
                    _userStateRepo.Update(userState);
                    break;
                default:
                    switch (userState.Command)
                    {
                        case Commands.Event:

                            break;
                    }

                    break;
            }
        }

        private async Task Handle(Message message, string text)
        {
            var client = _telegramBot.Client;
            var userState = _userStateRepo.Get(message.From.Id);
            var chatId = message.Chat.Id;

            switch (text)
            {
                case Commands.Start:
                    await client.SendChatActionAsync(chatId, ChatAction.Typing);
                    await Task.Delay(500);

                    await client.HandleStart(chatId);
                    break;

                case Commands.Create:
                    await client.CreatePhoto(chatId);
                    userState.Command = Commands.Create;
                    _userStateRepo.Update(userState);
                    break;

                case Commands.My:
                    var myIncidents = _incidentRepo.Get().Where(x => x.Creator.Nick == message.From.Username);
                    await client.ShowMy(myIncidents, chatId);

                    break;

                case Commands.About:
                    await client.AboutService(chatId);
                    break;

                case Commands.SponsorCommand:
                    await client.Sponsor(chatId);
                    break;

                case Commands.DonateCommand:
                    await client.Donate(chatId);
                    break;

                default:
                    switch (userState.Command)
                    {
                        case Commands.Create:
                            var photos = message.Photo;
                            if (photos?.Length > 0)
                            {
                                var fileId = photos[photos.Length - 1].FileId;
                                var bytes = await _telegramBot.DownloadFile(fileId);
                                await _filesRepo.Save(fileId, bytes);
                                userState.FileId = fileId;
                                _userStateRepo.Update(userState);
                            }

                            if (string.IsNullOrEmpty(userState.FileId))
                            {
                                await client.CreatePhoto(chatId);
                                return;
                            }

                            if (message.Location != null)
                            {
                                userState.Location = new LocationDocument
                                {
                                    Latitude = message.Location.Latitude,
                                    Longitude = message.Location.Longitude,
                                };
                                _userStateRepo.Update(userState);
                            }

                            if (userState.Location == null)
                            {
                                await client.CreateLocation(chatId);
                                return;
                            }

                            if (!string.IsNullOrEmpty(text))
                            {
                                userState.Text = text;
                                _userStateRepo.Update(userState);
                            }

                            if (string.IsNullOrEmpty(userState.Text))
                            {
                                await client.CreateDescription(chatId);
                                return;
                            }

                            var incidentId = Guid.NewGuid();
                            _incidentRepo.Save(new IncidentDocument
                            {
                                Id = incidentId,
                                Situation = userState.Text,
                                Location = userState.Location,
                                Status = StatusDocument.New,
                                Creator = new UserDocument
                                {
                                    Nick = message.From.Username
                                },
                                FileId = userState.FileId
                            });

                            await client.CreateEvent(chatId, incidentId);

                            break;
                    }

                    const string usage = @"
                    Usage:
                    /start   - Начать общение
                    /create - Создать индицент
                    /show    - Посмотреть индиценты
                    /my - Мои инциденты и мероприятия";

                    await client.SendTextMessageAsync(chatId, usage, replyMarkup: new ReplyKeyboardRemove());
                    break;
            }
        }
    }
}