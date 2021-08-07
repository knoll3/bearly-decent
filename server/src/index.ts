import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
// import "./events/Bear";
import { BearInstance } from "./getContract";

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

export const server = http.createServer(app);
const io = new Server(server);

let interval: NodeJS.Timer;

io.on("connection", (socket) => {
    console.log("New client connected");
    BearInstance.events.NameChanged(function (error: any, event: any) {
        if (error) console.log(error);
        socket.emit("FromAPI", JSON.stringify(event));
        console.log(event);
    });
});

// Listen to port
server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
