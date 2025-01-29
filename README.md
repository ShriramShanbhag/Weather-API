<h1 align="center">
  Weather API
</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">This is the solution for developing a weather API that efficiently fetches and provides weather data. The implementation is based on NestJS, a progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building server-side applications in an efficient and scalable way.</p>


## Description

[Weather API](https://roadmap.sh/projects/weather-api-wrapper-service)

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
$ docker-compose up -d
```

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment


```bash
$ yarn install -g mau
$ mau deploy
```