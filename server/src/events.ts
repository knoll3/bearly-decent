import { Server, Socket } from "socket.io";
import { BearInstance, web3 } from "./getContract";
import { Bear } from "./models/Bear";

export const EventsListener = (socket: Socket) => {
    const subscription = BearInstance.events.NameChanged(
        async (err: any, event: any) => {
            if (err) console.log(err);
            const hex = event.returnValues["name"];
            const value = web3.utils.hexToString(hex);

            const newBear = new Bear({
                name: value,
            });

            // Add the new bear to the list of bears
            const bearDoc = await newBear.save();

            const bear = {
                name: bearDoc.name,
            };

            socket.emit("NameChanged", bear);
        }
    );
    socket.on("disconnect", () => {
        subscription.unsubscribe();
    });
};
