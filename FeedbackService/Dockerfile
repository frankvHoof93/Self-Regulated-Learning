FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /build

COPY ./SelfRegulatedLearningHackaton.sln ./
COPY ./**/*.csproj ./

RUN for file in $(ls *.csproj); do mkdir -p ${file%.*}/ && mv $file ${file%.*}/; done
RUN dotnet restore

COPY ./ ./
RUN dotnet publish FeedbackService -c Release -o /out



FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app

COPY --from=build-env /out ./

ENV ASPNETCORE_URLS http://*

EXPOSE 80

ENV IN_DOCKER true
ENTRYPOINT dotnet FeedbackService.dll