import Caver from "caver-js";
import { NFT_EVENT_ABI } from "./types.js";
import dotenv from "dotenv";
dotenv.config();

const caver = new Caver("https://api.baobab.klaytn.net:8651");
const contractAddress = "0xE7d18d795B387Bf7350d5D0b065c1BE868b37834";

const contract = new caver.contract(NFT_EVENT_ABI, contractAddress);

const PublicKey = process.env.SENDER_PUBLIC_KEY;
const PrivateKey = process.env.SENDER_PRIVATE_KEY;

const Keyring = caver.wallet.keyring.create(PublicKey, PrivateKey);
caver.wallet.add(Keyring);

async function setUpSale(mintStartBlock, mintPrice, mintLimit, baseURI) {
  await contract.send(
    {
      from: Keyring.address,
      feeDelegation: false,
      gas: 2000000,
      gasPrice: 250000000000,
    },
    "setUpSale",
    mintStartBlock,
    mintPrice,
    mintLimit,
    baseURI
  );
}

async function generateArray(start, end) {
  const gas = await contract.methods.generateArray(start, end).estimateGas({
    from: PublicKey,
    to: contractAddress,
  });
  console.log(">>> gas : ", gas);

  await contract.send(
    {
      from: Keyring.address,
      feeDelegation: false,
      gas,
      gasPrice: 250000000000,
    },
    "generateArray",
    start,
    end
  );
}

async function getBlockNumber() {
  const blockNumber = await contract.methods.getBlockNumber().call();
  console.log(">>> Block Number : ", blockNumber);
}

async function getTotalArray() {
  const arrayLength = await contract.methods.totalArray().call();
  console.log(">>> Array Length : ", arrayLength);
}

await setUpSale(
  93184468,
  "10000000000000000000",
  5,
  "https://knx-marketplace.infura-ipfs.io/ipfs/QmQZyc9x2icgJCdWKuUtE9kCmyk2FKR24abNAKwTHLM875/"
);

await generateArray(1, 1000);
await getBlockNumber();
await getTotalArray();
