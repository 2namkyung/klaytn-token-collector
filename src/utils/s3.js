import AWS from "aws-sdk";
import stream from "stream";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

export async function upload(imageUrl, contract, tokenId) {
  try {
    if (imageUrl.includes("ipfs://")) {
      const ipfsHash = imageUrl.split("://");
      imageUrl = "https://ipfs.io/ipfs/" + ipfsHash[1];
    }

    const response = await axios.get(encodeURI(imageUrl), {
      responseType: "arraybuffer",
    });

    s3.putObject(
      {
        ACL: "public-read",
        Body: response.data,
        Bucket: "nftmarket-image-bucket",
        Key: `KLAYTN_${contract}_${tokenId}`,
        ContentType: response.headers["content-type"],
        ContentLength: response.headers["content-length"],
      },
      (err, _) => {
        if (err) {
          return err;
        }
      }
    );
  } catch (error) {
    console.log("UPLOAD ERROR : ", error.response.status);
  }
}

export default s3;
