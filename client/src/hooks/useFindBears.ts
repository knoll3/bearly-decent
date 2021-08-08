import { useEffect, useState } from "react";
import { Bear } from "types/Bear";

/**
 * Loads all bears from the backend api endpoint
 */
export function useFindBears(
    currentBear: Bear | null
): [Bear[], React.Dispatch<React.SetStateAction<Bear[]>>] {
    const url = "http://localhost:8080/bears";

    const [bears, setBears] = useState<Bear[]>([]);

    // If current bear changes, update the list
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                const _bears: Bear[] = res.map((b: any) => ({
                    name: b["name"],
                    hash: b["hash"],
                }));
                setBears(_bears.reverse());
            });
    }, [currentBear]);

    return [bears, setBears];
}
