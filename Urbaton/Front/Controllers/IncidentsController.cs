using System.Web.Mvc;
using JetBrains.Annotations;

namespace Front.Controllers
{
    public class IncidentsController : Controller
    {
        public ActionResult Index([CanBeNull] string id)
        {
            return Redirect("/Incidents");
        }

        [Route("Incidents/{id?}")]
        [Route("Meetups/{id?}")]
        public ActionResult Incidents([CanBeNull] string id)
        {
            return View("Index");
        }
    }
}
