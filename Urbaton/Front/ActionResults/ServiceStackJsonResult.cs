using System.Web.Mvc;
using ServiceStack.Text;

namespace Front.ActionResults
{
    public class ServiceStackJsonResult : JsonResult
    {
        public override void ExecuteResult(ControllerContext context)
        {
            var response = context.HttpContext.Response;
            response.ContentType = string.IsNullOrEmpty(ContentType) ? "application/json" : ContentType;

            if (ContentEncoding != null)
                response.ContentEncoding = ContentEncoding;

            if (Data != null)
                response.Write(JsonSerializer.SerializeToString(Data));
        }
    }
}
