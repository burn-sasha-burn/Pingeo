using System.Web;
using System.Web.Http;
using System.Web.Routing;
using log4net.Config;

namespace Front
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            XmlConfigurator.Configure();
            IocFactory.Configure();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}