import { getBlock } from "./block.js";
import { getReceipt } from "./klaytn-util.js";

async function main() {
  getBlock();
  // const result = await getReceipt(
  //   "0xf7c28c2a8601a10c7d6b8d34baeff5f0136972eeb6df4cbe3218580d540b5e9c"
  // );
  // console.log(result);
}

main();
