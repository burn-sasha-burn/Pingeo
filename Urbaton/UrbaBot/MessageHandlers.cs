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

        public async Task ReceiveText(Message message, CallbackQuery callbackQuery = null)
        {
            var text = message?.Text?.ToLower() ?? callbackQuery?.Data;

            int userId;
            long chatId;
            string nick;
            if (message == null)
            {
                userId = callbackQuery.From.Id;
                chatId = callbackQuery.Message.Chat.Id;
                nick = callbackQuery.From.Username;
            }
            else
            {
                userId = message.From.Id;
                chatId = message.Chat.Id;
                nick = message.From.Username;
            }


            if (text?.Contains('_') ?? false)
            {
                var rule = text.Split('_');
                if (rule.Length == 2)
                {
                    await HandleParametrized(userId, chatId, nick, rule[0], rule[1]);
                }
                else
                {
                    // todo Ничего не понял
                }
            }
            else
            {
                await Handle(userId, chatId, nick, message?.Photo, message?.Location, text);
            }
        }

        private async Task HandleParametrized(int userId, long chatId, string nick, string text, string parameter)
        {
            var client = _telegramBot.Client;
            var userState = _userStateRepo.Get(userId);

            switch (text)
            {
                case Commands.Problem:
                    userState.Command = Commands.Problem;
                    userState.IncidentId = parameter;
                    _userStateRepo.Upsert(userState);
                    await client.CreateIncidentDescription(chatId, parameter);
                    break;
                case Commands.Event:
                    if (_incidentRepo.Get(parameter)?.DateTime != null)
                    {
                        await client.CreateMsg(chatId, "Это мероприятие уже создано");
                        await client.CreateIncidentDescription(chatId, parameter);
                        return;
                    }

                    userState = new UserStateDocument {UserId = userId};
                    userState.Command = Commands.Event;
                    userState.IncidentId = parameter;
                    _userStateRepo.Upsert(userState);
                    await client.CreateDate(chatId);
                    break;
                case Commands.Date:
                    userState.DateTime = DateTime.Today.AddDays(int.Parse(parameter) + 1);
                    _userStateRepo.Upsert(userState);
                    await client.CreateTime(chatId);
                    break;
                case Commands.Time:
                    userState.DateTime = DateTime.Today.AddHours(int.Parse(parameter));
                    _userStateRepo.Upsert(userState);
                    await client.CreateText(chatId);
                    break;
                case Commands.Subscribe:
                {
                    var incident = _incidentRepo.Get(parameter);
                    if (incident.MeetupUsers.Any(user => user.Nick == nick))
                    {
                        await client.CreateMsg(chatId, "Вы уже подписаны на это мериприятие");
                        await client.CreateIncidentDescription(chatId, parameter);
                        return;
                    }

                    userState.Command = Commands.Subscribe;
                    userState.IncidentId = parameter;
                    _userStateRepo.Upsert(userState);
                    incident.MeetupUsers.Add(new UserDocument {Nick = nick});
                    _incidentRepo.Upsert(incident);
                    await client.CreateIncidentDescription(chatId, parameter);
                    break;
                }
                case Commands.Report:
                {
                    var incident = _incidentRepo.Get(parameter);
                    var meetupUser = incident.MeetupUsers.FirstOrDefault(user => user.Nick == nick);
                    if (meetupUser == null)
                    {
                        await client.CreateMsg(chatId, "Вы не подписаны на это мериприятие");
                        await client.CreateIncidentDescription(chatId, parameter);
                        return;
                    }

                    userState = new UserStateDocument {UserId = userId};
                    userState.Command = Commands.Report;
                    userState.IncidentId = parameter;
                    _userStateRepo.Upsert(userState);
                    await client.CreatePhoto(chatId);
                    break;
                }
            }
        }

        private async Task Handle(int userId, long chatId, string nick, PhotoSize[] photos, Location location, string text)
        {
            var client = _telegramBot.Client;
            var userState = _userStateRepo.Get(userId);

            switch (text)
            {
                case Commands.Start:
                    await client.SendChatActionAsync(chatId, ChatAction.Typing);
                    await Task.Delay(500);

                    await client.HandleStart(chatId);
                    break;

                case Commands.Create:
                    userState = new UserStateDocument {UserId = userId};
                    userState.Command = Commands.Create;
                    _userStateRepo.Upsert(userState);
                    await client.CreatePhoto(chatId);
                    break;

                case Commands.My:
                    await client.ShowMy(_incidentRepo.Get().Where(x => x.Creator.Nick == nick), chatId);
                    break;

                case Commands.Achieve:
                    await client.ShowAchieve(_incidentRepo.Get().Where(x => x.Creator.Nick == nick), chatId);
                    break;

                case Commands.Show:
                    await client.CreateMsg(chatId, "http://pingeo.ru");
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
                        {
                            if (photos?.Length > 0)
                            {
                                var fileId = photos[photos.Length - 1].FileId;
                                var bytes = await _telegramBot.DownloadFile(fileId);
                                await _filesRepo.Save(fileId, bytes);
                                userState.FileId = fileId;
                                _userStateRepo.Upsert(userState);
                            }

                            if (string.IsNullOrEmpty(userState.FileId))
                            {
                                await client.CreatePhoto(chatId);
                                return;
                            }

                            if (location != null)
                            {
                                userState.Location = new LocationDocument
                                {
                                    Latitude = location.Latitude,
                                    Longitude = location.Longitude,
                                };
                                _userStateRepo.Upsert(userState);
                            }

                            if (userState.Location == null)
                            {
                                await client.CreateLocation(chatId);
                                return;
                            }

                            if (!string.IsNullOrEmpty(text))
                            {
                                userState.Text = text;
                                _userStateRepo.Upsert(userState);
                            }

                            if (string.IsNullOrEmpty(userState.Text))
                            {
                                await client.CreateText(chatId);
                                return;
                            }

                            var incidentId = Guid.NewGuid().ToString("N");
                            var user = new UserDocument
                            {
                                Nick = nick
                            };

                            _incidentRepo.Upsert(new IncidentDocument
                            {
                                Id = incidentId,
                                Situation = userState.Text,
                                Location = userState.Location,
                                Status = StatusDocument.New,
                                Creator = user,
                                FileId = userState.FileId,
                                MeetupUsers = new[] {user}
                            });

                            await client.CreateIncidentDescription(chatId, incidentId);

                            break;
                        }
                        case Commands.Event:
                        {
                            var incident = _incidentRepo.Get(userState.IncidentId);
                            incident.DateTime = userState.DateTime;
                            incident.Description = text;
                            incident.Status = StatusDocument.Process;
                            _incidentRepo.Upsert(incident);
                            break;
                        }
                        case Commands.Report:
                        {
                            if (photos?.Length > 0)
                            {
                                var fileId = photos[photos.Length - 1].FileId;
                                var bytes = await _telegramBot.DownloadFile(fileId);
                                await _filesRepo.Save(fileId, bytes);
                                userState.FileId = fileId;
                                _userStateRepo.Upsert(userState);
                            }

                            if (string.IsNullOrEmpty(userState.FileId))
                            {
                                await client.CreatePhoto(chatId);
                                return;
                            }

                            if (!string.IsNullOrEmpty(text))
                            {
                                userState.Text = text;
                                _userStateRepo.Upsert(userState);
                            }

                            if (string.IsNullOrEmpty(userState.Text))
                            {
                                await client.CreateText(chatId);
                                return;
                            }

                            var incident = _incidentRepo.Get(userState.IncidentId.ToString());
                            var meetupUser = incident.MeetupUsers.FirstOrDefault(user => user.Nick == nick);
                            if (meetupUser != null)
                            {
                                meetupUser.FileId = userState.FileId;
                                meetupUser.Description = userState.Text;
                                _incidentRepo.Upsert(incident);
                            }

                            break;
                        }
                        default:


                            const string usage = @"
                    Usage:
                    /start   - Начать общение
                    /create - Создать индицент
                    /show    - Посмотреть индиценты
                    /my - Мои инциденты и мероприятия";

                            await client.SendTextMessageAsync(chatId, usage, replyMarkup: new ReplyKeyboardRemove());
                            break;
                    }

                    break;
            }
        }
    }
}