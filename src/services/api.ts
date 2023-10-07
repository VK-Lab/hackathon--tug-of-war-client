// const rootAPI = process.env.REACT_APP_API_END_POINT || 'http://api.localhost';
// const rootAPI = "http://192.168.1.199:3000/";
const rootAPI = "http://192.168.1.62:3000/";
export type PublicKey = string;
const KEYCHAIN = {
  startGame: (publicKey: PublicKey, side: string) =>
    `/bet/${publicKey}/${side}`,
};

export { rootAPI };

export default KEYCHAIN;
