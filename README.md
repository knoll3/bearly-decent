<p align="center">
  <img height=200 width=auto src="https://github.com/knoll3/bearly-decent/blob/main/client/src/bearly-decent-bg.png?raw=true">
</p>

### Description

This repository is the solution to a challenge from Decent Labs. The challenge is to create a system which demonstrates simple linear flow.

Bearly Decent fulfills all your bear naming needs. Input a pawesome adjective and the backend will automatically assign it to a bear. Say good-bye to your bear naming frustrations of the past.

1. User inputs an adjective for a bear in the UI
2. The client broadcasts the adjective as a string to the Bear smart contract on a local Ganache network
3. The smart contract emits a NameChanged event including the adjective of the bear
4. The backend API listens for the emitted NameChanged event from the smart contract
5. The API performs a sha3 hash on the string and stores it with the original string in a mongo database.
6. The API broadcasts the data to the frontend client via websockets.
7. The frontend client displays the original string along with its hash.

### Client

I am using React with Typescript and web3 for the frontend.

Build and run the frontend client

```
$ cd client
$ yarn
$ yarn start
```

### Database

I am using mongodb for the database running in a docker container.

```
$ docker run --name mongodb -p 27017:27017 -d mongo:latest
```

Run `docker ps` to check that the db is running. You should see something like this

```
$ docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS       NAMES
444863c09521   mongo:latest   "docker-entrypoint.s…"   9 seconds ago   Up 8 seconds   27017/tcp   mongodb
```

### Api

The backend API uses nodejs/typescript with express.

Build and run the API server

```
$ cd server
$ yarn
$ yarn start
```

### Smart Contract

The smart contract is written in Solidity.

Start a Ganache server on localhost:7545.

Use truffle to compile and migrate the smart contract from the root directory.

```
$ truffle compile
$ truffle migrate
```

### Possible Improvements

There are a few things I would do differently if this were a larger application and I had more time.

-   SQL instead of Mongodb. I prefer the rigidity offered by SQL over mongo's more flexible structure. I went with mongo just because it's easy to set up and I'm already pretty familiar with it.
-   Containerize the services. If this were to see continued development I would use docker-compose and containerize the client, server, ganache, and the db. Considering this was a small project and won't be worked on by anyone else there really is no point.
