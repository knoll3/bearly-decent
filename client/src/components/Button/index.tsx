import React, { useCallback } from "react";
import styles from "./index.module.css";

interface ButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    disabled,
}) => {
    return (
        <button
            disabled={disabled}
            className={disabled ? styles.disabledButton : styles.button}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
