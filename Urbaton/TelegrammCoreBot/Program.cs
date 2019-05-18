using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using TelegrammCoreBot.Models;

namespace TelegrammCoreBot
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .CaptureStartupErrors(true) // the default
                .UseSetting("detailedErrors", "true")
                .UseKestrel(options =>
                {
                    options.ListenAnyIP(5000);
                })
                .UseStartup<Startup>();
    }
}