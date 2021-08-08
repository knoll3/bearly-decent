import React from "react";
import { Bear } from "types/Bear";
import styles from "./index.module.css";

interface BearHistoryProps {
    bears: Bear[];
}

export const BearHistory: React.FC<BearHistoryProps> = ({ bears }) => {
    return (
        <React.Fragment>
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
        </React.Fragment>
    );
};
