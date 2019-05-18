using System;
using MongoDB.Driver;
using StructureMap.Building;
using StructureMap.Pipeline;

namespace UrbaBase.Mongo
{
    internal class IMongoCollectionInstanceFactory : Instance
    {
        public override Instance CloseType(Type[] types)
        {
            var instanceType = typeof(IMongoCollectionInstance<>).MakeGenericType(types);
            return Activator.CreateInstance(instanceType) as Instance;
        }

        public override IDependencySource ToDependencySource(Type pluginType) => throw new NotImplementedException();

        public override string Description => "Build IMongoCollection<T> with MongoCollectionFactory through IMongoCollectionInstance<T>";

        public override Type ReturnedType => typeof(IMongoCollection<>);
    }
}