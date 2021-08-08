import React from "react";
import styles from "./index.module.css";
import { Contract } from "web3-eth-contract";
import { fromAscii } from "web3-utils";

interface FormProps {
    instance: Contract | null;
    userAddress: string;
}

export const Form: React.FC<FormProps> = ({ instance, userAddress }) => {
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
            .send({ from: userAddress });
    };

    const buttonDisabled = value.trim().length === 0;

    return (
        <div className={styles.formContainer}>
            <div className={styles.inputLabel}>Input the name of a bear</div>
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
                        buttonDisabled ? styles.disabledButton : styles.button
                    }
                    onClick={onInputSubmit}
                >
                    Apply
                </button>
            </div>
        </div>
    );
};
