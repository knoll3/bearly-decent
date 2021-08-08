import React from "react";
import { Bear } from "types/Bear";
import styles from "./index.module.css";

interface BearSelectionProps {
    currentBear: Bear | null;
}

export const BearSelection: React.FC<BearSelectionProps> = ({
    currentBear,
}) => {
    return (
        <div className={styles.bearSelection}>
            Currently selected bear
            <span className={styles.marginLeft}>:</span>
            <span className={styles.bearName}>
                {currentBear ? currentBear.name : ""}
            </span>
        </div>
    );
};
