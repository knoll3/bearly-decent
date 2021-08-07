import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import BearAbi from "./contracts/Bear.json";

const port = 8080;
const mongoUrl = "mongodb://localhost:27017/bears";

const app = express();
app.use(cors());

export const router = express.Router();

// Connect to mongo db
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const server = http.createServer(app);
const io = new Server(server);

let interval: NodeJS.Timer;

const getApiAndEmit = (socket: Socket) => {
    const response = new Date();
    socket.emit("FromAPI", response);
};

io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

// Listen to port
server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

async function getBearInstance(): Promise<Contract> {
    const BearContract = BearAbi as any;
    try {
        const provider = new Web3.providers.WebsocketProvider(
            "http://127.0.0.1:7545"
        );
        const web3 = new Web3(provider);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = BearContract.networks[networkId];
        const instance = new web3.eth.Contract(
            BearContract.abi,
            deployedNetwork && deployedNetwork.address
        );
        return instance;
    } catch (error) {
        console.error(error);
    }
}

// temp
(async () => {
    const BearInstance = await getBearInstance();

    BearInstance.events
        .NameChanged({}, function (error: any, event: any) {
            if (error) console.log(error);
            console.log(event);
        })
        .on("connected", function (subscriptionId: any) {
            console.log(subscriptionId);
        })
        .on("data", function (event: any) {
            // console.log(event);
        })
        .on("error", function (error: any, receipt: any) {
            console.log(error);
        });
})();
