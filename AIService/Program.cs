using Flurl.Http;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace AIService
{
    class Program
    {
        
        public static readonly bool IN_DOCKER =
            bool.TryParse(Environment.GetEnvironmentVariable("IN_DOCKER"), out var result) && result;
        
        private static readonly string hostname = IN_DOCKER ? "rabbit" : "localhost";
        private static readonly string dataRoutingKey = "data";
        private static readonly string dataExchangeName = "dataExchange";
        private static readonly string feedbackRoutingKey = "feedback";
        private static readonly string feedbackExchangeName = "feedbackExchange";

        private static readonly string aiEndpoint = IN_DOCKER ? "http://mock/ai" : "http://localhost/ai";

        static void Main(string[] args)
        {
            Console.WriteLine("Starting...");

            var factory = new ConnectionFactory() { HostName = hostname };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.ExchangeDeclare(exchange: dataExchangeName, type: "topic");
                channel.ExchangeDeclare(exchange: dataExchangeName, type: "topic");
                var dataQueue = channel.QueueDeclare().QueueName;

                channel.QueueBind(queue: dataQueue,
                                      exchange: dataExchangeName,
                                      routingKey: dataRoutingKey);

                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body;
                    var message = Encoding.UTF8.GetString(body);

                    var response = aiEndpoint.PostJsonAsync(JsonConvert.DeserializeObject(message)).Result;
                    var feedback = response.Content.ReadAsStringAsync().Result;

                    var dataBody = Encoding.UTF8.GetBytes(feedback);
                    channel.BasicPublish(exchange: feedbackExchangeName,
                                     routingKey: feedbackRoutingKey,
                                     basicProperties: null,
                                     body: dataBody);

                };
                channel.BasicConsume(queue: dataQueue,
                                     autoAck: true,
                                     consumer: consumer);


                Task.Delay(TimeSpan.FromDays(1)).Wait();
            }
        }
    }
}
