using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;
using UrbaBase.Models;
using UrbaBase.Mongo;

namespace UrbaBase.Documents
{
    [CollectionName("incidents")]
    public class IncidentDocument
    {
        [BsonId]
        public Guid Id { get; set; }

        public string Description { get; set; }

        public LocationDocument Location { get; set; }

        public StatusDocument Status { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime CreationDate { get; set; }

        public UserDocument Creator { get; set; }

        public IEnumerable<Image> Images { get; set; }

        public IEnumerable<UserDocument> MeetupUsers { get; set; }

        public string CustomText { get; set; }
    }
}
