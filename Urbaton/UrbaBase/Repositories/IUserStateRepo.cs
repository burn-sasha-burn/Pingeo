using UrbaBase.Documents;

namespace UrbaBase.Repositories
{
    public interface IUserStateRepo
    {
        UserStateDocument Get(int userId);
        void Update(UserStateDocument document);
    }
}