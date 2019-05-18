using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace Front
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            IocFactory.Configure();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}
