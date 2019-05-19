using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using UrbaBase.Mongo;

namespace UrbaBase.Documents
{
    [CollectionName("userStates")]
    public class UserStateDocument
    {
        [BsonId]
        public int UserId { get; set; }

        public string Command { get; set; }

        public string Description { get; set; }

        public string FileId { get; set; }

        [BsonRepresentation(BsonType.String)]
        public Guid IncidentId { get; set; }
    }
}