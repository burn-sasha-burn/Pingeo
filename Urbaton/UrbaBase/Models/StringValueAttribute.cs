using System;

namespace UrbaBase.Models
{
    [AttributeUsage(AttributeTargets.Field)]
    public class StringValueAttribute : Attribute
    {
        public readonly string Value;

        public StringValueAttribute(string value)
        {
            Value = value;
        }
    }
}