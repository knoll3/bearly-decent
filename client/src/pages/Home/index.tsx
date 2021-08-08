import React from "react";
import styles from "./index.module.css";
import { useWeb3 } from "hooks/useWeb3";
import { useBearInstance } from "hooks/useBearInstance";
import { useSocket } from "hooks/useSocket";
import { useBear } from "hooks/useBear";
import { useFindBears } from "hooks/useFindBears";
import { fromAscii } from "web3-utils";
import { Form } from "components/Form";
import { BearSelection } from "components/BearSelection";
import { BearHistory } from "components/BearHistory";
import decentBear from "decent-bear.png";

// End point to api server
const ENDPOINT = "http://localhost:8080";

// User address on the smart contract
const USER_ADDRESS = "0x95f02C1A608ee38A4Eb8dC6704DE904FAAd196Db";

export const HomePage: React.FC = () => {
    const web3 = useWeb3();
    const instance = useBearInstance(web3);
    const socket = useSocket(ENDPOINT);
    const currentBear = useBear(socket);
    const bears = useFindBears(currentBear);

    const [value, setValue] = React.useState("");

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const onInputSubmit = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (!instance) return;
        await instance.methods
            .set(fromAscii(value))
            .send({ from: USER_ADDRESS });
    };

    const buttonDisabled = value.trim().length === 0;

    return (
        <div className={styles.home}>
            <img
                className={styles.bearimg}
                src={decentBear}
                alt="decent-bear"
            />
            <h2>Decent Bear</h2>
            <Form instance={instance} userAddress={USER_ADDRESS} />
            <BearSelection currentBear={currentBear} />
            <div className={styles.hRule} />
            <BearHistory bears={bears} />
        </div>
    );
};
