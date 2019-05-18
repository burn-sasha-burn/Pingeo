using System;
using System.Net;
using System.Web;

namespace Front.Exceptions
{
    [Serializable]
    public class ControllerNotFoundException : HttpException
    {
        public ControllerNotFoundException(string path)
            : base((int) HttpStatusCode.NotFound, $"Controller not found for path {path}")
        {
        }

        public ControllerNotFoundException(string path, Uri referrer)
            : base((int) HttpStatusCode.NotFound, $"Controller not found for path {path} (referrer: {referrer})")
        {
        }
    }
}