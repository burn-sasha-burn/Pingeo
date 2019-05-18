using System.Text;
using MongoDB.Driver;

namespace UrbaBase.Mongo
{
    internal class MongoCollectionFactory
    {
        private readonly IMongoDatabase db;

        public MongoCollectionFactory(MongoUrl connectionString)
        {
            var settings = MongoClientSettings.FromUrl(connectionString);
            settings.ReadEncoding = new UTF8Encoding(false, false);
            settings.ReadPreference = ReadPreference.PrimaryPreferred;
            var client = new MongoClient(settings);
            db = client.GetDatabase(connectionString.DatabaseName);
        }

        public IMongoCollection<TDocument> CreateIMongoCollection<TDocument>()
        {
            return db.GetNewMongoCollection<TDocument>();
        }
    }
}