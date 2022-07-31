import caver, { caverSocket } from "../utils/klaytn.js";
import {
  decodeKip17TransferLogs,
  decodeKip7TransferLogs,
} from "./transaction.js";

export async function getNftInfoInNewBlock() {
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
            await decodeKip17TransferLogs(txHash);
            // await decodeKip7TransferLogs(txHash);
          }
          break;
        } catch (err) {
          return err;
        }
      }
    }
  });
}

export async function getNftInfo() {
  const current_blockNumber = 97348492;

  // 800000
  // 1192840
  for (let i = 800000; i < current_blockNumber; i++) {
    while (true) {
      try {
        const block = await caver.rpc.klay.getBlockByNumber(i);
        console.log(`${i}번째 블록 트랜잭션 처리중`);
        for (const txHash of block.transactions) {
          const eventsLog = await decodeKip17TransferLogs(txHash);
          if (eventsLog) {
            console.log(`${i}번째 블록에서 찾았습니다.`);
            console.log(eventsLog);
          }
        }
        break;
      } catch (err) {
        return err;
      }
    }
  }
}
