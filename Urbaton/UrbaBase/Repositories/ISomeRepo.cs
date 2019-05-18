using System.Collections.Generic;
using UrbaBase.Documents;

namespace UrbaBase.Repositories
{
    public interface ISomeRepo
    {
        IEnumerable<SomeDocument> Get();
        void Save(SomeDocument document);
    }
}