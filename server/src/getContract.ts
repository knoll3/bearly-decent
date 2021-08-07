import Web3 from "web3";
import BearAbi from "./contracts/Bear.json";

const providerUrl = "http://127.0.0.1:7545";
const contractAddress = "0x75444D0D94354457de9B611F065Ed03dDD43Af9A";

const BearContract = BearAbi as any;
const provider = new Web3.providers.WebsocketProvider(providerUrl);
const web3 = new Web3(provider);

export const BearInstance = new web3.eth.Contract(
    BearContract.abi,
    contractAddress
);
