using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;


namespace Gateway {

    public static class Program {

        public static void Main(string[] args) {
            new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .ConfigureAppConfiguration(
                    (hostingContext, config) => config
                        .AddJsonFile("ocelot.json")
                        .AddEnvironmentVariables()
                )
                .ConfigureServices(s => s.AddOcelot())
                .Configure(app => app.UseOcelot().Wait())
                .Build()
                .Run();
        }

    }

}