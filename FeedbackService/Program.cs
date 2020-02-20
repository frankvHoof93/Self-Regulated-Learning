using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;


namespace FeedbackService {

    public static class Program {

        public static void Main(string[] args) {
            createHostBuilder(args).Build().Run();
        }



        private static IHostBuilder createHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });

    }

}