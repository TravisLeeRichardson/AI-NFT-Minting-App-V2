import Web3 from "web3";
import MintableNFT from "./contracts/MintableNFT.json";

let web3;
let contract;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  contract = new web3.eth.Contract(MintableNFT.abi, "YOUR_CONTRACT_ADDRESS");
} else {
  console.error("No Ethereum provider detected. Please install MetaMask.");
}

export { web3, contract };
