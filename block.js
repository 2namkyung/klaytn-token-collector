import caver, { caverSocket } from "./klaytn-util.js";
import { decodeKip17TransferLogs } from "./transaction.js";

export async function getBlock() {
  setInterval(async () => {
    await caverSocket.rpc.klay.getBlockNumber();
  }, "59500");

  caverSocket.rpc.klay.subscribe("newBlockHeaders", async (error, event) => {
    if (error) {
      console.log(error);
      return error;
    } else {
      while (true) {
        try {
          const block = await caver.rpc.klay.getBlockByNumber(event.number);
          for (const txHash of block.transactions) {
            const eventsLog = await decodeKip17TransferLogs(txHash);

            if (eventsLog) {
              console.log(eventsLog);
            }
          }
          break;
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}
