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
                    description = "Скала Холл. 15 этаж завален коробками от пиццы. Я ОДИНЕ НЕ СПРАВЛЮСЬ!!! SOS !!!!! SOS !!!!!!!!!!!!!!"
                },
                new IncidentViewModel()
                {
                    id = Guid.NewGuid(),
                    coordinate = new PointViewModel() {lat = 53.2065277f, lng = 50.1498443f},
                    description = "Здесь стройка. Просто стройкахаахахахахахахха"
                }
            };

            return new ServiceStackJsonResult() {Data = incidents};
        }
    }
}
