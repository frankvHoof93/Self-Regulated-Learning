using FeedbackService.Models;
using Microsoft.EntityFrameworkCore;


namespace FeedbackService.Data {

    public class DataContext : DbContext {

        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<Feedback> Feedback { get; set; }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder
                .UseNpgsql(Constants.POSTGRES_CONNECTION_STRING)
                .UseSnakeCaseNamingConvention();
        }

    }

}