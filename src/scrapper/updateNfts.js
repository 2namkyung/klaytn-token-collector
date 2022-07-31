import axios from "axios";
import { insertNft, updateNft } from "../db/query.js";
import { upload } from "../utils/s3.js";

function metadataSchema(metadata) {
  const schema = metadata.properties;

  if (schema) {
    return {
      name: schema.name.description,
      description: schema.description.description,
      image: schema.image.description,
    };
  }

  return metadata;
}

export async function mint(nftData) {
  const { contract, from, to, tokenId, tokenURI } = nftData;

  try {
    const result = await axios.get(tokenURI);
    const metadata = metadataSchema(result.data);

    const data = {
      contract,
      from,
      to,
      tokenId,
      tokenURI,
      ...metadata,
    };

    // upload s3
    await upload(data.image, contract, tokenId);

    // insert
    insertNft(data);
  } catch (error) {
    if (error.response.status === 504) {
      // insert
      insertNft(nftData);
    }
  }
}

export function transfer(contract, tokenId, owner) {
  updateNft(contract, tokenId, owner);
}
