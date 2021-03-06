import React from "react";
import styles from "./index.module.css";
import { Contract } from "web3-eth-contract";
import { fromAscii } from "web3-utils";
import { Button } from "components/Button";

interface FormProps {
    instance: Contract | null;
    userAddress: string;
}

/**
 * Just an input box and a button for creating a bear
 */
export const Form: React.FC<FormProps> = ({ instance, userAddress }) => {
    const [value, setValue] = React.useState("");

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const onInputSubmit = async () => {
        if (!instance) return;
        await instance.methods
            .set(fromAscii(value.trim()))
            .send({ from: userAddress });
        setValue("");
    };

    const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") onInputSubmit();
    };

    const buttonDisabled = value.trim().length === 0;

    return (
        <div className={styles.formContainer}>
            <div className={styles.inputLabel}>
                Give us a PAWESOME adjective
            </div>
            <div className={styles.inputContainer}>
                <input
                    value={value}
                    onChange={onChangeValue}
                    type="text"
                    className={styles.input}
                    onKeyPress={onKeyPress}
                    maxLength={30}
                />
                <Button onClick={onInputSubmit} disabled={buttonDisabled}>
                    Apply
                </Button>
            </div>
        </div>
    );
};
