FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY build/libs/trip-searcher.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]