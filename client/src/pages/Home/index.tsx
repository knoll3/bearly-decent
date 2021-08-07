import React, { useEffect } from "react";
import styles from "./index.module.css";
import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:8080";

export const HomePage: React.FC = () => {
    const [response, setResponse] = React.useState("");

    useEffect(() => {
        const socket = io(ENDPOINT, {
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log("connect");
        });

        socket.on("FromAPI", (data) => {
            setResponse(data);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    console.log(response);

    return (
        <div className={styles.home}>
            <div>{response}</div>
        </div>
    );
};
