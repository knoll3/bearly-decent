import { useEffect, useState } from "react";
import { Bear } from "types/Bear";
import { Socket } from "socket.io-client";

export function useBear(socket: Socket | null): Bear | null {
    const [bear, setBear] = useState<Bear | null>(null);

    const onNameChangedEvent = (data: any) => {
        const bear: Bear = {
            name: data["name"],
            hash: data["hash"],
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

    return bear;
}
