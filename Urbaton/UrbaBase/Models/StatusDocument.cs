using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UrbaBase.Models
{
    public enum StatusDocument
    {
        [StringValue("Новый")]
        New = 0,

        [StringValue("В процессе")]
        Process = 1,

        [StringValue("Завершен")]
        Finished = 2
    }
}
