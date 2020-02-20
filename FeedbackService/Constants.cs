using System;


namespace FeedbackService {

    public static class Constants {

        public static readonly bool IN_DOCKER =
            bool.TryParse(Environment.GetEnvironmentVariable("IN_DOCKER"), out var result) && result;

        public static readonly string POSTGRES_CONNECTION_STRING =
            IN_DOCKER
                ? @"Host=postgres;Username=postgres;Password=pass;Database=postgres;Minimum Pool Size=2;Keepalive=60"
                : @"Host=localhost;Username=postgres;Password=pass;Database=postgres;Minimum Pool Size=2;Keepalive=60";

        public static readonly string RABBIT_HOST = IN_DOCKER ? "rabbit" : "localhost";

    }

}