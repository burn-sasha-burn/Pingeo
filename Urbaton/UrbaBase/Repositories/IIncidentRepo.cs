using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
