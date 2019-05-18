using MongoDB.Driver;
using StructureMap.Pipeline;

namespace UrbaBase.Mongo
{
    internal class IMongoCollectionInstance<T> : LambdaInstance<IMongoCollection<T>>
    {
        public IMongoCollectionInstance() : base(c => c.GetInstance<MongoCollectionFactory>().CreateIMongoCollection<T>())
        {
        }

        public override string Description => $"MongoCollectionFactory.Create<{typeof(T).Name}";
    }
}