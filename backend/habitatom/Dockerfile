# Use an official JDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the JAR file into the container at /app
COPY ./target/habitatom-0.0.1-SNAPSHOT.jar /app

# Expose port 8080 to the outside world
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "/app/habitatom-0.0.1-SNAPSHOT.jar"]
