import React, { createRef } from "react";
import { Bear } from "types/Bear";
import styles from "./index.module.css";

interface SpeechBubbleProps {
    currentBear: Bear | null;
    bubbleRef: React.RefObject<HTMLDivElement>;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
    currentBear,
    bubbleRef,
}) => {
    if (!currentBear) return <></>;
    return (
        <React.Fragment>
            <div ref={bubbleRef} className={styles.speechBubble}>
                {currentBear.speech}
            </div>
        </React.Fragment>
    );
};
