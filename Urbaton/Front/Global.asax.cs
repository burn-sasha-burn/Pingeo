using System.Web;
using System.Web.Http;
using System.Web.Http.Dispatcher;
using System.Web.Mvc;
using System.Web.Routing;

namespace Front
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            var container = IocFactory.GetContainer();

            ControllerBuilder.Current.SetControllerFactory(new StructureMapControllerFactory(container));
            GlobalConfiguration.Configuration.Services.Replace(typeof(IHttpControllerActivator), new StructureMapControllerActivator(container));
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            TelegramBotConfig.Configure(container);
        }
    }
}
