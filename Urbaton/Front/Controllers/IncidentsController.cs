using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Front.ActionResults;
using UrbaBase.Documents;
using UrbaBase.Models;
using UrbaBase.Repositories;

namespace Front.Controllers
{
    public class IncidentsController : Controller
    {
        private readonly IIncidentRepo _incidentRepo;

        [HttpGet]
        [Route("Api/Incidents/Get")]
        public ActionResult Get()
        {
            var incidents = new List<IncidentDocument>
            {
                new IncidentDocument
                {
                    Id = new Guid(),
                    CreationDate = DateTime.UtcNow,
                    Creator = new UserDocument { Nick = "Superman" },
                    CustomText = "fly like a red bullit",
                    Location = new LocationDocument { Latitude = 21d, Longitude = 22d },
                    Description = "garbage on fire",
                    Status = StatusDocument.New
                },
                new IncidentDocument()
                {
                    Id = new Guid(),
                    CreationDate = DateTime.UtcNow,
                    Creator = new UserDocument { Nick = "Batman" },
                    CustomText = "have to work it out",
                    Location = new LocationDocument { Latitude = 53d, Longitude = 50d },
                    Description = "Здесь стройка. Просто стройкахаахахахахахахха",
                    Status = StatusDocument.New
                }
            };

            return new ServiceStackJsonResult() {Data = incidents};
        }

        [HttpGet]
        [Route("Api/Incidents/Save")]
        public ActionResult Save()
        {
            var incident = new IncidentDocument
                {
                    Id = new Guid(),
                    CreationDate = DateTime.UtcNow,
                    Creator = new UserDocument { Nick = "Superman" },
                    CustomText = "fly like a red bullit",
                    Location = new LocationDocument { Latitude = 21d, Longitude = 22d },
                    Description = "garbage on fire",
                    Status = StatusDocument.New
                };

            var result = _incidentRepo.Save(incident);

            return new ServiceStackJsonResult() { Data = result };
        }
    }
}
