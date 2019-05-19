using System.Collections.Generic;
using UrbaBase.Documents;

namespace UrbaBase.Repositories
{
    public interface IIncidentRepo
    {
        IEnumerable<IncidentDocument> Get();
        IncidentDocument Get(string id);
        bool Save(IncidentDocument document);
    }
}