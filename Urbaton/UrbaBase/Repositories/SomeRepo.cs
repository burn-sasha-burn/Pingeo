using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using UrbaBase.Documents;

namespace UrbaBase.Repositories
{
    public class SomeRepo : ISomeRepo
    {
        private readonly IMongoCollection<SomeDocument> _someCollection;

        public SomeRepo(IMongoCollection<SomeDocument> someCollection)
        {
            _someCollection = someCollection;
        }

        public IEnumerable<SomeDocument> Get()
        {
            return _someCollection.AsQueryable().ToArray();
        }

        public void Save(SomeDocument document)
        {
            _someCollection.InsertOne(document);
        }
    }
}