import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

/**
 * Load a socket. Used to get current bear from backend api after it
 * has been created
 */
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
    }, [endpoint]);

    return socket;
}
