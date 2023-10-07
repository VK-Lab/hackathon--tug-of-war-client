const configs = {
  // SmartContract info
  CHAIN_NAME: process.env.REACT_APP_CHAIN_NAME ?? 'casper-net-1',
  MOTE_RATE: 1_000_000_000,
  NODE_ADDRESS: "http://192.168.1.201:11101/rpc",
  TOKEN_CONTRACT_HASH: "hash-95afe0b1ea927bac9a8d7f214edc2c347f9f78e3267f46fdd62ab2f1ebcb9e6f"
}

export default configs;