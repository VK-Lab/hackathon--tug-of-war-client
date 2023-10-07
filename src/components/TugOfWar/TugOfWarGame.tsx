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

  const onStartGame = async (side: SideOption) => {
    await onStart(side);
  };

  if (!currentKey) {
    return (
      <div>
        <ConnectButton />
      </div>
    );
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
          <button
            disabled={isStarted}
            onClick={() => onStartGame(SideOption.BULL)}
          >
            BULL
          </button>
          <button
            disabled={isStarted}
            onClick={() => onStartGame(SideOption.BEAR)}
          >
            BEAR
          </button>
        </div>
        <div className="gameview-container">
          <div className="gameview--left">
            <div className="point dot">
              1
            </div>
            
            <div className="progress">
              <div className="progress-bar" style={{ width: "75%", backgroundColor: "#f2d31b"}}>
                
              </div>
            </div>
          </div>
          <div className="gameview--right"></div>
        </div>
      </div>
    </div>
  );
};

export default TugOfWarGame;
