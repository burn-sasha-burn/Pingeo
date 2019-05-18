using System;
using System.Web.Mvc;
using System.Web.Routing;
using Front.Exceptions;
using StructureMap;

namespace Front
{
    public class StructureMapControllerFactory : DefaultControllerFactory
    {
        private readonly Container _container;

        public StructureMapControllerFactory(Container container)
        {
            _container = container;
        }

        protected override IController GetControllerInstance(RequestContext requestContext, Type controllerType)
        {
            if (controllerType == null)
                throw new ControllerNotFoundException(requestContext.HttpContext.Request.Path, requestContext.HttpContext.Request.UrlReferrer);

            return (IController) _container.GetInstance(controllerType);
        }
    }
}
