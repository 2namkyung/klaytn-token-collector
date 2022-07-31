import Caver from "caver-js";
import { KIP17_ABI_TOKEN_URI } from "../scrapper/types.js";

// Cypress : https://public-node-api.klaytnapi.com/v1/cypress
// Baobab : https://api.baobab.klaytn.net:8651
// Socket : "wss://public-node-api.klaytnapi.com/v1/{network}/ws"

export const caver = new Caver("https://api.baobab.klaytn.net:8651");
export const caverSocket = new Caver(
  "wss://public-node-api.klaytnapi.com/v1/baobab/ws"
);

export async function getTokenURI(contractAddress, tokenId) {
  const contract = new caver.contract(KIP17_ABI_TOKEN_URI, contractAddress);

  try {
    return await contract.methods.tokenURI(tokenId).call();
  } catch (error) {
    return null;
  }
}

export async function getReceipt(txHash) {
  try {
    return await caver.rpc.klay.getTransactionReceipt(txHash);
  } catch (error) {
    return error;
  }
}

export default caver;
