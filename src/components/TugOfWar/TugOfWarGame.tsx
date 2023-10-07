import { useCallback } from "react";
import ConnectButton from "../ConnectButton";
import { useStore } from "./TugOfWarGameContainer";
import DisconnectButton from "../DisconnectButton";
import CountdownDisplay from "./CountdownDisplay";
import useAccountWallet from "../../hooks/useAccountWallet";
import { SideOption } from "../../services/types";
import useTugOfWar from "../../hooks/useTugOfWar";

const TugOfWarGame = () => {
  useAccountWallet();
  const [{ currentKey, isStarted }, dispatch] = useStore();
  const { onStart } = useTugOfWar();
  console.log(`🚀 ~ TugOfWarGame ~ isStarted:`, isStarted);

  const onStartGame = async (side: SideOption) => {
    await onStart(side);
  };
  
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
      <div>
        {/* <button disabled={isStarted} onClick={onStart}>Start</button> */}
        {/* <button disabled={!isStarted} onClick={() => dispatch({ type: "DISABLE_COUNTDOWN"})}>Stop</button> */}
        <CountdownDisplay dispatch={dispatch} isStarted={isStarted} />
        <div>
          <button disabled={isStarted} onClick={() => onStartGame(SideOption.BULL)}>BULL</button>
          <button disabled={isStarted} onClick={() => onStartGame(SideOption.BEAR)}>BEAR</button>
        </div>
      </div>
    </div>
  )
};


export default TugOfWarGame;
