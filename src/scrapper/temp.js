const lazyMint = (args) => {
  let nftId;

  const { data } = args;
  console.log(data);

  connection.query(
    `INSERT INTO lazy(contract,tokenId,tokenURI,price,royalty,signature) VALUES (?,?,?,?,?,?);`,
    [
      data.contract,
      data.tokenId,
      data.tokenURI,
      data.price,
      data.royalty,
      data.signature,
    ],
    function (error, results) {
      if (error) {
        console.log(error);
        return error;
      }

      nftId = results.insertId;

      connection.end();
    }
  );
  return nftId;
};
