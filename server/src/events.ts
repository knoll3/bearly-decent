import { Server, Socket } from "socket.io";
import { BearInstance, web3 } from "./getContract";
import { Bear } from "./models/Bear";

// Listens for events from the smart contract
export const EventsListener = (socket: Socket) => {
    // Listens for the NameChanged event from the smart contract
    const subscription = BearInstance.events.NameChanged(
        async (err: any, event: any) => {
            if (err) console.log(err);
            const hex = event.returnValues["name"];
            const value = web3.utils.hexToString(hex);

            const newBear = new Bear({
                name: capitalizeFirstLetter(value),
                hash: web3.utils.sha3(value),
                speech: generateSpeech(value),
            });

            // Add the new bear to the list of bears
            const bearDoc = await newBear.save();

            const bear = {
                name: bearDoc.name,
                hash: bearDoc.hash,
                speech: bearDoc.speech,
            };

            socket.emit("NameChanged", bear);
        }
    );
    socket.on("disconnect", () => {
        subscription.unsubscribe();
    });
};

function generateSpeech(adjective: string): string {
    adjective = capitalizeFirstLetter(adjective);

    const starts = [
        `You're looking at a ${adjective} Bear!`,
        `Yeah! I'm a ${adjective} Bear!`,
        `Look at me! I'm a ${adjective} Bear!`,
        `¡Soy una oso ${adjective}!`,
        `What? Never seen a ${adjective} Bear before?`,
    ];

    const endings = [
        "lol",
        ":)",
        ";P",
        "grr lol",
        "(▀̿Ĺ̯▀̿ ̿)",
        "(ᵔᴥᵔ)",
        "(｡◕‿◕｡)",
    ];

    const randomStart = randomString(starts);
    const randomEnd = randomString(endings);

    return `${randomStart} ${randomEnd}`;
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomString(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
}
