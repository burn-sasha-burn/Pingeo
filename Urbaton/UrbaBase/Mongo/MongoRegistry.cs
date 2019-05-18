using System.Configuration;
using JetBrains.Annotations;
using log4net;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using StructureMap;

namespace UrbaBase.Mongo
{
    [UsedImplicitly]
    public class MongoRegistry : Registry
    {
        private static readonly ILog Log = LogManager.GetLogger(typeof(MongoRegistry));

        public MongoRegistry()
        {
//            BsonSerializer.RegisterSerializationProvider(new DateTimeSerializationProvider());
//            BsonSerializer.RegisterSerializer(typeof(Uri), new AbsoluteUriSerializer());
//            BsonSerializer.RegisterSerializationProvider(new MaybeSerializerProvider());

//            ConventionRegistry.Register("camelCase", new ConventionPack {new CamelCaseElementNameConvention()}, t => true);
//            ConventionRegistry.Register("defaultObject", new ConventionPack {new DefaultObjectConvention()}, t => t.Namespace != null);
//            ConventionRegistry.Register("ignoreIfNull", new ConventionPack {new IgnoreIfNullConvention(true)}, t => true);
//            ConventionRegistry.Register("ignoreExtraElements", new ConventionPack {new IgnoreExtraElementsConvention(true)}, t => true);

            For<MongoUrl>().Use(() => new MongoUrl(ConfigurationManager.ConnectionStrings["mongodb"].ConnectionString));
            For(typeof(IMongoCollection<>)).Singleton().Use(new IMongoCollectionInstanceFactory());

            For<GridFSBucket>().Singleton().Use(c => MongoGridFs(c));

            Log.Debug("Mongo registry applied");
        }

        private static GridFSBucket MongoGridFs(IContext c)
        {
            var connectionString = c.GetInstance<MongoUrl>();
            var mongoClient = new MongoClient(connectionString);
            var database = mongoClient.GetDatabase("pingeo");
            return new GridFSBucket(database);
        }
    }
}