import fs from "fs";

function main() {
  for (let i = 1; i <= 1000; i++) {
    const data = {
      name: `고슴도치 #${i}`,
      description: `고슴도치 #${i} Description`,
      image:
        "https://knx-marketplace.infura-ipfs.io/ipfs/QmdWe2U3ueqzJYRuDtEwVvtPAeR8XeNGWu8RrNuCkhnFcr",
      external_url: "www.namkyung.nk",
    };

    fs.writeFile(`./metadata/${i}.json`, JSON.stringify(data), "utf-8", () => {
      console.log(`Success ${i}`);
    });
  }
}

main();
