using System;

namespace UrbaBase.Mongo
{
    [AttributeUsage(AttributeTargets.Class)]
    internal class CollectionNameAttribute : Attribute
    {
        public readonly string CollectionName;

        public CollectionNameAttribute(string collectionName)
        {
            CollectionName = collectionName;
        }
    }
}