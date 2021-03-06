using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using UrbaBase.Documents;
using UrbaBase.Models;
using UrbaBase.Repositories;

namespace Front.Api
{
    [Route("api/incidents")]
    public class IncidentsController : ApiController
    {
        private readonly IIncidentRepo _incidentRepo;

        public IncidentsController(IIncidentRepo incidentRepo)
        {
            _incidentRepo = incidentRepo;
        }

        [ResponseType(typeof(IEnumerable<IncidentDocument>))]
        [HttpGet]
        public HttpResponseMessage Get()
        {
//            var incidents = new List<IncidentDocument>
//            {
//                new IncidentDocument
//                {
//                    Id = Guid.Parse("9d72028b-bbe1-4ca1-95c0-a4883dee33e0"),
//                    DateTime = DateTime.UtcNow,
//                    Creator = new UserDocument {Nick = "Superman"},
//                    Location = new LocationDocument {Latitude = 21d, Longitude = 22d},
//                    Description = "garbage on fire",
//                    Status = StatusDocument.New
//                },
//                new IncidentDocument()
//                {
//                    Id = Guid.Parse("9f9172f4-55bb-49dd-8a44-151383033a7d"),
//                    DateTime = DateTime.UtcNow,
//                    Creator = new UserDocument {Nick = "Batman"},
//                    Location = new LocationDocument {Latitude = 53d, Longitude = 50d},
//                    Description = "Здесь стройка. Просто стройкахаахахахахахахха",
//                    Status = StatusDocument.New
//                }
//            };
//
//            for (var i = 0; i < 150; i++)
//            {
//                incidents.Add(new IncidentDocument()
//                    {
//                        Id = Guid.NewGuid(),
//                        Location = new LocationDocument() {Longitude = RandomCoordDiff(0.1f / 2, 53.2035477f), Latitude = RandomCoordDiff(0.1f, 50.2188443f)},
//                        Description = "Рондомоный инцедент " + i,
//                        DateTime = DateTime.UtcNow,
//                        Creator = new UserDocument {Nick = "Batman"},
//                        Status = StatusDocument.New
//                    }
//                );
//            }

            return Request.CreateResponse(HttpStatusCode.OK, _incidentRepo.Get());
//            return Request.CreateResponse(HttpStatusCode.OK, incidents);
        }

        [HttpPost]
        public HttpResponseMessage Post()
        {
            var incident = new IncidentDocument
            {
                Id = Guid.NewGuid().ToString("N"),
                DateTime = DateTime.UtcNow,
                Creator = new UserDocument {Nick = "Superman"},
                Location = new LocationDocument {Latitude = 21d, Longitude = 22d},
                Description = "garbage on fire",
                Status = StatusDocument.New
            };

            var result = _incidentRepo.Upsert(incident);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        private readonly Random rand = new Random();

        private float RandomCoordDiff(float diff, float coord)
        {
            return (float) ((rand.NextDouble() - 0.5) * diff) + coord;
        }
    }
}
