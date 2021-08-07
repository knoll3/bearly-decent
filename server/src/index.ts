import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

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
