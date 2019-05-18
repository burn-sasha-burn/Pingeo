using System.Web.Mvc;
using Urbaton.Repositories;

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
            var o = _someRepo.Get();

            return View();
        }
    }
}