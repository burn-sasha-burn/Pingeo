using System;
using MongoDB.Bson.Serialization.Attributes;
using UrbaBase.Mongo;

namespace UrbaBase.Documents
{
    [CollectionName("somes")]
    public class SomeDocument
    {
        [BsonId]
        public string Name { get; set; }

        public long? Size { get; set; }

        public bool Flag { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime CreationDate { get; set; }
    }
}