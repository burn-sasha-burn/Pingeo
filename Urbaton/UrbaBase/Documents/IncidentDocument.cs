using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using UrbaBase.Models;
using UrbaBase.Mongo;

namespace UrbaBase.Documents
{
    [CollectionName("incidents")]
    public class IncidentDocument
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("situation")]
        public string Situation { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("location")]
        public LocationDocument Location { get; set; }

        [JsonProperty("status")]
        public StatusDocument Status { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        [JsonProperty("dateTime")]
        public DateTime DateTime { get; set; }

        [JsonProperty("creator")]
        public UserDocument Creator { get; set; }

        [JsonProperty("fileId")]
        public string FileId { get; set; }

        [JsonProperty("meetupUsers")]
        public IEnumerable<UserDocument> MeetupUsers { get; set; }
    }
}