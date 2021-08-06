import { useEffect, useState } from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import DecentAbi from "contracts/Decent.json";

/**
 * Get the Decent contract instance
 */
export function useDecentInstance(web3: Web3 | null): Contract | null {
    const [instance, setInstance] = useState<Contract | null>(null);

    // Using any here because there is no type for the abi
    const DecentContract = DecentAbi as any;

    // Get the instance when web3 changes
    useEffect(() => {
        (async () => {
            if (!web3) return instance;
            try {
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = DecentContract.networks[networkId];
                const _instance = new web3.eth.Contract(
                    DecentContract.abi,
                    deployedNetwork && deployedNetwork.address
                );
                setInstance(_instance);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [web3]);

    return instance;
}
