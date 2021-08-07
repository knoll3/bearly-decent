import { Server, Socket } from "socket.io";
import { server } from "./index";

const io = new Server(server);
