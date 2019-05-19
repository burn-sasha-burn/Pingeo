using MongoDB.Driver;
using UrbaBase.Documents;

namespace UrbaBase.Repositories
{
    public class UserStateRepo : IUserStateRepo
    {
        private readonly IMongoCollection<UserStateDocument> _userStateCollection;

        public UserStateRepo(IMongoCollection<UserStateDocument> userStateCollection)
        {
            _userStateCollection = userStateCollection;
        }

        public UserStateDocument Get(int userId)
        {
            return _userStateCollection.Find(x => x.UserId == userId).SingleOrDefault() ?? new UserStateDocument();
        }

        public void Update(UserStateDocument document)
        {
            _userStateCollection.ReplaceOne(x => x.UserId == document.UserId, document, new UpdateOptions {IsUpsert = true});
        }

        public void Delete(int userId)
        {
            _userStateCollection.DeleteOne(x => x.UserId == userId);
        }
    }
}