import React, { useCallback } from "react";
import { Bear } from "types/Bear";
import styles from "./index.module.css";
import { Button } from "components/Button";
import { useFindBears } from "hooks/useFindBears";

interface BearHistoryProps {
    bears: Bear[];
    onDeleteAll: React.MouseEventHandler<HTMLButtonElement>;
}

export const BearHistory: React.FC<BearHistoryProps> = ({
    bears,
    onDeleteAll,
}) => {
    const formatHash = useCallback(
        (hash: string): string => {
            return `${hash.substr(0, 6)}...${hash.substr(-4)}`;
        },
        [bears]
    );

    return (
        <React.Fragment>
            <div className={styles.actionRow}>
                <div className={styles.historyTitle}>History</div>
                <Button onClick={onDeleteAll} disabled={bears.length === 0}>
                    Delete All
                </Button>
            </div>
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
                                <td>{formatHash(bear.hash)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};
