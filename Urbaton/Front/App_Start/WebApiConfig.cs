using System.Web.Http;

namespace Front
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "api",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new {id = RouteParameter.Optional}
            );
        }
    }
}
