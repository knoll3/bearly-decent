import React from "react";
import styles from "./index.module.css";
import { useWeb3 } from "hooks/useWeb3";
import { useBearInstance } from "hooks/useBearInstance";
import { useSocket } from "hooks/useSocket";
import { useBear } from "hooks/useBear";
import { useFindBears } from "hooks/useFindBears";

const ENDPOINT = "http://localhost:8080";
const USER_ADDRESS = "0x95f02C1A608ee38A4Eb8dC6704DE904FAAd196Db";

export const HomePage: React.FC = () => {
    const web3 = useWeb3();
    const instance = useBearInstance(web3);
    const socket = useSocket(ENDPOINT);
    const [currentBear, onChangeName] = useBear(socket, instance, USER_ADDRESS);
    const bears = useFindBears(currentBear);

    return (
        <div className={styles.home}>
            <div>{JSON.stringify(currentBear, null, 2)}</div>
            <button onClick={onChangeName}>Change Name</button>
        </div>
    );
};
