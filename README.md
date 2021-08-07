# Decent Labs Challenge

This repository is the solution to a challenge from Decent Labs.

### Client

I am using React with Typescript for the frontend. Build the frontend client

```
$ cd client
$ yarn
```

### Api

I am using Express and Typscript for the api server. Build the api server

```
$ cd server
$ yarn
```

### Database

I am using mongo for the database running in a docker container from an image

```
$ docker run --name mongodb -p 27017:27017 -d mongo:latest
```

Run `docker ps` to check that the db is running. You should see something like this

```
$ docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS       NAMES
444863c09521   mongo:latest   "docker-entrypoint.s…"   9 seconds ago   Up 8 seconds   27017/tcp   mongodb
```
