import React from "react";
import styles from "./index.module.css";
import { useWeb3 } from "hooks/useWeb3";
import { useBearInstance } from "hooks/useBearInstance";
import { useSocket } from "hooks/useSocket";
import { useBear } from "hooks/useBear";
import { useFindBears } from "hooks/useFindBears";
import { fromAscii } from "web3-utils";

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
            <h2>Bears</h2>
            <div className={styles.formContainer}>
                <div className={styles.inputLabel}>
                    Input the name of a bear
                </div>
                <div className={styles.inputContainer}>
                    <input
                        value={value}
                        onChange={onChangeValue}
                        type="text"
                        className={styles.input}
                    />
                    <button
                        disabled={buttonDisabled}
                        className={
                            buttonDisabled
                                ? styles.disabledButton
                                : styles.button
                        }
                        onClick={onInputSubmit}
                    >
                        Apply
                    </button>
                </div>
            </div>
            <div className={styles.bearSelection}>
                Currently selected bear
                <span className={styles.marginLeft}>:</span>
                <span className={styles.bearName}>
                    {currentBear ? currentBear.name : ""}
                </span>
            </div>
            <div className={styles.hRule} />
            <h4>History</h4>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>
                                <div className={styles.thead}>Name</div>
                            </th>
                            <th>
                                <div className={styles.thead}>Hash</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bears.map((bear, i) => (
                            <tr key={`key-${i}`}>
                                <td>{bear.name}</td>
                                <td>llk</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
