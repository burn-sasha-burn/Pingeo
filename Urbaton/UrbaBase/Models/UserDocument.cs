using Newtonsoft.Json;

namespace UrbaBase.Models
{
    public class UserDocument
    {
        [JsonProperty("nick")]
        public string Nick { get; set; }

        [JsonProperty("fileId")]
        public string FileId { get; set; }
    }
}