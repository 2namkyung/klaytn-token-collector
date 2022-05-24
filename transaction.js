import caver, { getTokenURI } from "./klaytn-util.js";
import { KIP17_EVENT_TRANSFER_SIGNATURE } from "./types.js";

export async function getTransactionReceipt(txHash) {
  try {
    return await caver.rpc.klay.getTransactionReceipt(txHash);
  } catch (error) {
    return error;
  }
}

export async function decodeKip17TransferLogs(txHash) {
  try {
    const receipt = await getTransactionReceipt(txHash);
    if (receipt.status === "0x1") {
      if (receipt.logs.length !== 0) {
        const { topics } = receipt.logs[0];
        const contract = receipt.to;
        if (topics[0] === KIP17_EVENT_TRANSFER_SIGNATURE) {
          const from = caver.abi.decodeParameter("address", topics[1]);
          const to = caver.abi.decodeParameter("address", topics[2]);
          const tokenId = caver.abi.decodeParameter("uint256", topics[3]);
          const tokenURI = await getTokenURI(contract, tokenId);
          return {
            contract,
            from,
            to,
            tokenId,
            tokenURI,
          };
        }
      }
    }

    return false;
  } catch (error) {
    return error;
  }
}
