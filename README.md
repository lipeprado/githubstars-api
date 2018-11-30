# Githubstarts-api

adding Tags for every repo that you may like.

### Prerequisites

- You need to have docker and docker-compose installed to build and run the project.

## Getting Started

Clone the project, install dependencies, set env variables and run with npm script.

To clone the project:

```
git clone git@github.com:lipeprado/githubstars-api.git
```

Enter the project directory:

```
cd githubstars-api
```

Install dependecies:

```
npm install
```

Build an environment with docker and run:

```
docker-compose up --build
```

Make migrations and seeds:

```
npm run env:dev
```

Start the server locally:

```
npm run start
```

## Tests

To run tests just run npm test command:

```
npm test
```

## Built With

- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.

- [MongoDB](https://www.mongodb.com/) - MongoDB is an open-source document database that provides high performance, high availability, and automatic scaling.

## Authors

- **Filipe Prado** - _ Software Developer _ - [lipeprado](https://github.com/lipeprado) / [Linkedin](https://www.linkedin.com/in/dev-filipe/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
