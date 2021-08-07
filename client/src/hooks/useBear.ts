import { useEffect, useState } from "react";
import { Bear } from "types/Bear";
import { Socket } from "socket.io-client";
import { Contract } from "web3-eth-contract";
import { fromAscii } from "web3-utils";

export function useBear(
    socket: Socket | null,
    instance: Contract | null,
    userAddress: string
): [Bear | null, () => void] {
    const [bear, setBear] = useState<Bear | null>(null);

    const onInputSubmit = async () => {
        if (!instance) return;
        await instance.methods
            .set(fromAscii("Polar Bear"))
            .send({ from: userAddress });
    };

    const onNameChangedEvent = (data: any) => {
        const bear: Bear = {
            name: data["name"],
        };
        setBear(bear);
    };

    useEffect(() => {
        if (!socket) return;
        socket.on("NameChanged", onNameChangedEvent);
        return () => {
            socket.off("NameChanged", onNameChangedEvent);
        };
    }, [socket]);

    return [bear, onInputSubmit];
}
