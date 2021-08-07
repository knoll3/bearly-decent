import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(endpoint: string) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socket = io(endpoint, {
            transports: ["websocket"],
        });

        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    return socket;
}
