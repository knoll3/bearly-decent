import { BearInstance } from "../getContract";
import { Server, Socket } from "socket.io";
import { server } from "../index";

const io = new Server(server);

BearInstance.events.NameChanged({}, function (error: any, event: any) {
    if (error) console.log(error);
    io.emit("FromAPI", JSON.stringify(event));
    console.log(event);
});
