using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using UrbaBase.Documents;
using UrbaBase.Mongo;

namespace UrbaBase.Repositories
{
    public class IncidentRepo : IIncidentRepo
    {
        private readonly IMongoCollection<IncidentDocument> _incidentCollection;

        public IncidentRepo(IMongoCollection<IncidentDocument> incidentCollection)
        {
            _incidentCollection = incidentCollection;
        }

        public IncidentDocument Get(string id)
        {
            var document = GetDocument(id);
            return document == null ? null : document;
        }

        private IncidentDocument Get(Guid id)
        {
            return Get(id.ToString());
        }

        private IncidentDocument GetDocument(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                return null;

            return _incidentCollection.FindOneById(id);
        }

        public IEnumerable<IncidentDocument> Get()
        {
            return _incidentCollection.AsQueryable().ToArray();
        }

        public bool Save(IncidentDocument document)
        {
            if (document == null)
                return false;
            try
            {
                if (Get(document.Id) != null) return UpdateDocument(document);

                return CreateDocument(document);
            }
            catch (Exception e)
            {
                //Log.Info($"Error while saving ProcedureCalendar: {Id}", e);
                return false;
            }
        }

        private bool CreateDocument(IncidentDocument document)
        {
            _incidentCollection.InsertOne(document);
            return true;
        }

        private bool UpdateDocument(IncidentDocument document)
        {
            var result = _incidentCollection.ReplaceOne(x => x.Id == document.Id, document, new UpdateOptions { IsUpsert = true });
            return result.IsAcknowledged;
        }
    }
}