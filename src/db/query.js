import connection from "./connection.js";

export async function insertNft(data) {
  const conn = await connection();

  try {
    await conn.query(
      `INSERT INTO nfts(contract, tokenId, name, description, external_url, image_url, tokenURI, type, owner, blockchain) VALUES(?,?,?,?,?,?,?,?,?,?)`,
      [
        data.contract,
        data.tokenId,
        data?.name,
        data?.description,
        data?.external_url,
        data?.image,
        data.tokenURI,
        "KIP-17",
        data.to,
        "KLAYTN",
      ]
    );

    conn.release();
  } catch (error) {
    console.log("[INSERT QUERY ERROR]", error);
    conn.release();
  }
}

export async function updateNft(contract, tokenId, owner) {
  const conn = await connection();
  try {
    await conn.query(`UPDATE nfts SET owner=? WHERE contract=? and tokenId=?`, [
      owner,
      contract,
      tokenId,
    ]);

    conn.release();
  } catch (error) {
    console.log("[UPDATE QUERY ERROR]", error);
    conn.release();
  }
}
