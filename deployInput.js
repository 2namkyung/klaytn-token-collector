import caver from "./klaytn-util.js";
import NFT from "./json/NFT.json" assert { type: "json" };

function getDeployContractInput() {
  return caver.abi.encodeContractDeploy(
    NFT.abi,
    NFT.bytecode,
    "0xDD13777A13F793b9B199eF39ad5751c2B6AadA1A"
  );
}

const deployInput = getDeployContractInput();

console.log(deployInput);
