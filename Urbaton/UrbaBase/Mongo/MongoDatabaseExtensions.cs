using System;
using System.Reflection;
using MongoDB.Driver;

namespace UrbaBase.Mongo
{
    internal static class MongoDatabaseExtensions
    {
        public static IMongoCollection<TDefaultDocument> GetNewMongoCollection<TDefaultDocument>(this IMongoDatabase database)
        {
            var documentType = typeof(TDefaultDocument);
            return database.GetCollection<TDefaultDocument>(documentType.ReadAttribute<CollectionNameAttribute>(true).CollectionName);
        }

        private static TAttr ReadAttribute<TAttr>(this ICustomAttributeProvider attributeProvider, bool inherit = false) where TAttr : Attribute
        {
            var result = FindAttribute<TAttr>(attributeProvider, inherit);
            if (result == null)
                Throw<TAttr>(attributeProvider);

            return result;
        }

        private static TAttr FindAttribute<TAttr>(this ICustomAttributeProvider attributeProvider, bool inherit = false) where TAttr : Attribute
        {
            var attributes = (TAttr[]) attributeProvider.GetCustomAttributes(typeof(TAttr), inherit);
            if (attributes.Length > 1)
                Throw<TAttr>(attributeProvider);

            return attributes.Length == 1 ? attributes[0] : null;
        }

        private static void Throw<TAttr>(ICustomAttributeProvider attributeProvider)
        {
            throw new InvalidOperationException($"Type {attributeProvider.GetType()} isn't marked with an attribute of type {typeof(TAttr)}");
        }
    }
}