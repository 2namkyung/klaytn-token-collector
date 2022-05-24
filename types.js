export const KIP17_EVENT_TRANSFER_SIGNATURE =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
export const KIP17_EVENT_TRANSFER_INPUT = [
  {
    indexed: true,
    name: "from",
    type: "address",
  },
  {
    indexed: true,
    name: "to",
    type: "address",
  },
  {
    indexed: true,
    name: "tokenId",
    type: "uint256",
  },
];

export const KIP17_ABI_TOKEN_URI = [
  {
    constant: true,
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
