import Web3 from "web3";
import BearAbi from "./contracts/Bear.json";

const providerUrl = "http://127.0.0.1:7545";
const contractAddress = "0x75444D0D94354457de9B611F065Ed03dDD43Af9A";

// There doesn't seem to be a built-in type for abi
const BearContract = BearAbi as any;
const provider = new Web3.providers.WebsocketProvider(providerUrl);
export const web3 = new Web3(provider);

// Get an instance of the bear smart contract
export const BearInstance = new web3.eth.Contract(
    BearContract.abi,
    contractAddress
);
