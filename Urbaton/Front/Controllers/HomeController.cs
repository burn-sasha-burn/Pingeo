using System.Web.Mvc;
using Front.Models;
using UrbaBot;

namespace Front.Controllers
{
    public class HomeController : Controller
    {
        private readonly ITelegramBotProvider _telegramBotProvider;

        public HomeController(ITelegramBotProvider telegramBotProvider)
        {
            _telegramBotProvider = telegramBotProvider;
        }

        public ActionResult Index()
        {
//            _telegramBotProvider.Provide().GetBotClientAsync();

            return View(new HomeIndexModel
            {
                SomeLine = "Hello World!"
            });
        }
    }
}
