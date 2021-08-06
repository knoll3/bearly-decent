import React, { useEffect } from "react";
import Web3 from "web3";

/**
 * Get a web3 instance
 */
export function useWeb3(): Web3 | null {
    const [web3, setWeb3] = React.useState<Web3 | null>(null);

    useEffect(() => {
        (async () => {
            setWeb3(await getWeb3());
        })();
    }, []);

    return web3;
}

function getWeb3(): Promise<Web3> {
    return new Promise((resolve, reject) => {
        window.addEventListener("load", async () => {

            // Enter url ganache is running on
            const provider = new Web3.providers.HttpProvider(
                "http://127.0.0.1:7545"
            );
            const _web3 = new Web3(provider);
            console.log("No web3 instance injected, using Local web3.");
            resolve(_web3);
        });
    });
}
