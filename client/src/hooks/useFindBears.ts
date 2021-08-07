import { useEffect, useState } from "react";
import { Bear } from "types/Bear";

export function useFindBears(currentBear: Bear | null) {
    const url = "http://localhost:8080/bears";

    const [bears, setBears] = useState<Bear[]>([]);

    // If current bear changes, update the list
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                const _bears: Bear[] = res.map((b: any) => ({
                    name: b["name"],
                }));
                setBears(_bears);
            });
    }, [currentBear]);

    return bears;
}
