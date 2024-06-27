FROM openjdk:17-jdk-slim
# Add a volume pointing to /tmp
VOLUME /tmp
WORKDIR /app
COPY build/libs/trip-searcher.jar app.jar
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]