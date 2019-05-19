using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using UrbaBase.Models;
using UrbaBase.Mongo;

namespace UrbaBase.Documents
{
    [CollectionName("userStates")]
    public class UserStateDocument
    {
        [BsonId]
        public int UserId { get; set; }

        public string Command { get; set; }

        public string Text { get; set; }

        public LocationDocument Location { get; set; }

        public string FileId { get; set; }

        [BsonRepresentation(BsonType.String)]
        public string IncidentId { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime DateTime { get; set; }
    }
}