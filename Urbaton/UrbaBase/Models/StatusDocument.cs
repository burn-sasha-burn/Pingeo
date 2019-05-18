namespace UrbaBase.Models
{
    public enum StatusDocument
    {
        [StringValue("Новый")]
        New = 0,

        [StringValue("В процессе")]
        Process = 1,

        [StringValue("Завершен")]
        Finished = 2
    }
}