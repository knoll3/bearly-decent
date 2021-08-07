import React, { useEffect } from "react";
import styles from "./index.module.css";
import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";
import { useWeb3 } from "hooks/useWeb3";
import { useBearInstance } from "hooks/useBearInstance";
import { fromAscii } from "web3-utils";

const ENDPOINT = "http://localhost:8080";
const USER_ADDRESS = "0x95f02C1A608ee38A4Eb8dC6704DE904FAAd196Db";

export const HomePage: React.FC = () => {
    const [response, setResponse] = React.useState("");

    useEffect(() => {
        const socket = io(ENDPOINT, {
            transports: ["websocket"],
        });

        socket.on("FromAPI", (data) => {
            setResponse(data);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    const web3 = useWeb3();
    const instance = useBearInstance(web3);

    const onChangeName = async () => {
        if (!instance) return;
        await instance.methods
            .set(fromAscii("Polar Bear"))
            .send({ from: USER_ADDRESS });
    };

    return (
        <div className={styles.home}>
            <div>{response}</div>
            <button onClick={onChangeName}>Change Name</button>
        </div>
    );
};
