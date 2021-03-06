import { createRef, useCallback, useEffect } from "react";
import { Bear } from "types/Bear";

/**
 * Manages the decent bear's speech bubble. Triggers when currentBear changes
 */
export function useSpeechBubble(currentBear: Bear | null) {
    const bubbleRef = createRef<HTMLDivElement>();

    // Shrinks the speech bubble
    const shrink = useCallback((bubbleRef: React.RefObject<HTMLDivElement>) => {
        if (bubbleRef && bubbleRef.current) {
            const bubble = bubbleRef.current;
            bubble.style.transform = "scale(0)";
            bubble.style.transitionDuration = "0.1s";
            bubble.style.transitionTimingFunction = "linear";
        }
    }, []);

    // Expands the speech bubble
    const expand = useCallback(
        (bubbleRef: React.RefObject<HTMLDivElement>) => {
            if (bubbleRef && bubbleRef.current) {
                const bubble = bubbleRef.current;

                // Shrink the bubble before expanding
                shrink(bubbleRef);
                setTimeout(() => {
                    bubble.style.transform = "scale(1)";
                    bubble.style.transitionDuration = "0.25s";
                    bubble.style.transitionTimingFunction =
                        "cubic-bezier(0, 1.46, 0.62, 1.19)";
                }, 250);
            }
        },
        [shrink]
    );

    useEffect(() => {
        if (currentBear) {
            expand(bubbleRef);
        }
        // Adding all dependencies causes an infinite loop
        // eslint-disable-next-line
    }, [currentBear]);

    return bubbleRef;
}
