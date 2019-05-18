using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TelegrammCoreBot.Models
{
    public class AppSettings
    {
        public static string Url { get; set; } = "https://pingeo.ru/{0}";
        public static string Name { get; set; } = "Urbot";
        public static string Key { get; set; } = "";
    }
}
