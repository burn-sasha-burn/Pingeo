using System;

namespace Front.Models
{
    public class IncidentViewModel
    {
        public Guid id { get; set; }
        public PointViewModel coordinate { get; set; }
        public string description { get; set; }
    }
}
