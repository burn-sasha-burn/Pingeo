using System;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Dispatcher;
using Front.Exceptions;
using StructureMap;

namespace Front
{
    public class StructureMapControllerActivator : IHttpControllerActivator
    {
        private readonly Container _container;

        public StructureMapControllerActivator(Container container)
        {
            _container = container;
        }

        public IHttpController Create(HttpRequestMessage request, HttpControllerDescriptor controllerDescriptor, Type controllerType)
        {
            if (controllerType == null)
                throw new ControllerNotFoundException(request.RequestUri.ToString());

            return (IHttpController) _container.GetInstance(controllerType);
        }
    }
}
