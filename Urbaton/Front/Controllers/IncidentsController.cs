using System;
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
                    id = Guid.NewGuid(),
                    coordinate = new PointViewModel() {lat = 53.2035477f, lng = 50.1448443f},
                    description = "Incident 1"
                },
                new IncidentViewModel()
                {
                    id = Guid.NewGuid(),
                    coordinate = new PointViewModel() {lat = 53.2065277f, lng = 50.1498443f},
                    description = "Incident 2"
                }
            };

            return new ServiceStackJsonResult() {Data = incidents};
        }
    }
}
