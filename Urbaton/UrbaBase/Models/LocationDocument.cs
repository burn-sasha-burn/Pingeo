using Newtonsoft.Json;

namespace UrbaBase.Models
{
    public class LocationDocument
    {
        [JsonProperty("lat")]
        public double Latitude { get; set; }

        [JsonProperty("lng")]
        public double Longitude { get; set; }
    }
}