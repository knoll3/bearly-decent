import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { EventsListener } from "./events";
import { GetBears } from "./controllers/Bear";

const port = 8080;
const mongoUrl = "mongodb://localhost:27017/bears";

const app = express();
app.use(cors());

const server = http.createServer(app);

// Listen to port
server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

// Listen to events
const io = new Server(server);
io.on("connection", EventsListener);

// Connect to mongo db
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
app.get("/bears", GetBears);
