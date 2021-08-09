import React from "react";
import styles from "./index.module.css";
import { useWeb3 } from "hooks/useWeb3";
import { useBearInstance } from "hooks/useBearInstance";
import { useSocket } from "hooks/useSocket";
import { useBear } from "hooks/useBear";
import { useFindBears } from "hooks/useFindBears";
import { Form } from "components/Form";
import { BearHistory } from "components/BearHistory";
import decentBear from "decent-bear.png";
import { SpeechBubble } from "components/SpeechBubble";
import { useSpeechBubble } from "hooks/useSpeechBubble";
import { Bear } from "types/Bear";

// End point to api server
const ENDPOINT = "http://localhost:8080";

// User address on the smart contract
const USER_ADDRESS = "0x95f02C1A608ee38A4Eb8dC6704DE904FAAd196Db";

export const HomePage: React.FC = () => {
    // Load web3 to get a smart contract instance
    const web3 = useWeb3();

    // Load a bear smart contract instance for calling contract methods
    const instance = useBearInstance(web3);

    // Open a socket to receive the current bear from the backend api
    const socket = useSocket(ENDPOINT);

    // Get the bear that was just created
    const [currentBear, setCurrentBear] = useBear(socket);

    // Get all bears from backend api
    const [bears, setBears] = useFindBears(currentBear);

    // Handle the speech bubble transition when currentBear changes
    const bubbleRef = useSpeechBubble(currentBear);

    const onDeleteAll = () => {
        fetch(`${ENDPOINT}/bears`, {
            method: "DELETE",
        }).then(() => {
            setBears([]);
            setCurrentBear(null);
        });
    };

    const onClickRow = (bear: Bear) => {
        setCurrentBear(bear);
    };

    return (
        <div className={styles.home}>
            <div className={styles.decentBear}>
                <img
                    className={styles.bearimg}
                    src={decentBear}
                    alt="decent-bear"
                />
                <SpeechBubble currentBear={currentBear} bubbleRef={bubbleRef} />
            </div>
            <Form instance={instance} userAddress={USER_ADDRESS} />
            <div className={styles.hRule} />
            <BearHistory
                bears={bears}
                currentBear={currentBear}
                onDeleteAll={onDeleteAll}
                onClickRow={onClickRow}
            />
        </div>
    );
};
