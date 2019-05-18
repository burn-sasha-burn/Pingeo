using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace UrbaBase.Mongo
{
    public static class MongoCollectionExtensions
    {
        public static TDefaultDocument FindOne<TDefaultDocument>(this IMongoCollection<TDefaultDocument> collection)
        {
            return collection.Find(Builders<TDefaultDocument>.Filter.Empty).FirstOrDefault();
        }

        public static TDefaultDocument FindOne<TDefaultDocument>(this IMongoCollection<TDefaultDocument> collection,
            FilterDefinition<TDefaultDocument> filter)
        {
            return collection.Find(filter).FirstOrDefault();
        }

        public static IEnumerable<TDefaultDocument> FindAll<TDefaultDocument>(this IMongoCollection<TDefaultDocument> collection)
        {
            return collection.Find(Builders<TDefaultDocument>.Filter.Empty).ToEnumerable();
        }

        public static TDefaultDocument FindOneById<TDefaultDocument>(this IMongoCollection<TDefaultDocument> collection, string id)
        {
            if (id == null)
                throw new ArgumentException(nameof(id));
            return collection.Find(Builders<TDefaultDocument>.Filter.Eq("_id", id)).FirstOrDefault();
        }
    }
}
