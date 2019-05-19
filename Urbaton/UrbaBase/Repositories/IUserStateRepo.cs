using JetBrains.Annotations;
using UrbaBase.Documents;

namespace UrbaBase.Repositories
{
    public interface IUserStateRepo
    {
        [NotNull]
        UserStateDocument Get(int userId);

        void Update([NotNull] UserStateDocument document);

        void Delete(int userId);
    }
}