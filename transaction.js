import caver, { getTokenURI } from "./klaytn-util.js";
import {
  KIP17_EVENT_TRANSFER_SIGNATURE,
  KIP7_EVENT_TRANSFER_SIGNATURE,
} from "./types.js";

export async function decodeKip17TransferLogs(txHash) {
  try {
    const receipt = await caver.rpc.klay.getTransactionReceipt(txHash);
    if (receipt.status === "0x1" && receipt.logs.length !== 0) {
      for (const log of receipt.logs) {
        const { topics } = log;
        const contract = log.address;
        if (
          topics[0] === KIP17_EVENT_TRANSFER_SIGNATURE &&
          topics.length === 4
        ) {
          const from = caver.abi.decodeParameter("address", topics[1]);
          const to = caver.abi.decodeParameter("address", topics[2]);
          const tokenId = caver.abi.decodeParameter("uint256", topics[3]);
          const tokenURI = await getTokenURI(contract, tokenId);

          const result = {
            contract,
            from,
            to,
            tokenId,
            tokenURI,
          };
          console.log("========================NFT=========================");
          console.log(result);
          console.log("====================================================");
        }
      }
    }
    return false;
  } catch (error) {
    return error;
  }
}

export async function decodeKip7TransferLogs(txHash) {
  try {
    const receipt = await caver.rpc.klay.getTransactionReceipt(txHash);
    if (receipt.status === "0x1" && receipt.logs.length !== 0) {
      for (const log of receipt.logs) {
        const { topics } = log;
        const contract = log.address;
        if (
          topics[0] === KIP7_EVENT_TRANSFER_SIGNATURE &&
          topics.length === 3
        ) {
          const from = caver.abi.decodeParameter("address", topics[1]);
          const to = caver.abi.decodeParameter("address", topics[2]);
          const data = caver.abi.decodeParameter("uint256", log.data);

          const result = {
            contract,
            txHash,
            from,
            to,
            data,
          };

          console.log("========================TOKEN=========================");
          console.log(result);
          console.log("======================================================");
        }
      }
    }
  } catch (error) {
    return error;
  }
}
