import ConnectButton from "../ConnectButton";
import { useStore } from "./TugOfWarGameContainer";
import DisconnectButton from "../DisconnectButton";
import useAccountWallet from "../../hooks/useAccountWallet";

const TugOfWarGame = () => {
  useAccountWallet();
  const [{ currentKey }, dispatch] = useStore();
  console.log(`🚀 ~ TugOfWarGame ~ currentKey:`, currentKey)
  
  if (!currentKey) {
    return (
      <div>
        <ConnectButton />
      </div>
    )
  }

  return (
    <div>
      <p>Hello {currentKey}</p>
      <DisconnectButton dispatch={dispatch} />
    </div>
  )
};


export default TugOfWarGame;
