using System.Web.Mvc;
using Front.Models;
using JetBrains.Annotations;
using UrbaBase.Repositories;

namespace Front.Controllers
{
    public class IncidentsPageController : Controller
    {
        private readonly ISomeRepo _someRepo;

        public IncidentsPageController(ISomeRepo someRepo)
        {
            _someRepo = someRepo;
        }

        public ActionResult Index([CanBeNull] string id)
        {
            return Redirect("/Incidents");
        }

        [Route("Incidents/{id?}")]
        [Route("MyIncidents/{id?}")]
        [Route("MyMeets/{id?}")]
        public ActionResult Incidents([CanBeNull] string id)
        {
            return View("Index");
        }
    }
}
