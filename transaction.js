import caver, { getTokenURI } from "./klaytn-util.js";
import { KIP17_EVENT_TRANSFER_SIGNATURE } from "./types.js";

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
          console.log("=================================================");
          console.log(log);
          console.log("=================================================");
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
