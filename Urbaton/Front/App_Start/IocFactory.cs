using System.Web.Http;
using System.Web.Http.Dispatcher;
using System.Web.Mvc;
using JetBrains.Annotations;
using StructureMap;
using StructureMap.Pipeline;

namespace Front
{
    public static class IocFactory
    {
        [NotNull]
        private static readonly object @lock = new object();

        private static Container _container;

        [NotNull]
        public static Container GetContainer()
        {
            if (_container == null)
                lock (@lock)
                {
                    if (_container == null)
                    {
                        if (_container == null)
                        {
                            var result = new Container();
                            result.Configure(r => r.Scan(s =>
                            {
                                s.AssembliesAndExecutablesFromApplicationBaseDirectory(a => a.GetName().Name.StartsWith("Pingeo."));
                                s.RegisterConcreteTypesAgainstTheFirstInterface().OnAddedPluginTypes(c => c.LifecycleIs(Lifecycles.Singleton));
                                s.LookForRegistries();
                            }));
                            _container = result;
                        }
                    }
                }

            return _container;
        }

        public static T GetInstance<T>() => GetContainer().GetInstance<T>();

        public static void Configure()
        {
            var container = GetContainer();
            ControllerBuilder.Current.SetControllerFactory(new StructureMapControllerFactory(container));
            GlobalConfiguration.Configuration.Services.Replace(typeof(IHttpControllerActivator), new StructureMapControllerActivator(container));
        }
    }
}
