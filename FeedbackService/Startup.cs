using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using FeedbackService.Data;
using FeedbackService.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;


namespace FeedbackService {

    public class Startup {

        public void ConfigureServices(IServiceCollection services) {
            services
                .AddControllers()
                .AddNewtonsoftJson(
                    options => { options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore; }
                )
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            services.AddDbContext<DataContext>();
            services.AddOpenApiDocument();

            //TODO remove in production, resets database
            migrate(services);
            initRabbit(services);
        }



        private static void migrate(IServiceCollection services) {
            var sp = services.BuildServiceProvider();
            using var scope = sp.CreateScope();
            using var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();
            dataContext.Database.EnsureCreated();
            dataContext.Database.ExecuteSqlRaw("TRUNCATE TABLE feedback");
            dataContext.Feedback.Add(new Feedback {
                Id = 1,
                Message = "Goeie feedback1!!"
            });
            dataContext.SaveChanges();
        }



        private static void initRabbit(IServiceCollection services) {
            var factory = new ConnectionFactory() { HostName = Constants.RABBIT_HOST };
            var connection = factory.CreateConnection();
            var channel = connection.CreateModel();

            channel.ExchangeDeclare(exchange: "feedbackExchange", type: "topic");
            var queueName = channel.QueueDeclare().QueueName;

            channel.QueueBind(
                queue: queueName,
                exchange: "feedbackExchange",
                routingKey: "feedback"
            );

            Console.WriteLine(" [*] Waiting for messages. To exit press CTRL+C");

            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (model, ea) => {
                var body = ea.Body;
                var message = Encoding.UTF8.GetString(body);
                var routingKey = ea.RoutingKey;
                Console.WriteLine(
                    " [x] Received '{0}':'{1}'",
                    routingKey,
                    message
                );
                
                var sp = services.BuildServiceProvider();
                using var scope = sp.CreateScope();
                using var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();
                dataContext.Feedback.Add(
                    new Feedback {
                        Message = message
                    }
                );
                dataContext.SaveChanges();
            };
            channel.BasicConsume(
                queue: queueName,
                autoAck: true,
                consumer: consumer
            );
        }



        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            CultureInfo.DefaultThreadCurrentCulture = CultureInfo.InvariantCulture;
            CultureInfo.DefaultThreadCurrentUICulture = CultureInfo.InvariantCulture;

            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(
                builder => {
                    builder.WithOrigins("*")
                        .AllowAnyHeader() //TODO make more specific in production
                        .AllowAnyMethod();
//                    .AllowCredentials();
                }
            );

//            app.UseHsts();
//            app.UseHttpsRedirection(); TODO enable in production
            app.UseRouting();

            // app.UseAuthorization();
            // app.UseAuthentication();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

            app.UseOpenApi();
            app.UseReDoc();
            // app.UseSwaggerUi3();
        }

    }

}