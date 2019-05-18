using System.Collections.Generic;
using System.Web.Mvc;
using Front.ActionResults;
using Front.Models;

namespace Front.Controllers
{
    public class IncidentsController : Controller
    {
        [HttpGet]
        [Route("Api/Incidents")]
        public ActionResult Test()
        {
            var incidents = new List<IncidentViewModel>
            {
                new IncidentViewModel()
                {
                    coordinate = new PointViewModel() {lat = 55.123f, lng = 55.251f}, description = "Incident 1"
                },
                new IncidentViewModel()
                {
                    coordinate = new PointViewModel() {lat = 22.123f, lng = 55.251f}, description = "Incident 2"
                }
            };

            return new ServiceStackJsonResult() {Data = incidents};
        }
    }
}
