# Dog's Breed

This is a project configured to run in a Docker container. It includes configurations for development and testing environments.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Cloning the Repository

```
git clone https://github.com/your-username/dogsbreed-challenge.git
cd dogsbreed-challenge
```
## Building the Docker Image
Build the Docker image for the project:
```
docker-compose build
```
## Running the Application
Run the application in a Docker container:
```
docker-compose up
```
This will start the application on http://localhost:3000.

## Running Tests
To run the tests, use the following command:
```
docker-compose run test
```
## Version Information

This project uses npm version 10.8.1
