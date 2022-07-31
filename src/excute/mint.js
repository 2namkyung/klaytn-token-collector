import caver from "./klaytn-util.js";
import dotenv from "dotenv";

dotenv.config();

const senderPubKey = process.env.SENDER_PUBLIC_KEY;
const senderPrivKey = process.env.SENDER_PRIVATE_KEY;

const sender = caver.klay.accounts.wallet.add(senderPrivKey);

async function feeDelegateMint(contract, tokenURI, royalties) {
  const data = caver.klay.abi.encodeFunctionCall(
    {
      name: "createToken",
      type: "function",
      inputs: [
        {
          type: "string",
          name: "tokenURI",
        },
        {
          type: "address",
          name: "to",
        },
        {
          type: "uint96",
          name: "royalties",
        },
      ],
    },
    [tokenURI, senderPubKey, royalties]
  );

  const tx = {
    type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
    from: sender.address,
    to: contract,
    data,
    gas: "250000000",
    value: 0,
  };

  console.log(sender.address);

  const { rawTransaction: senderRawTransaction } =
    await caver.klay.accounts.signTransaction(tx, senderPrivKey);

  caver.klay
    .sendTransaction({
      senderRawTransaction,
      feePayer: sender.address,
    })
    .on("transactionHash", function (hash) {
      console.log(">>> tx_hash for function call", hash);
    })
    .on("receipt", function (receipt) {
      console.log(">>> receipt arrived: ", receipt);
    })
    .on("error", function (err) {
      console.error(">>> error: ", err);
    });
}

feeDelegateMint(
  "0x4243b6aCa97ddd014008006ceB16A92e1151c97F",
  "TEST TOKEN URI",
  "1000"
);
