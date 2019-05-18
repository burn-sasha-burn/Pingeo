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

        private static Container container;

        [NotNull]
        public static Container GetContainer()
        {
            if (container == null)
                lock (@lock)
                {
                    if (container == null)
                    {
                        if (container == null)
                        {
                            var result = new Container();
                            result.Configure(r => r.Scan(s =>
                            {
                                s.AssembliesAndExecutablesFromApplicationBaseDirectory(a => a.GetName().Name.StartsWith("Pingeo."));
                                s.RegisterConcreteTypesAgainstTheFirstInterface().OnAddedPluginTypes(c => c.LifecycleIs(Lifecycles.Singleton));
                                s.LookForRegistries();
                            }));
                            container = result;
                        }
                    }
                }

            return container;
        }

        public static T GetInstance<T>() => GetContainer().GetInstance<T>();

        public static void Configure()
        {
            ControllerBuilder.Current.SetControllerFactory(new StructureMapControllersFactory(GetContainer()));
        }
    }
}