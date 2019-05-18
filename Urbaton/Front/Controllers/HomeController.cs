using System.Web.Mvc;
using Front.Models;
using UrbaBase.Repositories;

namespace Front.Controllers
{
    public class HomeController : Controller
    {
        private readonly ISomeRepo _someRepo;

        public HomeController(ISomeRepo someRepo)
        {
            _someRepo = someRepo;
        }

        public ActionResult Index()
        {
            return View(new HomeIndexModel()
            {
                SomeLine = "Hello World!",
                SomeDocuments = _someRepo.Get()
            });
        }
    }
}
