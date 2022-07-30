import Caver from "caver-js";
import { KIP17_ABI_TOKEN_URI } from "./types.js";

export const caver = new Caver("https://api.baobab.klaytn.net:8651");
export const caverSocket = new Caver("wss://api.baobab.klaytn.net:8652");

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
