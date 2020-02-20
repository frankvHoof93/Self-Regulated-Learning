using Flurl.Http;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Flurl;


namespace CanvasDataCollector
{
    public interface ICanvasDataService
    {
        public void ProcessCanvasData(int id);
    }

    public class CanvasDataService : ICanvasDataService
    {
        
        public static readonly bool IN_DOCKER =
            bool.TryParse(Environment.GetEnvironmentVariable("IN_DOCKER"), out var result) && result;


        private static readonly string canvasEndpoint = IN_DOCKER ? "http://mock/canvas" : "http://localhost/canvas";

        private static readonly string hostname = IN_DOCKER ? "rabbit" : "localhost";
        private static readonly string routingKey = "data";
        private static readonly string exchangeName = "dataExchange";

        private IConnection connection;
        private IModel channel;

        public CanvasDataService()
        {
            var factory = new ConnectionFactory() { HostName = hostname };
            connection = factory.CreateConnection();
            channel = connection.CreateModel();
            channel.ExchangeDeclare(exchange: exchangeName,
                                        type: "topic");
        }

        public void ProcessCanvasData(int id)
        {
            //Get data from canvas
            var response = canvasEndpoint.AppendPathSegment(id).GetStringAsync().Result;
            // var data = response.Content.ReadAsStringAsync().Result;
            //Push data to RabbitMQ
            var body = Encoding.UTF8.GetBytes(response);
            channel.BasicPublish(exchange: exchangeName,
                                     routingKey: routingKey,
                                     basicProperties: null,
                                     body: body);
        }
    }
}
