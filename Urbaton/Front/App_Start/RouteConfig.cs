﻿using System.Web.Mvc;
using System.Web.Routing;

namespace Front
{
    public static class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapMvcAttributeRoutes();
            routes.MapRoute(
                name: "default",
                url: "{controller}/{action}/{id}",
                defaults: new {controller = "Incidents", action = "Index", id = UrlParameter.Optional}
            );
        }
    }
}
