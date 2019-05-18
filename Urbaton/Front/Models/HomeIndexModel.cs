using System.Collections.Generic;
using UrbaBase.Documents;

namespace Front.Models
{
    public class HomeIndexModel
    {
        public string SomeLine { get; set; }

        public IEnumerable<SomeDocument> SomeDocuments { get; set; }
    }
}